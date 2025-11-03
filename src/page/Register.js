import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    navigate("/Dashbord");
  }

  return (
    <div>
      <h2>สมัครสมาชิก</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            ชื่อ
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            รหัสผ่าน
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            ></input>
          </label>
        </div>
        <button type="submit">สมัครสมาชิก</button>
      </form>
    </div>
  );
}

export default Register;
