import { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContextProvider'

export default function Navbar() {
  let {userToken,setuserToken}= useContext(AuthContext)
  const [isopen,setisopen]  =useState(false)
  const navigate=useNavigate()
  function signout(){
    setuserToken("")
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
<header className="bg-gray-800 absolute w-full text-decoration-none list-none">
  <nav className="container mx-auto px-6 py-3">
    <div className="flex items-center justify-between">
      <div className='flex items-center '>
      <div className="text-white font-bold text-xl me-4">
        <NavLink to="/">Freshcart</NavLink>
      </div>
      {userToken&&   <div className="hidden md:block ">
        <ul className="flex items-center space-x-2">
          <li><NavLink to={"/"} className="text-white">Home</NavLink></li>
          <li><NavLink to={"/Brands"} className="text-white">Brands</NavLink></li>
          <li><NavLink to={"/Category"} className="text-white">Category</NavLink></li>
          
          <li><NavLink to={"/Cart"} className="text-white">Cart</NavLink></li>
        </ul>
      </div>}
   
      <div className="md:hidden">
        <button onClick={()=>setisopen(!isopen)} className="outline-none mobile-menu-button">
          <svg className="w-6 h-6 text-white"xlinkShow="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      </div>
      <div className='flex gap-2 items-center'>
        <div className="social flex space-x-2">
          <i className="fa-brands text-white mx-1 fa-facebook-f text-lg md:text-xl"></i>
          <i className="fa-brands text-white mx-1 fa-twitter text-lg md:text-xl"></i>
          <i className="fa-brands text-white mx-1 fa-linkedin text-lg md:text-xl"></i>
          <i className="fa-brands text-white mx-1 fa-youtube text-lg md:text-xl"></i>
          <i className="fa-brands text-white mx-1 fa-tiktok text-lg md:text-xl"></i>
        </div>
<div className='flex gab-1 '>
  {!userToken&&<>
    <ul className="flex space-x-2">
      <li><Link to={"/login"} className="block px-1 py-2 text-white rounded">Login</Link></li>
      <li><Link to={"/register"} className="block px-1 py-2 text-white rounded">Register</Link></li>
    </ul>
  </>}

       {userToken&& <li><button onClick={signout} className="block px-1 py-2 text-white rounded">SignOut</button></li>}

</div>
      </div>
    </div>
    {userToken&&<div className={isopen?"mobile-menu md:hidden" :"mobile-menu md:hidden hidden"}>
      <ul className="mt-4 space-y-4">
        <li><NavLink to={"/"} className="block px-1 py-2 text-white bg-gray-900 rounded">Home</NavLink></li>
        <li><NavLink to={"/Brands"} className="block px-1 py-2 text-white bg-gray-900 rounded">Brands</NavLink></li>
        <li><NavLink to={"/Category"} className="block px-1 py-2 text-white bg-gray-900 rounded">Category</NavLink></li>
    
        <li><NavLink to={"/cart"} className="block px-1 py-2 text-white bg-gray-900 rounded">Cart</NavLink></li>
      </ul>
    </div>}
    
    
  </nav>
</header>
  ) 
  
}
