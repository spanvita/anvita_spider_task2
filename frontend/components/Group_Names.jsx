    import {useState, useEffect} from 'react';
    import { useNavigate } from "react-router-dom";
    import toast from "react-hot-toast";

    function Group_Names() {
        const [friends, setfriends]= useState([]);
        const [category,setCategory]=useState("");
    
        const Navigate=useNavigate();
        const [amount,setAmount]=useState(0);
        const Backend_URL='http://localhost:3000';
        const Getgroup=async()=>{
          try{
            const res=await fetch(`${Backend_URL}/getgroups`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem("Token")
                },
                body: JSON.stringify({username:localStorage.getItem("Username")}),
            });
            const data=await res.json();
            setfriends(data.groupDetails);
            
            
            // console.log(friends);
          }catch(error){
          }
        }

        const SetMessage=async(a,b,c)=>{
          try{
            const res=await fetch(`${Backend_URL}/setmessage`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem("Token")
                },
                body: JSON.stringify({groupName:a,groupAdmin:b,message:c}),
            });
     
          }catch(error){
          }
        }
        
        
        const DeleteGroup=async(groupName,groupId,groupAdmin)=>{
          try{
            const lists=await fetch(`${Backend_URL}/deletegroup`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem("Token")
                },
                body: JSON.stringify({groupName:groupName,groupId,groupAdmin}),
            });
            const data=await lists.json();
            if (data.success){
                toast.success("Group Removed")
            }
            else{
                toast.error("Failure");
            }
          }catch(error){
          }
        }

        useEffect(()=>{
            const interval=setInterval(()=>{
                Getgroup();
            }, 3000);
            return()=> clearInterval(interval);
        }, []);
        let l;
        if(friends)
            {l=structuredClone(friends);}
        else
            {l=[];}
        console.log(friends); 
        // localStorage.setItem("Current_group",JSON.stringify(friends));   //add to local storage here
        return (

        <div className="w-1/3" >
            
            <div className="h-48 overflow-y-scroll border-4 border-double hover:black border-black rounded-lg p-4 bg-white shadow" style={{border:"5px solid black", position:"fixed", top:"15%", width:"30%",height:"75%"}}>
                    {friends.map((name, i) => (
                        <div key={i} >
                                <h1 
                                 style={{fontSize:"1.3em", fontStyle:"bold"}}
                                >
                                    Group {i+1} {name.groupName}:
                                </h1>
                                <button style={{backgroundColor:"red",color:"white",fontSize:"1.2em", borderRadius:"10px"}} onClick={()=>DeleteGroup(name.groupName,name.groupId,name.groupAdmin)}>Delete Group</button>
                                <br></br>
                                <label htmlFor="category" style={{  width:"9%" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em", fontStyle:"bold"}}>Category: </label>
                                <input type="text" id="category" placeholder="Kayaking..." onChange={(e)=>{setCategory(e.target.value)}} className="text-center text-2xl"  style={{ border:"solid 5px rgb(230, 232, 255)" ,borderRadius:"10px", backgroundColor:"rgb(230, 232, 255,0.3)" ,color:"black", width:"250px" , height:"30px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em"}}></input>
                                 <br></br>
                                <label htmlFor="amount" style={{  width:"9%" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em", fontStyle:"bold"}}>Amount: </label>
                                <input type="number" id="amount" placeholder="Rs.(enter as a number)" onChange={(e)=>{setAmount(e.target.value)}} className="text-center text-2xl"  style={{ border:"solid 5px rgb(230, 232, 255)" ,borderRadius:"10px", backgroundColor:"rgb(230, 232, 255,0.3)" ,color:"black", width:"250px" , height:"30px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em"}}></input>
                                <button style={{backgroundColor:"rgb(70, 4, 70,0.8)",color:"whitesmoke",fontSize:"1.1em", borderRadius:"10px", width:"70px" }} onClick={()=>{
                                    if(amount!==0){
                                    let split=((parseFloat(amount)/(name.members.length)));
                                    const currentUsername = localStorage.getItem("Username");
                                    const otherMembersArray = name.members.filter(memberObject => 
                                        memberObject !== currentUsername
                                    );
               
                                    let message = `${otherMembersArray.join(', ')} owe ${currentUsername} Rs. ${split} for ${category}     ;`;
                                    SetMessage(name.groupName, name.groupAdmin, message)
                                }}}>Submit</button>
                               <br></br>
                                <div className="h-48 overflow-y-scroll border-4 border-double hover:black border-black rounded-lg p-4 bg-white shadow" style={{backgroundColor:"rgb(230, 232, 255)", width:"400px",height:"100px", borderRadius:"10px", color:"black"}}>
                                    {name.message}<br></br></div>
                                <br></br>
                                <button style={{backgroundColor:"rgb(70, 4, 70,0.8)",color:"whitesmoke",fontSize:"1.1em", borderRadius:"10px", width:"100px" }} onClick={()=>{Navigate('/group_details'),localStorage.setItem("Current_group",JSON.stringify(name));}}>More details</button>
                                
                                <br></br>
                                <button style={{backgroundColor:"rgb(70, 4, 70,0.8)",color:"whitesmoke",fontSize:"1.1em", borderRadius:"10px", width:"150px" }} onClick={()=>{Navigate('/checkbox'),localStorage.setItem("Current_group",JSON.stringify(name));}}>Checkbox  selection</button>
                                
                                <br></br>
                                
                                
                           
                        </div>
                ))}
              
                
            </div>
          </div>
        );
    }
    export default Group_Names;

