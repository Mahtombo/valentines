import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axolotl from "../assets/axolotl.png";

export default function Slide() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    cute: 5,
    lucky: 5,
    cuddles: 5,
    dramatic: 5,
    kisser: 5,
  });

  const [touched, setTouched] = useState({
    cute: false,
    lucky: false,
    cuddles: false,
    dramatic: false,
    kisser: false,
  });

  const allTouched = Object.values(touched).every(Boolean);

  const averageScore =
    (values.cute +
      values.lucky +
      values.cuddles +
      values.dramatic +
      values.kisser) /
    5;

  let resultText = "";
  if (averageScore <= 4) {
    resultText = "Is that what you think of me, shibal! 😠";
  } else if (averageScore <= 7) {
    resultText = "Ok ok, I’ll let that slide 😏";
  } else {
    resultText = "Yaaaaay, pookie loves me!! 🥹💕";
  }

  const update = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    setTouched((t) => ({ ...t, [key]: true }));
  };

  const handleComplete = () => {
    navigate("/valentine");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-center"
      style={{ backgroundImage: `url(${axolotl})`, backgroundSize: "contain" }}
    >
      {/* Pixel-art frame */}
      <div className="max-w-lg w-full bg-pink-50 border-4 border-pink-900 shadow-[8px_8px_0_0_#9f1239] p-4 md:p-6 text-center">
        <div className="border-4 border-pink-200 p-4 md:p-5 space-y-5">
          <h2 className="font-mono text-lg md:text-2xl tracking-widest text-pink-900 uppercase">
            Rate the following statements about me
          </h2>

          <Slider
            label="How cute am I?"
            emoji="🥰"
            value={values.cute}
            onChange={(v) => update("cute", v)}
          />

          <Slider
            label="How lucky are you?"
            emoji="🍀"
            value={values.lucky}
            onChange={(v) => update("lucky", v)}
          />

          <Slider
            label="How good am I at cuddles?"
            emoji="🧸"
            value={values.cuddles}
            onChange={(v) => update("cuddles", v)}
          />

          <Slider
            label="How dramatic am I?"
            emoji="🎭"
            value={values.dramatic}
            onChange={(v) => update("dramatic", v)}
          />

          <Slider
            label="How good of a kisser am I?"
            emoji="😘"
            value={values.kisser}
            onChange={(v) => update("kisser", v)}
          />

          {allTouched && (
            <button
              onClick={handleComplete}
              className="w-full mt-3 py-3 bg-[#f97373] hover:bg-[#fb7185] text-white font-mono text-sm md:text-base tracking-widest border-4 border-[#7f1d1d] rounded-none shadow-[4px_4px_0_0_#7f1d1d] transition"
            >
              {resultText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Slider({ label, emoji, value, onChange }) {
  return (
    <div className="text-left">
      <div className="flex justify-between mb-1 items-center">
        <span className="font-mono text-xs md:text-sm text-pink-900">
          {emoji} {label}
        </span>
        <span className="font-mono text-pink-700 font-bold border-2 border-pink-700 px-2 py-0.5 text-xs shadow-[2px_2px_0_0_#9f1239]">
          {value}
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-pink-500 mb-2"
      />
    </div>
  );
}
