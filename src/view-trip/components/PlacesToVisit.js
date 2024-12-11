import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapPin, DollarSign, Timer } from "lucide-react";
function PlacesToVisit({ tripData }) {
    const itinerary = tripData?.TripData?.itinerary;
    return (_jsxs("div", { className: "mt-10", children: [_jsx("h2", { className: "mb-8 text-3xl font-bold text-center text-gray-800", children: "Places to Visit" }), _jsx("div", { className: "space-y-10", children: Object.keys(itinerary || {})
                    .sort((a, b) => parseInt(a.replace("day", "")) - parseInt(b.replace("day", ""))) // Sorting days numerically
                    .map((dayKey, index) => {
                    const dayPlan = itinerary?.[dayKey];
                    return (_jsxs("div", { className: "p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow", children: [_jsx("h3", { className: "text-2xl font-bold text-gray-900", children: `Day ${parseInt(dayKey.replace("day", ""))}` }), _jsx("div", { className: "flex flex-col gap-6 mt-5", children: dayPlan?.map((planItem, idx) => {
                                    const { placeName, placeDetails, ticketPricing, bestTime, suggestedTime, geoCoordinates, } = planItem || {};
                                    const placeUrl = geoCoordinates
                                        ? `https://google.com/maps/search/?api=1&query=${encodeURIComponent(placeName || "")}&query_place_id=${geoCoordinates.latitude},${geoCoordinates.longitude}`
                                        : "#";
                                    return (_jsxs("a", { href: placeUrl, target: "_blank", rel: "noopener noreferrer", className: "flex flex-col items-center p-4 transition-all duration-300 rounded-lg shadow-md cursor-pointer bg-gray-50 hover:shadow-xl sm:flex-row hover:-translate-y-1", children: [_jsx("img", { src: "/placeholder.jpg", alt: placeName || "Place", className: "object-cover w-full h-32 rounded-lg sm:w-40 sm:h-32 lg:w-48 lg:h-48" }), _jsxs("div", { className: "mt-4 sm:mt-0 sm:ml-4", children: [_jsx("h4", { className: "text-lg font-bold text-gray-800 truncate", children: placeName || "Place Name" }), _jsx("p", { className: "mt-2 text-sm text-gray-600", children: placeDetails || "Details not available" }), _jsxs("p", { className: "flex items-center mt-2 text-sm text-gray-800", children: [_jsx(DollarSign, { className: "mr-2 text-green-600" }), " ", _jsx("span", { className: "font-semibold text-gray-700", children: "Price:" }), " ", ticketPricing || "N/A"] }), _jsxs("p", { className: "flex items-center mt-2 text-sm text-gray-800", children: [_jsx(MapPin, { className: "mr-2 text-blue-500" }), " ", _jsx("span", { className: "font-semibold text-gray-700", children: "Best Time To Visit:" }), " ", bestTime || "N/A"] }), _jsxs("p", { className: "flex items-center mt-2 text-sm text-gray-800", children: [_jsx(Timer, { className: "mr-2 text-blue-500" }), " ", _jsx("span", { className: "font-semibold text-gray-700", children: "Suggested Time:" }), " ", suggestedTime || "N/A"] })] })] }, idx));
                                }) })] }, index));
                }) })] }));
}
export default PlacesToVisit;
