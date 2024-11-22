import { createContext, useEffect, useState } from "react";

export const AuthContext=createContext();
export default function AuthContextProvider({children}){
  const[userToken,setuserToken]=useState(localStorage.getItem('token'??""))

 
  return <AuthContext.Provider value={{userToken,setuserToken}}>
    {children}

  </AuthContext.Provider>
}