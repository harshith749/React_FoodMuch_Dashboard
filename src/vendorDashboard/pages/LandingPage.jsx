import React,{use, useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
    const [showLogin , setShwLogin] = useState(false)
    const [showRegister,setShwRegister]=useState(false)
    const [showFirm,setShwFirm]=useState(false)
    const [showProduct,setShwProduct]=useState(false)
    const [showWelcome,setShowWelcome]=useState(false)
    const [showAllProducts,setShowAllProducts]=useState(false)
    const [showLogout,setShowLogout]=useState(false)
    const [showFirmTitle,setShowFirmTitle]=useState(true)

    useEffect(()=>{
        const firmName = localStorage.getItem('firmName')
        if(firmName){
            setShowFirmTitle(false)
        }
    }, [])


    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            setShowLogout(true)
        }
    }, [])

    const logoutHandler=()=>{
        confirm('Are you sure you want to logout?')
        localStorage.removeItem('token')
        localStorage.removeItem('firmId')
        localStorage.removeItem('firmName')
        alert('Logout successful')
    
        setShowLogout(false)
            window.location.reload()
    }

    const showFirmHandler=()=>{
        if(showLogout){
        setShwFirm(true)
        setShwLogin(false)
        setShwRegister(false)
        setShwProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)
        }else{
            alert('Please login to add firm')
            setShwLogin(true)
        }
    }

    const showProductHandler=()=>{
      if(showLogout){
          setShwProduct(true)
        setShwLogin(false)
        setShwRegister(false)
        setShwFirm(false)
        setShowWelcome(false)
         setShowAllProducts(false)
      }else{
        alert('Please login to add product')
        setShwLogin(true)
      }
    }


    const showRegisterHandler=()=>{
        setShwRegister(true)
        setShwLogin(false)
        setShwFirm(false)
        setShwProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)
    }

    const showLoginHandler=()=>{
        setShwLogin(true)
        setShwRegister(false)
        setShwFirm(false)
        setShwProduct(false)
        setShowWelcome(false)
         setShowAllProducts(false)
    }

    const showWelcomeHandler=()=>{
        setShowWelcome(true)
        setShwLogin(false)
        setShwRegister(false)
        setShwFirm(false)
        setShwProduct(false)
         setShowAllProducts(false)
    }

    const showAllProductsHandler=()=>{
        if(showLogout){
            setShowAllProducts(true)
            setShowWelcome(false)
            setShwLogin(false)
            setShwRegister(false)
            setShwFirm(false)
            setShwProduct(false)
        }else{
            alert('Please login to view all products')
            setShwLogin(true)
        }
    }

  return <div className="landingSection">
    <Navbar showLoginHandler={showLoginHandler}  showRegisterHandler={showRegisterHandler} showLogout={showLogout} logoutHandler={logoutHandler}/>
    <div className="collectionSec">
    <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler}  showAllProductsHandler={showAllProductsHandler} showFirmTitle={showFirmTitle}/>
     {showLogin && <Login showWelcomeHandler={showWelcomeHandler}/>}
    {showRegister && <Register showLoginHandler={showLoginHandler}/>}

    {showFirm && showLogout && <AddFirm/>}
    {showProduct && showLogout && <AddProduct/>}
    {showWelcome && <Welcome/>}
    {showAllProducts && showLogout && <AllProducts/>}
    </div>
  </div>
}  

export default LandingPage