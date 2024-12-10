import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

function InfoSection({ tripData }) {
  console.log(tripData);

  return (
    <div>
      <img
        className="h-[340px] w-full rounded-xl object-cover"
        src="/placeholder.jpg"
        alt="image"
      />
      <div className="flex items-baseline justify-between">
        <div className="flex flex-col gap-2 my-7">
          <h2 className="text-2xl font-bold ">
            {tripData?.userSelections?.destination}
          </h2>
          <div className="flex gap-5 my-3">
            <h2 className="p-1 px-3 text-xs text-gray-500 bg-gray-200 rounded-full md:text-lg">
              {tripData?.userSelections?.days} Day
            </h2>
            <h2 className="p-1 px-3 text-xs text-gray-500 bg-gray-200 rounded-full md:text-lg">
              {tripData?.userSelections?.budge} Budge
            </h2>
            <h2 className="p-1 px-3 text-xs text-gray-500 bg-gray-200 rounded-full md:text-lg">
              Travel With: {tripData?.userSelections?.travelWith}
            </h2>
          </div>
        </div>
        <Button>
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
