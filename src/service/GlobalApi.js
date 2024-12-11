const BASE_URL = "https://maps.gomaps.pro/maps/api/place/textsearch/json";
// API Key সহ config সেট করা
const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`, // Replace with your actual API Key
    },
};
// Function to generate photo URL
function getPhotoUrl(photoReference) {
    return `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
}
async function searchPlaces(query) {
    try {
        const response = await fetch(`${BASE_URL}?query=${query}`, {
            method: 'GET',
            headers: config.headers, // headers directly passed here
        });
        const data = await response.json();
        // Process and filter data
        const places = data.results.map((place) => {
            return {
                name: place.name,
                id: place.place_id,
                photo: place.photos ? getPhotoUrl(place.photos[0].photo_reference) : "/placeholder.jpg",
            };
        });
        console.log("Filtered Places:", places);
        return places; // Return processed places
    }
    catch (error) {
        console.error("Error fetching places:", error);
    }
}
// Example Usage (for testing)
searchPlaces("restaurants in Dhaka").then(console.log);
export {};
