import express from 'express';
import * as dotenv from 'dotenv';
import { config, uploader } from 'cloudinary';
import Generate from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
  });

// GET ALL POSTS 
router.route('/').get(async(req,res)=>{

    try{
        
        const posts = await Generate.find({});
        // console.log(posts);
        res.status(200).json({success: true, data: posts});
        // res.send(posts);
    }
    catch{
        res.status(500).json({success: false, message: 'Fetching post failed, Try again...'})
    }
})  

// CREATE A POST 
router.route('/').post(async(req,res)=>{

   try{
    const {name, prompt, photo} = req.body;
    // console.log(name, prompt, photo);

    const photoUrl = await uploader.upload(photo);
    // console.log(photoUrl.url);

    const newPost = new Generate({
        name,
        prompt,
        photo: photoUrl.url,
    })

    console.log("all",newPost);
    const savedPost = await newPost.save();
    res.send({success: true, data: savedPost});
    }
    
   catch(error){
    res.status(500).json({success: false, message: error})
   }
})

export default router;