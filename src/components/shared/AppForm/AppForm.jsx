import React from 'react'
import styles from './AppForm.module.css'

export const AppForm = ({setIsShowForm,children}) => {
  return (
  <>
    <div className={styles.formMask}></div>
    <div>
        <div className={styles.close} onClick={()=>setIsShowForm(false)}>X</div>
        {children}
    </div>

  </>    
  )
}
