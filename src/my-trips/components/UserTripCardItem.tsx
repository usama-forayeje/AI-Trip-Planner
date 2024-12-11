import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, DollarSign } from "lucide-react"; // Icons for better visual clarity

interface UserSelections {
  destination: string;
  days: number;
  budget: string;
  travelWith?: string;
}

interface Trip {
  id: string;
  photoUrl?: string;
  userSelections: UserSelections;
}

interface UserTripCardItemProps {
  trip: Trip;
  index: number;
}

function UserTripCardItem({ trip, index }: UserTripCardItemProps) {
  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="p-4 transition-all bg-white border border-gray-200 rounded-lg hover:scale-105 hover:shadow-lg">
        {/* Image Section */}
        <div className="relative w-full h-48">
          <img
            className="object-cover w-full h-full rounded-md"
            src={trip?.photoUrl || "/placeholder.jpg"} // Use a placeholder if photo URL is not provided
            alt={trip?.userSelections?.destination || "Trip Image"}
          />
          <span className="absolute px-3 py-1 text-xs font-semibold text-white bg-gray-800 rounded-md top-2 right-2 bg-opacity-70">
            #{index + 1}
          </span>
        </div>

        {/* Trip Details Section */}
        <div className="mt-3">
          {/* Destination */}
          <h2 className="text-xl font-bold text-gray-800 truncate">
            {trip?.userSelections?.destination || "Unknown Destination"}
          </h2>

          {/* Days and Budget */}
          <div className="mt-2 text-gray-600">
            <p className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              {trip?.userSelections?.days || "N/A"} Day Trip
            </p>
            <p className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-gray-500" />
              Budget: {trip?.userSelections?.budget || "N/A"}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-500" />
              Travel With: {trip?.userSelections?.travelWith || "N/A"}
            </p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="mt-4">
          <button
            className="w-full py-2 text-sm font-semibold text-center text-white bg-blue-500 rounded-md hover:bg-blue-600"
            aria-label={`View details of trip to ${trip?.userSelections?.destination}`}
          >
            View Trip Details
          </button>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
