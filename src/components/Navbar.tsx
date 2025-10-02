import { useState } from "react";
import Modal from "./Modal";
import ModeToggler from "./ModeToggler";

const Navbar = () => {
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [readMeOpen, setReadMeOpen] = useState(false);

  return (
    <>
      <nav>
        <div className="navbar-left">
          <div className="logo flex-center">
            <span>BreakTimer</span>
          </div>
        </div>
        <div className="navbar-right">
          <div className="navbar-group btn-theme-group">
            <ModeToggler />
          </div>
          <div className="navbar-group">
            <button className="btn" onClick={() => setHowItWorksOpen(true)}>
              How it Works ?
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
            Optional <strong>notes and notifications</strong> keep you on track.
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
        <p>Readme Content</p>
      </Modal>
    </>
  );
};

export default Navbar;
