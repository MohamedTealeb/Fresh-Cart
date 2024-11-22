import React, { useContext } from 'react'
import { AuthContext } from './../../Contexts/AuthContextProvider';
import { Navigate } from 'react-router-dom';

export default function ProtectedAuthRoute({children}) {
    const {userToken}=useContext(AuthContext)
  return <>
  {
    !userToken?children:<Navigate to={"/"}/>
  }
  
  </>
}
