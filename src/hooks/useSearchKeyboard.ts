import { useEffect } from "react";

interface UseSearchKeyboardProps {
  open: boolean;
  onOpen: () => void;
}

export const useSearchKeyboard = ({ open, onOpen }: UseSearchKeyboardProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !open) {
        e.preventDefault();
        onOpen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpen]);
};