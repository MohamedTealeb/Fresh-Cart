import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Categorydet from '../Catgorydet/Categorydet';

export default function Category() {
  
  const [categ,setcateg]=useState([])
    useEffect(()=>{
getcateg()
    },[])
    async function getcateg() {
      let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      setcateg(data.data)
    }
  return <>
    <Helmet>
<title>Category</title>

  </Helmet>
  <div className="grid grid-cols-4 gap-3 ">
{categ.map((categ,id)=>{
    return<Categorydet categ={categ} key={id}/>
}) }
  </div>
   {/* {categ?<div className="container">
    <div className="row">      
    {categ.map(function(categ,idx){return <div key={idx} className="col-md-3">
        <Link >
        <div className="brand text-center text-info">
                <img src={categ.image} className='w-100' alt={categ.name} />
                <h6>{categ.name}</h6>
            </div>
        </Link>
        </div>})}
    </div>
  </div> :<Loading /> } */}
  
  
  </> 
}

  