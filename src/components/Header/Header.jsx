import React from 'react'
import styles from './Header.module.css'
import Image from 'next/image'
export const Header = () => {
    return (
        <div className={`py-2 ${styles.header_container}`}>
            {/* <Image src='/easyCart_logo.png' alt='website logo' height={60} width={60} className='mx-3'/> */}
            <h1 className={`text-white text-center ${styles.header}`}>easyCart Admin Portal</h1>
        </div>
    )
}
