import { GoogleGenerativeAI } from "@google/generative-ai";

      
      const apiKey = import.meta.env.VITE_GEMINI_AI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      };
      
    
    export  const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {text: "  Generate a Travel plan for location:  3-day travel plan for a couple visiting Las Vegas on a budget. Provide the following for each hotel option and each place in the itinerary:\n\nHotel options:\n\nHotel Name\n\nHotel Address\n\nPrice Range\n\nHotel Image URL (if available)\n\nGeo Coordinates (if available)\n\nRating (if available)\n\nDescription\n\nDaily itinerary with places to visit:\n\nPlace Name\n\nPlace Details\n\nPlace Image URL (if available)\n\nGeo Coordinates (if available)\n\nTicket Pricing (if available)\n\nRating (if available)\n\nSuggested Time to Spend\n\nBest Time to Visit\ngive me data in json formate"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "```json\n{\n  \"tripName\": \"Las Vegas Budget Trip for Couples (3 Days)\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"priceRange\": \"$50-$150/night\",\n      \"hotelImageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/CircusCircusLasVegas.jpg/1280px-CircusCircusLasVegas.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1202,\n        \"longitude\": -115.1726\n      },\n      \"rating\": 3.5,\n      \"description\": \"A classic Vegas hotel with a circus theme, offering affordable rooms and family-friendly entertainment.  May be a bit dated but offers good value.\"\n    },\n    {\n      \"hotelName\": \"The LINQ Hotel + Experience\",\n      \"hotelAddress\": \"3545 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"priceRange\": \"$100-$200/night\",\n      \"hotelImageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/The_LINQ_Hotel_%26_Experience.jpg/1280px-The_LINQ_Hotel_%26_Experience.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1266,\n        \"longitude\": -115.1717\n      },\n      \"rating\": 4.0,\n      \"description\": \"Modern hotel with a central location on the Strip, offering a variety of amenities and access to the High Roller Observation Wheel.\"\n    },\n    {\n      \"hotelName\": \"Excalibur Hotel & Casino\",\n      \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"priceRange\": \"$60-$180/night\",\n      \"hotelImageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Excalibur_Hotel_and_Casino_Las_Vegas.jpg/1280px-Excalibur_Hotel_and_Casino_Las_Vegas.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.0905,\n        \"longitude\": -115.1748\n      },\n      \"rating\": 3.7,\n      \"description\": \"A themed hotel with a medieval castle design, offering reasonably priced rooms and various entertainment options.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"A pedestrian mall with a massive video screen canopy, street performers, and various shops and restaurants.\",\n        \"placeImageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Fremont_Street_Experience_at_night.jpg/1280px-Fremont_Street_Experience_at_night.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1699,\n          \"longitude\": -115.1403\n        },\n        \"ticketPricing\": \"Free (some shows may have costs)\",\n        \"rating\": 4.2,\n        \"suggestedTime\": \"3-4 hours\",\n        \"bestTime\": \"Evening\"\n      },\n      {\n        \"placeName\": \"Neon Museum\",\n        \"placeDetails\": \"An outdoor museum showcasing vintage Las Vegas signs.\",\n        \"placeImageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Neon_Museum_Las_Vegas.jpg/1280px-Neon_Museum_Las_Vegas.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1751,\n          \"longitude\": -115.1331\n        },\n        \"ticketPricing\": \"$25-$35\",\n        \"rating\": 4.5,\n        \"suggestedTime\": \"1.5-2 hours\",\n        \"bestTime\": \"Late afternoon/early evening\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"The Strip\",\n        \"placeDetails\": \"Walk the iconic Las Vegas Strip, explore casinos, and admire the extravagant hotels.\",\n        \"placeImageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Las_Vegas_Strip_Panorama.jpg/1280px-Las_Vegas_Strip_Panorama.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1146,\n          \"longitude\": -115.1729\n        },\n        \"ticketPricing\": \"Free (casino entry, shows, etc. are extra)\",\n        \"rating\": 5,\n        \"suggestedTime\": \"Full Day\",\n        \"bestTime\": \"Anytime\"\n      },\n      {\n        \"placeName\": \"Bellagio Fountains\",\n        \"placeDetails\": \"Free water show with music and lights.\",\n        \"placeImageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Bellagio_Fountains_Night.jpg/1280px-Bellagio_Fountains_Night.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1162,\n          \"longitude\": -115.1745\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.8,\n        \"suggestedTime\": \"30 minutes - 1 hour (depending on show times)\",\n        \"bestTime\": \"Evening\"\n      }\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Red Rock Canyon National Conservation Area\",\n        \"placeDetails\": \"Beautiful scenic drive and hiking trails outside the city.\",\n        \"placeImageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Red_Rock_Canyon_Nevada.jpg/1280px-Red_Rock_Canyon_Nevada.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.2050,\n          \"longitude\": -115.6926\n        },\n        \"ticketPricing\": \"$15 per vehicle\",\n        \"rating\": 4.6,\n        \"suggestedTime\": \"Half-day\",\n        \"bestTime\": \"Morning or late afternoon to avoid heat\"\n      },\n\n      {\n        \"placeName\": \"Seven Magic Mountains\",\n        \"placeDetails\": \"Art installation of colorful stacked boulders.\",\n        \"placeImageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Seven_Magic_Mountains_%28cropped%29.jpg/1280px-Seven_Magic_Mountains_%28cropped%29.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.0589,\n          \"longitude\": -114.9849\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.4,\n        \"suggestedTime\": \"30-60 minutes\",\n        \"bestTime\": \"Anytime, but sunset is particularly good for photos.\"\n      }\n\n    ]\n  }\n}\n```\n**Note:**  Image URLs are examples and may change.  Geo-coordinates are approximate.  Pricing and ratings are subject to change and should be verified before your trip.  Consider using Google Maps or other mapping services for precise directions and updated information. Remember to factor in transportation costs within your budget.  This itinerary can be adjusted to fit your interests and preferences.  Also, always check official websites for the most up-to-date information on pricing and availability.\n"},
            ],
          },
        ],
      });
      
       
      
      
    
      
    
      
    