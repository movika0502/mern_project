import React, {useEffect ,  useState} from 'react'
import img from '../img/bg2.jpg'
import { useNavigate} from 'react-router-dom'



export default function About(props) {
  const [userData , setUserData] = useState({})
  const navigator = useNavigate()
  const callAboutpage=async()=>{ 
    try{
      const res= await fetch('/about',{
        method: 'GET',
        headers:{
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
        credentials:"include"
      });
      const data=  await res.json();
      console.log(data);
      setUserData(data);
      if(!res.status===200){
        const error =new Error(res.error);
        throw error;
      }
    }
    catch(error){
      console.log(error);
      navigator('/login')
    }
  }
  useEffect(() => {
    callAboutpage();
  },[]);
  return (
    <div>
      <div className="container emp-profile">
        <form method="">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
              <img className="img1" src={img} alt="" />

              </div>
             
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile-rating mt-3 mb-5">RANKING <span>1/10</span></p>

                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">About</a>
                  </li>
                  
                </ul>
              </div>
            </div>
            <div className="col-md-23">
              <input type="submit" className="profile-edit-btn" name="btnADDMore" value="Edit Profile" />

            </div>
          </div>
          <div className="row">
            {/* // left side url */}
            <div className="col-md-4">
              <div className="profile-work">
                <p clasName="para">Work Link</p>
                <a href="https://www.youtube.com/" target="_movu">YouTube</a><br></br>
                <a href="https://www.youtube.com/" target="_movu">instragram</a><br></br>
                <a href="https://www.youtube.com/" target="_movu">Web Developer</a><br></br>
                <a href="https://www.youtube.com/" target="_movu">Movika</a><br></br>
                <a href="https://www.youtube.com/" target="_movu">Figma</a><br></br>
                <a href="https://www.youtube.com/" target="_movu">Software</a><br></br>
              </div>

            </div>
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-pane fade show active" id="home" aria-labelledby="home-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <label>User ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>745467674576745476</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6 mt-3">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6 mt-3">
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6 mt-3">
                      <p>{userData.phone}</p>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6 mt-3">
                      <p>{userData.work}</p>
                    </div>
                    
                  </div>
                </div>
              </div>
              
            </div>
            </div>
        </form>
      </div>
    </div>
  )
}
