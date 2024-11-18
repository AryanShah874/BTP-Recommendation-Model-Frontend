import React, { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import useAuthContext from '../hooks/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Wishlist = () => {
  const [loading, setLoading] = useState(false);

  const [professors, setProfessors] = useState([]);

  const getProfessors=async ()=>{
    setLoading(true);
    try{
      const res = await fetch("/api/student/wishlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        setProfessors(data.wishlist);
        console.log(data.wishlist);
        setLoading(false);
      } else {
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
  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <div className='w-full min-h-[70vh] text-center text-white p-10'>
      <AccountNav id={'student'} />

      <div>
        <Link to={'/professors'} className='text-red-500 bg-white p-2 px-4 rounded-2xl'>
          Add to Wishlist
        </Link>

        {professors.length===0 && <h1 className='mt-10 text-2xl'>No professors in your wishlist</h1>}

        <div className='overflow-x-auto mt-10'>
          <table className='w-full text-sm text-center text-gray-500'>
            <thead className='text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3'>Name</th>
                <th scope='col' className='px-6 py-3'>Email</th>
                <th scope='col' className='px-6 py-3'>Department</th>
              </tr>
            </thead>
            <tbody>
              {professors.map((professor, index) => (
                <tr key={index} className='bg-gray-300 border-b-2'>
                  <Link to={`/professors/${professor._id}`} className='contents'>
                    <td className='px-6 py-4 whitespace-nowrap'>{professor.name.firstName} {professor.name.lastName}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{professor.email}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{professor.department}</td>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Wishlist