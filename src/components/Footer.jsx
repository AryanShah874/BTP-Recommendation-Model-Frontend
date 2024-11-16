import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full bg-[#F59E0B] text-white text-center text-md font-medium'>
      <div className='w-full h-full z-0 py-[1.35rem]'>
        <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default Footer