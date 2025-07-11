import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Error = () => {
    const Navigate=useNavigate();
    window.addEventListener("online",()=>{
        toast.success("Back online...")
        return (
        Navigate('/login')
    )
    })
    
    return (
        <div>
        <h1 style={{position:"fixed",top:"30%",left:"30%", textAlign:"center",fontStyle:"bold",fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", fontSize:"2em"}}>No internet</h1>
        <br></br>
        <br></br>
        <h1 style={{position:"fixed",top:"35%",left:"30%", textAlign:"center", fontStyle:"bold",fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", fontSize:"2em"}}>Try:</h1>
        <h2 style={{position:"fixed",top:"40%",left:"30%", textAlign:"center",fontStyle:"bold",fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", fontSize:"1.4em"}}>.       Check the network Cables, modem and router.</h2>
        <h2 style={{position:"fixed",top:"45%",left:"30%", textAlign:"center",fontStyle:"bold",fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", fontSize:"1.4em"}}>.       Roconnecting to Wi-fi.</h2>
        </div>
    )
}

export default Error
