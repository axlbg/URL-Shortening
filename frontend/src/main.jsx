import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewShorten from "./components/router/NewShorten.jsx";
import UpdateShorten from "./components/router/UpdateShorten.jsx";
import DeleteShorten from "./components/router/DeleteShorten.jsx";
import StatsShorten from "./components/router/StatsShorten.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Navbar />
      <Routes>
        <Route path="/" element={<NewShorten></NewShorten>}></Route>
        <Route path="/new" element={<NewShorten></NewShorten>}></Route>
        <Route path="/update" element={<UpdateShorten></UpdateShorten>}></Route>
        <Route path="/delete" element={<DeleteShorten></DeleteShorten>}></Route>
        <Route path="/stats" element={<StatsShorten></StatsShorten>}></Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
