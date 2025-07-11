import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import toast from "react-hot-toast";

const Signup =()=>{
    localStorage.setItem("Token",'');
    localStorage.setItem("Username",'');
    
    const Navigate=useNavigate();
    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');
   

    const Backend_URL='http://localhost:3000';

    const formHandle= async(e)=>{
        e.preventDefault();
                try{
            const res=await axios.post(`${Backend_URL}/signup`,
              {
                username,password
            });

            const data=res.data;

            if (data.success){
                toast.success(data.message);
                localStorage.setItem("Token",data.token);
                localStorage.setItem("Username",username);
                Navigate("/main");
            }
            else{
                
                toast.error(data.message);
                setUsername('');
                setPassword('');
            }
        }catch (error){
          if (error.response) {
            
            console.error("Server Error Response:", error.response.data);
            toast.error(error.response.data.message || "An error occurred on the server.");
        } else if (error.request) {
                        console.error("No response received:", error.request);
            toast.error("Couldn't connect to server. Please check your network or try again later.");
        } else {
            
            console.error("Axios Request Setup Error:", error.message);
            toast.error("An unexpected client error occurred.");
        }
            setUsername('');
            setPassword('');
        }
    };
    return(
    <div style={{width:"30%", border:"solid 3px purple", position:"Absolute", left:"35%",top:"20%",boxShadow:"5px 5px 10px rgba(111, 111, 205, 0.7)"}}>
    <Header />
    <Footer />
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 style={{fontSize:"2em", textAlign:"center"}} > Welcome to Splitwise!!! </h2>
        <form onSubmit={formHandle} className="space-y-6">
          <div>
            <label htmlFor="username" style={{  width:"9%" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.3em", fontStyle:"bold"}}>Username: </label>
            <input type="text" id="username" placeholder="Enter username here" onChange={(e)=>{setUsername(e.target.value)}} className="text-center text-2xl"  style={{ border:"solid 5px rgb(230, 232, 255)" ,borderRadius:"10px", backgroundColor:"rgb(230, 232, 255,0.3)" ,color:"black", width:"250px" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.3em"}}></input>
            <p style={{color:"rgb(165, 42, 42)"}}>*required</p>
          </div>
          <div>
            <label htmlFor="password" style={{  width:"9%" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.3em", fontStyle:"bold"}}>Password:  </label>
            <input type="password" id="password" placeholder="Enter password here" onChange={(e)=>{setPassword(e.target.value)}} className="text-center text-2xl"  style={{ border:"solid 5px rgb(230, 232, 255)" ,borderRadius:"10px", backgroundColor:"rgb(230, 232, 255,0.3)" ,color:"black", width:"250px" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.3em"}}></input>
            <p style={{color:"rgb(165, 42, 42)"}}>*required</p>
          </div>
          <button
            type="submit"
            style={{height:"45px",backgroundColor:"red", color:"white", fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", textAlign:"center",fontSize:"1.3em", fontStyle:"bold", width:"100%", borderRadius:"10px"}}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

