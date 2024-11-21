import React, { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import useAuthContext from '../hooks/useAuthContext';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import StudentForm from '../components/StudentForm';

const AddStudent = () => {
  const {user, isLoading}=useAuthContext();

  const navigate=useNavigate();

  useEffect(()=>{
    if(!isLoading && (!user || user?.role!=='admin')){
      navigate('/login/admin');
    }
  }, [user, isLoading])

  const [students, setStudents]=useState([]);
  const [loading, setLoading]=useState(false);

  const getStudents=async()=>{
    setLoading(true);
    try{
      const res=await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/student/all`, {
        method: 'GET',
        credentials: 'include',
      });

      const data=await res.json();

      if(res.ok){
        setLoading(false);
        setStudents(data.students);
      }
      else{
        setLoading(false);
        console.log(data.error);
      }
    }
    catch(err){
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(()=>{
    getStudents();
  }, [])

  if(isLoading || loading){
    return <Loader />
  }

  return (
    <div className='w-full min-h-[70vh] text-center text-white p-10'>
      <AccountNav id={user?.role} />

      <div>
        <Link to={'/admin/addstudent/new'} className='text-red-500 bg-white p-2 px-4 rounded-2xl'>
          Add Student
        </Link>

        {students.length===0 ? <p className='mt-10 text-black font-bold'>No students found</p> :
        
        <div className='overflow-x-auto mt-10'>
          <table className='w-full text-sm text-center text-gray-500'>
            <thead className='text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3'>Name</th>
                <th scope='col' className='px-6 py-3'>Email</th>
                <th scope='col' className='px-6 py-3'>Roll No.</th>
                <th scope='col' className='px-6 py-3'>Department</th>
              </tr>
            </thead>


            <tbody>
              {students.map((student, idx)=>(
                <tr key={idx} className={'bg-gray-300 border-b-2'}>
                  <Link to={`/admin/addstudent/${student._id}`} className='contents'>
                    <td className='px-6 py-4 whitespace-nowrap'>{student.name.firstName} {student.name.lastName}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{student.email}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{student.roll}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{student.department}</td>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
      }

      </div>
    </div>
  )
}

export default AddStudent