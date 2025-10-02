import "./App.css";
import BreakApp from "./components/BreakApp";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Loader />
      <header>
        <Navbar />
      </header>
      <main>
        <h1>
          Stay <span className="text-accent">productive</span> with smart breaks
        </h1>
        <p>
          Manage your <span className="text-accent">work</span> and{" "}
          <span className="text-accent">rest</span> with customizable timers.
        </p>
        <BreakApp />
      </main>
    </>
  );
}

export default App;
