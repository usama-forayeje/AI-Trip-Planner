import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";

interface Suggestion {
  description: string;
  place_id: string;
}

const CreateTrip: React.FC = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const userInput = event.target.value;
    setInput(userInput);

    if (userInput.length > 2) {
      try {
        const response = await axios.get(
          "https://maps.gomaps.pro/maps/api/place/autocomplete/json",
          {
            params: {
              input: userInput,
              key: "AlzaSyi-F5cbWoQfNK-GNXLMcLNvF7DMKadAv3J",
            },
          }
        );
        setSuggestions(response.data.predictions || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <>
      <div className="px-5 mt-10 sm:px-10 md:px-32 lg:px-56 xl:px-72">
        <h2 className="text-3xl font-bold ">Tell us your travel preferences</h2>
        <p className="mt-6 tex-gray-500 tex8t-xl">
          Just provide some basic information , and our trip planner will
          generate a castomized itinerary based on your preferences
        </p>
        <div className="flex flex-col gap-6 mt-16">
          <div>
            <h2 className="my-3 text-xl font-medium">
              What is destination of choice?.
            </h2>
            <Input
              className="w-full "
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter a place"
            />
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion.description}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="my-3 text-xl font-medium">
              How many days are your planing trip?
            </h2>
            <Input placeholder={"Ex.3"} type="number" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTrip;
