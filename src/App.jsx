import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";
import SelectionMode from "./pages/SelectionMode";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selection-mode" element={<SelectionMode />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
