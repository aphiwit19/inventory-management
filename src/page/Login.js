// src/page/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'ล็อกอินไม่สำเร็จ');
        return;
      }

      // ทางเลือกง่าย: เก็บสถานะผู้ใช้ชั่วคราว
      localStorage.setItem('currentUser', username);
      navigate('/dashboard');
    } catch {
      setError('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>เข้าสู่ระบบ</h2>
      <input
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="รหัสผ่าน"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">เข้าสู่ระบบ</button>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </form>
  );
}

export default Login;