import React from "react";
import CustomTimeInput from "./CustomTimeInput";

type FormData = {
  workTime: string;
  breakTime: string;
  bell: string;
  // notification: boolean;
  note: string;
};

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (data: FormData) => void;
};

const bells = ["Classic", "Digital", "Soft", "Loud"];

import classic from "../assets/sounds/classic.mp3";
import digital from "../assets/sounds/digital.mp3";
import loud from "../assets/sounds/loud.mp3";
import soft from "../assets/sounds/soft.mp3";

const bellSounds: Record<string, string> = {
  Classic: classic,
  Digital: digital,
  Soft: soft,
  Loud: loud,
};

const BreakForm: React.FC<Props> = ({ formData, setFormData, onSubmit }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "bell") {
      const audio = new Audio(bellSounds[value]);
      audio.play();
    }
  };

  // const handleToggle = () => {
  //   setFormData((prev) => ({ ...prev, notification: !prev.notification }));
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="workTime">Work Time:</label>
        <div className="input-field">
          <CustomTimeInput
            value={formData.workTime}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, workTime: val }))
            }
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="breakTime">Break time:</label>
        <div className="input-field">
          <CustomTimeInput
            value={formData.breakTime}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, breakTime: val }))
            }
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="bell">Bell sound:</label>
        <div className="radio-inputs">
          {bells.map((b) => (
            <label key={b} className="radio">
              <input
                type="radio"
                name="bell"
                value={b}
                checked={formData.bell === b}
                onChange={handleChange}
              />
              <span className="name">{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* <div className="field">
        <label htmlFor="notification">Notifications:</label>
        <div className="input-field">
          <input
            id="notification"
            className="switch"
            type="checkbox"
            checked={formData.notification}
            onChange={handleToggle}
          />
        </div>
      </div> */}

      <div className="field">
        <label htmlFor="note">Notes:</label>
        <div className="input-field">
          <input
            id="note"
            className="text-input"
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Enter a text..."
          />
        </div>
      </div>
      <div className="submit-container">
        <button className="btn-submit" type="submit">
          Start
        </button>
      </div>
    </form>
  );
};

export default BreakForm;
