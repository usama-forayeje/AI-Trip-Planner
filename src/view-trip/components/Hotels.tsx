import React from "react";
import { MapPin, Star, DollarSign } from "lucide-react";

// Define the types for the props and hotel data
type Hotel = {
  hotelName?: string;
  hotelAddress?: string;
  priceRange?: string;
  image?: string;
  rating?: number;
};

type TripData = {
  hotels?: Hotel[];
};

type HotelsProps = {
  tripData: TripData; // Corrected here
};

const Hotels: React.FC<HotelsProps> = ({ tripData }) => {
  const hotels = tripData?.hotels || []; // Fallback to an empty array

  return (
    <div className="mt-10">
      <h2 className="mb-8 text-3xl font-bold text-gray-800">Hotel Recommendations</h2>

      {hotels.length === 0 ? (
        <p className="text-center text-gray-500">No hotels found for this trip.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
          {hotels.map((item, index) => {
            const hotelName = item?.hotelName || "Hotel Name";
            const hotelAddress = item?.hotelAddress || "Hotel Address not available";
            const imageUrl = item?.image || "/placeholder.jpg";
            const priceRange = item?.priceRange || "Price not specified";
            const rating = item?.rating !== undefined ? `${item.rating} Stars` : "Rating not available";

            return (
              <a
                key={hotelName + index}  // Unique key based on hotelName and index
                href={`https://google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${hotelName}, ${hotelAddress}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col overflow-hidden transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:-translate-y-2"
              >
                {/* Hotel Image */}
                <img
                  src={imageUrl}
                  alt={`Image of ${hotelName}`}
                  className="object-cover w-full h-48"
                />

                {/* Hotel Details */}
                <div className="flex flex-col justify-between flex-1 p-5">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{hotelName}</h3>

                  {/* Address Section */}
                  <p className="flex items-center mt-3 text-sm text-gray-600">
                    <MapPin className="mr-3 text-blue-500 fill-blue-100" size={20} />
                    <span className="truncate">{hotelAddress}</span>
                  </p>

                  {/* Price and Rating Section */}
                  <div className="flex flex-col gap-3 mt-4">
                    <p className="flex items-center text-xs font-semibold text-green-700">
                      <DollarSign className="mr-2 text-green-500 fill-green-100" size={20} />
                      {priceRange}
                    </p>
                    <p className="flex items-center text-xs font-semibold text-yellow-600">
                      <Star className="mr-2 text-yellow-400 fill-yellow-200" size={20} />
                      {rating}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Hotels;
