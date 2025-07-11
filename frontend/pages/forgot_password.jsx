
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
    const firebaseConfig = {
    apiKey: "AIzaSyD3_26e1O3F4xf4oWISu638xwJcVfQgfU8",
    authDomain: "xyzw-e21e8.firebaseapp.com",
    projectId: "xyzw-e21e8",
    storageBucket: "xyzw-e21e8.appspot.com", // FIXED
    messagingSenderId: "808295851803",
    appId: "1:808295851803:web:8392ca6dde1708462755be",
    measurementId: "G-VDFFG7ZJM4"
    };
    
    const app = initializeApp(firebaseConfig);

    const [email,setEmail]=useState('');
    const auth = getAuth();
    const handleClick=()=>
    {
        if(!email)
        {
            toast.error("Pls provide Email Id")
        }
        sendPasswordResetEmail(auth, email)
        .then(() => {
            toast.success("Password reset email sent!!!")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error("Some error occurred. Could not send Password reset email");
        });
    }
    

    return (
        <div>
            <label htmlFor="email" style={{  width:"9%" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.3em", fontStyle:"bold"}}>Email:</label>
            <input type="text" id="email" placeholder="Enter email here" onChange={(e)=>{setEmail(e.target.value)}} className="text-center text-2xl"  style={{ border:"solid 5px rgb(230, 232, 255)" ,borderRadius:"10px", backgroundColor:"rgb(230, 232, 255,0.3)" ,color:"black", width:"250px" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.3em"}}></input>
            <button onClick={handleClick}>Confirm</button>
           
        </div>
    )
}

export default ForgotPassword
