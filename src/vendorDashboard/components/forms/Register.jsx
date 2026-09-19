import React,{use, useState} from 'react'
import { API_URL } from '../../data/apiPath'

const Register = ({showLoginHandler}) => {
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const [error,setError]=useState("")
  const [loading,setLoading]=useState(true)

  const handleSubmit=async (event)=>{
    event.preventDefault()
    try{
        const response=await fetch(`${API_URL}/vendor/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                email,
                password
            })})
            const data =await response.json()
            if(response.ok){
                console.log(data)
                alert('Vendor registered')
                setEmail("")
                setPassword("")
                setUsername("")
                showLoginHandler()  
            }
        }
    catch(error){
        console.error('registor failed',error)
        alert("Registerd Failed")
    }

  }





  return (
   <div className="registerSection">
              <h3>Vendor Register</h3>
              <form className='authForm' onSubmit={handleSubmit}>
                <label>Username</label><br/>
                <input type="text" name='username' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="" /><br/>
                <label>Email</label><br/>
                <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="" /><br/>
                <label>Password</label><br/>
                <input type="text" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder=""/>
                <br/>
                <button type="submit">Register</button>
              </form>
    </div>
  )
}

export default Register