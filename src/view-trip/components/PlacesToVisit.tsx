import React from "react";
import { MapPin, DollarSign, Timer } from "lucide-react";

type ItineraryDay = {
  placeName?: string;
  placeDetails?: string;
  ticketPricing?: string;
  bestTime?: string;
  suggestedTime?: string;
  geoCoordinates?: {
    latitude: number;
    longitude: number;
  };
};

type TripData = {
  itinerary?: {
    [day: string]: ItineraryDay[];
  };
};

type PlacesToVisitProps = {
  tripData: TripData; // Updated this to expect `tripData` as a direct prop.
};

const PlacesToVisit: React.FC<PlacesToVisitProps> = ({ tripData }) => {
  const itinerary = tripData.itinerary;

  return (
    <div className="mt-10">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Places to Visit</h2>
      <div className="space-y-10">
        {Object.keys(itinerary || {})
          .sort((a, b) => parseInt(a.replace("day", "")) - parseInt(b.replace("day", ""))) // Sorting days numerically
          .map((dayKey, index) => {
            const dayPlan = itinerary?.[dayKey];

            return (
              <div
                key={index}
                className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow"
              >
                {/* Day Header */}
                <h3 className="text-2xl font-bold text-gray-900">
                  {`Day ${parseInt(dayKey.replace("day", ""))}`}
                </h3>

                {/* Plan List */}
                <div className="flex flex-col gap-6 mt-5">
                  {dayPlan?.map((planItem, idx) => {
                    const {
                      placeName,
                      placeDetails,
                      ticketPricing,
                      bestTime,
                      suggestedTime,
                      geoCoordinates,
                    } = planItem || {};

                    const placeUrl = geoCoordinates
                      ? `https://google.com/maps/search/?api=1&query=${encodeURIComponent(
                          placeName || ""
                        )}&query_place_id=${geoCoordinates.latitude},${geoCoordinates.longitude}`
                      : "#";

                    return (
                      <a
                        key={idx}
                        href={placeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-4 transition-all duration-300 rounded-lg shadow-md cursor-pointer bg-gray-50 hover:shadow-xl sm:flex-row hover:-translate-y-1"
                      >
                        {/* Image */}
                        <img
                          src={"/placeholder.jpg"}
                          alt={placeName || "Place"}
                          className="object-cover w-full h-32 rounded-lg sm:w-40 sm:h-32 lg:w-48 lg:h-48"
                        />

                        {/* Details */}
                        <div className="mt-4 sm:mt-0 sm:ml-4">
                          <h4 className="text-lg font-bold text-gray-800 truncate">
                            {placeName || "Place Name"}
                          </h4>
                          <p className="mt-2 text-sm text-gray-600">
                            {placeDetails || "Details not available"}
                          </p>
                          <p className="flex items-center mt-2 text-sm text-gray-800">
                            <DollarSign className="mr-2 text-green-600" />{" "}
                            <span className="font-semibold text-gray-700">Price:</span>{" "}
                            {ticketPricing || "N/A"}
                          </p>
                          <p className="flex items-center mt-2 text-sm text-gray-800">
                            <MapPin className="mr-2 text-blue-500" />{" "}
                            <span className="font-semibold text-gray-700">Best Time To Visit:</span>{" "}
                            {bestTime || "N/A"}
                          </p>
                          <p className="flex items-center mt-2 text-sm text-gray-800">
                            <Timer className="mr-2 text-blue-500" />{" "}
                            <span className="font-semibold text-gray-700">Suggested Time:</span>{" "}
                            {suggestedTime || "N/A"}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlacesToVisit;
