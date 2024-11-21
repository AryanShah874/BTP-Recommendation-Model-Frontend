import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import PageNotFound from './PageNotFound';
import SomethingWentWrong from './SomethingWentWrong';

const ProfessorProfile = () => {
  const {id}=useParams();

  const [professor, setProfessor]=useState();
  const [loading, setLoading]=useState(false);
  const [pageNotFound, setPageNotFound]=useState(false);
  const [somethingWentWrong, setSomethingWentWrong]=useState(false);

  const getProfessor=async ()=>{
    setLoading(true);

    try{
      const res=await fetch(`/api/professor/${id}`, {
        method: 'GET',
      });

      const data=await res.json();

      if(res.ok){
        setProfessor(data.professor);
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
      setSomethingWentWrong(true);
    } 
  }

  useEffect(()=>{
    getProfessor();
  }, [id]);

  if(loading){
    return <Loader />
  }

  if(pageNotFound){
    return <PageNotFound />
  }
  if(somethingWentWrong){
    return <SomethingWentWrong />
  }

  return (
    <div className='w-full min-h-[70vh]'>
      <div className='my-4 bg-gray-200 mx-auto text-black p-6 rounded-lg shadow-lg w-full max-w-5xl'>
        <div className='flex gap-10'>
          <img className='w-52 h-52 mx-5 rounded-full object-cover' src={professor?.profilePic} alt={`${professor?.name?.firstName || "Professor"}'s profile picture`} />

          <div className='w-full bg-white my-auto rounded-lg p-4 text-black border-2 border-gray-40'>
            <div className='flex gap-2'>
              <label htmlFor="name">Name: </label>
              <p id='name'>{professor?.name.firstName} {professor?.name.lastName}</p>
            </div>
            <hr className='my-2 w-full h-[2px] bg-gray-200' />
            <div className='flex gap-2'>
              <label htmlFor="designation">Desgination: </label>
              <p id='designation'>{professor?.designation}</p>
            </div>
            <hr className='my-2 w-full h-[2px] bg-gray-200' />
            <div className='flex gap-2'>
              <label htmlFor="department">Department: </label>
              <p id='department'>{professor?.department}</p>
            </div>
            <hr className='my-2 w-full h-[2px] bg-gray-200' />
            <div className='flex gap-2'>
              <label htmlFor="email">Email: </label>
              <p id='email'>{professor?.email}</p>
            </div>
          </div>
        </div>

        <div className='mt-10 bg-white p-2 rounded-lg flex gap-2'>
          <label className='whitespace-nowrap' htmlFor="researchAreas">Research Areas: </label>
          <p className='w-[88%]' id='researchAreas'>{professor?.researchAreas || 'No research area provided.'}</p>
        </div>

        <div className='mt-10 bg-white p-2 rounded-lg'>
          <h1 className='font-semibold text-2xl text-center'>Publications</h1>

          {professor?.publications.length ? professor.publications.map((publication, index) =>
            <div key={index} className='bg-gray-100 p-4 my-4 rounded-lg'>
              <h2 className='font-bold'>{publication?.title} ({publication?.year})</h2>

              <div className='flex gap-2 my-4'>
                <label className='font-semibold'>Abstract:</label>
                <p className='h-48 overflow-y-scroll'>{publication?.abstract}</p>
              </div>

              <div className='flex gap-2 my-4'>
                <label className='font-semibold'>Keywords:</label>
                <p>{publication?.keywords}</p>
              </div>

              <a href={publication.downloadLink} target='_blank' rel='noreferrer' className='bg-red-500 text-white px-4 py-2 rounded-lg'>Download</a>
            </div>
          ): <p className="text-center font-bold mt-4">No publications available.</p>}
        </div>
      </div>
    </div>
  )
}

export default ProfessorProfile