"use client";
import React, { useState } from 'react';
import config from './config.json';
import { Input } from '../shared/Input';
import { handleFieldLevelValidation, handleFormLevelValidation } from '../../services/validations';
import { Captcha1 } from '../shared/Captcha1';
import { useMutation } from '@apollo/client';
import { CHANGE_PWD } from '../../graphQL/mutation/changePassword';
import { AppCookies } from '../../services/cookies';
import { updateStoreData } from '../../services/functions';
import { useDispatch } from 'react-redux';

export const ChangePwd1 = () => {
    const [inputControls, setInputControls] = useState(config);
    const [isValidCaptcha, setIsValidCaptcha] = useState(false);
    const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(true);
    const [fnUpdatePassword] = useMutation(CHANGE_PWD);
    const dispatch = useDispatch();

    const handleChange = (event) => {
      handleFieldLevelValidation(event, inputControls, setInputControls);
  };

    const fnSubmit = async () => {
      console.log("Submit button clicked");
      const [isInvalid, data] = handleFormLevelValidation(inputControls, setInputControls);
  
      console.log("Form validation result:", isInvalid, data);
  
      if (isInvalid || !isValidCaptcha) {
          console.log("Validation failed:", isInvalid, "Captcha valid:", isValidCaptcha);
          if (!isValidCaptcha) {
              setIsFirstTimeLoad(false);
          }
          return; // Prevent submission if there are validation issues
      }
  
      // Proceed with the mutation
      updateStoreData(dispatch, "LOADER", true);
      try {
          const res = await fnUpdatePassword({
            variables: {
            changePasswordId: AppCookies.getCookie('id'),
            newPwd: data.newPwd,
            pwd: data.pwd
            }
          });
          const { acknowledged, modifiedCount, message, errorCode } = res?.data.changePassword;
          let color='red'
          let msg = message

          if(!errorCode){
            if (acknowledged && modifiedCount) {
                color='green'
                msg= 'Password successfully changed'
            } else {
                msg='Password not changed'
            }
          }
          updateStoreData(dispatch, "TOASTER", {
            isShowToaster: true,
            toasterMsg: msg,
            color: color
          });
      }catch (ex) {
          updateStoreData(dispatch, "TOASTER", {
              isShowToaster: true,
              toasterMsg: 'Error changing password',
              color: "red"
          });
      } finally {
          updateStoreData(dispatch, "LOADER", false);
      }
  };
  
    const validateCaptcha = (isValid) => {
        setIsValidCaptcha(isValid);
    };
    
    return (
        <div className='container-fluid'>
            <h3 className='text-center mt-3 mb-3'>Change Password</h3>
            {inputControls.map(obj => {
                switch (obj.tag) {
                    case 'input':
                        return <Input {...obj} key={obj.name} handleChange={handleChange} />;
                    case 'captcha':
                        return (
                            <Captcha1
                                {...obj}
                                key={obj.name}
                                validateCaptcha={validateCaptcha}
                                isInvalidCaptcha={!isValidCaptcha && !isFirstTimeLoad}
                                errorMsg="Invalid Captcha"
                                isFirstTimeLoad={isFirstTimeLoad}
                                handleChange={handleChange} // Pass down the handleChange function
                            />
                        );
                    default:
                        return null;
                }
            })}
            <div className='row'>
                <div className='offset-sm-5 col-sm-7'>
                    <button className='btn btn-primary' onClick={fnSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};
