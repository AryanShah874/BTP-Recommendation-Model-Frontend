import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const AccountNav = ({id}) => {
  const location=useLocation();

  return (
    <header className='w-full mb-16 relative font-medium'>
        {id==='admin' && 
          <nav className='absolute left-[50%] translate-x-[-50%]'>
            <Link to={'/admin'} className={`${location.pathname==='/admin' ? 'bg-[#FD2A0B] text-white' : 'bg-white text-[#FD2A0B]'} px-4 py-2 rounded-tl-2xl rounded-bl-2xl`}>Account</Link>
            <Link to={'/admin/addprofessor'} className={`${location.pathname==='/admin/addprofessor' ? 'bg-[#FD2A0B] text-white' : 'bg-white text-[#FD2A0B]'} px-4 py-2 border-x-2`}>Add Professor</Link>
            <Link to={'/admin/addstudent'} className={`${location.pathname==='/admin/addstudent' ? 'bg-[#FD2A0B] text-white' : 'bg-white text-[#FD2A0B]'} px-4 py-2 rounded-tr-2xl rounded-br-2xl`}>Add Student</Link>
          </nav>
        }
        {id==='professor' && 
          <nav className='absolute left-[50%] translate-x-[-50%]'>
            <Link to={'/professor'} className={`${location.pathname==='/professor' ? 'bg-[#FD2A0B] text-white' : 'bg-white text-[#FD2A0B]'} px-4 py-2 rounded-tl-2xl rounded-bl-2xl`}>Account</Link>
            <Link to={'/professor/addPublication'} className={`${location.pathname==='/professor/addPublication' ? 'bg-[#FD2A0B] text-white' : 'bg-white text-[#FD2A0B]'} px-4 py-2 rounded-tr-2xl rounded-br-2xl`}>Add Publication</Link>
          </nav>
        }
        {id==='student' && 
          <nav className='absolute left-[50%] translate-x-[-50%]'>
            <Link to={'/student'} className={`${location.pathname==='/student' ? 'bg-[#FD2A0B] text-white' : 'bg-white text-[#FD2A0B]'} px-4 py-2 rounded-tl-2xl rounded-bl-2xl`}>Account</Link>
            <Link to={'/student/wishlist'} className={`${location.pathname==='/student/wishlist' ? 'bg-[#FD2A0B] text-white' : 'bg-white text-[#FD2A0B]'} px-4 py-2 rounded-tr-2xl rounded-br-2xl`}>Wishlist</Link>
          </nav>
        }
    </header>
  )
}

export default AccountNav