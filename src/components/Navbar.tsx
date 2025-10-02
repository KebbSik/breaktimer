import { useState } from "react";
import Modal from "./Modal";
import ModeToggler from "./ModeToggler";

const Navbar = () => {
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [readMeOpen, setReadMeOpen] = useState(false);

  return (
    <>
      <nav>
        <div className="logo">
          <span>BreakTimer</span>
        </div>
        <div className="navbar-right">
          <div className="navbar-group nav-theme-btn">
            <ModeToggler />
          </div>
          <div className="navbar-group">
            <button className="btn" onClick={() => setHowItWorksOpen(true)}>
              How to use?
            </button>
            <button className="btn" onClick={() => setReadMeOpen(true)}>
              ReadMe
            </button>
          </div>
        </div>
      </nav>

      <Modal
        isOpen={howItWorksOpen}
        onClose={() => setHowItWorksOpen(false)}
        title="How it Works?"
      >
        <p>
          <strong>BreakTimer</strong> helps you stay focused while remembering
          to take regular breaks.
        </p>

        <ul>
          <li>
            Set your preferred <strong>work and break times</strong>.
          </li>
          <li>
            Choose a <strong>bell sound</strong> to alert you when a session
            ends.
          </li>
          <li>
            Start the timer and watch your <strong>progress bar</strong> as you
            work.
          </li>
          <li>
            <strong>Pause</strong> or <strong>skip</strong> sessions anytime.
          </li>
          <li>
            Optional <strong>notes</strong> keep you on track.
          </li>
        </ul>

        <p>
          <span>
            The app automatically switches between work and break phases, making
            it easy to follow a structured workflow and stay productive without
            burning out.
          </span>
        </p>
      </Modal>

      <Modal
        isOpen={readMeOpen}
        onClose={() => setReadMeOpen(false)}
        title="ReadMe"
      >
        <p>
          To jest prosta aplikacja <strong>Break Timer</strong>, która pomaga w
          organizacji pracy i przerw.
        </p>

        <p>
          Choć pierwotnie plan zakładał stworzenie jej w{" "}
          <strong>Angularze</strong>, pierwszą wersję zrobiłem w{" "}
          <strong>React</strong>. Dzięki temu mogłem szybciej uruchomić
          działającą aplikację i przetestować pomysł. Można powiedzieć, że to
          takie „kupienie czasu” — bo do rozmowy rekrutacyjnej (około{" "}
          <strong>16 października</strong>) przygotuję też wersję w Angularze.
        </p>

        <p>
          Jak wspomniano na webinarze, znajomość zarówno <strong>React</strong>,
          jak i <strong>Angulara</strong> jest atutem. Ten projekt pokazuje moje
          podejście do budowania funkcjonalnych rozwiązań i chęć poznawania
          różnych technologii.
        </p>
      </Modal>
    </>
  );
};

export default Navbar;
