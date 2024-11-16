import React, { useState } from 'react'
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const StudentForm = ({setStudents}) => {
  const [formData, setFormData] = useState({name: {firstName: '', lastName: ''}, email: '', password: '', roll: '', department: ''});

  const navigate=useNavigate();

  const [loading, setLoading]=useState(false);
  const [redirect, setRedirect]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res=await fetch('/api/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'credentials': 'include', 
        },
        body: JSON.stringify(formData),
      });

      const data=await res.json();

      if(res.ok){
        setLoading(false);
        setRedirect(true);
        setFormData({name: {firstName: '', lastName: ''}, email: '', password: '', roll: '', department: ''});
        setStudents(data.students);
        toast.success(data.success, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          transition: Bounce,
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
          transition: Bounce,
        });
      }
    }
    catch(err){
      setLoading(false);
      console.log(err);
      toast.error('Internal server error', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
    }
  }

  if(loading){
    return <Loader />
  }

  if(redirect){
    navigate('/admin/addStudent');
  }

  return (
    <>
      <form method='POST' onSubmit={handleSubmit} className='flex flex-col gap-4 text-gray-600'>
        <div className='flex gap-2 justify-between'>
          <input className='w-1/2 p-2 rounded-md' type="text" placeholder='First Name' required name='firstName' value={formData.name.firstName} onChange={(e)=>setFormData({...formData, name: {...formData.name, firstName: e.target.value}})} />
          <input className='w-1/2 p-2 rounded-md' type="text" placeholder='Last Name' name='lastName' value={formData.name.lastName} onChange={(e)=>setFormData({...formData, name: {...formData.name, lastName: e.target.value}})} />
        </div>

        <div className='flex gap-2 justify-between'>
          <input className='w-1/2 p-2 rounded-md' type="email" placeholder='Email' required name="email" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} />
          <input className='w-1/2 p-2 rounded-md' type="password" placeholder='Password' required name="password" value={formData.password} onChange={(e)=>setFormData({...formData, password: e.target.value})} />
        </div>

        <div className='flex gap-2 justify-center'> 
          <input className='w-1/2 p-2 rounded-md' type="text" placeholder='Roll no.' required name="roll" value={formData.roll} onChange={(e)=>setFormData({...formData, roll: e.target.value})} />

          <select className='w-1/2 p-2 rounded-md' name="department" value={formData.department} onChange={(e)=>setFormData({...formData, department: e.target.value})} required>
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="CCE">CCE</option>
            <option value="ECE">ECE</option>
            <option value="MME">MME</option>
          </select>
        </div>

        <button disabled={loading} className='mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-2xl' type="submit">Submit</button>
      </form>
    </>
  )
}

export default StudentForm