import React from 'react'
import contact from '../assets/images/contact.jpg'
import emailjs from '@emailjs/browser'
import { toast, Bounce } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = React.useState({name: '', email: '', message: ''});
  const [loading, setLoading] = React.useState(false);

  const handleSubmit=(e)=>{
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Aryan Shah',
        to_email: 'aryanwork10@gmail.com'
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(()=>{
      setLoading(false);
      toast.success('Message sent Successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,  
        transition: Bounce
      });
      setFormData({name: '', email: '', message: ''});
    }).catch((err)=>{
      setLoading(false);
      console.log(err);
      toast.error('Failed to send message!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,  
        transition: Bounce
      });
    });
  }

  return (
    <div className='w-full min-h-[70vh] p-10 flex justify-center'>
      {/* Contact Form */}
      <div className='w-[66%] flex flex-col gap-4 items-center'>
        <div className='flex border-4 border-white rounded-xl'>
          <img className='w-1/2' src={contact} alt="contact.vector" />
          <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4 p-2'>
            <h1 className='text-3xl font-bold mx-auto text-white'>Contact Us</h1>
            <input type='text' placeholder='Name' name='name' value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} required className='p-2 rounded-lg' />
            <input type='email' placeholder='Email' name='email' value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} required className='p-2 rounded-lg' />
            <textarea placeholder='Message' name='message' value={formData.message} onChange={(e)=>setFormData({...formData, message: e.target.value})} required className='p-2 rounded-lg' rows={6}></textarea>
            <button disabled={loading} type='submit' className='bg-red-500 text-white p-2 rounded-lg'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact