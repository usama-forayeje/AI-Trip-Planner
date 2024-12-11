import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetList, SelectTravelLists } from "@/constans/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader, UserCircle, X } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import { useNavigate } from "react-router-dom";
const CreateTrip = () => {
    // States for user input and selections
    const [input, setInput] = useState(""); // Destination input value
    const [suggestions, setSuggestions] = useState([]); // List of autocomplete suggestions
    const [selectedSuggestion, setSelectedSuggestion] = useState(""); // Selected destination
    const [days, setDays] = useState(""); // Number of days for the trip
    const [budget, setBudget] = useState(""); // Selected budget
    const [travelWith, setTravelWith] = useState(""); // Selected travel companion
    const [openDialog, setOpenDialog] = useState(false); // Dialog open state (for Google login)
    const [loading, setLoading] = useState(false); // Loading state for form submission
    const navigate = useNavigate();
    // Handle input change and fetch suggestions from the Google Places API
    const handleInputChange = async (event) => {
        const userInput = event.target.value;
        setInput(userInput);
        // Fetch suggestions if input length is greater than 2
        if (userInput.length > 2) {
            try {
                const response = await axios.get("https://maps.gomaps.pro/maps/api/place/autocomplete/json", {
                    params: {
                        input: userInput,
                        key: import.meta.env.VITE_GOOGLE_PLACE_API_KEY, // Your API key
                    },
                });
                setSuggestions(response.data.predictions || []);
            }
            catch (error) {
                console.error("Error fetching suggestions:", error);
                toast("Could not fetch suggestions. Please try again later.");
            }
        }
        else {
            setSuggestions([]);
        }
    };
    // Handle Google login and fetch user profile on success
    const login = useGoogleLogin({
        onSuccess: (res) => getUserProfile(res),
        onError: (error) => {
            console.error(error);
            toast("Failed to login with Google. Please try again.");
        },
    });
    // Set selected suggestion and close the suggestions list
    const handleSuggestionClick = (description) => {
        setInput(description);
        setSelectedSuggestion(description);
        setSuggestions([]);
    };
    // Handle form submission after validating inputs
    const handleSubmit = async () => {
        const user = localStorage.getItem("user");
        if (!user) {
            setOpenDialog(true); // Open Google login dialog if user is not logged in
            return;
        }
        // Validate if all required fields are filled
        if (!selectedSuggestion || !days || !budget || !travelWith) {
            toast("Please fill in all fields.");
            return;
        }
        const formData = {
            destination: selectedSuggestion,
            days,
            budget,
            travelWith,
        };
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT.replace("{destination}", formData?.destination)
            .replace("{days}", formData?.days.toString()) // Ensure it's a string
            .replace("{travelWith}", formData?.travelWith)
            .replace("{budget}", formData?.budget);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());
        SaveAiTrip(result?.response?.text(), formData);
        toast("Event has been created.");
        setLoading(false);
    };
    // Save trip data to Firebase and navigate to the new trip page
    const SaveAiTrip = async (TripData, formData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const docId = Date.now().toString();
        let parsedTripData;
        try {
            parsedTripData = JSON.parse(TripData);
        }
        catch (error) {
            console.error("Failed to parse TripData:", error);
            toast("Invalid trip data.");
            setLoading(false);
            return;
        }
        try {
            // Save trip data to Firestore
            await setDoc(doc(db, "AITrips", docId), {
                userSelections: formData,
                TripData: parsedTripData,
                userEmail: user?.email,
                id: docId,
            });
            toast("Trip saved successfully!");
            navigate("/view-trip/" + docId);
        }
        catch (error) {
            console.error("Error saving trip:", error);
            toast("Failed to save trip.");
        }
        finally {
            setLoading(false);
        }
    };
    // Fetch user profile after Google login
    const getUserProfile = async (tokenInfo) => {
        try {
            const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept: "application/json",
                },
            });
            localStorage.setItem("user", JSON.stringify(res.data));
            setOpenDialog(false);
            await handleSubmit(); // Run after the profile is saved
        }
        catch (err) {
            console.error(err);
            toast("Failed to fetch user profile. Please try again.");
        }
    };
    return (_jsxs("div", { className: "px-5 mt-10 sm:px-10 md:px-32 lg:px-56 xl:px-72", children: [_jsx("h2", { className: "text-3xl font-bold", children: "Tell us your travel preferences \uD83C\uDFD5\uFE0F\u26F5" }), _jsx("p", { className: "mt-6 text-xl text-gray-700", children: "Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences." }), _jsxs("div", { className: "flex flex-col gap-6 mt-16", children: [_jsxs("div", { children: [_jsx("h2", { className: "my-3 text-xl font-medium", children: "What is your destination of choice?" }), _jsx(Input, { className: "w-full", type: "text", value: input, onChange: handleInputChange, placeholder: "Enter a place" }), _jsx("ul", { className: "bg-white border rounded-lg shadow-md", children: suggestions.map((suggestion, index) => (_jsx("li", { className: "p-2 cursor-pointer hover:bg-gray-100", onClick: () => handleSuggestionClick(suggestion.description), children: suggestion.description }, index))) })] }), _jsxs("div", { children: [_jsx("h2", { className: "my-3 text-xl font-medium", children: "How many days are you planning for the trip?" }), _jsx(Input, { placeholder: "Ex. 3", type: "number", value: days, onChange: (e) => {
                                    const newValue = Number(e.target.value);
                                    if (newValue >= 1) {
                                        setDays(newValue);
                                    }
                                }, min: "1", max: "5" })] }), _jsxs("div", { className: "mt-10", children: [_jsx("h2", { className: "my-3 text-xl font-medium", children: "What is your budget?" }), _jsx("div", { className: "grid grid-cols-3 gap-5 mt-5", children: SelectBudgetList.map((item) => (_jsxs("div", { onClick: () => setBudget(item.title), className: `p-6 mb-3 border rounded-lg cursor-pointer hover:shadow-lg ${budget === item.title ? "border-blue-500" : ""}`, children: [_jsx("h2", { className: "text-4xl", children: item.icon }), _jsx("h3", { className: "text-lg font-bold", children: item.title }), _jsx("p", { className: "text-sm text-gray-500", children: item.description })] }, item.id))) })] }), _jsxs("div", { className: "mt-10", children: [_jsx("h2", { className: "my-3 text-xl font-medium", children: "Who are you traveling with?" }), _jsx("div", { className: "grid grid-cols-3 gap-5 mt-5", children: SelectTravelLists.map((item) => (_jsxs("div", { onClick: () => setTravelWith(item.title), className: `p-6 mb-3 border rounded-lg cursor-pointer hover:shadow-lg ${travelWith === item.title ? "border-blue-500" : ""}`, children: [_jsx("h2", { className: "text-4xl", children: item.icon }), _jsx("h3", { className: "text-lg font-bold", children: item.title }), _jsx("p", { className: "text-sm text-gray-500", children: item.description })] }, item.id))) })] }), _jsx("div", { className: "flex justify-end my-10", children: _jsx(Button, { disabled: loading, onClick: handleSubmit, children: loading ? _jsx(Loader, { className: "w-7 h-7 animate-spin" }) : "Generate Trip" }) })] }), _jsx(Dialog, { open: openDialog, children: _jsxs(DialogContent, { className: "max-w-md", children: [_jsx("button", { onClick: () => setOpenDialog(false), className: "absolute p-1 text-gray-500 rounded-full top-3 right-3 hover:bg-gray-200", "aria-label": "Close", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs(DialogHeader, { className: "flex flex-col items-center", children: [_jsxs("div", { className: "flex items-center gap-3 mt-4", children: [_jsx("img", { src: "/forayaje-ai-trip.jpg", alt: "Forayaje AI Logo", className: "w-16 h-16 rounded-full ring-2 ring-primary" }), _jsx("h2", { className: "text-xl font-bold", children: "Forayaje AI Trip Planner" })] }), _jsx(DialogTitle, { className: "mt-6 text-lg font-bold", children: "Sign In With Google" })] }), _jsx(DialogDescription, { className: "mt-2 text-sm text-center text-muted-foreground", children: "Sign in to access personalized trip plans, itinerary suggestions, and more. Your account is safe and secure." }), _jsx("div", { className: "mt-6", children: _jsxs(Button, { className: "flex items-center justify-center w-full gap-2", onClick: () => { login(); }, children: [_jsx(UserCircle, { className: "w-5 h-5" }), "Sign In With Google"] }) })] }) })] }));
};
export default CreateTrip;
