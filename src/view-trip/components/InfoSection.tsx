import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

type UserSelections = {
  destination?: string;
  days?: string | number;
  budget?: string;
  travelWith?: string;
};

type InfoSectionProps = {
  tripData: {
    userSelections?: UserSelections;
  };
};

function InfoSection({ tripData }: InfoSectionProps) {
  console.log(tripData);

  return (
    <div>
      {/* Placeholder Image */}
      <img
        className="h-[340px] w-full rounded-xl object-cover"
        src="/placeholder.jpg"
        alt="image"
      />

      {/* Info Section */}
      <div className="flex items-baseline justify-between">
        <div className="flex flex-col gap-2 my-7">
          {/* Destination */}
          <h2 className="text-2xl font-bold">
            {tripData?.userSelections?.destination || "Unknown Destination"}
          </h2>

          {/* Travel Details */}
          <div className="flex gap-5 my-3">
            <h2 className="p-1 px-3 text-xs text-gray-500 bg-gray-200 rounded-full md:text-lg">
              {tripData?.userSelections?.days
                ? `${tripData.userSelections.days} Day`
                : "Duration Unknown"}
            </h2>
            <h2 className="p-1 px-3 text-xs text-gray-500 bg-gray-200 rounded-full md:text-lg">
              {tripData?.userSelections?.budget || "Budget Unknown"}
            </h2>
            <h2 className="p-1 px-3 text-xs text-gray-500 bg-gray-200 rounded-full md:text-lg">
              Travel With: {tripData?.userSelections?.travelWith || "Unknown"}
            </h2>
          </div>
        </div>

        {/* Send Button */}
        <Button>
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
