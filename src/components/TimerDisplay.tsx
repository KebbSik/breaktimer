import React from "react";
import { IoClose, IoPause, IoPlay, IoPlaySkipForward } from "react-icons/io5";

type TimerDisplayProps = {
  phase: "work" | "break";
  timeLeft: number;
  totalTime: number;
  isPaused: boolean;
  formatTime: (sec: number) => string;
  onPauseToggle: () => void;
  onSkip: () => void;
  onStop: () => void;
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  phase,
  timeLeft,
  totalTime,
  isPaused,
  formatTime,
  onPauseToggle,
  onSkip,
  onStop,
}) => {
  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="timer-container">
      <h2>{phase === "work" ? "Work Time" : "Break Time"}</h2>

      <div className="time-display">{formatTime(timeLeft)}</div>

      {/* Custom progress bar */}
      <div
        className="custom-progress-bar"
        style={{
          width: "80%",
          height: "10px",
          background: "#ddd",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            background: phase === "work" ? "var(--color-accent)" : "#61c264ff",
            transition: "width 1s linear",
          }}
        />
      </div>

      <div className="time-display-controls">
        <button onClick={onPauseToggle} className="btn time-control-btn">
          {isPaused ? <IoPlay title="Resume" /> : <IoPause title="Pause" />}
        </button>

        <button
          title="Skip phase"
          onClick={onSkip}
          className="btn time-control-btn "
        >
          <IoPlaySkipForward />
        </button>

        <button
          title="Cancel"
          onClick={onStop}
          className="btn time-control-btn btn-cancel"
          aria-label="cancel"
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default TimerDisplay;
