import { Routes, Route } from "react-router-dom";
import Recaptcha from "./pages/Recaptcha";
import Keypad from "./pages/Keypad";
import Valentine from "./pages/Valentine";
import GridBoard from "./pages/GridBoard";
import Yeet from "./pages/yeet";
import Love from "./pages/Love";
import Slide from "./pages/Slide";
import FakeProgress from "./pages/FakeProgress";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Recaptcha />} />
      <Route path="/grid-board" element={<GridBoard />} />
      <Route path="/keypad" element={<Keypad />} />
      <Route path="/valentine" element={<Valentine />} />
      <Route path="/yeet" element={<Yeet />} />
      <Route path="/love" element={<Love />} />
      <Route path="/slide" element={<Slide />} />
      <Route path="/progress" element={<FakeProgress />} />
    </Routes>
  );
}
