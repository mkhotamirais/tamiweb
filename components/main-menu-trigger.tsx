import { FaChevronUp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useMmStore } from "@/hooks/useMmStore";

export const MainMenuTriggerSmUp = () => {
  const { mm, hideMm, showMm } = useMmStore();

  const onMouseEnter = () => {
    mm ? hideMm() : showMm();
  };

  return (
    <div onMouseEnter={onMouseEnter} className={`hidden sm:flex w-full fixed mx-auto -top-10 justify-center`}>
      <Button
        variant={mm ? "default" : "ghost"}
        size="icon"
        className={`${mm ? "rotate-180" : "rotate-0"} rounded-full`}
      >
        <FaChevronUp className="w-3 h-3" />
      </Button>
    </div>
  );
};

export const MainMenuTriggerSmDown = () => {
  const { mm, hideMm, showMm } = useMmStore();

  const onClick = () => {
    mm ? hideMm() : showMm();
  };
  return (
    <div onClick={onClick} className={`flex sm:hidden w-full fixed mx-auto -top-10 justify-center`}>
      <Button
        variant={mm ? "default" : "ghost"}
        size="icon"
        className={`${mm ? "rotate-180" : "rotate-0"} rounded-full`}
      >
        <FaChevronUp className="w-3 h-3" />
      </Button>
    </div>
  );
};
