import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Contexts/AuthContextProvider'
import { Helmet } from 'react-helmet';
export default function Login() {
  let {setuserToken}=useContext(AuthContext)
  const navigate= useNavigate()
   const [successMsg,setsuccessMsg]=useState("")
   const [errorMsg,seterrorMsg]=useState("")
    let user={
    
        email:"",
        password:"",
      }
     async function LoginNewUser(obj){
      seterrorMsg("")
      setsuccessMsg("")
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",obj).then(({data})=>{
        setsuccessMsg(data.message)
        setuserToken(data.token)
        localStorage.setItem('token',data.token)
        if(location.pathname=="/login"){
          navigate('/')
        }else{
          navigate(location.pathname)
        }
      

      }).catch((err)=>{
     
        seterrorMsg(err.response ? err.response.data.message : "An unexpected error occurred.");      
    
      
    } )
    
      }
  
  
     let formik=  useFormik({
        initialValues:user,
        onSubmit:function(values){
        LoginNewUser(values)
        },
        validate:function( values ){
          let error= {}
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(values.email)) {
              error.email = "Email Must be Valid";}
            // if(values.email.includes('@')==false||values.email.includes('.com')==false){
    
            //   error.email= "Email Must be Valid"
            // }
           
            if(values.password.length<6||values.password.length>12){
              error.password="Password Must be From 6 to 12 characters only "
            }
            
          return error
        }
      });
      return <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='w-full md:w-1/2 lg:w-1/3 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center'>
     
        <h2 className='text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8'>Welcome to freshcart</h2>
      { errorMsg&& <div className='errMsg  alert alert-danger text-center'>
           {errorMsg}
        </div>}
     { successMsg&&  <div className='succMsg  alert alert-success text-center'>
           {successMsg}
        </div>}
        <form  onSubmit={formik.handleSubmit} className='w-full flex flex-col gap-4'>
         
    
          <label className='mt-3' htmlFor="email">Email</label>
          <input  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id='email' placeholder='email' type="email" className='form-control' />
          {formik.errors.email && formik.touched.email?      <div className='alert alert-danger text-center'> {formik.errors.email}</div> :""}
    
    
          <label className='mt-3' htmlFor="password">Password</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id='password' placeholder='password' type="password" className='form-control' />
          {formik.errors.password && formik.touched.password?      <div className='alert alert-danger text-center'> {formik.errors.password}</div> :""}
    
     
    
          <button className='btn btn-outline-primary mt-3'type='submit'>Login</button>
    
    
        </form>
        <div className='mt-4 text-center'> 
<span className='text-sm text-gray-500 dark:text-gray-300'>Create new account?</span>
  <Link to="/register" className='text-blue-500 hover:text-blue-600 no-underline'>Register</Link>
  </div>
        </div>
      </div>
      </>
}
