import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashbord from "./page/Dashbord";
import Register from "./page/Register";
import Login from "./page/Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
