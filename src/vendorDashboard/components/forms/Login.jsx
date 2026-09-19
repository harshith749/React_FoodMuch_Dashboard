import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath'

const Login = ({showWelcomeHandler}) => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const [error,setError]=useState("")
  const [loading,setLoading]=useState(true)

  const LoginHandler=async (event)=>{
    event.preventDefault()
    try{
        const response=await fetch(`${API_URL}/vendor/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })})
            const data =await response.json()
            if(response.ok){
                alert("Login Successfull")
                localStorage.setItem("token",data.token)
                console.log(data)
                setEmail("")
                setPassword("")
                showWelcomeHandler()
            }
            const vendorId=data.vendorId
            
            const vendorRes=await fetch(`${API_URL}/vendor/get-vendor/${vendorId}`)
            const vendorData=await vendorRes.json()
            if(vendorRes.ok){
              const firmId=vendorData.vendorFirmId
              console.log("firmId",firmId)
              const vendorFirmRes=vendorData.vendor.firm[0].firmName
              console.log("vendorFirmRes",vendorFirmRes)
              localStorage.setItem("firmName",vendorFirmRes)
              localStorage.setItem("firmId",firmId)
              window.location.reload()


              
            }
          }
     catch(error){
        console.error('login failed',error)
        alert("Login Failed")
        setEmail("")
        setPassword("")
    }
  }


  return (
    <div className="loginSection">
              <h3>Vendor Login</h3>
              <form className='authForm' onSubmit={LoginHandler}>
                <label>Email</label><br/>
                <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder=""/><br/>
                <label>Password</label><br/>
                <input type="text" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder=""/>
                <br/>
                <button type="submit">Login</button>
              </form>
    </div>
  )
}

export default Login