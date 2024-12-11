import { jsx as _jsx } from "react/jsx-runtime";
import { Crown, DollarSign, Heart, Home, User, Users, Users2, Wallet } from "lucide-react";
export const SelectTravelLists = [
    {
        id: 1,
        title: "Just Me",
        description: "Travel alone, solo experience",
        icon: _jsx(User, { size: 24, className: "text-blue-500" }),
        people: 1
    },
    {
        id: 2,
        title: "Couple",
        description: "Perfect for couples or two-person trips",
        icon: _jsx(Heart, { size: 24, className: "text-red-500" }),
        people: 2
    },
    {
        id: 3,
        title: "Family",
        description: "Travel with family members",
        icon: _jsx(Home, { size: 24, className: "text-green-500" }),
        people: 4
    },
    {
        id: 4,
        title: "Friends",
        description: "Enjoy a trip with friends",
        icon: _jsx(Users, { size: 24, className: "text-purple-500" }),
        people: 5
    },
    {
        id: 5,
        title: "Group",
        description: "Plan for a larger group",
        icon: _jsx(Users2, { size: 24, className: "text-yellow-500" }),
        people: 10
    }
];
export const SelectBudgetList = [
    {
        id: 1,
        title: "Cheap",
        description: "Budget-friendly travel options",
        icon: _jsx(Wallet, { size: 24, className: "text-green-500" })
    },
    {
        id: 2,
        title: "Moderate",
        description: "Balanced travel with decent comfort",
        icon: _jsx(DollarSign, { size: 24, className: "text-blue-500" })
    },
    {
        id: 3,
        title: "Luxury",
        description: "High-end travel experience",
        icon: _jsx(Crown, { size: 24, className: "text-yellow-500" })
    }
];
export const AI_PROMPT = `
  Generate a Travel plan for location: {destination}  {days} travel plan for a {travelWith} visiting {destination} on a {budget}. Provide the following for each hotel option and each place in the itinerary:

Hotel options:

Hotel Name

Hotel Address

Price Range

Hotel Image URL (if available)

Geo Coordinates (if available)

Rating (if available)

Description

Daily itinerary with places to visit:

Place in $

Place Details

Place Image URL (if available)

Geo Coordinates (if available)

Ticket Pricing (if available)

Rating (if available)

Suggested Time to Spend

Best Time to Visit

give me data in json formate
`;
