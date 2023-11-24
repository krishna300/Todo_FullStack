import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
// import cors from "cors";
import todoRoutes from './routes/todo.route.js'
dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() =>{
        console.log('Connected to MOngoDB !!!')
    })
    .catch(err => console.log({err}))
const app = express()
app.use(express.json());
// app.use(cors());
const port = 4000;
app.get('/', (req,res)=>{
    res.json({message:'API Main page !'})
})

app.use('/api', todoRoutes)

app.listen(port, ()=>{
    console.log(`Server running on PORT ${port}`);
})
