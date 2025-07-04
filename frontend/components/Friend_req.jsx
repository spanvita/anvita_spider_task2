import {useState, useEffect} from 'react';
import toast from "react-hot-toast";

function Friend() {
    const [friends, setfriends]= useState([]);
    const Backend_URL='http://localhost:3000';
    const AddFriend=async()=>{
      try{
        const lists=await fetch(`${Backend_URL}/friend`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("Token")
            },
            body: JSON.stringify({username:localStorage.getItem("Username")}),
        });
        const data=await lists.json();
        setfriends(data);
      }catch(error){
      }
    }
    const AcceptFriend=async(name)=>{
      try{
        const lists=await fetch(`${Backend_URL}/acceptfriend`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("Token")
            },
            body: JSON.stringify({name,username:localStorage.getItem("Username")}),
        });
        const data=await lists.json();
        if (data.success){
            toast.success("Friend Request Accepted")
        }
        else{
            toast.error("Failure");
        }
      }catch(error){
      }
    }
    const DeleteFriend=async(name)=>{
      try{
        const lists=await fetch(`${Backend_URL}/deletefriendinv`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("Token")
            },
            body: JSON.stringify({name,username:localStorage.getItem("Username")}),
        });
        const data=await lists.json();
        if (data.success){
            toast.success("Friend Request Declined")
        }
        else{
            toast.error("Failure");
        }
      }catch(error){
      }
    }

    useEffect(()=>{
        const interval=setInterval(()=>{
            AddFriend();
        }, 3000);
        return()=> clearInterval(interval);
    }, []);
    const l=structuredClone(friends);
    
    return (
    <div style={{width:"30%"}}>
        <div className="mb-2">
        <h2 className=" text-black font-extrabold text-2xl underline">Friend Requests <span className="font-normal">({l.length})</span></h2>
        </div>
        
        <div className="h-48 overflow-y-scroll border-4 border-double hover:black border-black rounded-lg p-4 bg-white shadow" style={{border:"5px solid purple"}}>
            <div className="flex flex-col w-full gap-2">
                {l.slice(0, l.length).map((name, i) => (
                    <div key={i} className="bg-blue-800 rounded-md px-4 py-2 w-full shadow-md flex flex-col items-center gap-2">
                        <h2 className="w-full text-left font-semibold text-lg text-white">{name}</h2>
                        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                            <button 
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded text-sm"
                            onClick={()=>{
                                AcceptFriend(friends[i]);
                                AddFriend;
                            }}>
                                Accept
                            </button>
                            <button 
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded text-sm"
                            onClick={()=>{
                                DeleteFriend(friends[i]);
                                AddFriend;
                            }}>
                                Decline
                            </button>
                        </div>
                    </div>
            ))}
            </div>
        </div>
    </div>
    );
}
export default Friend;
