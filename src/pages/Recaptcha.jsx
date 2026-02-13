import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecaptchaLogo from "../assets/RecaptchaLogo.png";
import pig from "../assets/pig.png";

export default function Recaptcha() {
  const [checked, setChecked] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!checked) return;

    // After 2.5s of spinning, show the green tick
    const spinnerTimer = setTimeout(() => {
      setShowCheck(true);
    }, 2500);

    return () => clearTimeout(spinnerTimer);
  }, [checked]);

  useEffect(() => {
    if (!showCheck) return;

    // After the tick appears, wait a bit then navigate
    const navTimer = setTimeout(() => {
      navigate("/grid-board");
    }, 800);

    return () => clearTimeout(navTimer);
  }, [showCheck, navigate]);

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${pig})`, backgroundSize: "contain" }}
    >
      {/* Pixel-art style card */}
      <div className="max-w-sm w-full bg-slate-100 border-4 border-slate-900 shadow-[6px_6px_0_0_#020617] px-4 py-3 flex items-center gap-3">
        {/* Checkbox + label */}
        <button
          type="button"
          onClick={() => {
            setChecked(true);
            setShowCheck(false);
          }}
          className="flex items-center gap-3 flex-1 text-left"
        >
          {!checked && (
            <div className="h-8 w-8 border-4 border-slate-900 bg-white" />
          )}
          {checked && !showCheck && (
            <div className="h-7 w-7 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          )}
          {checked && showCheck && (
            <span className="text-2xl leading-none text-green-600 font-bold">
              &#10003;
            </span>
          )}
          <span className="text-sm md:text-base font-mono tracking-widest text-slate-900 select-none uppercase">
            I'm not a robot
          </span>
        </button>

        {/* Fake Google reCAPTCHA branding column */}
        <div className="flex flex-col items-center justify-center gap-1 px-1 border-l-4 border-slate-900 pl-3">
          <div className="h-10 w-10 flex items-center justify-center bg-white border-4 border-slate-900 shadow-[3px_3px_0_0_#0f172a]">
            <img
              src={RecaptchaLogo}
              alt="Google"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="text-[9px] font-mono tracking-widest text-slate-700 text-center mt-1 uppercase">
            Privacy · Terms
          </div>
        </div>
      </div>
    </div>
  );
}
