require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./authRoutes');

const app = express();

app.use(cors({origin: 'http://localhost:3000',credentials:false}));

app.use(express.json());

app.use('/auth',authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`API running on http://localhost:${PORT}`);
});
