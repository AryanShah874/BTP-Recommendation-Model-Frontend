import React, { useEffect, useState } from 'react'
import { toast, Bounce } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';
import useAuthContext from '../hooks/useAuthContext';
import PageNotFound from './PageNotFound';

const StudentForm = ({setStudents}) => {

  const {user, isLoading}=useAuthContext();

  const navigate=useNavigate();
  const [loading, setLoading]=useState(false);
  const [redirect, setRedirect]=useState(false);

  const [formData, setFormData]=useState({
    name: {firstName: '', lastName: ''},
    email: '',
    roll: '',
    department: '',
    password: '',
  });
  const [initialFormData, setInitialFormData]=useState({
    name: {firstName: '', lastName: ''},
    email: '',
    roll: '',
    department: '',
    password: '',
  });
  const [isFormChanged, setIsFormChanged]=useState(false);

  const {id}=useParams();
  const [pageNotFound, setPageNotFound]=useState(false);

  useEffect(()=>{
    if(!isLoading && (!user || user?.role!=='admin')){
      navigate('/login/admin');
    }
  }, [user, isLoading]);

  useEffect(()=>{
    if(id!=='new'){
      const getStudent=async()=>{
        setLoading(true);
        try{
          const res=await fetch(`/api/student/${id}`, {
            method: 'GET',
            credentials: 'include',
          });

          const data=await res.json();

          if(res.ok){
            setFormData(data.student);
            setInitialFormData(data.student);
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
          toast.error('Something went wrong', {
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

      getStudent();
    }
  }, [id]);

  useEffect(()=>{
    setIsFormChanged(JSON.stringify(formData)!==JSON.stringify(initialFormData));
  }, [formData, initialFormData]);

  if(pageNotFound){
    return <PageNotFound />
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);

    try{
      const res=await fetch(`/api/student/${id==='new' ? 'register' : `update/${id}`}`, {
        method: id==='new' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      
      const data=await res.json();

      if(res.ok){
        setLoading(false);
        setFormData({name: {firstName: '', lastName: ''}, email: '', roll: '', department: '', password: ''});
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
        // console.log(data.error);
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
      const res=await fetch(`/api/student/delete/${id}`, {
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
    navigate('/admin/addstudent');
  }

  if(isLoading || loading){
    return <Loader />
  }

  return (
    <div className='w-full min-h-[70vh] text-white p-10'>
      <div className='bg-gray-200 mx-auto text-black p-6 rounded-lg shadow-lg w-full max-w-3xl'>
        <form method='POST' onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name: </label>
          <div className='mt-1 w-full flex gap-4'>
            <input type="text" id='firstName' name='firstName' value={formData.name.firstName} onChange={(e)=>setFormData({...formData, name: {...formData.name, firstName: e.target.value}})} placeholder='First Name' className='w-1/2 p-2 rounded-md' required />
            <input type="text" id='lastName' name='lastName' value={formData.name.lastName} onChange={(e)=>setFormData({...formData, name: {...formData.name, lastName: e.target.value}})} placeholder='Last Name' className='w-1/2 p-2 rounded-md' />
          </div>

          <div className='mt-6 w-full flex gap-4'>
            <div className='w-1/2 flex flex-col gap-1'>
              <label htmlFor="email">Email: </label>
              <input type="email" id='email' name='email' value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} placeholder='stud@gmail.com' className='p-2 rounded-md' required />
            </div>
            <div className='w-1/2 flex flex-col gap-1'>
              <label htmlFor="password">Password</label>
              <input type="password" id='password' name='password' value={formData.password} onChange={(e)=>setFormData({...formData, password: e.target.value})} placeholder='length >= 6' className='p-2 rounded-md' required={id==='new'} />
            </div>
          </div>  

          <div className='mt-6 w-full flex gap-4'>
            <div className='w-1/2 flex flex-col gap-1'>
              <label htmlFor="roll">Roll No.: </label>
              <input type="text" id='roll' name='roll' value={formData.roll} onChange={(e)=>setFormData({...formData, roll: e.target.value})} placeholder='123456' className='p-2 rounded-md' required />
            </div>
            <div className='w-1/2 flex flex-col gap-1'>
              <label htmlFor="department">Department: </label>
              <select className='p-2 rounded-md' name="department" id="department" value={formData.department} onChange={(e)=>setFormData({...formData, department: e.target.value})} required>
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="CCE">CCE</option>
                <option value="MME">MME</option>
              </select>
            </div>
          </div>
            
          <button disabled={loading || !isFormChanged} className='w-full bg-red-500 text-white shadow-lg py-2 px-4 rounded mt-6' type="submit">{id==='new' ? 'Add Student' : 'Update'}</button>
        </form>

        {id!=='new' && <button disabled={loading} onClick={handleDelete} className='w-full bg-red-500 text-white shadow-lg py-2 px-4 rounded mt-6'>Delete</button>}

        <Link to={'/admin/addstudent'}>
          <div className='w-full bg-white text-red-500 shadow-lg py-2 px-4 rounded mt-6 text-center'>
            Cancel
          </div>
        </Link>
      </div>
    </div>
  )
}

export default StudentForm