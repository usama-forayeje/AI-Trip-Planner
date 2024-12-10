import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";

interface TripData {
    userSelections: {
        destination: string;
        days: number;
        budget: string;
        travelWith: string;
    };
    TripData: any; // Adjust as needed
    userEmail: string;
    id: string;
}

function ViewTrip() {
    const { id } = useParams();
    const [tripData, setTripData] = useState<TripData | null>(null);

    useEffect(() => {
        if (id) {
            GetTripData();
        }
    }, [id]);

    const GetTripData = async () => {
        try {
            const docRef = doc(db, "AITrips", id as string);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data() as TripData;
                setTripData(data);
            } else {
                toast("No Trip Found");
            }
        } catch (error) {
            console.error("Error fetching trip data:", error);
            toast("Failed to fetch trip data.");
        }
    };

    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            {/* Information Section */}
                <InfoSection tripData={tripData}/>
            {/* Recommended Hotels */}

            {/* Daily Plane */}

            {/* Footer */}
        </div>
    );
}

export default ViewTrip;
