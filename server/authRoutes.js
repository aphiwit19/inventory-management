// server/authRoutes.js
const express = require('express');
const { db } = require('./db');

const router = express.Router();

//สมัครสมาชิก
router.post('/register', (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: 'ต้องกรอก username และ password' });
    }

    try{
        const stmt = db.prepare('INSERT INTO users (username,password) VALUES(?,?)');
        const info = stmt.run(username.trim(), password.trim());
        return res.status(201).json({id:info.lastInsertRowid,username:username.trim()});
    }catch(err){
        if(String(err.message).includes('UNIQUE')){
            return res.status(409).json({error: 'ชื่อผู้ใช้นี้ถูกใช้แล้ว'});

        }
        return res.status(500).json({error:'สมัครไม่สำเร็จ'});
    }
});

//ล็อคอิน
router.post('/login',(req,res)=>{
    const {username,password}= req.body || {};
    if(!username || !password){
        return res.status(400).json({error: 'ต้องกรอก username และ password' });

    }
    const user = db.prepare('SELECT * FROM users WHERE username = ? AND password =?')
                .get(username.trim(), password.trim());
    if(!user){
        return res.status(401).json({error:'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'});
    }
    return res.json({ message: 'ล็อกอินสำเร็จ', user: { id: user.id, username: user.username }});
})
    
module.exports = router;
