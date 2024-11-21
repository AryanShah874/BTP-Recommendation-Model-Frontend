import React, { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import useAuthContext from '../hooks/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import PublicationForm from '../components/PublicationForm';

const Publication = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, isLoading } = useAuthContext();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'professor')) {
      navigate('/login/professor');
    }
  }, [user, isLoading]);

  const getPublications = async () => { // get all publications of the professor
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/professor/publication`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setPublications(data.publications);
        setLoading(false);
      } else {
        console.log(data.error);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPublications();
  }, []);

  if (loading || isLoading) {
    return <Loader />
  }

  return (
    <div className='w-full min-h-[70vh] text-center text-white p-10'>
      <AccountNav id={'professor'} />

      <div>
        <button onClick={()=>setIsModalOpen(true)} className='mb-10 text-red-500 bg-white p-2 px-4 rounded-2xl'>
          Add Publication
        </button>

        <Modal open={isModalOpen} onClose={()=>setIsModalOpen(false)}>
          <PublicationForm closeModal={()=>setIsModalOpen(false)} setPublications={setPublications} userId={user?._id} />
        </Modal>

        {publications.length===0 ? <p className='text-black font-bold'>No publications found</p> : 
        
          <div className='overflow-x-auto'>
            <table className='w-full text-sm text-center text-gray-500'>
              <thead className='text-gray-700 uppercase bg-gray-50'>
                <tr>
                  <th scope='col' className='px-6 py-3'>Year</th>
                  <th scope='col' className='px-6 py-3 overflow-hidden'>Title</th>
                  {/* <th scope='col' className='px-6 py-3'>Keywords</th>
                  <th scope='col' className='px-6 py-3'>Download Link</th> */}
                </tr>
              </thead>
              <tbody>
                {publications.map((publication, index) => (
                    <tr key={index} className='bg-gray-300 border-b-2'>
                      <Link to={`/addPublication/${publication._id}`} className='contents'> 
                      {/* contents */}
                        <td className='px-6 py-4 whitespace-nowrap'>{publication.year}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>{publication.title}</td>
                      </Link>
                      {/* <td className='px-6 py-4 whitespace-nowrap'>{publication.keywords}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>{publication.downloadLink}</td> */}
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

export default Publication