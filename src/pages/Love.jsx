import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import quokka from "../assets/quokka.png";

export default function Love() {
  const [pos, setPos] = useState({
    position: "absolute",
    left: "60%",
    top: "55%",
  });
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 bg-[#f97373] bg-contain bg-center"
      style={{ backgroundImage: `url(${quokka})`, backgroundSize: "contain" }}
    >
      {/* Pixel-art frame */}
      <div className="relative max-w-md w-full bg-pink-50 border-4 border-pink-900 shadow-[8px_8px_0_0_#9f1239] p-4 md:p-6 text-center">
        <div className="border-4 border-pink-200 p-4 md:p-5 flex flex-col items-center gap-6">
          <h1 className="font-mono text-lg md:text-2xl tracking-widest text-pink-900 uppercase">
            Do you love me pookie?
          </h1>

          <div className="flex items-center justify-center gap-4 mt-2">
            <button
              onClick={() => navigate("/slide")}
              className="px-8 py-4 bg-[#f97373] hover:bg-pink-600 text-white text-xl font-mono font-bold tracking-widest border-4 border-[#7f1d1d] rounded-none shadow-[4px_4px_0_0_#7f1d1d] transition"
            >
              YES
            </button>
          </div>
        </div>
      </div>

      {/* Runaway NO button that can leave the frame */}
      <button
        onMouseEnter={() =>
          setPos({
            position: "absolute",
            left: Math.random() * 80 + "%",
            top: Math.random() * 70 + "%",
          })
        }
        style={pos}
        className="px-4 py-2 bg-[#e5e7eb] hover:bg-[#d1d5db] text-gray-800 text-sm font-mono font-bold tracking-wide border-4 border-gray-700 rounded-none shadow-[4px_4px_0_0_#4b5563] transition"
      >
        NO
      </button>
    </div>
  );
}
