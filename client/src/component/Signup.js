import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import myImg from '../img/bg1.jpg' 

function Signup() {
  const navigate = useNavigate()
  const [user, setUser]=useState({
    name:"", email:"", phone:"",work:"",password:"",cpassword:"",
  })
  let name, value;
  const handleinput=(e) =>{ 
    name=e.target.name;
    value=e.target.value;
    setUser({...user, [name]:value});

  }
  

  const PostData= async(e) =>{ 
    
    e.preventDefault();
    const {name, email, phone, password, cpassword, work}=user;
    const res=await fetch('/register',{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name:name, email:email, phone:phone, password:password, cpassword:cpassword, work:work
      })
    });
    const data= await res.json();

    console.log(data)
 
    if(data.status===422|| !data){
      window.alert("Invalid Register");
      console.log("Invalid Register")
    }
    else{
      window.alert("valid Register");
      console.log("valid Register")
      navigate("/login")
    }
  // history.push("/login");

  
  

  }
  
  return (
    <div className="form">
      <h2 className="text">Sign up</h2>
      <div className="sign">
        <div className="up">

          <div>
          <i className="fa-solid fa-user" ></i>
            <input className="control12" type="text" onChange={handleinput} value={user.name} name="name" placeholder="User Name"></input>
          </div>
          <div>
            <i class="fa-solid fa-envelope"></i>
            <input className="control12" type="text" onChange={handleinput} value={user.email} name="email" placeholder="User Email"></input>
          </div>
          <div>
            <i class="fa-solid fa-phone"></i>
            <input className="control12" type="text" onChange={handleinput} value={user.phone} name="phone" placeholder="User Number"></input>
          </div>
          <div>
            <i class="fa-solid fa-laptop"></i>
            <input className="control12" type="text" onChange={handleinput} value={user.work} name="work" placeholder="User Profession"></input>
          </div>
          <div>
            <i class="fa-solid fa-lock"></i>
            <input className="control12" type="text" onChange={handleinput} value={user.password} name="password" placeholder="User Password"></input>
          </div>
          <div>
            <i class="fa-solid fa-key"></i>
            <input className="control12" type="text" onChange={handleinput} value={user.cpassword} name="cpassword" placeholder="Confirm Password"></input>
          </div>
          <button type="submit" class="btn btn-primary" onClick={PostData}>Register</button>
        </div>
        <div className="img">
          <img src={myImg} alt="Sign"></img>
        </div>
        


      </div>
    </div>
  )
}

export default Signup;