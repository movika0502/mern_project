import React from 'react'
import img from '../img/login.jpg'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigator = useNavigate()
  const[email, setEmail]=useState("")
  const[password, setPassword]=useState("")

  const logindata= async(e)=>{
    e.preventDefault()

    const res = await fetch('/login', {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({email, password})
    });
    const data= res.json();
    console.log(data)
    // if(data.status === 400){
    //   window.alert("Invalid credentials")
    //   console.log("Invalid credentials")
    // }
    // else{
    //   window.alert("login successful")
    //   console.log("Login successful")
    //   navigator('/about')
    // }
    if(data.status === 400){
      window.alert("Invalid credentials")
      console.log("Invalid credentials")
    }
    else{
      window.alert("login successful")
      console.log("Login successful")
      navigator('/')
    }
  
  }

  return (
    <div className="log">
      <div>
        <h1>Login Page</h1>
      </div>


      <div className="con">
        
          <img  className="img" src={img} alt="sign"></img>
          
          <div>
            <div>
            <i class="fa-solid fa-envelope"></i>
            <input className="control" type="text" name="email" value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder="User Email"></input>
            </div>
            <div>
            <i class="fa-solid fa-lock"></i>
            <input className="control" type="text" name="password" value={password} 
            onChange={(e) => setPassword(e.target.value)} placeholder="PasswordUser Password"></input>
          </div>
          <button type="submit" id="btncd " class="btn btn-primary" onClick={logindata}>Log in</button>
          
          
          </div>
          
        </div>
     






    </div>
  )
}
