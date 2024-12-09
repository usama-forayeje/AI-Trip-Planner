
import { Crown, DollarSign,Heart,Home,User,Users,Users2,Wallet } from "lucide-react";


interface TravelList {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    people: number
  }
  export const SelectTravelLists: TravelList[] = [
    {
      id: 1,
      title: "Just Me",
      description: "Travel alone, solo experience",
      icon: <User size={24} className="text-blue-500" />,
      people: 1
    },
    {
      id: 2,
      title: "Couple",
      description: "Perfect for couples or two-person trips",
      icon: <Heart size={24} className="text-red-500" />,
      people: 2
    },
    {
      id: 3,
      title: "Family",
      description: "Travel with family members",
      icon: <Home size={24} className="text-green-500" />,
      people: 4
    },
    {
      id: 4,
      title: "Friends",
      description: "Enjoy a trip with friends",
      icon: <Users size={24} className="text-purple-500" />,
      people: 5
    },
    {
      id: 5,
      title: "Group",
      description: "Plan for a larger group",
      icon: <Users2 size={24} className="text-yellow-500" />,
      people: 10
    }
  ];

interface BudgetItem {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
  }
export  const SelectBudgetList: BudgetItem[] = [
    {
      id: 1,
      title: "Cheap",
      description: "Budget-friendly travel options",
      icon: <Wallet size={24} className="text-green-500" />
    },
    {
      id: 2,
      title: "Moderate",
      description: "Balanced travel with decent comfort",
      icon: <DollarSign size={24} className="text-blue-500" />
    },
    {
      id: 3,
      title: "Luxury",
      description: "High-end travel experience",
      icon: <Crown size={24} className="text-yellow-500" />
    }
  ];


  export const AI_PROMPT = `generate a travel plan from location: {destination} Las Vegas, for {days} for {travelWith} with a {budget} budget,
  give me hotel options with hotel name , hotel address , price , hotel image URL and geo coordinates
  rating , descriptions and suggest itinerary with place name , place details , place image URL , 
  Geocoordinates, ticket pricing, and time travel each of the location for of the 3 days with each day plan with best time to visit in json format`;
  