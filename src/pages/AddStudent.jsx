import React, { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import useAuthContext from '../hooks/useAuthContext';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import StudentForm from '../components/StudentForm';

const AddStudent = () => {
  const {user, isLoading}=useAuthContext();

  const navigate=useNavigate();

  useEffect(()=>{
    if((!user || user?.role!=='admin') && !isLoading){
      navigate('/login/admin');
    }
  }, [user, isLoading])

  const [isModalOpen, setIsModalOpen]=useState(false);

  const [students, setStudents]=useState([]);
  const [loading, setLoading]=useState(false);

  const getStudents=async()=>{
    setLoading(true);
    try{
      const res=await fetch('/api/student/all', {
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

  if(isLoading){
    return <Loader />
  }

  return (
    <div className='w-full min-h-[70vh] text-center text-white p-10'>
      <AccountNav id={'admin'} />

      <div>
        <button onClick={()=>setIsModalOpen(true)} className='mb-10 text-red-500 bg-white p-2 px-4 rounded-2xl'>
          Add Student
        </button>

        <Modal open={isModalOpen} onClose={()=>setIsModalOpen(false)}>
          <StudentForm setStudents={setStudents} />
        </Modal>

        {students.length===0 ? <p className='text-black font-bold'>No students found</p> :
        
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-center text-gray-500'>
            <thead className='text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3'>Name</th>
                <th scope='col' className='px-6 py-3'>Email</th>
                <th scope='col' className='px-6 py-3'>Roll</th>
                <th scope='col' className='px-6 py-3'>Department</th>
              </tr>
            </thead>


            <tbody>
              {students.map((student, idx)=>(
                <tr key={idx} className={'bg-gray-300 border-b-2'}>
                  <td className='px-6 py-4 whitespace-nowrap'>{student.name.firstName} {student.name.lastName}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{student.email}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{student.roll}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{student.department}</td>
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