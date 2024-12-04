import React, { FC } from "react";
import { IoIosSkipForward } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
// helper
import { CurrentStateType } from "./helper";
// shared
import Button from "../shared/Button";

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
      <Button
        name={toggleStart ? "Pause" : "Start"}
        handleClick={() => setToggleStart(!toggleStart)}
        className=" w-32 h-12"
      />
      <IoIosSkipForward
        onClick={handleSkip}
        className={`border-2  border-gray-200 cursor-pointer rounded-full w-10 h-10 p-1 ${themeStyle}`}
      />
    </div>
  );
};

export default ActionContainer;
