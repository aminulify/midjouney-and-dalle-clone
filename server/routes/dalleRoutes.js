import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.route('/').get((req, res) => {
    res.status(200).json({message: 'Hello from Dall-e!'})
})

router.route('/').post(async(req, res) => {
    try {
              const {prompt}= req.body;

              const aiResponse = await openai.images.generate({
                prompt,
                n: 1,
                size: '512x512',
              });
              
              const image = aiResponse.data;
              // console.log(image);
        
              res.status(200).json({ photo: image });
            } catch (error) {
              console.error(error);
              res.send('Something went wrong');
            }
})

export default router;
