// src/page/Login.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); // เริ่ม loading

    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'เข้าสู่ระบบไม่สำเร็จ');
        return;
      }

      // เก็บสถานะผู้ใช้ชั่วคราว
      localStorage.setItem('currentUser', username);
      navigate('/dashboard');
    } catch {
      setError('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
    } finally {
      setLoading(false); // จบ loading
    }
  }

  return (
    <div className="container">
      <div className="form-card">
        <div className="header">
          <h1 className="title">เข้าสู่ระบบ</h1>
          <p className="subtitle">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <div className="input-group">
            <label>
              ชื่อผู้ใช้
              <input
                type="text"
                className="input"
                placeholder="ชื่อผู้ใช้"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              รหัสผ่าน
              <input
                type="password"
                className="input"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>
        <div className="register-link">
          <p>ยังไม่มีบัญชี? <button className="link-button" onClick={() => navigate('/register')}>สมัครสมาชิก</button></p>
        </div>
      </div>
    </div>
  );
}

export default Login;