import React, { useContext, useEffect, useState } from 'react'
import config from './config.json'
import Link from 'next/link'
import styles from './Menu.module.css'
import Image from 'next/image'
import {AppCookies} from '../../services/cookies'
import { useDispatch } from 'react-redux'

export const Menu = () => {
    const[inputControls,setInputControls] = useState(config)
    const[isMobileView,setIsMobileView] = useState(document.body.offsetWidth<700)
    const[left,setLeft] = useState('-80vw')
    const[isActiveId,setIsActiveId] = useState(inputControls[0].id)
    const dispatch = useDispatch()
    function handleResize(){
        window.addEventListener('resize',()=>{
            setIsMobileView(document.body.offsetWidth<700)
        })
    }
    useEffect(()=>{
        handleResize()
    },[])

    const handleMobileMenuBtnClick=()=>{
        setLeft(left==='0'? '-80vw':'0')
    }
    const handleMenuItemClick=(id)=>{
        if(id==='logout'){
            dispatch({
                type:"MODAL",
                payload:{
                    isShowModal:true,
                    modalAction:fnLogout
                }
            })
        }
        if(isMobileView){
            setLeft('-80vw')
        }
        setIsActiveId(id)
    }
    const fnLogout=()=>{
        AppCookies.deleteAllCookies()
        dispatch({
            type:"LOGIN",
            payload:false
        })

    }
    return (
        <>
        {isMobileView && <Image onClick={handleMobileMenuBtnClick} className={styles.mobile_menu_icon} src='/menu-icon.jpg' width={40} height={30} alt='mobile Menu'/>}
        <ul style={{left}} className={isMobileView ? styles.mobileMenu : styles.menu}>
            {
            inputControls?.map(({id,name,path})=>{
                return <li key={id} onClick={()=>handleMenuItemClick(id)} className={isActiveId === id ? styles.menuItemCont : ""}><Link id={id} href={path}>{name}</Link></li>
            })
            }
        </ul>
        </>
    )
}
