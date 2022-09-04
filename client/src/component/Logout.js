import React,{useEffect } from 'react'
import {useNavigate}from 'react-router-dom'


export default function Logout() {
    const navigator= useNavigate();
    useEffect(() =>{
        fetch('/logout',{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            credentials:"include"
        }).then((res)=>{
            navigator("/login")
            if(!res.status !==200){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        })

    }
    )
  return (
    <div>
      <h1>You are Log out</h1> 
    </div>
  )
}
