import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Decks from "./pages/Decks";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/decks/:deckId" element={<Decks />}></Route>
      </Routes>
    </>
  );
}

export default App;
