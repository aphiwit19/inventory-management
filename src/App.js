import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashbord from "./page/Dashboard";
import Register from "./page/Register";
import Login from "./page/Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashbord />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;