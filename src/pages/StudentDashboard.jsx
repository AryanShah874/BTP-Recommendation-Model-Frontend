import React, { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import useAuthContext from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { toast, Bounce } from 'react-toastify';

const StudentDashboard = () => {
  const { user, dispatch, isLoading } = useAuthContext();

  const [loading, setLoading]=useState(false);
  const [redirect, setRedirect]=useState(false);  

  const navigate=useNavigate(); 

  useEffect(() => {
    if ((!user || user?.role !== 'student') && !isLoading) {
      navigate('/login/student');
    }
  }, [user, isLoading, navigate]);

  const handleClick=async()=>{
    try{
      const res=await fetch('/api/logout', {
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
      setLoading(false);
      console.log(err);
      toast.error('Internal Server Error', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce
      })
    }
  }

  if((isLoading || loading) && !redirect){
    return <Loader />
  }

  if(redirect){
    navigate('/');
  }

  return (
    <div className='w-full min-h-[70vh] text-center text-white p-10'>
      <AccountNav id={'student'} />

      <div className='bg-gray-200 mx-auto text-black p-6 rounded-lg shadow-lg w-full max-w-lg'>
        <div className='mb-2 flex gap-2'>
          <label htmlFor="Name">Name: </label>
          <p>{user?.name?.firstName} {user?.name?.lastName}</p>
        </div>
        <hr className='w-full h-[2px] bg-gray-400' />
        <div className='my-2 flex gap-2'>
          <label htmlFor="rollNumber">Roll Number: </label>
          <p>{user?.roll}</p>
        </div>
        <hr className='w-full h-[2px] bg-gray-400' />
        <div className='my-2 flex gap-2'>
          <label htmlFor="email">Email: </label>
          <p>{user?.email}</p>
        </div>
        <hr className='w-full h-[2px] bg-gray-400' />
        <div className='my-2 flex gap-2'>
          <label htmlFor="department">Department: </label>
          <p>{user?.department}</p>
        </div>
      </div>

      <button onClick={handleClick} className='mt-4 border-2 px-4 py-2 rounded-lg'>Logout</button>
    </div>
  )
}

export default StudentDashboard