import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import Cards from './dbCards.js';

//api config
const app=express();
const port=process.env.PORT||5000;
//const MONGO_URI='mongodb+srv://tinder:tinder@cluster0.y0bmv.mongodb.net/tinderdb?retryWrites=true&w=majority'
//middleware
app.use(express.json());
app.use(cors());

//Db config
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})

//api endpoint
app.get('/',(req,res)=>{
    res.status(200).send("hello world");
})
app.post('/cards',(req,res)=>{
const db=req.body;
Cards.create(db,(err,data)=>{
    if(err){
        res.status(500).send(err);
    }else{
        res.status(201).send(data);
    }
})
})

app.get('/cards',(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
    
})

app.listen(port,()=>console.log(`running on port ${port}`));