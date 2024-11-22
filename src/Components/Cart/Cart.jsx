import axios from 'axios'
import  { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../Contexts/AuthContextProvider';

import CartProduct from '../CartProduct/CartProduct';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function Cart() {
 const [loading,isloading]=useState(true) 
const [cart,setcart]=  useState(null)
let {userToken}=  useContext(AuthContext)
  useEffect(()=>{
      getUserCart()
  },[])
  async function getUserCart() {
    isloading(true)
    let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
      headers:{
        token:userToken
      }
    }).finally(()=>{
      isloading(false)
    })
    setcart(data)
    
  }
  function clearcart() {
     axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
      headers:{
        token:userToken
      }
    }).finally(()=>{
      setcart(null)
    })

  }
  if(loading){
    return <Loading />
  }
return<>
 { cart? <div className="pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items({cart?.numOfCartItems})</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
       {cart?.data.products.map((product,index)=>{
        return<CartProduct key={index} product={product} setcart={setcart} cart={cart}/>
       })}
       {cart?.data.products.length ==0 && <h1>No Product In YouR Cart</h1>}
      </div>
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">${cart?.data.totalCartPrice}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping</p>
          <p className="text-gray-700">$0</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">${cart?.data.totalCartPrice} USD</p>
            <p className="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <Link to={"/shippingAddress/"+cart?.data._id} className="mt-6 w-full block text-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>
      </div>
    </div>
    <button onClick={clearcart} className='text-red-500 border-2 border-red-500 rounded-md px-4 py-2 hover:text-white  hover:bg-red-500 mx-auto block '>Clear Cart</button>
  </div>: <h1 className='text-center text-4xl font-bold'>No Product In Your Cart</h1>}
 
  </>

}