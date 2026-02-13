import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";
import img7 from "../assets/7.jpg";
import img8 from "../assets/8.jpg";
import img9 from "../assets/9.jpg";
import ss from "../assets/ss.png";

const dummyImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

export default function GridBoard() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [shake, setShake] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);

  const clickImage = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
    setShowTryAgain(false);
  };

  // Only allow verify when ALL images have been clicked at least once
  const done = selected.length === dummyImages.length;

  const handleVerify = () => {
    if (done) {
      navigate("/keypad");
      return;
    }

    // Not done: clear selections, shake, and hide "try again"
    setSelected([]);
    setShowTryAgain(true);
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fecaca] px-4">
      {/* Outer pixel-art frame */}
      <div className="relative max-w-xl w-full bg-pink-50 border-4 border-pink-900 shadow-[8px_8px_0_0_#9f1239] p-4 md:p-6">
        <div
          className={`border-4 border-pink-200 p-3 md:p-4 ${
            shake ? "animate-shake" : ""
          }`}
        >
          {/* Header */}
          <div className="bg-[#e11d48] border-4 border-pink-900 px-3 py-2 shadow-[4px_4px_0_0_#9f1239] mb-4">
            <div className="font-mono text-[11px] md:text-xs text-pink-100 tracking-widest uppercase">
              Select all images of
            </div>
            <div className="font-mono text-lg md:text-2xl text-white tracking-widest">
              your DOOKIE BAO B
            </div>
            <div className="font-mono text-[11px] md:text-xs text-pink-100 mt-1">
              Click verify once there are none left.
            </div>
          </div>

          {/* Image grid */}
          <div className="mt-2 grid grid-cols-3 gap-1.5 mb-4 border-4 border-pink-900 bg-pink-200 p-1">
            {dummyImages.map((img, index) => {
              const isSelected = selected.includes(index);
              return (
                <button
                  key={index}
                  onClick={() => clickImage(index)}
                  className={`relative aspect-square border-4 border-pink-900 overflow-hidden shadow-[3px_3px_0_0_#9f1239] ${
                    isSelected ? "outline outline-4 outline-red-400" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt="dummy image"
                    className="w-full h-full object-cover"
                    style={{ imageRendering: "pixelated" }}
                  />
                  {isSelected && (
                    <span className="absolute top-1 left-1 text-red-500 text-xl drop-shadow-[2px_2px_0_#fff]">
                      ♥
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between gap-3">
              <div className="border-4 border-pink-900 bg-white px-2 py-1 shadow-[3px_3px_0_0_#9f1239]">
                <img
                  src={ss}
                  alt="ss"
                  className="h-6 w-auto"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <button
                onClick={handleVerify}
                className="flex-1 py-2 bg-[#e11d48] text-white font-mono tracking-widest text-xs md:text-sm border-4 border-pink-900 rounded-none shadow-[4px_4px_0_0_#9f1239] transition hover:bg-[#fb7185]"
              >
                VERIFY
              </button>
            </div>
            {showTryAgain && (
              <div className="text-center text-[11px] font-mono text-pink-900 mt-5">
                Try again dummy — you haven&apos;t clicked all the images yet
                dummy.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
