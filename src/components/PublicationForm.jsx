import React, { useEffect, useState } from 'react';
import { toast, Bounce } from 'react-toastify';
import Loader from './Loader';
import useAuthContext from '../hooks/useAuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageNotFound from './PageNotFound';

const PublicationForm = () => {
  const { user, isLoading } = useAuthContext();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    downloadLink: '',
    year: 0,
  });
  
  const [initialFormData, setInitialFormData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    downloadLink: '',
    year: 0,
  });

  const [isFormChanged, setIsFormChanged] = useState(false);

  const { id } = useParams();
  
  const [pageNotFound, setPageNotFound] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user?.role !== 'professor')) {
      navigate('/login/professor');
    }
  }, [user, isLoading]);

  useEffect(() => {
    if(id!=='new'){
      const getPublication=async()=>{
        setLoading(true);
        try{
          const res=await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/professor/publication/${id}`, {
            method: 'GET',
            credentials: 'include',
          });

          const data=await res.json();

          if(res.ok){
            setFormData(data.publication);
            setInitialFormData(data.publication);
            setLoading(false);
          }
          else{
            setLoading(false);
            console.log(data.error);
            setPageNotFound(true);
          }
        }
        catch(err){
          console.log(err);
          setLoading(false);
          setPageNotFound(true);
        }
      };

      getPublication();
    }
  }, [id]);

  useEffect(() => {
    setIsFormChanged(JSON.stringify(formData) !== JSON.stringify(initialFormData));
  }, [formData, initialFormData]);

  if(pageNotFound){
    return <PageNotFound />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/professor/publication/${id==='new' ? 'add' : `update/${id}`}`, {
        method: id === 'new' ? 'POST' : 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if(res.ok){
        toast.success(data.success, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,  
          transition: Bounce
        });
        console.log(data);
        setFormData({title: '', abstract: '', keywords: '', downloadLink: '', year: ''});
        setLoading(false);
        setRedirect(true);
      }
      else{
        setLoading(false);
        console.log(data.error);
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

  const handleDelete=async()=>{
    setLoading(true);

    try{
      const res=await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/professor/publication/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data=await res.json();

      if(res.ok){
        setLoading(false);
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
        console.log(data.error);
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

  if(redirect){
    navigate('/professor/addPublication');
  }

  if (loading || isLoading) {
    return <Loader />;
  }

  return(
    <div className='w-full min-h-[70vh] text-white p-10'>
      <div className='bg-gray-200 mx-auto text-black p-6 rounded-lg shadow-lg w-full max-w-3xl'>
        <form method='POST' onSubmit={handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className='w-full p-2 my-2 rounded-md' required />
          <label htmlFor="abstract">Abstract: </label>
          <textarea id="abstract" name="abstract" value={formData.abstract} onChange={(e) => setFormData({ ...formData, abstract: e.target.value })} className='w-full p-2 my-2' required />
          <label htmlFor="keywords">Keywords: </label>
          <input type="text" id="keywords" name="keywords" value={formData.keywords} onChange={(e) => setFormData({ ...formData, keywords: e.target.value })} className='w-full p-2 my-2' required />
          <label htmlFor="downloadLink">Download Link: </label>
          <input type="text" id="downloadLink" name="downloadLink" value={formData.downloadLink} onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })} className='w-full p-2 my-2' required />
          <label htmlFor="year">Year: </label>
          <input type="number" id="year" name="year" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className='w-full p-2 my-2' required />

          <button type='submit' disabled={loading || !isFormChanged} className='w-full bg-red-500 text-white shadow-lg py-2 px-4 rounded mt-6'>{id==='new' ? 'Add Publication' : 'Update'}</button>
        </form>

        {id!=='new' && <button onClick={handleDelete} disabled={loading} className='w-full bg-red-500 text-white shadow-lg py-2 px-4 rounded mt-6'>Delete</button>}

        <Link to='/professor/addPublication' className='w-full text-red-500 bg-white shadow-lg py-2 px-4 rounded mt-6 block text-center'>Cancel</Link>
      </div>
    </div>
  );
}

export default PublicationForm