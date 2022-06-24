import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";


function App() {
  return (
    <div className='container-home'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
