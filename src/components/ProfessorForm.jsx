import React, { useState } from 'react'
import { toast, Bounce } from 'react-toastify';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const ProfessorForm = ({closeModal, setProfessors}) => {

  const [formData, setFormData] = React.useState({
    name: {firstName: '',lastName: ''},
    email: '',
    password: '',
    designation: '',
    department: ''
  })

  const navigate=useNavigate();

  const [loading, setLoading]=useState(false);
  const [redirect, setRedirect]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);

    try{
      const res=await fetch('/api/professor/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
  
      const data=await res.json();
  
      if(data.ok){
        setLoading(false);
        setProfessors(data.professors);
        setRedirect(true);
        // closeModal();
        setFormData({});
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

  if(loading){
    return <Loader />
  }

  if(redirect){
    navigate('/admin/addProfessor');
  }

  return (
    <form method='POST' onSubmit={handleSubmit} className='flex flex-col gap-4 text-gray-600'>
      <div className='flex gap-2 justify-between items-center'>
        <input className='w-1/2 p-2 rounded-md' type="text" name='firstName' value={formData.name.firstName} onChange={(e) => setFormData({...formData, name: {...formData.name, firstName: e.target.value}})} placeholder='First Name' required />
        <input className='w-1/2 p-2 rounded-md' type="text" name='lastName' value={formData.name.lastName} onChange={(e) => setFormData({...formData, name: {...formData.name, lastName: e.target.value}})} placeholder='Last Name' />
      </div>

      <div className='flex gap-2'>
        <input className='w-full p-2 rounded-md' type="email" name='email' value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} placeholder='Email' required />
        <input className='w-full p-2 rounded-md' type="password" name="password" value={formData.password} onChange={(e)=>setFormData({...formData, password: e.target.value})} placeholder='Password...' required />
      </div>

      <div className='flex gap-2'>
        <select className='w-1/2 p-2 rounded-md' name="designation" value={formData.designation} onChange={(e)=>setFormData({...formData, designation: e.target.value})}>
          <option value=''>Select Designation</option>
          <option value='Assistant Professor'>Assistant Professor</option>
          <option value='Associate Professor'>Associate Professor</option>
          <option value='Professor'>Professor</option>
          <option value="other">Other</option>
        </select>
        <select className='w-1/2 p-2 rounded-md' name="department" value={formData.department} onChange={(e)=>setFormData({...formData, department: e.target.value})} required>
          <option value=''>Select Department</option>
          <option value='CSE'>CSE</option>
          <option value='ECE'>ECE</option>
          <option value='CCE'>CCE</option>
          <option value='MME'>MME</option>
        </select>
      </div>

      <button disabled={loading} className='w-full bg-red-500 text-white py-2 px-4 rounded' type="submit">Add Professor</button>
    </form>
  )
}

export default ProfessorForm