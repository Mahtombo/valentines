import { useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import cute from "../assets/cute.png";
import angry from "../assets/angry.jpg";
import crying from "../assets/crying.jpg";
import annoyed from "../assets/annoyed.jpg";
import excited from "../assets/excited.gif";
import shocked from "../assets/shocked.jpg";

const images = [cute, angry, shocked, annoyed, crying, excited];

export default function Valentine() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const noMessages = ["sorry no", "still no", "I said no", "hmm... still no"];
  const [noClicks, setNoClicks] = useState(0);
  // All "no" messages are used once noClicks reaches the length
  const allNoUsed = noClicks >= noMessages.length;
  const [pressedFineOnce, setPressedFineOnce] = useState(false);

  const prompts = [
    "Will you be my Valentine?",
    "I'll be angry at you!",
    "Pleaseee 😭😭😭",
    "I’ll cry if you don’t…",
    "Pleaseee just this time 🥺",
  ];

  // Map header text to noClicks and button state:
  // - 0..3 use prompts[0..3] with matching NO labels
  // - 4 (after last NO) shows "Pleaseee just this time 🥺" with only FINE
  // - After pressing FINE once (pressedFineOnce), show "Okiiee! 💕" with YEAH
  const promptText =
    accepted || pressedFineOnce
      ? "Okiiee! 💕"
      : prompts[Math.min(noClicks, prompts.length - 1)];

  const pressNo = () => {
    // Make YES bigger and NO smaller with each press
    setYesScale((s) => Math.min(s + 0.2, 2.2));
    setNoScale((s) => Math.max(s - 0.2, 0.4));
    // Allow one extra click past the last message to move into the "FINE" state
    setNoClicks((n) => Math.min(n + 1, noMessages.length));
  };

  const yes = () => {
    // If we've exhausted NO options, require one extra "FINE" press before final "YEAH"
    if (allNoUsed && !pressedFineOnce) {
      setPressedFineOnce(true);
      return;
    }

    setAccepted(true);
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcc8c5] px-4 text-center">
      {/* Pixel art border wrapper */}
      <div className="relative max-w-xl w-full bg-pink-50 border-4 rounded-2xl border-pink-900 shadow-[8px_8px_0_0_#9f1239] p-6 md:p-8">
        {/* Inner inset border for extra pixel-y feel */}
        <div className="border-4 border-pink-200 p-4 md:p-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-widest text-pink-900">
            {promptText}
          </h1>

          {/* Image */}
          <img
            src={
              accepted || pressedFineOnce
                ? excited // Okiiee! pairs with excited image
                : images[Math.min(noClicks, images.length - 2)]
            }
            alt="Valentine"
            className="w-full max-h-80 object-cover mb-8 border-4 border-pink-900 shadow-[4px_4px_0_0_#9f1239]"
          />

          {/* Buttons */}
          {!accepted ? (
            <div className="flex gap-6 items-center justify-center">
              <button
                onClick={yes}
                style={{ transform: `scale(${yesScale})` }}
                className="px-10 py-3 bg-[#f97373] hover:bg-[#fb7185] text-white text-xl font-bold tracking-widest border-4 border-[#7f1d1d] rounded-none shadow-[4px_4px_0_0_#7f1d1d] transition transform"
              >
                {allNoUsed ? (pressedFineOnce ? "YEAH" : "FINE") : "YES 💕"}
              </button>

              {!allNoUsed && (
                <button
                  onClick={pressNo}
                  style={{ transform: `scale(${noScale})` }}
                  className="px-8 py-3 bg-[#e5e7eb] hover:bg-[#d1d5db] text-gray-800 text-lg font-bold tracking-wide border-4 border-gray-700 rounded-none shadow-[4px_4px_0_0_#4b5563] transition transform"
                >
                  {noMessages[noClicks]}
                </button>
              )}
            </div>
          ) : (
            <div className="mt-8 inline-block border-4 border-pink-800 bg-pink-200 px-6 py-4 shadow-[6px_6px_0_0_#9f1239]">
              <div className="font-mono text-[18px] leading-snug tracking-widest text-pink-900 uppercase">
                Hehe I love you so much!
              </div>
              <div className="mt-2 font-mono text-[14px] tracking-wide text-pink-900">
                Looking forward to our valentines date 💖
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
