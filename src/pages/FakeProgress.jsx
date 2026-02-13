import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function FakeProgress({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stuck, setStuck] = useState(false);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    const steps = [10, 42, 99];
    let i = 0;

    const interval = setInterval(() => {
      setProgress(steps[i]);
      i++;

      if (i === steps.length) {
        clearInterval(interval);
        setTimeout(() => setStuck(true), 600);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const encourage = () => {
    setApproved(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.7 },
    });

    setTimeout(onComplete, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center space-y-6">
      <h2 className="text-xl font-bold">Calculating Valentine Eligibility…</h2>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-pink-500 h-4 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-pink-500 font-semibold text-lg">{progress}%</div>

      {/* Stuck State */}
      {stuck && !approved && (
        <>
          <div className="text-gray-500 italic animate-pulse">
            System seems… emotionally overwhelmed 😳
          </div>

          <button
            onClick={encourage}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-xl transition"
          >
            Encourage system 💖
          </button>
        </>
      )}

      {/* Approved State */}
      {approved && (
        <div className="text-2xl font-bold text-green-600 animate-bounce">
          💘 Approved
        </div>
      )}
    </div>
  );
}
