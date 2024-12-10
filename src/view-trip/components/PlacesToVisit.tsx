import { MapPin, Clock, DollarSign } from "lucide-react";

function PlacesToVisit({ tripData }) {
  const itinerary = tripData?.TripData?.itinerary;

  return (
    <div className="mt-10">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Places to Visit</h2>
      <div className="space-y-10">
        {Object.keys(itinerary || {})
          .sort((a, b) => parseInt(a.replace("day", "")) - parseInt(b.replace("day", ""))) // Sorting days numerically
          .map((dayKey, index) => {
            const dayPlan = itinerary[dayKey];

            return (
              <div
                key={index}
                className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow "
              >
                {/* Day Header */}
                <h3 className="text-2xl font-bold text-gray-900">
                  {`Day ${parseInt(dayKey.replace("day", ""))}`}
                </h3>
                <p className="mt-2 text-sm font-semibold text-gray-600">
                  <span className="text-blue-500">Theme:</span> {dayPlan?.theme || "No theme specified"}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <Clock className="inline-block w-4 h-4 mr-1 text-blue-500" />
                  Best Time: {dayPlan?.best_time_to_visit || "N/A"}
                </p>

                {/* Plan List */}
                <div className="flex flex-col gap-6 mt-5">
                  {dayPlan?.plan?.map((planItem, idx) => (
                    <a
                      key={idx}
                      href={`https://google.com/maps/search/?api=1&query=${encodeURIComponent(
                        planItem?.place || ""
                      )}&query_place_id=${planItem?.geocoordinates?.latitude},${planItem?.geocoordinates?.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 transition-all duration-300 rounded-lg shadow-md cursor-pointer bg-gray-50 hover:shadow-xl sm:flex-row hover:-translate-y-1"
                    >
                      <img
                        src={"/placeholder.jpg"}
                        alt={planItem?.place || "Place"}
                        className="object-cover w-full rounded-lg h-25 sm:w-40 sm:h-32 lg:w-48 lg:h-48"
                      />
                      <div className="mt-4 sm:mt-0 sm:ml-4">
                        <h4 className="text-lg font-bold text-gray-800 truncate">
                          {planItem?.place || "Place Name"}
                        </h4>
                        <p className="mt-2 text-sm text-gray-600 truncate">{planItem?.details || "Details not available"}</p>
                        <p className="flex items-center mt-2 text-sm text-gray-800">
                          <DollarSign className="mr-2 text-green-600" />{" "}
                          <span className="font-semibold text-gray-700">Price:</span>{" "}
                          {planItem?.ticket_pricing || "N/A"}
                        </p>
                        <p className="flex items-center mt-2 text-sm text-gray-800">
                          <MapPin className="mr-2 text-blue-500" />{" "}
                          <span className="font-semibold text-gray-700 truncate">Travel Time:</span>{" "}
                          {planItem?.travel_time || "N/A"}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
