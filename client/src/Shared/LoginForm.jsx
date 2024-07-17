import React, { useContext } from 'react';
import { GoArrowRight } from 'react-icons/go';
import { IoMdClose } from "react-icons/io";
import { AuthContext } from '../AuthProvider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({setRegisterForm}) => {
    const {googleVerify, createUser, moreDetailUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleUserLogin = (e) =>{
        e.preventDefault();

        // userLoading(true);
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        // console.log(name,email,password);
        const details = {name, email};

        createUser(email, password)
        .then(result => {
            const user = result.user;

            moreDetailUser(name)
            .then(result=>{
                toast("Logged In Successful !",{
                    theme: "light",
                    autoClose: 2000,
                    position: "top-center"
                })
                setRegisterForm(false);
            })
            .catch(e=>e);
        })
        .catch(e=>e);
    }

    const handleGoogleAuth = () =>{
        googleVerify()
        .then(result=>{
            const user = result.user;

            toast("Logged In Successful !",{
                theme: "light",
                autoClose: 2000,
                position: "top-center"
            })

            navigate('/create-post');
            setRegisterForm(false);


        })
    }
    
    return (
        <section className='relative md:mx-3'>

            <ToastContainer style={{ width: "260px" }}/>

            <header>
                <h2 className='text-center font-bold text-3xl mb-3 heading'>Sign Up</h2>
            </header>

            <div onClick={()=>setRegisterForm(false)} className='cursor-pointer absolute top-[-45px] right-[-50px] text-[25px] p-10'>
                <IoMdClose/>
            </div>

            <form onSubmit={handleUserLogin}>
            <div className='flex flex-col pb-2'>
                <label className='font-medium heading'>Name</label>
                <input type="text" name="name" placeholder='Enter your name' className='py-3 px-2 outline-none focus:border-[1px] focus:border-blue-500 bg-slate-50 rounded-md' />
            </div>
            <div className='flex flex-col pb-5'>
                <label className='font-medium heading'>Email</label>
                <input type="email" name="email" placeholder='Enter your email' className='py-3 px-2 outline-none focus:border-[1px] focus:border-blue-500 bg-slate-50 rounded-md' />
            </div>
            <div className='flex flex-col pb-5'>
                <label className='font-medium heading'>Password</label>
                <input type="password" name="password" placeholder='Password' className='py-3 px-2 outline-none focus:border-[1px] focus:border-blue-500 bg-slate-50 rounded-md' />
            </div>

            <button type='submit' className='loginBtn w-full py-2 px-3 font-medium text-white'>Sign Up</button>

            <button onClick={handleGoogleAuth} className='flex items-center gap-1 md:text-[14px] text-[12px] border-style btnText mt-4 left-arrow'>Already have an account? Then Click Here ! <GoArrowRight className='text-slate-600 icon-style'/></button>
            
        </form>
        </section>
    );
};

export default LoginForm;