import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

interface UserSelections {
  destination: string;
  days: number;
  budget: string;
  travelWith: string;
}

interface ItineraryDay {
  placeName?: string;
  placeDetails?: string;
  ticketPricing?: string;
  bestTime?: string;
  suggestedTime?: string;
  geoCoordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface Hotel {
  hotelName: string;
  hotelAddress: string;
  image: string;
  priceRange: string;
  rating: string;
}

interface TripData {
  userSelections: UserSelections;
  itinerary: Record<string, ItineraryDay[]>; // Ensure this is a Record with itinerary data
  hotels: Hotel[]; // Correctly defined Hotel[] type
  userEmail: string;
  id: string;
}

function ViewTrip() {
  const { id } = useParams();
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const GetTripData = useCallback(async () => {
    if (!id) return;

    setLoading(true); // Show loader
    try {
      const docRef = doc(db, "AITrips", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as TripData;
        setTripData(data);
      } else {
        toast.error("No Trip Found");
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
      toast.error("Failed to fetch trip data.");
    } finally {
      setLoading(false); // Hide loader
    }
  }, [id]);

  useEffect(() => {
    GetTripData();
  }, [GetTripData]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!tripData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Trip not found. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection tripData={tripData} />
      {/* Recommended Hotels */}
      <Hotels tripData={tripData} />
      {/* Daily Plan */}
      <PlacesToVisit tripData={tripData} />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ViewTrip;
