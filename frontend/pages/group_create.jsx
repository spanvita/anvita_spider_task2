import { useState, useEffect } from "react";
import React from "react";
import Header from "../Components/Header3"
import Footer from "../Components/Footer"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Group_in from "../Components/group_info";

const Group=() =>{
    const [message, setMessage]= useState('');

    const Navigate=useNavigate();
    const Backend_URL='http://localhost:3000';

    useEffect(()=>{
        const fetchMessage=async()=>{
            try{
                const response = await fetch(`${Backend_URL}/main`,{
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem("Token")
                    },
                });
                const data=await response.json();
                if (data.success){
                    setMessage(data.message);
                }
                else{
                    Navigate("/");
                    toast.error("Access Denied");
                    }
            }catch (error){
                setMessage("Error");
            }
        };
        fetchMessage();
    },[Navigate]);
    
    return(
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
        <Header />
        <div className="flex items-end flex-col  w-full">
        <Group_in />
        </div>
        <Footer />
        </div>
    );
};

export default Group;