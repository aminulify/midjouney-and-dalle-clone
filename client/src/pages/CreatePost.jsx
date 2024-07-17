import React, { useContext, useState } from 'react';
import previewImg from '../../public/assets/preview1.png';
import { useNavigate } from 'react-router-dom';
import FormField from '../Shared/FormField';
import Loading from '../Shared/Loading';
import { GoArrowRight } from "react-icons/go";
import { getRandomPrompt } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../AuthProvider/AuthProvider';

const CreatePost = () => {
    const {user} = useContext(AuthContext);
    // console.log(user);

    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: user?.displayName || '',
        prompt: '',
        photo: '',
    })

    // console.log(form);

    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const generateImage = async() =>{
     
        if (form.prompt && typeof(form.prompt) === 'string') {
            try {
              setGeneratingImg(true);
              const res = await fetch('http://localhost:3000/dalle', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                 {prompt: form.prompt}),
              });
      
              const data = await res.json();
              setForm({ ...form, photo: `${data.photo[0].url}` });

                // react-toastify
                toast("Successfully Generated !",{
                    theme: "light",
                    autoClose: 2000,
                })

            } catch (err) {
                 // react-toastify
                toast("Limit Finished !",{
                    theme: "light",
                    autoClose: 2000,
                })

            } finally {
              setGeneratingImg(false);
            }
          }

          else{
            // react-toastify
            toast("Please Enter Your Prompt !",{
                theme: "light",
                autoClose: 2000,
            })
          }

        };


    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(form.prompt && form.photo){
            setLoading(true);

            try{
                const res = await fetch('http://localhost:3000/generate',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form)
                })

                const data = await res.json();

                navigate('/');
                console.log(data);
    
                toast("Shared Successful !",{
                    theme: "light",
                    autoClose: 1000,
                })  
                   
            }

            catch(err){
                console.log('e',err);
                // react-toastify
            toast("Storage Full !",{
                theme: "light",
                autoClose: 3000,
            })
            }
            finally{
                setLoading(false);
            }
        }
        else{
            // react-toastify
            toast("Please Enter Your Prompt & Generate Image !",{
                theme: "light",
                autoClose: 3000,
            })
        }
    }

    const handleChange = (e) =>{
        setForm({...form, [e.target.name] : e.target.value})
    }

    const handleSurpriseMe = () =>{
        const randomPrompt = getRandomPrompt(form.prompt);
        // console.log(randomPrompt);
        setForm({...form, prompt: randomPrompt})
    }

    

    return (
        <section className='max-w-5xl md:mx-auto mx-10 mb-5'>
            <div>
                <h1 className='font-bold heading md:text-[32px] text-[28px]'>Create</h1>
                <p className='para text-[14px] md:text-lg'>Create imagine and visually stunning images through OpenAi and share the with the community.</p>

                {/* toast  */}
                <ToastContainer style={{ width: "260px" }}/>
            </div>

            <form className='mt-12 max-w-3xl' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                    
                    <FormField
                        labelName={"Your Name"}
                        type={'text'}
                        name={'name'}
                        placeholder={"Enter your name"}
                        value={form.name}
                        handleChange={handleChange}
                    />
                    
                    <FormField
                        labelName={'Prompt'}
                        isSurpriseMe
                        type={'text'}
                        name={'prompt'}
                        placeholder={"Enter prompt or click surprise me..."}
                        value={form.prompt}
                        handleChange={handleChange}
                        handleSurpriseMe={handleSurpriseMe}
                    />

                    <div className="relative bg-gray-50 border border-gray-300 heading text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] w-64 p-3 flex justify-center items-center mt-2">
                        {
                            form.photo ? (
                                <img src={form.photo} alt={form.prompt}
                                className='w-full h-full object-contain'
                                />
                            ) : (
                                <img src={previewImg} alt="preview image"
                                className='w-5/6 h-5/6 object-contain opacity-50'
                                />
                            )
                        }
                        {
                            generatingImg && (
                                <div>
                                    <Loading/>
                                </div>
                            )
                        }
                    </div>
                 
                </div>

                <div className='mt-5 flex gap-5'>
                        <button className='btn text-white text-sm font-medium px-6 py-3'
                        type='button'
                        onClick={generateImage}
                        >
                            {
                                generatingImg ? "Generating..." : 'Generate'
                            }
                        </button>
                </div>
                <div className='mt-6'>
                        <p className='para text-sm'>Once you have created the image you want, you can share it with others in the community.</p>
                        <button
                        type='submit' className='btnText border-style mt-1 text-white font-medium text-sm '>
                            {
                                loading ? "Sharing..." : (
                                <div className="flex items-center gap-[1px] left-arrow"><span>Share with the community</span> <GoArrowRight className='text-slate-600 icon-style'/></div>)
                            }
                        </button>
                </div>
            </form>
        </section>
    );
};

export default CreatePost;