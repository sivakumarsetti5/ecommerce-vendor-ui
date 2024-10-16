"use client"
import React, {useState } from 'react'
import { Input } from '@/components/shared/Input'
import config  from './config.json'
import { handleFieldLevelValidation, handleFormLevelValidation } from '@/services/validations'
import Ajax from '@/services/ajax'
import { updateStoreData } from '@/services/functions'
import { AppCookies } from '@/services/cookies'
import { useDispatch } from 'react-redux'

export const Login = () => {
    const[inputControls,setinputControls] = useState(config)
    const dispatch = useDispatch()
    const fnLogin = async() => {
        try{
        const[isInvalid,data] = handleFormLevelValidation(inputControls,setinputControls)
        if (isInvalid) return
        updateStoreData(dispatch,"LOADER",true)
        const response = await Ajax.post("auth/login",{data})
        //console.log(response)
        if(response?.data?.length >0){
            updateStoreData(dispatch,"LOGIN",true)
            console.log('loginData',response?.data)

            const {_id,uid}=response?.data?.[0] || {}
            AppCookies.setCookie("id",_id,10)
            AppCookies.setCookie('uid',uid,10)
            
        }else{
            updateStoreData(dispatch,"TOASTER",{
                isShowToaster:true,
                toasterMsg:"Check the uid and pwd",
                color:'red'
            })
        }
    }catch(ex){

    }finally{
        updateStoreData(dispatch,"LOADER",false)
    }
    //alert(`Sending data to the server ${JSON.stringify(dataObj)}`)    //if valid form then send the data to server 
    }
    const handleChange = (event) =>{
        handleFieldLevelValidation(event,inputControls,setinputControls)
    }
    return (
        <div className='container-fluid'>
            <h3 className='text-center mt-3 mb-3'>Login</h3>
            {inputControls.map(obj=>{
                return <Input {...obj} key={obj.name} handleChange={handleChange}/>
            })}
            <div className='row'>
                <div className='offset-sm-5 col-sm-7'>
                   <button className='btn btn-primary' onClick={fnLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}
