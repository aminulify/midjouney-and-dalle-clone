import React from 'react';

const FormField = ({labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe}) => {
    return (
        <div>
            <div className="items-center gap-2">
                <label
                htmlFor={name}
                className='block text-sm font-medium heading mb-1'
                >
                    {labelName}
                    {
                    isSurpriseMe && (
                        <button
                            type='button'
                            onClick={handleSurpriseMe}
                            className='btn font-semibold text-xs ml-1 py-[2px] px-2 rounded-[5px] text-white'
                        >Surprise Me</button>
                    )
                }
                </label>
                
                <input type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    required
                    className='bg-gray-50 border border-gray-300 heading text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
                />
            </div>
        </div>
    );
};

export default FormField;