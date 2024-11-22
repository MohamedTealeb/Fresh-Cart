import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as Yub from"yup"
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Contexts/AuthContextProvider'
export default function ShippingAddress() {
  const {cartId}=  useParams()
    let {userToken} =useContext(AuthContext)
 const [loading,isloading] =useState(false)
 const initialValues ={
    
        "City":"",
        "Phone":"",
        "Details":"",
      }
      const validationSchema =Yub.object({
        City:Yub.string().required("City is required"),
        Phone:Yub.string().required("Phone is required"),
        Details:Yub.string().required("detils is required"),
      })
    function onSubmit(){
    isloading(true)
     axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/"+cartId,{shippingAddress:values},{
        headers:{
            token:userToken
        }, params:{
            url:'http://localhost:3000'
        }
      }).then(({data})=>{
      isloading(false)
    location.href=data.session.url
      

      }).catch((err)=>{
     
       isloading(false)
      
    } )
    
      }
  
  
   let {handleSubmit,values,handleChange,handleBlur,errors,touched}=useFormik({
    initialValues,
    onSubmit,
    validationSchema
   })
      return <>
    <div className='py-8 flex justify-center items-center'>
     <div className='lg:w-2/5 md:w-1/2 w-2/3'>
     <form onSubmit={handleSubmit} className='bg-white p-10 rounded-lg shadow-lg min-w-full'>
        <h1 className='text-center text-2xl mb-6 text-gray-600 font-bold font-sans'>Add Your Shipping Address</h1>
        <div>
            <label className='text-gray-800 font-semibold block my-3 text-md' htmlFor="city">City</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.City} className='w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none ' type="text" name='City' id='city' placeholder='@city' />
        {touched.City&&errors.City&& <p className='text-red-500'>{errors.City}</p>}
        </div> 

        <div>
            <label className='text-gray-800 font-semibold block my-3 text-md' htmlFor="details">Details</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.Details} className='w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none ' type="text" name='Details' id='details' placeholder='@details' />
        {touched.Details&&errors.Details&& <p className='text-red-500'>{errors.Details}</p>}
        </div>

        <div>
            <label className='text-gray-800 font-semibold block my-3 text-md' htmlFor="phone">Phone</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.Phone} className='w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none ' type="tel" name='Phone' id='phone' placeholder='@phone' />
        {touched.Phone&&errors.Phone&& <p className='text-red-500'>{errors.Phone}</p>}
        </div>

   <button type='submit' className='w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2  text-lg text-white tracking-wide font-semibold font-sans disabled:bg-gray-400   ' disabled={loading}>Checkout{loading && <i className='fas fa-spinner fa-spin'></i>} </button>
     </form>

     </div>
    </div>
      </>
}
