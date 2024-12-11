import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";
function ViewTrip() {
    const { id } = useParams();
    const [tripData, setTripData] = useState(null);
    const [loading, setLoading] = useState(true);
    const GetTripData = useCallback(async () => {
        if (!id)
            return;
        setLoading(true); // Show loader
        try {
            const docRef = doc(db, "AITrips", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data) {
                    // Validate if the data matches the TripData structure
                    const tripData = data;
                    setTripData(tripData);
                }
                else {
                    toast.error("No Trip Found");
                }
            }
            else {
                toast.error("No Trip Found");
            }
        }
        catch (error) {
            console.error("Error fetching trip data:", error);
            toast.error("Failed to fetch trip data.");
        }
        finally {
            setLoading(false); // Hide loader
        }
    }, [id]);
    useEffect(() => {
        GetTripData();
    }, [GetTripData]);
    if (loading) {
        return _jsx("div", { className: "flex items-center justify-center min-h-screen", children: "Loading..." });
    }
    if (!tripData) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("p", { className: "text-xl text-gray-600", children: "Trip not found. Please try again." }) }));
    }
    return (_jsxs("div", { className: "p-10 md:px-20 lg:px-44 xl:px-56", children: [_jsx(InfoSection, { tripData: tripData }), _jsx(Hotels, { tripData: tripData }), _jsx(PlacesToVisit, { tripData: tripData }), _jsx(Footer, {})] }));
}
export default ViewTrip;
