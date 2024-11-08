'use client'
import { useQuery } from '@apollo/client'
import React from 'react'
import {GET_PRODUCTS} from "../../graphQL/query/getProducts"
import {AppTable} from '../shared/AppTable'
export const Products = () => {
  const{data,error,loading} = useQuery(GET_PRODUCTS)
  console.log(data?.getProducts)
  return (
    <div>
      <AppTable data={data?.getProducts ||[]} 
       tds={["filePath","name","category","cost","description"]}
       ths={["Image","Name","Category","Cost","Description"]} />
    </div>
  )
}

