import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Friendlist from "../Components/list_friends";
import React from "react";
import Footer from "../Components/Footer"
import Header from "../Components/Header2"
import Friend from "../Components/Friend_req";
import Group_Names from "../Components/Group_Names";



const MainPage=()=>{
    

    const Navigate=useNavigate();
    const Backend_URL='http://localhost:3000';

    useEffect(()=>{
        const fetchMessage=async()=>{
            try{
                const res= await axios.get(`${Backend_URL}/main`
                    ,{
                    headers:{
                        'Authorization': localStorage.getItem("Token")
                    },
                }
            )
                const data=await res.data;
                if (data.success){
                    toast.success(data.message);
                }
                else{
                    Navigate("/");
                    toast.error("Access Denied");
                    }
            }catch (error){
                toast.error("Could not access server. Try again later.")
            }
        };
        fetchMessage();
    },[Navigate]);
    return(
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
        <Header />
        <div>
        <Group_Names />
        </div>
        <div className="flex items-end flex-col  w-full">
        <Friend />
        <Friendlist />
        </div>
        <Footer />
        </div>
    );
};

export default MainPage;