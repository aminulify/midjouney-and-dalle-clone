import React, { useContext, useState } from 'react';
import logo from '../../public/assets/logo.svg';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import LoginForm from '../Shared/LoginForm';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const {user, logOut} = useContext(AuthContext);
    const [registerForm, setRegisterForm] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () =>{
        logOut()
        .then(()=>{
            navigate('/');
            toast("Logout !",{
                theme: "light",
                autoClose: 2000,
                position: "top-center"
            })
        })
        
        .catch(e=>{e})
    }
    return (
        <div className='md:mx-10'>

            <ToastContainer style={{ width: "160px" }}/>

            {/* Login Form  */}
            {
                registerForm && <aside className='fixed md:w-2/5 w-4/5 p-10 bg-white rounded-md top-[15%] left-[50%] translate-x-[-50%] z-20 login-shadow'>
            
                <LoginForm setRegisterForm={setRegisterForm}/>
            
            </aside>
            }
            
            <header className='max-w-5xl md:mx-auto flex justify-between mx-10 py-5 '>
                <div className='h-10 w-10'>
                    <Link to='/' className='cursor-pointer'><img src={logo} alt="logo" /></Link>
                </div>
                <div className='flex gap-5 items-center'>
                    {
                        !user ? <button onClick={()=>setRegisterForm(true)} className='btn py-3 px-6 text-md font-medium bg-black text-white'>Create</button> : <Link to={'/create-post'}><button className='btn py-3 px-6 text-md font-medium bg-black text-white'>Create</button></Link>
                    }

                    {
                        user?.email && <div onClick={handleLogOut} className='text-[18px] heading cursor-pointer z-30 btn-zoomIn-zoomOut'><h1 className='btnText font-medium'>Logout</h1></div>
                    }
                </div>
            </header>
            
            <Outlet/>
        </div>
    );
};

export default Navbar;