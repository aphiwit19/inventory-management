import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || 'สมัครไม่สำเร็จ');
        return;
      }
  
      // สมัครสำเร็จ → ไปหน้า dashboard
      navigate('/dashboard');
    } catch (err) {
      alert('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
    }
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
