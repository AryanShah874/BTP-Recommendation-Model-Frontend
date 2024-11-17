import React, { useEffect, useState } from 'react'
import useAuthContext from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { toast, Bounce } from 'react-toastify';

const Recommender = () => {
  const {user, isLoading}=useAuthContext();
  const navigate=useNavigate();

  const [project_description, setDescription]=useState('');
  const [top_n, setTop]=useState(3);
  const [data, setData]=useState([]);

  useEffect(()=>{
    if((!user || user?.role!=='student') && !isLoading){
      if(!user){
        navigate('/login/student');
      }
      else{
        toast.error('You are not authorized to view this page', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,  
          transition: Bounce
        });
        navigate('/');
      }
    }
  }, [user, isLoading]);

  if(isLoading){
    return <Loader /> 
  }

  const handleClick=async(e)=>{
    e.preventDefault();
    
    try{
      const res=await fetch('http://127.0.0.1:8000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({project_description, top_n})
      });

      const data=await res.json();
    
      if(data?.top_faculties){
        setData(data.top_faculties);
      }
      else{
        console.log(data.error);
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
    }
  }
  
  return (
    <div className='w-full min-h-[70vh] p-10'>
      {/* <div className='flex gap-3'>
        <label htmlFor="description">Description</label>
        <input type="text" id='description' name='description' value={project_description} onChange={(e)=>setDescription(e.target.value)} />
      </div>
      <div className='flex gap-3 mt-4'>
        <label htmlFor="top">Top</label>
        <input type="number" id='top' name="top" value={top_n} onChange={(e)=>setTop(e.target.value)} min={0} />
      </div>

      <button onClick={handleClick}>Search</button>

      {data && <div>
        {data.map((faculty, index)=>(
          <div key={index} className='mt-5'>
            <h3>{faculty}</h3>
          </div>
        ))}
      </div>} */}
      <div className='w-full flex items-center justify-center gap-4'>
        <div className='w-[60%] flex items-center bg-white rounded-2xl'>
          <input className='w-full p-2 rounded-tl-lg rounded-bl-lg' type="text" value={project_description} onChange={(e)=>setDescription(e.target.value)} placeholder='Search any keyword...' />

          <select className='p-2 border-l-2 rounded-tr-lg rounded-br-lg' value={top_n} onChange={(e)=>setTop(e.target.value)}>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>

        <button className='px-4 py-2 bg-[#FD2A0B] text-white rounded-lg' onClick={handleClick}>Search</button>
      </div>

      <div className='mt-10 grid gap-8 grid-cols-3'>
        {data && data.map(professor => 
          <div key={professor._id} className='bg-white p-2 overflow-clip flex gap-4 rounded-lg shadow-1 hover:shadow-3 duration-300'>
            <img src={professor.profilePic} alt={professor._id} className='w-[10vw] h-full' />
            <div className='flex flex-col justify-center gap-1'>
              <h1>{professor.name.firstName} {professor.name.lastName}</h1>
              <p>Email: {professor.email}</p>
              <p>Department: {professor.department}</p>
              {/* <p>Research Areas: {professor.researchAreas}</p> */}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Recommender