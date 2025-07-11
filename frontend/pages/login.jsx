import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import toast from "react-hot-toast";

const Login =()=>{
    localStorage.setItem("Token",'');
    localStorage.setItem("Username",'');
    
    const Navigate=useNavigate();
    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');
   
    const Backend_URL='http://localhost:3000';

    const formHandle= async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post(`${Backend_URL}/login`,
              {
                username,password,
            });

            const data=await res.data;

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
            toast.error("Couldn't connect to server. Try again later.");
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
        <br></br>
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
            style={{height:"45px",backgroundColor:"rgba(18, 18, 195)", color:"white", fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", textAlign:"center",fontSize:"1.3em", fontStyle:"bold", width:"100%", borderRadius:"10px"}}>
            Login 
          </button>
          <a href="/forgot_password"style={{color:"rgb(165, 42, 42)",textDecoration:"underline"}}>Forgot password</a>
          <br></br>
          <label style={{fontSize:"1.3em", fontStyle:"bold"}}>Don't have an account?    </label>
          <button
            type="button" onClick={()=> Navigate("/signup")}
            style={{height:"35px",backgroundColor:"red", color:"white", fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", textAlign:"center",fontSize:"1.3em", fontStyle:"bold", width:"25%", borderRadius:"10px"}}>
            Sign up 
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
