import { useState, useEffect } from "react";
import React from "react";
import Header from "../Components/Header2"
import Footer from "../Components/Footer"
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Search=()=>{
    const [message, setMessage]= useState('');
    const [result, setResult]= useState([]);

    const Navigate=useNavigate();
    const location=useLocation();
    const link=new URLSearchParams(location.search);
    const username=link.get("username")||'';
    const Backend_URL='http://localhost:3000';

    const AddFriend=async(name)=>{
      try{
        const lists=await fetch(`${Backend_URL}/addfriend`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("Token")
            },
            body: JSON.stringify({name,username:localStorage.getItem("Username")}),
        });
        const data=await lists.json();
        if (data.success){
            toast.success("Friend Request Sent")
        }
        else{
            toast.error("User is already your friend");
        }
      }catch(error){

      }
    }


    useEffect(()=>{
        if (username.trim()==="") return;
        
        const Userlist=async()=>{
            try{
                const lists=await fetch(`${Backend_URL}/search`,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("Token")
                    },
                    body: JSON.stringify({username})
                });
                const data=await lists.json();
                setResult(data);
            }catch(error){
            }
        };
        Userlist();
    }, [username]);

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
    const l=structuredClone(result);
    const MyName=localStorage.getItem("Username");
    let test=-1;
    for (let i=0; i<l.length;i++){
        if (MyName===l[i]){
            test=i;
        }
        const words=l[i].split(' ');
        let temp='';
        for (let j=0;j<words.length;j++){
            temp+=words[j].charAt(0).toUpperCase()+ words[j].slice(1)+' ';
        }
        l[i]=temp;
    }
    if (test>-1){
        l.splice(test,1);
    }
    return(
        <div className="mt-20 mb-19 min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
        <Header />

        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center w-full max-w-screen-xl mx-auto">
            {l.slice(0, l.length).map((name, i) => (
                <div key={i} className="card bg-primary text-primary-content w-80">
                <div className="card-body">
                    <h2 className="card-title font-bold text-3xl justify-center">{name}</h2>
                    <div className="card-actions justify-center" >
                        <button className="btn btn-active" onClick={()=>AddFriend(result[i])}>
                            + Add Friend
                        </button>
                    </div>
                </div>
                </div>
        ))}
        </div>
        <Footer />
        </div>
    );
};

export default Search;