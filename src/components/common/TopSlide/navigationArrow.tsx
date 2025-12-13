import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationArrowProps {
  direction: "left" | "right";
  onClick: () => void;
}

export const NavigationArrow = ({ direction, onClick }: NavigationArrowProps) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      aria-label={`${direction === "left" ? "Previous" : "Next"} announcement`}
      className="hover:opacity-70 transition-opacity"
    >
      <Icon className="w-6 h-6 text-white" />
    </button>
  );
};