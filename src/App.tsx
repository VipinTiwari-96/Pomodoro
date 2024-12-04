import { useState, createContext } from "react";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
// components
import TimerContainer from "./components/TimerContainer";

export const ThemeContext = createContext<{ isDarkMode: boolean } | null>(null);

function App() {
  const [toogleTheme, setToogleTheme] = useState<boolean>(false);

  return (
    <div
      className={`h-screen p-10 ${toogleTheme ? "bg-gray-700" : "bg-white"}`}
    >
      <div className=" flex justify-end ">
        {toogleTheme ? (
          <MdOutlineDarkMode
            onClick={() => setToogleTheme(false)}
            size={30}
            className={`cursor-pointer rounded-full text-blue-400 `}
          />
        ) : (
          <MdDarkMode
            onClick={() => setToogleTheme(true)}
            size={30}
            className="cursor-pointer rounded-full bg-gray-100 "
          />
        )}
      </div>
      <div className="pt-40">
        <ThemeContext.Provider value={{ isDarkMode: toogleTheme }}>
          <TimerContainer />
        </ThemeContext.Provider>
      </div>
    </div>
  );
}

export default App;
