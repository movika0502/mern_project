import React, {useEffect ,  useState}from 'react'

function Home() {
  const [userName , setUserName]=useState("");
  const[show, setShow]=useState(false)
  const userHomepage = async()=>{
    try{
      const res = await fetch('/getdata',{
        method:"GET",
        headers:{
          "content-type": "application/json"
        },
      });
      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);

     
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{ 
    userHomepage();
  },);

  return (
    <div className="welcome">
       <div>
        <p>Welcome</p>
        </div>
        <div>
        <h1>{userName}</h1>
        <h2>{ show ? "happy to see you" : "We are the MERN Developer"}</h2>
        </div>
    
        
    </div>
  )
}

export default Home
