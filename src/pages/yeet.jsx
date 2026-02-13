import { useState } from "react";
import { useNavigate } from "react-router-dom";

const IMAGES = [
  { id: 1, label: "❤️", correct: true },
  { id: 2, label: "🐶", correct: false },
  { id: 3, label: "🌸", correct: false },
  { id: 4, label: "😍", correct: true },
  { id: 5, label: "🍕", correct: false },
  { id: 6, label: "💘", correct: true },
  { id: 7, label: "🚗", correct: false },
  { id: 8, label: "🥰", correct: true },
  { id: 9, label: "🌮", correct: false },
];

export default function Yeet() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [images, setImages] = useState(IMAGES);
  const [shake, setShake] = useState(false);

  const clickImage = (img) => {
    if (img.correct) {
      setImages(images.filter((i) => i.id !== img.id));
      new Audio("/pop.mp3").play();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 300);
      new Audio("/error.mp3").play();
    }
  };

  const done = images.every((i) => !i.correct);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96">
        <label className="flex items-center gap-3 mb-4">
          <input type="checkbox" onChange={() => setChecked(true)} />
          <span>I’m not a robot</span>
        </label>

        {checked && (
          <div className={`${shake ? "animate-shake" : ""}`}>
            <h2 className="font-bold mb-2">
              Select all images with your Valentine 💕
            </h2>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {IMAGES.map((img) => (
                <button
                  key={img.id}
                  onClick={() => clickImage(img)}
                  className="text-3xl bg-pink-100 rounded-lg h-20 hover:bg-pink-200 transition"
                >
                  {img.label}
                </button>
              ))}
            </div>

            <button
              disabled={!done}
              onClick={() => navigate("/keypad")}
              className={`w-full py-2 rounded-lg text-white ${
                done ? "bg-pink-500" : "bg-gray-300"
              }`}
            >
              Verify
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
