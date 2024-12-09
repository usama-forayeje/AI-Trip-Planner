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
              {text: "generate a travel plan from location:  Las Vegas, for 3 days for couple with a cheap budget,\ngive me hotel options with hotel name , hotel address , price , hotel image URL and geo coordinates\nretting , descriptions and suggest itenerary with place name , place details , place image URL , \nGeocoordinates, ticket pricing, and time travel each of the location for of the 3 days with each day plan with best time to visit in json format"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "I cannot provide real-time pricing for hotels or attractions, nor can I access and display image URLs directly.  Hotel prices and availability fluctuate constantly.  Ticket prices also vary depending on the season and booking method.  However, I can give you a JSON template with the information you requested, which you can then populate with data from online travel agencies (like Expedia, Booking.com, Kayak) and Google Maps.  Remember to always verify pricing and availability on the official websites before booking.\n\n```json\n{\n  \"trip\": {\n    \"location\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"name\": \"Hotel Name 1 (Example: Circus Circus)\",\n      \"address\": \"Address 1 (Example: 2880 S Las Vegas Blvd, Las Vegas, NV 89109)\",\n      \"price_range\": \"$50-$100 per night (estimated)\", \n      \"image_url\": \"Replace with image URL from a hotel booking site\",\n      \"geocoordinates\": {\n        \"latitude\": 36.1215,\n        \"longitude\": -115.1739\n      }\n    },\n    {\n      \"name\": \"Hotel Name 2 (Example: Motel 6)\",\n      \"address\": \"Address 2\",\n      \"price_range\": \"$40-$80 per night (estimated)\",\n      \"image_url\": \"Replace with image URL\",\n      \"geocoordinates\": {\n        \"latitude\": \"Replace with latitude\",\n        \"longitude\": \"Replace with longitude\"\n      }\n    }\n    //Add more hotel options here\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"theme\": \"Free and budget-friendly exploration of the Strip\",\n      \"plan\": [\n        {\n          \"place\": \"The Strip (walking tour)\",\n          \"details\": \"Walk the length of the Strip, admiring the lights and architecture.  Look for free shows like the Bellagio fountains.\",\n          \"image_url\": \"Replace with image URL\",\n          \"geocoordinates\": {\n            \"latitude\": 36.1146,\n            \"longitude\": -115.1729\n          },\n          \"ticket_pricing\": \"Free\",\n          \"travel_time\": \"Variable, depending on how far you walk\"\n        },\n        {\n          \"place\": \"Bellagio Fountains\",\n          \"details\": \"Free show with choreographed water, music, and lights.\",\n          \"image_url\": \"Replace with image URL\",\n          \"geocoordinates\": {\n            \"latitude\": 36.1146,\n            \"longitude\": -115.1729\n          },\n          \"ticket_pricing\": \"Free\",\n          \"travel_time\": \"Short walk from other Strip locations\"\n        },\n          {\n          \"place\": \"Fremont Street Experience (Evening)\",\n          \"details\": \"Free light and sound show under a canopy of LED lights.\",\n          \"image_url\": \"Replace with image URL\",\n          \"geocoordinates\": {\n            \"latitude\": 36.1699,\n            \"longitude\": -115.1402\n          },\n          \"ticket_pricing\": \"Free\",\n          \"travel_time\": \"Travel time by taxi or ride-sharing service (check for costs).\"\n        }\n      ],\n      \"best_time_to_visit\": \"Late afternoon/evening to see the lights\"\n    },\n    \"day2\": {\n      \"theme\": \"Outdoor Activities and Nature\",\n      \"plan\": [\n        {\n          \"place\": \"Red Rock Canyon National Conservation Area\",\n          \"details\": \"Stunning desert landscape with hiking trails (various difficulty levels).\",\n          \"image_url\": \"Replace with image URL\",\n          \"geocoordinates\": {\n            \"latitude\": 36.2072,\n            \"longitude\": -115.8640\n          },\n          \"ticket_pricing\": \"Entrance fee applies (check the National Park Service website)\",\n          \"travel_time\": \"30-45 minute drive from the Strip\"\n        }\n          // Add other outdoor activities, like a hike or a visit to a park.\n      ],\n      \"best_time_to_visit\": \"Morning to avoid the midday heat\"\n    },\n    \"day3\": {\n      \"theme\": \"Budget-Friendly Entertainment\",\n      \"plan\": [\n        {\n          \"place\": \"Free museums or attractions\",\n          \"details\": \"Research free museums or exhibits offered by various casinos or institutions.  Check websites for availability.\",\n          \"image_url\": \"Replace with image URL\",\n          \"geocoordinates\": \"Variable, depending on what you find\",\n          \"ticket_pricing\": \"Free (mostly)\",\n          \"travel_time\": \"Variable\"\n        },\n        {\n          \"place\": \"Happy hour deals\",\n          \"details\": \"Many casinos offer happy hour specials with discounted drinks and appetizers.\",\n          \"image_url\": \"Replace with image URL\",\n          \"geocoordinates\": \"Variable\",\n          \"ticket_pricing\": \"Variable\",\n          \"travel_time\": \"Variable\"\n        }\n          // Add more budget-friendly activities, like street performers or exploring less touristy areas.\n      ],\n      \"best_time_to_visit\": \"Afternoon or evening, depending on the chosen activities\"\n    }\n  }\n}\n```\n\n\nRemember to replace the placeholder values with actual information you find online.  This structured JSON will help you plan and track your trip efficiently.  Enjoy your Vegas trip!\n"},
            ],
          },
        ],
      });
      
       
      
      
    