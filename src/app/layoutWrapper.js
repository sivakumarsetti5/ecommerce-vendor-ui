"use client"
import "./globals.css";
import {useSelector } from "react-redux";
import { Header } from "../components/Header";
import {Footer} from '../components/Footer';
import { Menu} from "../components/Menu";
export default function RootLayoutWrapper({ children }) {
  const isLoggedIn = useSelector((state)=>state?.appReducer.isLoggedIn)
  return (
      <>
        <Header/>
        {/* {isLoggedIn && <Menu/>} */}
        {children}
        <Footer/>
      </>
  );
}
