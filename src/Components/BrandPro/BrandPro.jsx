import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

export default function BrandPro() {
    const{id}=useParams() 
    const[allproduct,setallproduct] =  useState(null)
       async function getbrandproduct() {
    
        try{
            const {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/products',
                {
                    params:{'brand':id}
                }
            )
            setallproduct(data.data)
        }catch(err){
       console.log('Error',err)
        }
     
       }
       useEffect(function(){ 
        getbrandproduct()
      },[]);
      return <>
      {allproduct? <div className="container">
        <div className="row">
            {allproduct.length==0?<h2 className='text-center'> 
                No product Available right now...
            </h2>: allproduct.map(function(pro,idx){return    <div key={idx} className="col-md-4">
            <Link to={`/Productdet/${pro.id}`} >
            
            <div 
            className="item bg-info text-white rounded-3 position-relative m-3 ">
              <img src={pro.imageCover }className='w-100' alt={pro.title} />
              <h6 className='text-center'>{pro.title.slice(0,  pro.title.indexOf(' ', 10))}</h6>
              <h6>{pro.category.name}</h6>
              <h6>price :{pro.priceAfterDiscount? <>  <span className='text-decoration-line-through'>{pro.price}</span> 
              <span className='ms-3'>{pro.priceAfterDiscount}</span>
              </> : <span>{pro.price}</span>} </h6>
    
              <div className='position-absolute top-0 end-0 bg-info p-1'>{pro.ratingsAverage}</div>
            </div>
            
            
            </Link>
            </div>
           })}
          
        </div>
      </div>:<Loading />}
     
      </>
}
