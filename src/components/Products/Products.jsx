'use client'
import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {GET_PRODUCTS} from "../../graphQL/query/getProducts"
import {DELETE_PRODUCT} from '../../graphQL/mutation/deleteProduct'
import {AppTable} from '../shared/AppTable'
import {updateStoreData} from '../../services/functions'
import { useDispatch } from 'react-redux'
import styles from './Products.module.css'
import {AppForm} from '../shared/AppForm'
import {ProductForm} from './ProductForm'

export const Products = () => {
  const [isShowForm,setIsShowForm] = useState(false)
  const dispatch = useDispatch()
  const{data,error,loading,refetch} = useQuery(GET_PRODUCTS,{
    fetchPolicy:"no-cache"  // Doesn't check cache before making a network request
  })
  const[fnDeleteProduct] = useMutation(DELETE_PRODUCT)
  // console.log(data?.getProducts)

  const fnAddProduct = () =>{
    setIsShowForm(true)
  }
  
  const deleteProduct=async ({_id,filePath})=>{
    // console.log(111,_id,filePath)
    try{
    updateStoreData(dispatch,"LOADER",true)
    const res = await fnDeleteProduct({
      variables:{
        "data": {
          "id": _id,
          "path":filePath
        }
      }
    })
    const{acknowledged,deletedCount} = res?.data?.deleteProduct
    // console.log(res?.data?.deleteProduct)
    let isDeleteProduct = false
    if(acknowledged && deletedCount>0){
      refetch()
      isDeleteProduct = true
    }
    updateStoreData(dispatch,"TOASTER",{
      isShowToaster:true,
      toasterMsg: isDeleteProduct ? "Product Successfully Deleted":"Not Deleted",
      color: isDeleteProduct ? "green":"red"
    })     
  }catch(ex){
    updateStoreData(dispatch,"TOASTER",{
      isShowToaster:true,
      toasterMsg: ex?.message,
      color:"red"
    }) 
  }finally{
    updateStoreData(dispatch,"LOADER",false)
  }
  }

  const handleDelete = (row) =>{
    updateStoreData(dispatch,"MODAL",{
      isShowModal:true,
      modalAction:()=>deleteProduct(row)
    })
  }

  useEffect(()=>{
    updateStoreData(dispatch,"LOADER",loading)
  },[loading])
  return (
    <div>
      <div className='text-end m-3'><button className="btn btn-primary" onClick={fnAddProduct}>Add Product</button></div>
      <AppTable data={data?.getProducts ||[]}
       imgThs={["Image"]}
       imgTds={["filePath"]}
       tds={["name","category","cost","description"]}
       ths={["Name","Category","Cost","Description"]} 
       handleDelete={handleDelete}
       />
       {isShowForm &&<AppForm setIsShowForm={setIsShowForm}><ProductForm/></AppForm>}
    </div>
  )
}
