import { FC, useEffect, useMemo, useState } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { IoIosSkipForward } from "react-icons/io";
import {
  DEFAULT_LONG_BREAK_TIME,
  DEFAULT_SESSION_TIME,
  DEFAULT_SHORT_BREAK_TIME,
  getContainerStyle,
  getTime,
  State,
  Time,
} from "./helper";

const TimerContainer: FC = () => {
  const [currentState, setCurrentState] = useState<State>(State.Session);
  const [toggleStart, setToggleStart] = useState<boolean>(false);
  const [sessionTimer, setSessionTimer] =
    useState<number>(DEFAULT_SESSION_TIME);
  const [shortBreakTimer, setShortBreakTimer] = useState<number>(
    DEFAULT_SHORT_BREAK_TIME
  );
  const [longBreakTimer, setLongBreakTimer] = useState<number>(
    DEFAULT_LONG_BREAK_TIME
  );
  const [skipCount, setSkipCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (toggleStart) {
        if (currentState === State.Session) {
          setSessionTimer((prev) => prev - 1);
        } else if (currentState === State.ShortBreak) {
          setShortBreakTimer((prev) => prev - 1);
        } else {
          setLongBreakTimer((prev) => prev - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentState, toggleStart]);

  const handleRestart = () => {
    setToggleStart(false);
    setSessionTimer(DEFAULT_SESSION_TIME);
    setShortBreakTimer(DEFAULT_SHORT_BREAK_TIME);
    setLongBreakTimer(DEFAULT_LONG_BREAK_TIME);
  };

  const handleSkip = () => {
    setSkipCount((prev) => {
      if (prev === 5) {
        return 0;
      } else {
        return prev + 1;
      }
    });

    setToggleStart(false);
    setSessionTimer(DEFAULT_SESSION_TIME);
    setShortBreakTimer(DEFAULT_SHORT_BREAK_TIME);
    setLongBreakTimer(DEFAULT_LONG_BREAK_TIME);
  };

  useEffect(() => {
    let state = currentState;
    if (skipCount === 1 || skipCount === 3) {
      state = State.ShortBreak;
    } else if (skipCount === 0 || skipCount === 2 || skipCount === 4) {
      state = State.Session;
    } else {
      state = State.LongBreak;
    }
    setCurrentState(state);
  }, [skipCount, currentState]);

  const renderTime = (time: Time) => {
    return (
      <span className="text-4xl font-bold">
        {time.minutes}:{time.seconds < 10 && 0}
        {time.seconds}
      </span>
    );
  };

  const styledDiv = useMemo(
    () => getContainerStyle(currentState),
    [currentState]
  );

  return (
    <div
      className={`border-2 border-black w-80 h-40 mx-auto flex flex-col justify-center items-center gap-5 ${styledDiv}`}
    >
      <span className="text-xl font-semibold border border-gray-300 px-2">
        {currentState}
      </span>
      <span className="text-4xl font-bold">
        {renderTime(
          currentState === State.Session
            ? getTime(sessionTimer)
            : currentState === State.ShortBreak
            ? getTime(shortBreakTimer)
            : getTime(longBreakTimer)
        )}
      </span>
      <div className="flex gap-5 items-center">
        <VscDebugRestart
          size={25}
          onClick={handleRestart}
          className="cursor-pointer bg-white rounded-full w-7 h-7"
        />
        <button
          className="border-2 border-black w-20 px-5 bg-white rounded-md"
          onClick={() => setToggleStart((prev) => !prev)}
        >
          {toggleStart ? "Pause" : "Start"}
        </button>
        <IoIosSkipForward
          size={25}
          onClick={handleSkip}
          className="cursor-pointer bg-white rounded-full w-7 h-7"
        />
      </div>
    </div>
  );
};

export default TimerContainer;
