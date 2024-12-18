import React, { useEffect, useState } from 'react'
import useAuthContext from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import Loader from '../components/Loader';
import AccountNav from '../components/AccountNav';

const AdminDashboard = () => {
  const {user, dispatch, isLoading}=useAuthContext();

  const [redirect, setRedirect]=useState(false);
  const [loading, setLoading]=useState(false);

  const navigate=useNavigate();

  useEffect(()=>{
    if(!isLoading && (!user || user?.role!=='admin')){
      navigate('/login/admin');
    }
  }, [user, isLoading, redirect]);

  const handleClick=async()=>{
    setLoading(true);
    try{
      const res=await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      const data=await res.json();

      if(res.ok){
        dispatch({type: 'LOGOUT'});
        toast.success(data.success, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,  
          transition: Bounce
        });
        setLoading(false);
        setRedirect(true);
      }
      else{
        toast.error(data.error, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,  
          transition: Bounce
        });
        setLoading(false);
      }
    }
    catch(err){
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
      setLoading(false);
    }
  }
  
  useEffect(()=>{
    if(redirect){
      navigate('/');
    }
  }, [redirect, navigate]);

  if(isLoading || loading){
    return <Loader />
  }


  return (
    <div className='w-full min-h-[70vh] text-center text-white p-10'>
      <AccountNav id={user?.role} />

      <p>Signed in as {user?.email}</p>

      <button disabled={loading} onClick={handleClick} className='mt-4 border-2 px-4 py-2 rounded-lg'>Logout</button>
    </div>
  )
}

export default AdminDashboard