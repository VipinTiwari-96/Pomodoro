import { FC, useContext, useEffect, useMemo, useState } from "react";
// helpers
import {
  CurrentStateType,
  FormikValues,
  getContainerStyle,
  getCurrentState,
  getValueFromLs,
  getTime,
  setValueInLs,
  State,
  Time,
} from "./helper";
// component
import ActionContainer from "./ActionContainer";
import FormModal from "./FormModal";
import { ThemeContext } from "../App";
// shared
import Button from "../shared/Button";

const TimerContainer: FC = () => {
  const [currentStateValue, setCurrentStateValue] = useState<State>(
    State.Session
  );
  const [toggleStart, setToggleStart] = useState<boolean>(false);
  const [sessionTimer, setSessionTimer] = useState<number>(
    getValueFromLs(State.Session)
  );
  const [shortBreakTimer, setShortBreakTimer] = useState<number>(
    getValueFromLs(State.ShortBreak)
  );
  const [longBreakTimer, setLongBreakTimer] = useState<number>(
    getValueFromLs(State.LongBreak)
  );
  const [skipCount, setSkipCount] = useState<number>(0);
  const [openForm, setOpenForm] = useState<boolean>(false);

  const context = useContext(ThemeContext);

  const themeStyle = useMemo<string>(() => {
    if (context?.isDarkMode) {
      return "bg-gray-700 text-white";
    }
    return "bg-white text-gray-700";
  }, [context?.isDarkMode]);

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
    setSessionTimer(getValueFromLs(State.Session));
    setShortBreakTimer(getValueFromLs(State.ShortBreak));
    setLongBreakTimer(getValueFromLs(State.LongBreak));
  };

  useEffect(() => {
    setCurrentStateValue(getCurrentState(skipCount));
  }, [skipCount, setCurrentStateValue]);

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
    [currentStateValue]
  );

  const currentState = useMemo<CurrentStateType>(() => {
    if (currentStateValue === State.Session) {
      return {
        defaultTime: getValueFromLs(State.Session),
        timer: sessionTimer,
        setTimer: setSessionTimer,
      };
    } else if (currentStateValue === State.ShortBreak) {
      return {
        defaultTime: getValueFromLs(State.ShortBreak),
        timer: shortBreakTimer,
        setTimer: setShortBreakTimer,
      };
    }
    return {
      defaultTime: getValueFromLs(State.LongBreak),
      timer: longBreakTimer,
      setTimer: setLongBreakTimer,
    };
  }, [currentStateValue, sessionTimer, shortBreakTimer, longBreakTimer]);

  const handleSubmit = (values: FormikValues) => {
    setValueInLs(State.Session, values.session);
    setValueInLs(State.ShortBreak, values.shortBreak);
    setValueInLs(State.LongBreak, values.longBreak);

    setSessionTimer(values.session);
    setShortBreakTimer(values.shortBreak);
    setLongBreakTimer(values.longBreak);
  };
  return (
    <div className=" w-fit mx-auto flex flex-col items-center gap-3">
      <Button
        name="Custom time"
        handleClick={() => setOpenForm(true)}
        className="self-end"
      />
      {openForm && (
        <FormModal
          handleClose={() => setOpenForm(false)}
          handleSubmit={handleSubmit}
        />
      )}

      <div
        className={`border-2 border-gray-200 w-96 pt-2 pb-5 mx-auto flex flex-col justify-center items-center gap-24 rounded-lg ${styledDiv}`}
      >
        <span
          className={`text-xl font-semibold border  border-gray-200 px-5 py-2  ${themeStyle}`}
        >
          {currentStateValue}
        </span>
        <span
          className={`text-4xl font-bold py-3 px-8 rounded-md ${themeStyle}`}
        >
          {renderTime(getTime(currentState.timer))}
        </span>
        <ActionContainer
          toggleStart={toggleStart}
          setToggleStart={setToggleStart}
          currentState={currentState}
          handleSkip={handleSkip}
          themeStyle={themeStyle}
        />
      </div>
    </div>
  );
};

export default TimerContainer;
