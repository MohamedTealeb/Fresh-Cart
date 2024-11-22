import axios from "axios"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Product from "../Product/Product"


export default function Home() {
  const [products,setproduct]  = useState([])
  useEffect(()=>{
getproduct()
  },[])
  async function getproduct() {
    let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    setproduct(data.data)
  }
  return <>
  <Helmet>
    <title>Home</title>
  </Helmet>
 <div className="grid grid-cols-4 gap-3">
{products.map((product,id)=>{
    return<Product product={product} key={id}/>
}) }
 </div>
  </>
}
