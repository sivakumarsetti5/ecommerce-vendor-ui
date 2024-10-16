"use client"
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import {GET_PRODUCTS} from '../graphQL/query/getProducts'
import {SAVE_PRODUCTS} from '../graphQL/mutation/saveProducts'
import React from 'react'

const page = () => {
  const{loading,error,data}=useQuery(GET_PRODUCTS)
  const [getproducts,{loading:lazyLoading,error:lazyError,data:LazyData}]=useLazyQuery(GET_PRODUCTS)
  const[saveProduct]=useMutation(SAVE_PRODUCTS)
  const fnHandleBtnClick = () =>{
    getproducts()
  }
  const fnSaveProduct = async() =>{
    const res = await saveProduct({
      variables:{
        "productInput": {
          "category": "fashion",
          "cost": 2345,
          "description": "this is nice product with good rating",
          "name": 'jeans'
        }
      }
    })
  }
  return (
    <div>
      {/* <div>Onload:{loading && <span>Loading ....</span>}<span>{data?.getProducts?.[0]?.name}</span></div> */}
      <button onClick={fnHandleBtnClick}>Get Products</button>
      <div>On btn click:{lazyLoading && <span>Loading ....</span>}<span>{LazyData?.getProducts?.[3]?.name}</span></div>
      <button onClick={fnSaveProduct}>Save Product</button>
    </div>
  )
}
export default page
