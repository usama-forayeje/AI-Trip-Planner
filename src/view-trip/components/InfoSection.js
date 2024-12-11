import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
function InfoSection({ tripData }) {
    console.log(tripData);
    return (_jsxs("div", { children: [_jsx("img", { className: "h-[340px] w-full rounded-xl object-cover", src: "/placeholder.jpg", alt: "image" }), _jsxs("div", { className: "flex items-baseline justify-between", children: [_jsxs("div", { className: "flex flex-col gap-2 my-7", children: [_jsx("h2", { className: "text-2xl font-bold", children: tripData?.userSelections?.destination || "Unknown Destination" }), _jsxs("div", { className: "flex gap-5 my-3", children: [_jsx("h2", { className: "p-1 px-3 text-xs text-gray-500 bg-gray-200 rounded-full md:text-lg", children: tripData?.userSelections?.days
                                            ? `${tripData.userSelections.days} Day`
                                            : "Duration Unknown" }), _jsx("h2", { className: "p-1 px-3 text-xs text-gray-500 bg-gray-200 rounded-full md:text-lg", children: tripData?.userSelections?.budget || "Budget Unknown" }), _jsxs("h2", { className: "p-1 px-3 text-xs text-gray-500 bg-gray-200 rounded-full md:text-lg", children: ["Travel With: ", tripData?.userSelections?.travelWith || "Unknown"] })] })] }), _jsx(Button, { children: _jsx(Send, {}) })] })] }));
}
export default InfoSection;
