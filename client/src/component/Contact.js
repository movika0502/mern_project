import React,{useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom"
// import styles from './css/contact.css'

function Contact() {
  const [userData,setUserData]=useState({name:"", email:"", phone:"", message:""});

  const navigate = useNavigate()

  const userContact = async()=>{
    try{
      const res = await fetch('/getdata',{
        method:"GET",
        headers:{
          "content-type": "application/json"
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData({...userData,name:data.name,email:data.email,phone:data.phone});

      if(!res.status===200){
        const error = new Error(res.error);
        throw error;
      }
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{ 
    userContact();
  },[]);

  const handleInputs=(e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData,[name]:value});


  }
  const handlesend= async(e)=>{
    e.preventDefault();
    const {name, phone, email,message}=userData

    const res = await fetch('/contact', {
      method:"POST",
      headers:{
        "Content-Type":'application/json'

      },
      body: await JSON.stringify({
        name,email, phone,message
      })
    });
    const data= res.json();

    if(!data){
      console.log("message not send");
      userData.message = ""
      // setUserData({...userData});
      navigate("/contact")
    }
    else{
      alert("message sent");
      userData.message = ""
      // setUserData({...userData});
      navigate("/contact")
    }

  }
  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
              {/* //phone Number */}
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <i class="fa-solid fa-mobile-screen-button"></i>
                <div className="contact_info_content">
                  <div className="contact_info_title" >
                    Phone
                  </div>
                  <div className="contact_info_text">
                    +91 111 543 2198
                  </div>
                </div>
              </div>
              {/* Email address */}
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <i class="fa-solid fa-envelope"></i>
                <div className="contact_info_content">
                  <div className="contact_info_title">
                    Email

                  </div>
                  <div className="contact_info_text">
                    Movu123@gmail.com
                  </div>
                </div>
              </div>
              {/* Address */}
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <i class="fa-solid fa-location-dot"></i>
                <div className="contact_info_content">
                  <div className="contact_info_title">
                    Address

                  </div>
                  <div className="contact_info_text">
                    Surat
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* contact us form */}
        <div className="contact_form">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="contact_form_container py-5" id="form">
                  <div className="contact_form_title">
                    Get in Touch
                  </div>
                  <form  id="contact_form">
                    <div id="fight" className="contact_form_name d-flex justify-content-between align-items-center">
                      <input type="text" id="input" className="input" placeholder="Your name"  name="name" value={userData.name} onChange={handleInputs}></input>
                      <input type="email" className="input" name="email" value={userData.email} onChange={handleInputs} placeholder="Your email"></input>
                      <input type="number" className="input" placeholder="Your Phone number" value={userData.phone} name="phone" onChange={handleInputs}></input>
                    </div>
                    <div className="contact_form_text">
                      <textarea className="text_filed contact_form_message" cols="100" rows="10" placeholder="message" name="message" value={userData.message} onChange={handleInputs}></textarea>
                    </div>
                    <div className="contact_form_button">
                      <button type="submit" className="button" onClick={handlesend}>Send Message</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default Contact
