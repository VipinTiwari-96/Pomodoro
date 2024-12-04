export enum State {
  Session = "Session",
  ShortBreak = "ShortBreak",
  LongBreak = "LongBreak",
}

export type Time = {
  minutes: number;
  seconds: number;
};

export type CurrentStateType = {
  defaultTime: number;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
};

export const DEFAULT_SESSION_TIME = 25 * 60;
export const DEFAULT_SHORT_BREAK_TIME = 5 * 60;
export const DEFAULT_LONG_BREAK_TIME = 15 * 60;

export type FormikValues = {
  session: number;
  shortBreak: number;
  longBreak: number;
};
export const getTime = (time: number): Time => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return {
    minutes,
    seconds,
  };
};

export const getContainerStyle = (currentState: State): string => {
  let className = "bg-green-100";
  if (currentState === State.ShortBreak) {
    className = "bg-pink-100";
  } else if (currentState === State.LongBreak) {
    className = "bg-yellow-100";
  }
  return className;
};

export const getCurrentState = (skipCount: number): State => {
  if (skipCount === 1 || skipCount === 3) {
    return State.ShortBreak;
  } else if (skipCount === 0 || skipCount === 2 || skipCount === 4) {
    return State.Session;
  } else {
    return State.LongBreak;
  }
};

export const setValueInLs = (key: State, value: number) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getValueFromLs = (key: State): number => {
  const savedSessionTime = localStorage.getItem(key);
  const savedShortBreakTime = localStorage.getItem(key);
  const savedLongBreakTime = localStorage.getItem(key);

  const result: Record<string, number> = {
    [State.Session]: savedSessionTime
      ? JSON.parse(savedSessionTime)
      : DEFAULT_SESSION_TIME,
    [State.ShortBreak]: savedShortBreakTime
      ? JSON.parse(savedShortBreakTime)
      : DEFAULT_SHORT_BREAK_TIME,
    [State.LongBreak]: savedLongBreakTime
      ? JSON.parse(savedLongBreakTime)
      : DEFAULT_LONG_BREAK_TIME,
  };
  return result[key];
};
