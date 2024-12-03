export enum State {
  Session = "Session",
  ShortBreak = "ShortBreak",
  LongBreak = "LongBreak",
}

export type Time = {
  minutes: number;
  seconds: number;
};

export const DEFAULT_SESSION_TIME = 25 * 60;
export const DEFAULT_SHORT_BREAK_TIME = 5 * 60;
export const DEFAULT_LONG_BREAK_TIME = 15 * 60;

export const getTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return {
    minutes,
    seconds,
  };
};

export const getContainerStyle = (currentState: State) => {
  let className = "bg-green-100";
  if (currentState === State.ShortBreak) {
    className = "bg-pink-100";
  } else if (currentState === State.LongBreak) {
    className = "bg-yellow-100";
  }
  return className;
};
