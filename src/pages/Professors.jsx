import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const Professors = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchName, setSearchName] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const getProfessors = async () => {
    setLoading(true);
    try{
      const res=await fetch('/api/professor/all', {
        method: 'GET',
        // credentials: 'include',
      });

      const data=await res.json();

      if(res.ok){
        setProfessors(data.professors);
        setLoading(false);
      }
      else{
        console.log(data.error);
        setLoading(false);
      }
    }
    catch(err){
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfessors();
  }, [])

  const handleSearch=()=>{
    return professors.filter(professor => {
      if(searchName && departmentFilter){
        return professor.name.firstName.toLowerCase().includes(searchName.toLowerCase()) && professor.department===departmentFilter;
      }
      else if(searchName){
        return professor.name.firstName.toLowerCase().includes(searchName.toLowerCase());
      }
      else if(departmentFilter){
        return professor.department===departmentFilter;
      }
      else{
        return true;
      }
    })
  }

  if(loading){
    return <Loader />
  }

  const filteredProfessors=handleSearch();

  return (
    <div className='w-full min-h-[70vh] p-10'>
      <div className='mb-10 flex justify-center'>
        <input type="text" className='w-[50vw] p-2 border rounded' placeholder='Search by name' value={searchName} onChange={(e)=>setSearchName(e.target.value)} />

        <select className='p-2 border rounded ml-4' value={departmentFilter} onChange={(e)=>setDepartmentFilter(e.target.value)}>
          <option value=''>All Departments</option>
          <option value='CSE'>CSE</option>
          <option value='CCE'>CCE</option>
          <option value='ECE'>ECE</option>
          <option value='ME'>ME</option>
        </select>
      </div>
      <div className='grid gap-8 grid-cols-3'>
        {filteredProfessors && filteredProfessors.map(professor => 
          <Link to={`/professors/${professor._id}`} key={professor._id} className='bg-white p-2 overflow-clip flex gap-4 rounded-lg shadow-1 hover:shadow-3 duration-300'>
            <img src={professor.profilePic} alt={professor._id} className='w-[10vw] h-full' />
            <div className='flex flex-col justify-center gap-1'>
              <h1>{professor.name.firstName} {professor.name.lastName}</h1>
              <p>Email: {professor.email}</p>
              <p>Department: {professor.department}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Professors