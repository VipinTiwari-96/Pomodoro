import React, { FC } from "react";
import { IoIosSkipForward } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import { CurrentStateType } from "./helper";

interface ActionContainerProps {
  toggleStart: boolean;
  setToggleStart: (value: boolean) => void;
  currentState: CurrentStateType;
  handleSkip: () => void;
}

const ActionContainer: FC<ActionContainerProps> = ({
  toggleStart,
  setToggleStart,
  currentState,
  handleSkip,
}) => {
  const { defaultTime, setTimer } = currentState;

  const handleRestart = () => {
    setToggleStart(false);
    setTimer(defaultTime);
  };

  return (
    <div className="flex gap-5 items-center">
      <VscDebugRestart
        size={25}
        onClick={handleRestart}
        className="cursor-pointer bg-white rounded-full w-7 h-7"
      />
      <button
        className="border-2 border-black w-20 px-5 bg-white rounded-md"
        onClick={() => setToggleStart(!toggleStart)}
      >
        {toggleStart ? "Pause" : "Start"}
      </button>
      <IoIosSkipForward
        size={25}
        onClick={handleSkip}
        className="cursor-pointer bg-white rounded-full w-7 h-7"
      />
    </div>
  );
};

export default ActionContainer;
