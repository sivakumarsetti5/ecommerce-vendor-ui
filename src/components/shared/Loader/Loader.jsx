import React from 'react'
import styles from './Loader.module.css'
import Image from 'next/image'
export const Loader = () => {
  return (
    <>
      <div className={styles.loader}></div>
      <Image src='/loader3.gif' alt='loading' unoptimized height={250} width={350}/>
    </>
  )
}
