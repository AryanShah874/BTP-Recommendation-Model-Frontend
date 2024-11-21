import { createContext, useEffect, useReducer, useState } from 'react';

const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch(action.type){
    case 'LOGIN' || 'UPDATE_USER':
      return {user: action.payload};
    case 'LOGOUT':
      return {user: null};
    default:
      return state;
  } 
}

export const AuthContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, {user: null});

  const [isLoading, setIsLoading]=useState(false);

  // console.log(state);
  const getUserDetails = async () => {
    setIsLoading(true);
    try{
      const res=await fetch('/api/user', {
        method: 'GET',
        credentials: 'include',
      });

      const user=await res.json();

      if(res.ok){
        setIsLoading(false);
        dispatch({type: 'LOGIN', payload: user.user});
      }
      else{
        setIsLoading(false);
        console.log(user.error);
        dispatch({type: 'LOGOUT'});
      }
    }
    catch(err){
      setIsLoading(false);
      console.log(err);
      dispatch({type: 'LOGOUT'});
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  return (
    <AuthContext.Provider value={{...state, dispatch, isLoading, setIsLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;