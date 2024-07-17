import React from 'react';
import  download  from '../../public/assets/download.png';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
   
    return (
        <div className="rounded-xl py-2 group relative">
            <img
            className="w-full h-auto object-cover rounded-xl"
            src={photo}
            alt={prompt}
            />
            <div className="group-hover:flex flex-col hidden absolute bottom-3 left-0 right-0 backdrop-blur-lg m-2 p-2 rounded-md">
            <p className="text-white text-[12px] overflow-y-auto prompt cursor-text">{prompt}</p>

            <div className="mt-1 flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full object-cover btn flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
                <p className="text-white text-[12px]">{name}</p>
                </div>
                <button type="button" onClick={() => downloadImage(_id, photo)} className="cursor-pointer outline-none bg-transparent border-none p-2 z-10">
                <img src={download} alt="download" className="cursor-pointer w-6 h-6 object-contain invert" />
                </button>
            </div>
            </div>
        </div>
    );
};

export default Card;