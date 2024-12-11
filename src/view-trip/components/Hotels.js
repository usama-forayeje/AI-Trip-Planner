import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapPin, Star, DollarSign } from "lucide-react";
const Hotels = ({ tripData }) => {
    const hotels = tripData?.hotels || []; // Fallback to an empty array
    return (_jsxs("div", { className: "mt-10", children: [_jsx("h2", { className: "mb-8 text-3xl font-bold text-gray-800", children: "Hotel Recommendations" }), hotels.length === 0 ? (_jsx("p", { className: "text-center text-gray-500", children: "No hotels found for this trip." })) : (_jsx("div", { className: "grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3", children: hotels.map((item, index) => {
                    const hotelName = item?.hotelName || "Hotel Name";
                    const hotelAddress = item?.hotelAddress || "Hotel Address not available";
                    const imageUrl = item?.image || "/placeholder.jpg";
                    const priceRange = item?.priceRange || "Price not specified";
                    const rating = item?.rating !== undefined ? `${item.rating} Stars` : "Rating not available";
                    return (_jsxs("a", { href: `https://google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotelName}, ${hotelAddress}`)}`, target: "_blank", rel: "noopener noreferrer", className: "flex flex-col overflow-hidden transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:-translate-y-2", children: [_jsx("img", { src: imageUrl, alt: `Image of ${hotelName}`, className: "object-cover w-full h-48" }), _jsxs("div", { className: "flex flex-col justify-between flex-1 p-5", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 truncate", children: hotelName }), _jsxs("p", { className: "flex items-center mt-3 text-sm text-gray-600", children: [_jsx(MapPin, { className: "mr-3 text-blue-500 fill-blue-100", size: 20 }), _jsx("span", { className: "truncate", children: hotelAddress })] }), _jsxs("div", { className: "flex flex-col gap-3 mt-4", children: [_jsxs("p", { className: "flex items-center text-xs font-semibold text-green-700", children: [_jsx(DollarSign, { className: "mr-2 text-green-500 fill-green-100", size: 20 }), priceRange] }), _jsxs("p", { className: "flex items-center text-xs font-semibold text-yellow-600", children: [_jsx(Star, { className: "mr-2 text-yellow-400 fill-yellow-200", size: 20 }), rating] })] })] })] }, hotelName + index));
                }) }))] }));
};
export default Hotels;
