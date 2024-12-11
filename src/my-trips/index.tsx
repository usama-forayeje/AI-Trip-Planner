import { db } from "@/service/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";
import Skeleton from "react-loading-skeleton"; // For loading effect
import "react-loading-skeleton/dist/skeleton.css";

// Define the types for the trips
interface UserSelections {
  destination: string;
  days: number;
  budget: string;
  travelWith?: string;
}

interface Trip {
  id: string;
  userSelections: UserSelections;
  photoUrl?: string;
  [key: string]: any; // Allow for extra fields
}

function MyTrips(): JSX.Element {
  const navigate = useNavigate();
  const [userTrip, setUserTrip] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

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
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user.email) // Get trips for the logged-in user
      );
      const querySnapshot = await getDocs(q);

      const trips: Trip[] = [];
      querySnapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() } as Trip);
      });

      setUserTrip(trips); // Set user trips after fetching
    } catch (error) {
      console.error("Error fetching trips:", error); // Log any error
    } finally {
      setIsLoading(false); // Stop loading once the data is fetched
    }
  };

  return (
    <div className="px-5 sm:p-10 md:px-36 lg:px-56 xl:px-72">
      <h2 className="text-3xl font-bold">My Trips</h2>

      <div className="mt-10">
        {isLoading ? (
          // Show loading skeletons while data is loading
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="p-4">
                <Skeleton height={200} className="rounded-md" />
                <Skeleton width="80%" className="mt-3" />
                <Skeleton width="60%" />
              </div>
            ))}
          </div>
        ) : userTrip.length === 0 ? (
          // Show message if no trips exist
          <p>No trips found.</p>
        ) : (
          // Render trip cards when trips are available
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {userTrip.map((trip, index) => (
              <UserTripCardItem key={trip.id} trip={trip} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
