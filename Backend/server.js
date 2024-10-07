const mongoose=require('mongoose');
const express=require('express');
const cors=require('cors');
require('dotenv').config();
const port=process.env.PORT || 3000;
const path = require('path'); 

const connectDB=require('./config/connection');

const app=express();
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:4200', // Allow requests from your Angular app
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
));
connectDB();

app.use('/',require('./Routes/mainRoutes'));

app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});