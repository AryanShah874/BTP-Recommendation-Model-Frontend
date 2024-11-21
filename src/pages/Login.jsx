import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast, Bounce } from 'react-toastify';
import useAuthContext from '../hooks/useAuthContext';
import Loader from '../components/Loader';
import { OpenEyeIcon } from '../components/Icons';
import { CloseEyeIcon } from '../components/Icons';
import PageNotFound from '../components/PageNotFound';

const Login = () => {
  const {id}=useParams();

  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');

  const [loading, setLoading]=useState(false);
  const [redirect, setRedirect]=useState(false);
  const [showPassword, setShowPassword]=useState(false);
  const [pageNotFound, setPageNotFound]=useState(false);

  const {user, dispatch}=useAuthContext();

  const navigate=useNavigate();

  useEffect(()=>{
    if(user && !redirect){
      navigate(`/${user.role}`);
    }
  }, [user, navigate, redirect]);

  useEffect(()=>{
    if(!['admin', 'professor', 'student'].includes(id)){
      setPageNotFound(true);
    }
  }, [id]);

  if(pageNotFound){
    return <PageNotFound />
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);

    try{
      const res=await fetch(`/api/${id}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      });

      const data=await res.json();

      if(res.ok){
        setLoading(false);

        dispatch({type: 'LOGIN', payload: data.user});

        toast.success(data.success, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,  
          transition: Bounce
        });
        
        setRedirect(true);
      }
      else{
        setLoading(false);
        toast.error(data.error, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,  
          transition: Bounce
        });
      }
    }
    catch(err){
      setLoading(false);
      console.log(err);
      toast.error('Internal server error', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,  
        transition: Bounce
      });
    }
  }
  
  if(redirect){
    return navigate(`/${user.role}`);
  }

  if(loading){
    return <Loader />
  }


  return (
    <div className='w-full min-h-[70vh] flex flex-col justify-center items-center text-black'>
      <h1 className='text-3xl font-medium leading-9 tracking-tight'>Login as {id[0].toUpperCase()+id.slice(1)}</h1>
      
      <div className='mt-10 w-[30%] text-center'>
        <form method='POST' onSubmit={handleSubmit} className='space-y-6'>
          <div className='mt-2'>
            <input className='px-4 py-2 w-full rounded-lg' placeholder='email@gmail.com' type="email" id='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required autoComplete='email' />
          </div>
          <div className='mt-2 relative'>
            <input className='px-4 py-2 w-full rounded-lg' placeholder='password' type={showPassword ? 'text' : 'password'} id='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} required autoComplete='current-password' minLength={6} />
            {showPassword ? <OpenEyeIcon onClick={()=>setShowPassword(false)} className='!w-6 !h-6 absolute right-2 top-2 cursor-pointer' /> : <CloseEyeIcon onClick={()=>setShowPassword(true)} className='!w-6 !h-6 absolute right-2 top-2 cursor-pointer' />}
          </div>

          <div>
            <button disabled={loading} type='submit' className='w-full text-white bg-[#FD2A0B] px-4 py-2 rounded-lg mt-3'>Login</button>
          </div>
        </form>

        <p className='mt-6'>Not a user? <Link to={id==='admin' ? '/register' : '/contact'} className='underline font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>Register</Link></p>
      </div>
    </div>
  )
}

export default Login