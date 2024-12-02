import { FC, useEffect, useState } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { IoIosSkipForward } from "react-icons/io";

enum State {
  Session = "Session",
  ShortBreak = "ShortBreak",
  LongBreak = "LongBreak",
}

type Time = {
  minutes: number;
  seconds: number;
};

const SESSION_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
interface TimerContainerProps {}

const TimerContainer: FC<TimerContainerProps> = () => {
  const [currentState, setCurrentState] = useState<State>(State.Session);
  const [toggleStart, setToggleStart] = useState<boolean>(false);
  const [sessionTimer, setSessionTimer] = useState<number>(SESSION_TIME);
  const [shortBreakTimer, setShortBreakTimer] =
    useState<number>(SHORT_BREAK_TIME);

  useEffect(() => {
    const interval = setInterval(() => {
      if (toggleStart) {
        if (currentState === State.Session) {
          setSessionTimer((prev) => prev - 1);
        } else if (currentState === State.ShortBreak) {
          setShortBreakTimer((prev) => prev - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentState, toggleStart]);

  const handleRestart = () => {
    setSessionTimer(SESSION_TIME);
    setToggleStart(false);
    setShortBreakTimer(SHORT_BREAK_TIME);
  };

  const handleSkip = () => {
    let state = currentState;
    if (currentState === State.Session) {
      state = State.ShortBreak;
    } else if (currentState === State.ShortBreak) {
      state = State.Session;
    }
    setCurrentState(state);

    setToggleStart(false);
    setSessionTimer(SESSION_TIME);
    setShortBreakTimer(SHORT_BREAK_TIME);
  };

  const getTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return {
      minutes,
      seconds,
    };
  };

  const renderTime = (time: Time) => {
    return (
      <span className="text-4xl font-bold">
        {time.minutes}:{time.seconds < 10 && 0}
        {time.seconds}
      </span>
    );
  };

  return (
    <div className="border-2 border-black w-80 h-40 mx-auto flex flex-col justify-center items-center gap-5">
      <span>{currentState}</span>
      <span className="text-4xl font-bold">
        {renderTime(
          currentState === State.Session
            ? getTime(sessionTimer)
            : getTime(shortBreakTimer)
        )}
      </span>
      <div className="flex gap-5 items-center">
        <VscDebugRestart
          size={25}
          onClick={handleRestart}
          className="cursor-pointer"
        />
        <button
          className="border-2 border-black w-20 px-5"
          onClick={() => setToggleStart((prev) => !prev)}
        >
          {toggleStart ? "Pause" : "Start"}
        </button>
        <IoIosSkipForward
          size={25}
          onClick={handleSkip}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TimerContainer;
