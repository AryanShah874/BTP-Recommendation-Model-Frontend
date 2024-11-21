import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce } from 'react-toastify';
import Loader from "../components/Loader";

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  const navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
  
    try{
      const res=await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/admin/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
      });
  
      const data=await res.json();
  
      if(res.ok){
        setLoading(false);
        toast.success(`${data.success} Login to Continue`, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,  
          transition: Bounce
        });
        setRedirect(true);
      }
      else{
        setLoading(false);
        toast.error(data.error, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,  
          transition: Bounce
        });
      }
    }
    catch(err){
      setLoading(false);
      console.log(err);
      toast.error('Internal server error', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,  
        transition: Bounce
      }); 
    }
  }

  if(loading && !redirect){
    return <Loader />
  }
  if(redirect){
    return navigate('/login/admin');
  }

  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-center items-center text-black">
      <h1 className="text-3xl font-medium leading-9 tracking-tight">Sign Up</h1>

      <div className="mt-10 w-[30%] text-center">
        <form method="POST" onSubmit={handleSubmit} className="space-y-6">
          <div className="mt-2">
            <input className="px-4 py-2 w-full rounded-lg" placeholder="email@gmail.com" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div className="mt-2">
            <input className="px-4 py-2 w-full rounded-lg" placeholder="password" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required autoComplete="current-password" />
          </div>

          <div>
            <button disabled={loading} type="submit" className="w-full text-white bg-[#FD2A0B] px-4 py-2 rounded-lg mt-3">
              Register
            </button>
          </div>
        </form>

        <p className="mt-6">
          Already a user?{" "}
          <Link to={'/login/admin'} className="underline font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
