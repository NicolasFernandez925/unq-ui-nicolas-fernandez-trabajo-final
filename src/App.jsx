import { Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";

function App() {
  return (
    <div className="container-home">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
