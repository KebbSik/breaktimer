import React, { useEffect, useRef, useState } from "react";

type CustomTimeInputProps = {
  value: string; // format "HH:MM:SS"
  onChange: (value: string) => void;
};

const CustomTimeInput: React.FC<CustomTimeInputProps> = ({
  value,
  onChange,
}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [openDropdown, setOpenDropdown] = useState<
    "hours" | "minutes" | "seconds" | null
  >(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parts = value.split(":").map(Number);
    if (parts.length === 3) {
      setHours(parts[0]);
      setMinutes(parts[1]);
      setSeconds(parts[2]);
    } else if (parts.length === 2) {
      setHours(parts[0]);
      setMinutes(parts[1]);
      setSeconds(0);
    }
  }, [value]);

  const updateTime = (h: number, m: number, s: number) => {
    setHours(h);
    setMinutes(m);
    setSeconds(s);
    const formatted = `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
    onChange(formatted);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const renderDropdown = (
    currentValue: number,
    max: number,
    dropdownType: "hours" | "minutes" | "seconds",
    onSelect: (val: number) => void
  ) => {
    const show = openDropdown === dropdownType;
    return (
      <div className="custom-dropdown">
        <div
          className="dropdown-trigger"
          onClick={() => setOpenDropdown(show ? null : dropdownType)}
        >
          {String(currentValue)}
          <span className={`arrow ${show ? "open" : ""}`}>▾</span>
        </div>

        <div className={`dropdown-options ${show ? "open" : ""}`}>
          {Array.from({ length: max + 1 }, (_, i) => (
            <div
              key={i}
              className="dropdown-option"
              onClick={() => {
                onSelect(i);
                setOpenDropdown(null);
              }}
            >
              {String(i)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="custom-time-input" ref={dropdownRef}>
      {renderDropdown(hours, 23, "hours", (h) =>
        updateTime(h, minutes, seconds)
      )}
      <span className="unit">h</span>
      {renderDropdown(minutes, 59, "minutes", (m) =>
        updateTime(hours, m, seconds)
      )}
      <span className="unit">m</span>
      {renderDropdown(seconds, 59, "seconds", (s) =>
        updateTime(hours, minutes, s)
      )}
      <span className="unit">s</span>
    </div>
  );
};

export default CustomTimeInput;
