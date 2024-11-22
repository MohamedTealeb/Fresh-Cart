import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../Loading/Loading"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"


export default function Brands() {
    const [brand,setbrand]=useState([])
    useEffect(()=>{
getbrand()
    },[])
    async function getbrand() {
      let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      setbrand(data.data)
    }
  return <>
    <Helmet>
<title>Brands</title>

  </Helmet>
   {brand?<div className="container">
    <div className="row align-items-center">
        <div className="col-md-3">
            <div className="title">
                <h3 className='text-info'>our brands</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, animi.</p>
            </div>
        </div>
    {brand.map(function(brand,idx){return <div key={idx} className="col-md-3">
        <Link to={`/brandproduct/${brand._id}`}>
        <div className="brand text-center text-info">
                <img src={brand.image} className='w-100' alt={brand.name} />
                <h6>{brand.name}</h6>
            </div>
        </Link>
        </div>})}
    </div>
  </div> :<Loading /> }
  
  
  </>
}
