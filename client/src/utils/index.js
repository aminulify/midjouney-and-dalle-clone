import FileSaver, {} from "file-saver";

import { getPrompt } from "../Constants/prompt";

export function getRandomPrompt(prompt){
    // console.log(prompt);
    const randomIndex = Math.floor(Math.random()* getPrompt.length);
    // console.log(randomIndex);
    const randomPrompt = getPrompt[randomIndex];
    // console.log(randomPrompt);

    if(randomPrompt === prompt){
        return getRandomPrompt(prompt);
    }
    return randomPrompt;
}

export function downloadImage(_id, photo){
 FileSaver.saveAs(photo, `download-${_id}.jpg`);
}