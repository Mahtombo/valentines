import { useState } from "react";
import { useNavigate } from "react-router-dom";
import capybara from "../assets/capybara.jpg";

const CORRECT = "1511"; // CHANGE THIS ❤️

const TEASES = [
  "I hate you (but you’re still my favorite human) 💘",
  "We’re breaking up… just kidding, try again 😘",
  "Wrong. I’m filing a complaint with HR (Heart Resources) 💼💔",
  "Wow. Fake fan energy detected. Try again 🧐💓",
  "Incorrect. I’m dramatically sighing and rolling my eyes 🙄❤️",
  "That answer hurt my feelings a tiny bit 🥺💔",
  "Nope. Clearly you don’t love me enough… yet 💅💕",
  "Try again before I start telling everyone you forgot our date 😤💌",
  "WRONG. You owe me a hug now. And a snack. 🍪💞",
  "Ouch. My heart just lagged. Refresh your memory and retry 🔁💗",
  "Nope! I still love you… but I’m judging you a little 😇",
  "Try again or I’m stealing the blanket tonight 🛏️💔",
  "That’s wrong. Relationship points -5… just kidding (maybe) 💳❤️",
];

export default function Keypad() {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [showTease, setShowTease] = useState(false);
  const [teaseMessage, setTeaseMessage] = useState(TEASES[0]);
  const navigate = useNavigate();

  const press = (n) => {
    if (input.length < 4) setInput(input + n);
    setShowTease(false);
  };

  const submit = () => {
    if (input === CORRECT) {
      navigate("/love");
    } else {
      setShake(true);
      new Audio("/error.mp3").play();
      setTimeout(() => setShake(false), 300);
      setInput("");
      const nextTease = TEASES[Math.floor(Math.random() * TEASES.length)];
      setTeaseMessage(nextTease);
      setShowTease(true);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 bg-[#f97373] bg-contain bg-center"
      style={{ backgroundImage: `url(${capybara})`, backgroundSize: "cover" }}
    >
      {/* Pixel-art frame */}
      <div className="max-w-sm w-full bg-pink-50 border-4 border-pink-900 shadow-[8px_8px_0_0_#9f1239] p-4 md:p-6">
        <div className="border-4 border-pink-200 p-4 md:p-5 flex flex-col items-center gap-4">
          <h1 className="font-mono text-lg md:text-xl tracking-widest text-pink-900 uppercase text-center">
            When is our anniversary date?
          </h1>

          {/* Input boxes */}
          <div className={`flex gap-2 ${shake ? "animate-shake" : ""}`}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-9 h-11 border-4 border-pink-900 bg-white text-center text-xl font-mono shadow-[3px_3px_0_0_#9f1239] flex items-center justify-center"
              >
                {input[i] ? "•" : ""}
              </div>
            ))}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-3 mt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "←", 0, "✓"].map((k) => (
              <button
                key={k}
                onClick={() =>
                  k === "←"
                    ? setInput(input.slice(0, -1))
                    : k === "✓"
                      ? submit()
                      : press(k)
                }
                className="w-16 h-16 bg-[#fecaca] hover:bg-[#fb7185] text-pink-900 text-xl font-mono font-bold border-4 border-pink-900 rounded-none shadow-[4px_4px_0_0_#9f1239] transition"
              >
                {k}
              </button>
            ))}
          </div>

          {/* Teasing message */}
          {showTease && (
            <div className="mt-3 px-4 py-3 border-4 border-rose-800 bg-rose-300 shadow-[4px_4px_0_0_#7f1d1d] font-mono text-sm text-rose-900 text-center">
              {teaseMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
