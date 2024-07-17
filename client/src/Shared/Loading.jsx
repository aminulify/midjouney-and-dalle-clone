import React from 'react';
import loading from '../../public/assets/logo.svg'

const Loading = () => {
    return (
        <div className='snipper'>
            <img src={loading} alt="" className='w-12 h-12 translate-x-[-50%]' />
        </div>
    );
};

export default Loading;