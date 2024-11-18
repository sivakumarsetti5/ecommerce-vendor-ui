"use client"
import React, {useState } from 'react'
// import { Input } from '@/components/shared/Input'
import {Input} from '../shared/Input'
import config  from './config.json'
import { clearFormData, handleFieldLevelValidation, handleFormLevelValidation } from '../../services/validations'
import { AppCookies } from '../../services/cookies'
import { useDispatch } from 'react-redux'
import { useLazyQuery } from '@apollo/client'
import {USER_LOGIN} from '../../graphQL/query/userLogin'
import { updateStoreData } from '../../services/functions'

export const Login = () => {
    const[inputControls,setinputControls] = useState(config)
    const[fnAuth] =  useLazyQuery(USER_LOGIN)
    const dispatch = useDispatch()
    const fnLogin = async() => {
        const[isInvalid,data] =await handleFormLevelValidation(inputControls,setinputControls)
        console.log("data",data)
        console.log("isInvalid",isInvalid)
        if (isInvalid) return
        try{    
            updateStoreData(dispatch,"LOADER",true)
            const res = await fnAuth({
                variables:{userLoginData:data}
            })
            console.log("res",res)
            const{_id,uid,phone}=res?.data?.handleLogin?.[0] || {}
            if(uid){
                AppCookies.setCookie('id',_id,7)
                AppCookies.setCookie('uid',uid,7)
                AppCookies.setCookie('phone',phone,7)
                updateStoreData(dispatch,"LOGIN",true)
                clearFormData(inputControls,setinputControls)
            }else{
                updateStoreData(dispatch,"TOASTER",{
                    isShowToaster:true,
                    toasterMsg:"check uid and pwd",
                    color:"red"
                })
            }       
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
