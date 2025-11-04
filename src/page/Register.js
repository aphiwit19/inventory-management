import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import the CSS file

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Clear previous errors
    setError("");
    
    // Basic validation
    if (!username || !password) {
      setError("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }
    
    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.error || 'สมัครไม่สำเร็จ');
        return;
      }
  
      // สมัครสำเร็จ → ไปหน้า dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
    }
  }

  return (
    <div className="container">
      <div className="form-card">
        <div className="header">
          <h1 className="title">สร้างบัญชีผู้ใช้</h1>
          <p className="subtitle">กรุณากรอกข้อมูลเพื่อสมัครสมาชิก</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <div className="input-group">
            <label>
              ชื่อผู้ใช้
              <input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              รหัสผ่าน
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <button type="submit" className="button">สมัครสมาชิก</button>
        </form>
        <div className="login-link">
          {/* Fixed the navigation to Login page */}
          <p>มีบัญชีแล้ว? <button className="link-button" onClick={() => navigate('/login')}>เข้าสู่ระบบ</button></p>
        </div>
      </div>
    </div>
  );
}

export default Register;