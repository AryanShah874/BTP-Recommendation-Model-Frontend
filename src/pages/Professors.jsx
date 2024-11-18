import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import {StarIcon} from '../components/Icons';

const Professors = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchName, setSearchName] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const {user, isLoading}=useAuthContext();
  const [wishlist, setWishlist]=useState([]);

  useEffect(() => {
    if(user && user.role==='student'){
      setWishlist(user.professors || []);
    }
  }, [user]);

  useEffect(() => {
    if(!user || user?.role!=='student' && isLoading){
      <Loader />
    }
  }, [user, isLoading])

  const toggleWishlist=async (professorId)=>{
    // setWishlist((prev)=>(
    //   prev.includes(professorId) ? prev.filter((id)=>id!==professorId) : [...prev, professorId]
    // ))

    const updatedWishlist=wishlist.includes(professorId) ? wishlist.filter((id)=>id!==professorId) : [...wishlist, professorId];

    setWishlist(updatedWishlist);

    try{
      const res=await fetch('/api/student/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({wishlist: updatedWishlist, userId: user._id}),
      });

      const data=await res.json();

      if(!res.ok){
        console.log(data.error);
      }
    }
    catch(err){
      console.log(err);

      setWishlist((prev)=>
        prev.includes(professorId) ? prev.filter((id)=>id!==professorId) : [...prev, professorId]
      )
    }
  };



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
          <div key={professor._id} className='relative'>
            {user && user?.role==='student' &&
              (wishlist.includes(professor._id) ? <StarIcon onClick={()=>toggleWishlist(professor._id)} className={'absolute top-2 right-2 z-10 fill-yellow-400'} /> : <StarIcon onClick={()=>toggleWishlist(professor._id)} className={'absolute top-2 right-2 z-10 fill-white'} />)
            }
            <Link to={`/professors/${professor._id}`} className='bg-white p-2 overflow-clip flex gap-4 rounded-lg shadow-1 hover:shadow-3 duration-300 relative'>
              <img src={professor.profilePic} alt={professor._id} className='w-28 h-28' />
              <div className='flex flex-col justify-center gap-1'>
                <h1>{professor.name.firstName} {professor.name.lastName}</h1>
                <p>Email: {professor.email}</p>
                <p>Department: {professor.department}</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Professors