import { FC, useEffect, useMemo, useState } from "react";
// helpers
import {
  CurrentStateType,
  DEFAULT_LONG_BREAK_TIME,
  DEFAULT_SESSION_TIME,
  DEFAULT_SHORT_BREAK_TIME,
  getContainerStyle,
  getCurrentState,
  getTime,
  State,
  Time,
} from "./helper";
// component
import ActionContainer from "./ActionContainer";

const TimerContainer: FC = () => {
  const [currentStateValue, setCurrentStateValue] = useState<State>(
    State.Session
  );
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
        if (currentStateValue === State.Session) {
          setSessionTimer((prev) => prev - 1);
        } else if (currentStateValue === State.ShortBreak) {
          setShortBreakTimer((prev) => prev - 1);
        } else {
          setLongBreakTimer((prev) => prev - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentStateValue, toggleStart]);

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
    setCurrentStateValue(getCurrentState(skipCount));
  }, [skipCount, getCurrentState, setCurrentStateValue]);

  const renderTime = (time: Time) => {
    return (
      <span className="text-4xl font-bold">
        {time.minutes}:{time.seconds < 10 && 0}
        {time.seconds}
      </span>
    );
  };

  const styledDiv = useMemo<string>(
    () => getContainerStyle(currentStateValue),
    [currentStateValue, getContainerStyle]
  );

  const currentState = useMemo<CurrentStateType>(() => {
    if (currentStateValue === State.Session) {
      return {
        defaultTime: DEFAULT_SESSION_TIME,
        timer: sessionTimer,
        setTimer: setSessionTimer,
      };
    } else if (currentStateValue === State.ShortBreak) {
      return {
        defaultTime: DEFAULT_SHORT_BREAK_TIME,
        timer: shortBreakTimer,
        setTimer: setShortBreakTimer,
      };
    }
    return {
      defaultTime: DEFAULT_LONG_BREAK_TIME,
      timer: longBreakTimer,
      setTimer: setLongBreakTimer,
    };
  }, [currentStateValue, sessionTimer, shortBreakTimer, longBreakTimer]);

  return (
    <div
      className={`border-2 border-black w-80 h-40 mx-auto flex flex-col justify-center items-center gap-5 ${styledDiv}`}
    >
      <span className="text-xl font-semibold border border-gray-300 px-2">
        {currentStateValue}
      </span>
      <span className="text-4xl font-bold">
        {renderTime(getTime(currentState.timer))}
      </span>
      <ActionContainer
        toggleStart={toggleStart}
        setToggleStart={setToggleStart}
        currentState={currentState}
        handleSkip={handleSkip}
      />
    </div>
  );
};

export default TimerContainer;
