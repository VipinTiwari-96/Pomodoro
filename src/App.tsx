import { useState } from "react";
import TimerContainer from "./components/TimerContainer";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

function App() {
  const [toogleTheme, setToogleTheme] = useState<boolean>(false);
  return (
    <div
      className={`h-screen p-10 ${toogleTheme ? "bg-gray-800" : "bg-white"}`}
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
        <TimerContainer />
      </div>
    </div>
  );
}

export default App;
