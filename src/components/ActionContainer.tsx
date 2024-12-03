import React, { FC } from "react";
import { IoIosSkipForward } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import { CurrentStateType } from "./helper";

interface ActionContainerProps {
  toggleStart: boolean;
  setToggleStart: (value: boolean) => void;
  currentState: CurrentStateType;
  handleSkip: () => void;
  themeStyle: string;
}

const ActionContainer: FC<ActionContainerProps> = ({
  toggleStart,
  setToggleStart,
  currentState,
  handleSkip,
  themeStyle,
}) => {
  const { defaultTime, setTimer } = currentState;

  const handleRestart = () => {
    setToggleStart(false);
    setTimer(defaultTime);
  };

  return (
    <div className="flex gap-5 items-center ">
      <VscDebugRestart
        onClick={handleRestart}
        className={`border-2  border-gray-200 cursor-pointer rounded-full w-10 h-10 p-1 ${themeStyle}`}
      />
      <button
        className={`border-2  border-gray-200 w-32 h-12 px-5 rounded-md ${themeStyle}`}
        onClick={() => setToggleStart(!toggleStart)}
      >
        {toggleStart ? "Pause" : "Start"}
      </button>
      <IoIosSkipForward
        onClick={handleSkip}
        className={`border-2  border-gray-200 cursor-pointer rounded-full w-10 h-10 p-1 ${themeStyle}`}
      />
    </div>
  );
};

export default ActionContainer;
