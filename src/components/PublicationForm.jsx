import React, { useState } from 'react';
import { toast, Bounce } from 'react-toastify';
import Loader from './Loader';

const PublicationForm = ({setPublications, userId}) => {
  const [formData, setFormData]=useState({title: '', abstract: '', keywords: '', downloadLink: '', year: 0});

  const [loading, setLoading]=useState(false);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    formData.userId=userId;
    try{
      const res=await fetch('/api/professor/publication/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data=await res.json();

      if(res.ok){
        setLoading(false);
        setPublications(data.publications);
        setFormData({title: '', abstract: '', keywords: '', downloadLink: '', year: 0});
        toast.success('Publication added successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
      }
      else{
        setLoading(false);
        toast.error(data.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
      }
    }
    catch(err){
      toast.error('Internal server error', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
      console.log(err);
      setLoading(false);
    }
  }

  if(loading){
    return <Loader />
  }

  return (
    <>
      <form method='POST' onSubmit={handleSubmit} className='flex flex-col gap-4 text-gray-600'>
        <div className='flex gap-4'>
          <input className='w-[93vw] p-2 rounded-md' type="text" name='title' value={formData.title} placeholder='Title' onChange={(e)=>setFormData({...formData, title: e.target.value})} />
          <select className='w-[7vw] p-2 rounded-md' name='year' value={formData.year} onChange={(e)=>setFormData({...formData, year: e.target.value})}>
            <option value={0}>Year</option>
            {Array.from(new Array(new Date().getFullYear() - 1999), (v, i) => 2000 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <textarea className='w-full p-2 rounded-md' name='abstract' value={formData.abstract} placeholder='Abstract' onChange={(e)=>setFormData({...formData, abstract: e.target.value})} rows={8} />
        <textarea className='w-full p-2 rounded-md' name="keywords" value={formData.keywords} placeholder='Keywords' onChange={(e)=>setFormData({...formData, keywords: e.target.value})} />
        <input className='w-full p-2 rounded-md' type="text" name='downloadLink' value={formData.downloadLink} placeholder='Download Link' onChange={(e)=>setFormData({...formData, downloadLink: e.target.value})} />

        <button type='submit' className='bg-red-500 text-white p-2 rounded-md'>{loading ? 'Adding...' : 'Add Publication'}</button>
      </form>
    </>
  )
}

export default PublicationForm