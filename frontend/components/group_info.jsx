import {useState, useEffect} from 'react';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function group_info() {
    const Navigate=useNavigate();
    const [result, setResult]= useState([]);
    const [groupName, setgroupName]=useState([localStorage.getItem("Username")],);
    const Backend_URL='http://localhost:3000';
    const [groupinput, setGroupinput]=useState('');

    const groupData={
        groupName: groupinput,
        groupAdmin: localStorage.getItem("Username"),
        members: groupName.map(name=> ({username: name}))
    }
    const AddFriend=async()=>{
      try{
        const lists=await fetch(`${Backend_URL}/friendlist`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("Token")
            },
            body: JSON.stringify({username:localStorage.getItem("Username")}),
        });
        const data=await lists.json();
        setResult(data);
      }catch(error){
      }
    }
    useEffect(()=>{
        AddFriend();
    },[]);

    const Add=(namee)=>{
        setgroupName(prev=> [...prev,namee]);
        setResult(prev=> prev.filter(name => name!= namee));
    }
    const Delete=(namee)=>{
        setResult(prev=> [...prev,namee]);
        setgroupName(prev=> prev.filter(name => name!= namee));
    }

    const CreateGroup=async()=>{
        try{
            const lists=await fetch(`${Backend_URL}/creategroup`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem("Token")
                },
                body: JSON.stringify(groupData)
            });
            const data=await lists.json();
            if (data.success){
            toast.success("Group Created Successfully")
            Navigate('/main')
            }
            else{
            toast.error("Enter Group Name");
            }
        }catch(error){
            console.log(error);
        }
    }
    const l=structuredClone(result);
    const m=structuredClone(groupName);
    return(
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 justify-items-center px-4 mx-auto">
        <div className="w-full max-w-md mt-10 p-6 bg-white shadow-lg rounded-xl space-y-4 border-4 border-black">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-2">
            <label className="text-xl font-bold text-black">Group Name:</label>
            <input
                type="text"
                className="w-full border-black border-2 text-black bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter group name"
                value={groupinput}
                onChange={(e)=>setGroupinput(e.target.value)}
            />
            </div>
            <div className="h-48 space-y-2 overflow-y-scroll p-4 rounded-md border-2 border-black text-sm">
                {m.slice(0, m.length).map((name, i) => (
                    <div key={i} className="bg-blue-800 rounded-md px-4 py-2 w-full shadow-md flex flex-col items-center gap-2">
                        <h2 className="w-full text-left font-semibold text-lg text-white">{name}</h2>
                        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                            {localStorage.getItem("Username")!=groupName[i] && <button 
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded text-sm"
                            onClick={()=>{Delete(groupName[i])}}>
                                - Remove from Group
                            </button>}
                        </div>
                    </div>
            ))}
            </div>
        </div>
        <div className="w-full h-60 max-w-md mt-10 p-6 bg-white shadow-lg rounded-xl space-y-4 border-4 border-black overflow-y-scroll">
            {l.slice(0, l.length).map((name, i) => (
                    <div key={i} className="bg-blue-800 rounded-md px-4 py-2 w-full shadow-md flex flex-col items-center gap-2">
                        <h2 className="w-full text-left font-semibold text-lg text-white">{name}</h2>
                        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                            <button 
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded text-sm"
                            onClick={()=>{Add(result[i])}}>
                                + Add to Group
                            </button>
                        </div>
                    </div>
            ))}
        </div>
        <button 
        className='btn btn-outline border-2 bg-yellow-300 hover:bg-yellow-500 text-xl text-black'
        onClick={()=>{CreateGroup()}}>
            Create Group
        </button>
        </div>
    )
}

export default group_info;