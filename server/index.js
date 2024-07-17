import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import OpenAI from 'openai';
import PostRoutes from './routes/PostRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
const port = process.env.PORT || 3000;
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/generate', PostRoutes);
app.use('/dalle', dalleRoutes);

app.get('/', async(req,res)=>{
    res.send('Hello OpenAi is Running!')
})

const startServer = async() =>{
    try{
        connectDB()
        app.listen(port,()=>{
            console.log(`Server has started on port: ${port}`);
        })
    }
    catch(e){
        console.log(e);
    }
}
startServer();