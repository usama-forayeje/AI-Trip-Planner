import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { db } from "@/service/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";
import Skeleton from "react-loading-skeleton"; // For loading effect
import "react-loading-skeleton/dist/skeleton.css";
function MyTrips() {
    const navigate = useNavigate();
    const [userTrip, setUserTrip] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    // Fetch user trips when the component mounts
    useEffect(() => {
        getUserTrip();
    }, []);
    // Fetching trips from Firestore based on user email
    const getUserTrip = async () => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user || !user.email) {
            navigate("/"); // Redirect to home if no user or email found
            return;
        }
        try {
            const q = query(collection(db, "AITrips"), where("userEmail", "==", user.email) // Get trips for the logged-in user
            );
            const querySnapshot = await getDocs(q);
            const trips = [];
            querySnapshot.forEach((doc) => {
                trips.push({ id: doc.id, ...doc.data() });
            });
            setUserTrip(trips); // Set user trips after fetching
        }
        catch (error) {
            console.error("Error fetching trips:", error); // Log any error
        }
        finally {
            setIsLoading(false); // Stop loading once the data is fetched
        }
    };
    return (_jsxs("div", { className: "px-5 sm:p-10 md:px-36 lg:px-56 xl:px-72", children: [_jsx("h2", { className: "text-3xl font-bold", children: "My Trips" }), _jsx("div", { className: "mt-10", children: isLoading ? (
                // Show loading skeletons while data is loading
                _jsx("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: [...Array(6)].map((_, index) => (_jsxs("div", { className: "p-4", children: [_jsx(Skeleton, { height: 200, className: "rounded-md" }), _jsx(Skeleton, { width: "80%", className: "mt-3" }), _jsx(Skeleton, { width: "60%" })] }, index))) })) : userTrip.length === 0 ? (
                // Show message if no trips exist
                _jsx("p", { children: "No trips found." })) : (
                // Render trip cards when trips are available
                _jsx("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: userTrip.map((trip, index) => (_jsx(UserTripCardItem, { trip: trip, index: index }, trip.id))) })) })] }));
}
export default MyTrips;
