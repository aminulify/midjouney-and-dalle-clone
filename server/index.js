import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
<<<<<<< HEAD
=======
import OpenAI from 'openai';
>>>>>>> 360ab5c05ebd1e876a17cbf39a06cd3e333f247c
import PostRoutes from './routes/postRoutes.js';
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
