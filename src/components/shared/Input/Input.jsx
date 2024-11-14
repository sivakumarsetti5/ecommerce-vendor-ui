import React from 'react'
import Image from 'next/image'
export const Input = ({lbl,lblCols,inputCols,errorMsg,value,isRequired,isDisabled,type,name,errMsgCols,handleChange,placeholder,src}) => {
  const inputDisplayHandle = () =>{
    switch(type){
      case 'text':
      case 'number':
        return <input value={value} disabled={isDisabled} placeholder={placeholder} type={type} name={name} className='form-control' onChange={handleChange}/>
      case 'file':
        return <div>
          <input disabled={isDisabled} placeholder={placeholder} type={type} name={name} className='form-control' onChange={handleChange}/>
          <Image height={100} width={100} alt="product image" src={src}/>
        </div>
      }
  }

  return (
    <div className='row mb-3'>
        <div className={`col-sm-${lblCols} text-end`}>
            <label className='form-label'>{lbl}{isRequired && <span className='text-danger'>*</span>}:</label>
        </div>
        <div className={`col-sm-${inputCols}`}>
          {inputDisplayHandle()}
        </div>
        <div className={`col-sm-${errMsgCols}`}>
            {errorMsg && <b className='text-danger'>{errorMsg}</b>}
        </div>
    </div>
  )
}

