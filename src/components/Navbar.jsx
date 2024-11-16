import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../assets/images/LNMLogo.png'
import { ProfileIcon } from '../components/Icons'
import useAuthContext from '../hooks/useAuthContext'

const Navbar = () => {

  const [dropdownOpen, setDropdownOpen]=useState(false);

  const dropDownRef=useRef(null);

  const {user} = useAuthContext();

  // console.log(user);

  useEffect(()=>{
    document.addEventListener('mousedown', (e)=>{
      if(!dropDownRef.current?.contains(e.target)){
        setDropdownOpen(false);
      }
    })
  });

  const CustomLink=({to, title, className=""})=>{
    const location=useLocation();

    return(
      <Link to={to} className={`${className} relative group`}>{title}
        <span className={`h-[2px] inline-block bg-[#FD2A0B] absolute left-0 -bottom-1 group-hover:w-full transition-[width] ease duration-300 ${location.pathname===to ? 'w-full': 'w-0'}`}>
          &nbsp;
        </span>
      </Link>
    )
  }
  
  return (
    <header className='w-full bg-amber-500 px-10 py-6 text-white text-lg flex items-center justify-between'>
      <Link to={'/'}><img src={Logo} alt="logo" className='w-40 h-auto' /></Link>

      <nav className='absolute left-[50%] font-medium translate-x-[-50%]'>
        <CustomLink to='/' className='mr-4' title='Home' />
        <CustomLink to='/professors' className='mx-4' title='Professors' />
        <CustomLink to='/recommender' className='mx-4' title='Recommender' />
        <CustomLink to='/contact' className='ml-4' title='Contact' />
      </nav>

      {!user ?
        <div ref={dropDownRef} className='relative flex flex-col items-center'>
          <button onClick={()=>setDropdownOpen((prev)=>!prev)} className='flex gap-1 items-center font-medium border-2 border-transparent focus:border-white px-4 py-2 rounded-lg'>
            <ProfileIcon className='w-10 h-10 my-auto' />
            <span>Login</span>
          </button>
          {dropdownOpen && 
            <div className='absolute w-32 top-14 flex flex-col items-center justify-center bg-white text-black p-2 rounded-lg shadow-xl'>
              <Link to='/login/student'>as Student</Link>
              <Link to='/login/professor'>as Professor</Link>
              <Link to='/login/admin'>as Admin</Link>
            </div>
          }
        </div>
        :
        <Link className='border-2 p-2 rounded-lg' to={`${user?.role}`}>{user?.role==='admin' ? 'Admin' :  `${user?.name.firstName} ${user?.name.lastName}`}</Link>
      }
    </header>
  )
}

export default Navbar