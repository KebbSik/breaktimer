import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "./useTheme";

const ModeToggler = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="btn-theme"
    >
      {theme === "light" ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ModeToggler;
