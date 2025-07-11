import { useState, useEffect } from "react";
import React from "react";
import Header from "../Components/Header3"
import Footer from "../Components/Footer"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const ProfileUpdate=()=>
{
    const Navigate=useNavigate();
    const Backend_URL='http://localhost:3000';
    const [newusername,setNewusername]=useState("");
    const [password,setPassword]=useState("");
    const update=async()=>
    {
        try{
                const response = await fetch(`${Backend_URL}/updateprofile`,{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem("Token")
                    },
                    body:JSON.stringify({username:localStorage.getItem("Username"),newusername:newusername,password:password})
                });
                const data=await response.json();
                if (data.success){
                    toast.success(data.message);
                    localStorage.setItem("Username",newusername);
                    Navigate("/main");
                }
                else{
                    Navigate("/main");
                    toast.error("Access denied");
                    }
            }catch (error){
                toast.error("Error");
            }
    }
    return(
            <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
            <Header />
            
            
          <div>
            <label htmlFor="username" style={{  width:"9%" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.3em", fontStyle:"bold"}}>New Username: </label>
            <input type="text" id="username" placeholder="Enter username here" onChange={(e)=>{setNewusername(e.target.value)}} className="text-center text-2xl"  style={{ border:"solid 5px rgb(230, 232, 255)" ,borderRadius:"10px", backgroundColor:"rgb(230, 232, 255,0.3)" ,color:"black", width:"250px" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.3em"}}></input>
            <p style={{color:"rgb(165, 42, 42)"}}>*required</p>
          </div>
          <br></br>
          <div>
            <label htmlFor="password" style={{  width:"9%" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.3em", fontStyle:"bold"}}>New Password:  </label>
            <input type="password" id="password" placeholder="Enter password here" onChange={(e)=>{setPassword(e.target.value)}} className="text-center text-2xl"  style={{ border:"solid 5px rgb(230, 232, 255)" ,borderRadius:"10px", backgroundColor:"rgb(230, 232, 255,0.3)" ,color:"black", width:"250px" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.3em"}}></input>
            <p style={{color:"rgb(165, 42, 42)"}}>*required</p>
          </div>
          <br></br>
          <button
            onClick={update}
            style={{height:"45px",backgroundColor:"rgba(18, 18, 195)", color:"white", fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", textAlign:"center",fontSize:"1.3em", fontStyle:"bold", width:"100%", borderRadius:"10px"}}>
            Update
          </button>
          
            
            <Footer />
            </div>
        );
}
export default ProfileUpdate;