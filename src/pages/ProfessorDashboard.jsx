import React, { useEffect, useRef, useState } from 'react'
import AccountNav from '../components/AccountNav'
import useAuthContext from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import usePreviewImg from '../hooks/usePreviewImg';
import Loader from '../components/Loader';

const ProfessorDashboard = () => {
  const {user, dispatch, isLoading}=useAuthContext();

  const [researchAreas, setResearchAreas]=useState(user?.researchAreas || '');

  const [loading, setLoading]=useState(false);
  const [redirect, setRedirect]=useState(false);
  
  const {handleImageChange, imgURL, setImgURL}=usePreviewImg();
  const fileRef=useRef(null);

  const navigate=useNavigate();

  const [showButtons, setShowButtons]=useState(false);
  const [initialImgURL, setInitialImgURL]=useState(user?.profilePic || '');
  const [initialResearchAreas, setInitialResearchAreas]=useState(user?.researchAreas || '');

  useEffect(()=>{ 
    if(!user || user?.role!=='professor' && isLoading){
      navigate('/login/professor');
    }
  }, [user, isLoading, navigate]);

  //for showing buttons after image is selected
  const handleImageChangeWrapper=(e)=>{ 
    handleImageChange(e);
    setShowButtons(true);
  }

  const handleCancel=()=>{
    setResearchAreas(initialResearchAreas);
    setImgURL(initialImgURL);
    setShowButtons(false);
  }

  const handleUpdate=async()=>{
    setLoading(true);

    try{
      const updates={userId: user._id};

      if(imgURL!==initialImgURL){
        updates.profilePic=imgURL;
      }
      if(researchAreas!==initialResearchAreas){
        updates.researchAreas=researchAreas;
      }

      const res=await fetch('/api/professor/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(updates)
      });

      const data=await res.json();

      if(res.ok){
        dispatch({type: 'UPDATE_USER', payload: data.user});
        setInitialImgURL(data.user.profilePic);
        setInitialResearchAreas(data.user.researchAreas);
        setLoading(false);
        setShowButtons(false);
        toast.success(data.success, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,  
          transition: Bounce
        });
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
      console.log(err);
      setLoading(false);
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

  //why? to show buttons only when there is a change
  useEffect(()=>{
    if(researchAreas!==initialResearchAreas || imgURL!==initialImgURL){
      setShowButtons(true);
    }
    else{
      setShowButtons(false);
    }
  }, [imgURL, researchAreas, initialImgURL, initialResearchAreas]);

  const handleClick=async()=>{
    setLoading(true);

    try{
      const res=await fetch('/api/logout', {
        method: 'GET',
        credentials: 'include',
      });

      const data=await res.json();

      if(res.ok){
        dispatch({type: 'LOGOUT'});
        setLoading(false);
        setRedirect(true);
        toast.success(data.success, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,  
          transition: Bounce
        });
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
      console.log(err);
      setLoading(false);
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

  if((isLoading || loading) && !redirect){
    return <Loader />
  }

  if(redirect){
    navigate('/');
  }

  return (
    <div className='w-full min-h-[70vh] text-center text-white p-10'> 
      <AccountNav id={'professor'} />

      <div className='bg-gray-200 mx-auto text-black p-6 rounded-lg shadow-lg w-full max-w-xl'>
        <div className='flex gap-6 items-center'>
          <img src={imgURL || user?.profilePic} alt="profile" className='w-40 h-40 rounded-full object-cover' />
          <button onClick={()=>fileRef.current.click()} className='w-full bg-gray-600 h-10 rounded-lg text-white'>Change Avatar</button>
          <input type="file" accept="image/*" hidden ref={fileRef} onChange={handleImageChangeWrapper} />
        </div>
        {/* <hr className='my-4 w-full h-[3px] bg-gray-400' /> */}
        <div className='mt-4 flex gap-2'>
          <label htmlFor="Name">Name: </label>
          <p>{user?.name?.firstName} {user?.name?.lastName}</p>
        </div>
        <hr className='my-2 w-full h-[3px] bg-gray-400' />
        <div className='flex gap-2'>
          <label htmlFor="Email">Email: </label>
          <p>{user?.email}</p>
        </div>
        <hr className='my-2 w-full h-[3px] bg-gray-400' />
        <div className='flex gap-2'>
          <label htmlFor="Department">Department: </label>
          <p>{user?.department}</p>
        </div>
        <hr className='my-2 w-full h-[3px] bg-gray-400' />
        <div className='flex gap-2'>
          <label htmlFor="Designation">Designation: </label>
          <p>{user?.designation}</p>
        </div>
        <hr className='my-2 w-full h-[3px] bg-gray-400' />
        <div className='flex gap-2'>
          <label className='whitespace-nowrap' htmlFor="researchAreas">Research Areas: </label>
          {/* <p>{user?.researchAreas}</p> */}
          <textarea className='w-full p-2 border-2 border-gray-400 bg-gray-200 rounded-lg' name="researchAreas" value={researchAreas} onChange={(e)=>setResearchAreas(e.target.value)}  id="researchAreas" rows={8} />
        </div>

        {showButtons && 
          <div className='mt-4 flex gap-4'>
            <button onClick={handleCancel} className='w-1/2 bg-red-500 text-white py-2 rounded-lg'>Cancel</button>
            <button onClick={handleUpdate} className='w-1/2 bg-green-600 text-white py-2 rounded-lg'>Update</button>
          </div>}
      </div>

      <button onClick={handleClick} className='w-1/3 bg-red-600 h-10 rounded-lg text-white mt-8'>Logout</button>
    </div>
  )
}

export default ProfessorDashboard