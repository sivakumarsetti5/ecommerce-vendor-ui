"use client"
import React, { useRef, useState } from 'react'
import config from './config.json'
import { Input } from '../shared/Input'
import { handleFieldLevelValidation, handleFormLevelValidation,clearFormData } from '../../services/validations'
import {Captcha} from '../shared/Captcha'
import { useMutation } from '@apollo/client'
import {CHANGE_PWD} from '../../graphQL/mutation/changePassword'
import { AppCookies } from '../../services/cookies'
import { updateStoreData } from '../../services/functions'
import { useDispatch } from 'react-redux'
export const ChangePwd = () => {
  const[inputControls,setInputControls] = useState(config)
  const[isValidCaptcha,setIsValidCaptcha] = useState(false)
  const[isFirstTimeLoad,setIsFirstTimeLoad] = useState(true)
  const[fnUpdatePassword] = useMutation(CHANGE_PWD)
  const dispatch = useDispatch()
  const refreshBtnRef = useRef()

  const handleChange = async(event) =>{
    await handleFieldLevelValidation(event,inputControls,setInputControls)
  }
  const fnSubmit = async() =>{
    try{
      const[isInvalid,data] = await handleFormLevelValidation(inputControls,setInputControls)
      if(isInvalid) return
      if(!isValidCaptcha){
        setIsFirstTimeLoad(false)
        return
      }
      // console.log("input data",data)
      updateStoreData(dispatch,"LOADER",true)
        const res = await fnUpdatePassword({
          variables:{
            "changePasswordId": AppCookies.getCookie('id'),
            "newPwd": data.newPwd,
            "pwd": data.pwd
          }
        })
      const{acknowledged,modifiedCount,message,errorCode} = res?.data?.changePassword

      let msg = message
      let color="red"

      if(!errorCode){
        if(acknowledged && modifiedCount){
          msg='Password successfully changed'
          color='green'
          clearFormData(inputControls,setInputControls)
          setIsValidCaptcha(true)
          setIsFirstTimeLoad(true)

          refreshBtnRef.current.click();
        }else{
          msg="Password Not Changed"
        }
        
      }
      updateStoreData(dispatch,"TOASTER",{
        isShowToaster:true,
        toasterMsg: msg,
        color:color
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
  const validateCaptcha = (isValid) =>{
    setIsValidCaptcha(isValid)
  }
  return (
    <div className='container-fluid'>
            <h3 className='text-center mt-3 mb-3'>Change Password</h3>
            {inputControls.map(obj=>{
                return <Input {...obj} key={obj.name} handleChange={handleChange}/>
            })}
            <Captcha ref={refreshBtnRef} validateCaptcha={validateCaptcha} isValidCaptcha={isValidCaptcha} isFirstTimeLoad={isFirstTimeLoad}/>
            <div className='row mb-3'>
                <div className='offset-sm-5 col-sm-7'>
                   <button className='btn btn-primary' onClick={fnSubmit}>Submit</button>
                </div>
            </div>
        </div>
  )
}
