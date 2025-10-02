import "./App.css";
import BreakApp from "./components/BreakApp";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="app-wrapper">
        <Loader />
        <Navbar />
        <BreakApp />
      </div>
    </>
  );
}

export default App;
