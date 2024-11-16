import React, { useEffect, useState } from 'react'
import { toast, Bounce } from 'react-toastify'
import useAuthContext from './useAuthContext';
import { useNavigate } from 'react-router-dom';

const usePreviewImg = () => {
  const {user, dispatch, isLoading}=useAuthContext();
  const navigate=useNavigate();

  useEffect(()=>{ 
    if(!user || user?.role!=='professor' && isLoading){
      navigate('/login/professor');
    }
  }, [user, isLoading, navigate]);

  const [imgURL, setImgURL] = useState(user?.profilePic || '');

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if(file && file.type.includes('image')){
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgURL(reader.result);
      }

      reader.readAsDataURL(file);
    }
    else{
      toast.error('Please select an image file', {
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

  return (
    {handleImageChange, imgURL, setImgURL}
  )
}

export default usePreviewImg