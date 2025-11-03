const Database = require("better-sqlite3");

// สร้าง/เปิดไฟล์ฐานข้อมูลชื่อ app.db (จะอยู่ในโฟลเดอร์ server)
const db = new Database(process.env.DATABASE_FILE || 'app.db'); 

// สร้างตาราง users ถ้ายังไม่มี
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     username TEXT NOT NULL UNIQUE,
     password TEXT NOT NULL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

module.exports = {db};
