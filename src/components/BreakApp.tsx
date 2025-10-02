import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import classic from "../assets/sounds/classic.mp3";
import digital from "../assets/sounds/digital.mp3";
import loud from "../assets/sounds/loud.mp3";
import soft from "../assets/sounds/soft.mp3";
import BreakForm from "./BreakForm";
import TimerDisplay from "./TimerDisplay";

type Phase = "work" | "break";

const bells: Record<string, string> = {
  Classic: classic,
  Digital: digital,
  Soft: soft,
  Loud: loud,
};

const BreakApp: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("work");
  const [totalTime, setTotalTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [formData, setFormData] = useState({
    workTime: "00:00:10",
    breakTime: "00:00:10",
    bell: "Classic",
    notification: true,
    note: "",
  });

  const playBell = () => {
    const audio = new Audio(bells[formData.bell]);
    audio.play();
  };

  const parseTime = (timeStr: string) => {
    const parts = timeStr.split(":").map(Number);
    const [h, m, s = 0] = parts;
    return h * 3600 + m * 60 + s;
  };

  const startTimer = (seconds: number) => {
    setTimeLeft(seconds);
    setTotalTime(seconds);
    setIsRunning(true);
    setIsPaused(false);
    setShowMessage(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
  };

  const skipPhase = () => {
    setIsRunning(false);
    playBell();
    if (formData.notification) window.focus();

    if (phase === "work") {
      setMessage("Time for a break !");
      setPhase("break");
    } else {
      setMessage("Time for work !");
      setPhase("work");
    }
    setShowMessage(true);
  };

  // Counter
  useEffect(() => {
    if (!isRunning || isPaused) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isPaused]);

  // Countdown end check
  useEffect(() => {
    if (timeLeft <= 0 && isRunning) {
      skipPhase();
    }
  }, [timeLeft, isRunning]);

  // Dynamic title update
  useEffect(() => {
    if (isRunning && !showMessage) {
      const time = formatTime(timeLeft);
      const phaseLabel = phase === "work" ? "Work ⏳ " : "Break ☕ ";
      document.title = `${phaseLabel} - ${time}`;
    } else if (showMessage) {
      document.title = message;
    } else {
      document.title = "BreakApp Timer";
    }
  }, [isRunning, showMessage, timeLeft, phase, message]);

  const handleFormSubmit = (data: typeof formData) => {
    setFormData(data);
    setPhase("work"); // reset phase
    setTimeLeft(0); // reset timer
    startTimer(parseTime(data.workTime));
  };

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  const handleMessageConfirm = () => {
    setShowMessage(false);
    if (phase === "break") {
      startTimer(parseTime(formData.breakTime));
    } else {
      startTimer(parseTime(formData.workTime));
    }
  };

  return (
    <section className="input-container">
      <AnimatePresence mode="wait">
        {!isRunning && timeLeft === 0 && !showMessage && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <BreakForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleFormSubmit}
            />
          </motion.div>
        )}

        {isRunning && !showMessage && (
          <motion.div
            key="timer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <TimerDisplay
              phase={phase}
              timeLeft={timeLeft}
              totalTime={totalTime}
              isPaused={isPaused}
              formatTime={formatTime}
              onPauseToggle={() => setIsPaused((prev) => !prev)}
              onSkip={skipPhase}
              onStop={stopTimer}
            />
          </motion.div>
        )}

        {showMessage && (
          <motion.div
            className="status-message"
            key="message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h2>{message}</h2>
            <p className="note">{formData.note}</p>
            <button onClick={handleMessageConfirm} className="btn btn-submit">
              {phase === "work" ? "Start working" : "Let’s rest"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BreakApp;
