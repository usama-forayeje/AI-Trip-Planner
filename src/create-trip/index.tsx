import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetList, SelectTravelLists } from "@/constans/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";

interface Suggestion {
  description: string;
  place_id: string;
}

const CreateTrip: React.FC = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");
  const [days, setDays] = useState<number | "">("");
  const [budget, setBudget] = useState<string>("");
  const [travelWith, setTravelWith] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  // Handle input change and fetch suggestions
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
        toast("Could not fetch suggestions. Please try again later.");
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (description: string) => {
    setInput(description);
    setSelectedSuggestion(description);
    setSuggestions([]);
  };

  // Handle form submission
  const handleSubmit = async () => {

    const user:string | null = localStorage.getItem("user");
    if(!user){
      setOpenDialog(true)
      return;
    }
    
    if (!selectedSuggestion || !days || !budget || !travelWith) {
      toast("Please fill in all fields.");
      return;
    }

    const formData = {
      destination: selectedSuggestion,
      days,
      budget,
      travelWith,
    };

    const FINAL_PROMPT = AI_PROMPT
      .replace("{destination}", formData.destination)
      .replace("{days}", formData.days.toString()) // Ensure it's a string
      .replace("{travelWith}", formData.travelWith)
      .replace("{budget}", formData.budget);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    toast("Event has been created.");
  };

  return (
    <div className="px-5 mt-10 sm:px-10 md:px-32 lg:px-56 xl:px-72">
      <h2 className="text-3xl font-bold">
        Tell us your travel preferences 🏕️⛵
      </h2>
      <p className="mt-6 text-xl text-gray-700">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="flex flex-col gap-6 mt-16">
        {/* Destination Input */}
        <div>
          <h2 className="my-3 text-xl font-medium">
            What is your destination of choice?
          </h2>
          <Input
            className="w-full"
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter a place"
          />
          <ul className="bg-white border rounded-lg shadow-md">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(suggestion.description)}
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Days Input */}
        <div>
          <h2 className="my-3 text-xl font-medium">
            How many days are you planning for the trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            value={days}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              if (newValue >= 1) {
                setDays(newValue);
              }
            }}
            min="1"
            max="5"
          />
        </div>

        {/* Budget Selection */}
        <div className="mt-10">
          <h2 className="my-3 text-xl font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetList.map((item) => (
              <div
                key={item.id}
                onClick={() => setBudget(item.title)}
                className={`p-6 mb-3 border rounded-lg cursor-pointer hover:shadow-lg ${
                  budget === item.title ? "border-blue-500" : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel With Selection */}
        <div className="mt-10">
          <h2 className="my-3 text-xl font-medium">
            Who are you traveling with?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelLists.map((item) => (
              <div
                key={item.id}
                onClick={() => setTravelWith(item.title)}
                className={`p-6 mb-3 border rounded-lg cursor-pointer hover:shadow-lg ${
                  travelWith === item.title ? "border-blue-500" : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end my-10">
          <Button onClick={handleSubmit}>Generate Trip</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
