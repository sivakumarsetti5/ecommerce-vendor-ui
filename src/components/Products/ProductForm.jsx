import React, { useState } from 'react'
import config from './config.json'
import {TextArea} from '../shared/TextArea'
import {Input} from '../shared/Input'
import {Select} from '../shared/Select'
import { handleFieldLevelValidation, handleFormLevelValidation } from '../../services/validations'
import styles from './Products.module.css'
import { useMutation } from '@apollo/client'
import {SAVE_PRODUCTS} from '../../graphQL/mutation/saveProducts'

export const ProductForm = () => {
    const [inputControls,setInputControls] = useState(config)
    const[fnSaveProduct] = useMutation(SAVE_PRODUCTS)

    const handleChange = (event) =>{
        handleFieldLevelValidation(event,inputControls,setInputControls)
    }

    const fnSubmit = async() =>{
       const[isInvalid,data] =await handleFormLevelValidation(inputControls,setInputControls)
       if(isInvalid) return
       console.log(data)
       const{category,cost,description,name} = data
       console.log(data.image[0])

       try{
        if(!(data?.image?.[0])) return
        const res = await fnSaveProduct({
            variables:{
                "file": data?.image?.[0],
                "productInput": {
                    "category": category,
                    "cost": cost,
                    "description": description,
                    "name": name
                }
            }
        })
        const{acknowledged,insertedId} = res?.data?.saveProduct
        console.log(insertedId,acknowledged)
       }catch(ex){
        console.log(ex)
       }
    }

  return (
    <div className={`container-fluid mt-5 ${styles.formCont}`}>
        {
          inputControls.map((obj,ind) => {
            switch (obj.tag) {
                case 'input':
                    return <Input key={ind} {...obj} handleChange={handleChange} />
                case 'select':
                    return <Select key={ind} {...obj} handleChange={handleChange} />
                case "textarea":
                    return <TextArea key={ind} {...obj} handleChange={handleChange}/>
                default:
                    return <></>
            }
        })
        }
        <div><button className='btn btn-primary form-control' onClick={fnSubmit}>Submit</button></div>
    </div>
  )
}
