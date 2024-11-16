import React from 'react'
import contact from '../assets/images/contact.jpg'

const Contact = () => {
  return (
    <div className='w-full min-h-[70vh] p-10 flex justify-center'>
      {/* Contact Form */}
      <div className='w-[66%] flex flex-col gap-4 items-center'>
        <div className='flex border-4 border-white rounded-xl'>
          <img className='w-1/2' src={contact} alt="contact.vector" />
          <form className='w-full flex flex-col gap-4 p-2'>
            <h1 className='text-3xl font-bold mx-auto text-white'>Contact Us</h1>
            <input type='text' placeholder='Name' className='p-2 rounded-lg' />
            <input type='email' placeholder='Email' className='p-2 rounded-lg' />
            <textarea placeholder='Message' className='p-2 rounded-lg' rows={6}></textarea>
            <button type='submit' className='bg-red-500 text-white p-2 rounded-lg'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact