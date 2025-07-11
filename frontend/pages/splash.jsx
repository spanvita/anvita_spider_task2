import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Splash = () => {
    const Navigate=useNavigate();
    // const [online,setOnline]=useState(true);
    if(!navigator.onLine)
    {
        toast.error("You are offline.")
        Navigate("/error");
    }
    window.addEventListener("online",()=>{
        toast.success("Back online...")
    })
    window.addEventListener("offline",()=>{
        toast.error("Connection lost...")
        Navigate("/error");
    })
    const [splash, setSplash]=useState(true);
    useEffect(()=>
    {
        const timer=setTimeout(()=>
        {
            setSplash(false);
        },3000);
        
    },[]);
    if(splash)
    {
        return(
            <div >
            <img src="/logo.png" ></img>
            <h1 style={{position:"fixed",top:"40%",left:"50%", textAlign:"center",color:"rgb(70, 4, 70,0.8)", fontStyle:"bold",fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", fontSize:"2em"}}> Loading...</h1>
            
        
        </div>
        )
    }
    if(navigator.onLine)
    {
       return (
        Navigate('/login')
    ) 
    }

    if(navigator.onLine)
    {
       toast.success("you are online")
    }

    // return (
    //     Navigate('/login')
    // ) 
    
}

export default Splash
