import React, { useEffect, useState } from 'react'
import { toast, Bounce } from 'react-toastify';
import Loader from './Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import PageNotFound from './PageNotFound';

const ProfessorForm = () => {

  const {user, isLoading}=useAuthContext();

  const navigate=useNavigate();
  const [loading, setLoading]=useState(false);
  const [redirect, setRedirect]=useState(false);
  
  const [formData, setFormData]=useState({name: {firstName: '', lastName: ''}, email: '', password: '', designation: '', department: ''});
  const [initialFormData, setInitialFormData]=useState({name: {firstName: '', lastName: ''}, email: '', password: '', designation: '', department: ''});
  const [isFormChanged, setIsFormChanged]=useState(false);

  const {id}=useParams();
  const [pageNotFound, setPageNotFound]=useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user?.role !== "admin")) {
      navigate("/login/admin");
    }
  }, [user, isLoading]);

  useEffect(()=>{
    if(id!=='new'){
      const getProfessor=async ()=>{
        setLoading(true);
  
        try{
          const res=await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/professor/${id}`, {
            method: 'GET',
          });
  
          const data=await res.json();
  
          if(res.ok){
            const fetchedData={
              name: {firstName: data.professor.name.firstName, lastName: data.professor.name?.lastName},
              email: data.professor.email,
              password: '',
              designation: data.professor.designation,
              department: data.professor.department
            }
            setFormData(fetchedData)
            setInitialFormData(fetchedData);
            setLoading(false);
          }
          else{
            console.log(data.error);
            setLoading(false);
            setPageNotFound(true);
          }
        }
        catch(err){
          console.log(err);
          setLoading(false);
        }
      }
  
      getProfessor();
    }
  }, [id]);

  useEffect(()=>{
    setIsFormChanged(JSON.stringify(formData)!==JSON.stringify(initialFormData));
  }, [formData, initialFormData]);

  if(pageNotFound){
    return <PageNotFound />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);

    try{
      const res=await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/professor/${id==='new' ? 'register' : `update/${id}`}`, {
        method: id==='new' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
  
      const data=await res.json();
  
      if(res.ok){
        setLoading(false);
        // setProfessors(data.professors);
        setRedirect(true);
        setFormData({name: {firstName: '', lastName: ''}, email: '', password: '', designation: '', department: ''});
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

  const handleDelete=async()=>{
    setLoading(true);

    try{
      const res=await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/professor/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data=await res.json();

      if(res.ok){
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


  if(redirect){
    navigate('/admin/addprofessor');
  }

  if(loading || isLoading){
    return <Loader />
  }

  return (
    <div className='w-full min-h-[70vh] text-white p-10'>
      <div className='bg-gray-200 mx-auto text-black p-6 rounded-lg shadow-lg w-full max-w-3xl'>
        <form method='POST' onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name: </label>
            <div className='mt-1 w-full flex gap-4'>
              <input className='w-1/2 p-2 rounded-md' type="text" name='firstName' value={formData.name.firstName} onChange={(e) => setFormData({...formData, name: {...formData.name, firstName: e.target.value}})} placeholder='First Name' id='name' required />
              <input className='w-1/2 p-2 rounded-md' type="text" name='lastName' value={formData.name.lastName} onChange={(e) => setFormData({...formData, name: {...formData.name, lastName: e.target.value}})} placeholder='Last Name' />
            </div>

            <div className='mt-6 w-full flex gap-4'>
              <div className='w-1/2 flex flex-col gap-1'>
                <label htmlFor="email">Email: </label>
                <input className='p-2 rounded-md' type="email" name='email' value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} placeholder='prof@gmail.com' required />
              </div>
              <div className='w-1/2 flex flex-col gap-1'>
                <label htmlFor="password">Password: </label>
                <input className='p-2 rounded-md' type="password" name="password" value={formData.password} onChange={(e)=>setFormData({...formData, password: e.target.value})} placeholder='length >= 6' required={id==='new'} />
              </div>
            </div>

            <div className='mt-6 w-full flex gap-4'>
              <div className='w-1/2 flex flex-col gap-1'>
                <label htmlFor="designation">Designation: </label>
                <select className='p-2 rounded-md' name="designation" value={formData.designation} onChange={(e)=>setFormData({...formData, designation: e.target.value})} required>
                  <option value=''>Select Designation</option>
                  <option value='Assistant Professor'>Assistant Professor</option>
                  <option value='Associate Professor'>Associate Professor</option>
                  <option value='Professor'>Professor</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className='w-1/2 flex flex-col gap-1'>
                <label htmlFor="department">Department: </label>
                <select className='p-2 rounded-md' name="department" value={formData.department} onChange={(e)=>setFormData({...formData, department: e.target.value})} required>
                  <option value=''>Select Department</option>
                  <option value='CSE'>CSE</option>
                  <option value='ECE'>ECE</option>
                  <option value='CCE'>CCE</option>
                  <option value='MME'>MME</option>
                </select>
              </div>
            </div>

            <button disabled={loading || !isFormChanged} className='w-full bg-red-500 text-white shadow-lg py-2 px-4 rounded mt-6' type="submit">{id==='new' ? 'Add Professor' : 'Update'}</button>
        </form>
        
        {id!=='new' && <button disabled={loading} onClick={handleDelete} className='w-full bg-red-500 text-white shadow-lg py-2 px-4 rounded mt-6'>Delete</button>}
        {/* <button disabled={loading} >Cancel</button> */}
        <Link to={'/admin/addprofessor'}>
          <div className='w-full bg-white text-red-500 shadow-lg py-2 px-4 rounded mt-6 text-center'>
            Cancel
          </div>
        </Link>
      </div>
    </div>
    // <form method='POST' onSubmit={handleSubmit} className='flex flex-col gap-4 text-gray-600'>
    //   <div className='flex gap-2 justify-between items-center'>
    //     <input className='w-1/2 p-2 rounded-md' type="text" name='firstName' value={formData.name.firstName} onChange={(e) => setFormData({...formData, name: {...formData.name, firstName: e.target.value}})} placeholder='First Name' required />
    //     <input className='w-1/2 p-2 rounded-md' type="text" name='lastName' value={formData.name.lastName} onChange={(e) => setFormData({...formData, name: {...formData.name, lastName: e.target.value}})} placeholder='Last Name' />
    //   </div>

    //   <div className='flex gap-2'>
    //     <input className='w-full p-2 rounded-md' type="email" name='email' value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} placeholder='Email' required />
    //     <input className='w-full p-2 rounded-md' type="password" name="password" value={formData.password} onChange={(e)=>setFormData({...formData, password: e.target.value})} placeholder='Password...' required />
    //   </div>

    //   <div className='flex gap-2'>
    //     <select className='w-1/2 p-2 rounded-md' name="designation" value={formData.designation} onChange={(e)=>setFormData({...formData, designation: e.target.value})}>
    //       <option value=''>Select Designation</option>
    //       <option value='Assistant Professor'>Assistant Professor</option>
    //       <option value='Associate Professor'>Associate Professor</option>
    //       <option value='Professor'>Professor</option>
    //       <option value="other">Other</option>
    //     </select>
    //     <select className='w-1/2 p-2 rounded-md' name="department" value={formData.department} onChange={(e)=>setFormData({...formData, department: e.target.value})} required>
    //       <option value=''>Select Department</option>
    //       <option value='CSE'>CSE</option>
    //       <option value='ECE'>ECE</option>
    //       <option value='CCE'>CCE</option>
    //       <option value='MME'>MME</option>
    //     </select>
    //   </div>

    //   <button disabled={loading} className='w-full bg-red-500 text-white py-2 px-4 rounded' type="submit">Add Professor</button>
    // </form>
  )
}

export default ProfessorForm