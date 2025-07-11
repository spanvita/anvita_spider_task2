import { useState, useEffect } from "react";
import React from "react";
import Header from "../Components/Header3"
import Footer from "../Components/Footer"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const GroupDetails=()=>
{
    const Navigate=useNavigate();
    const Backend_URL='http://localhost:3000';
    
    const [category,setCategory]=useState("");
    const [amount,setAmount]=useState(0);
    const [member,setMember]=useState([]);
    const [percent,setPercent]=useState([]);
    if(!localStorage.getItem("dataforchart1"))
        localStorage.setItem("dataforchart1",JSON.stringify([]));
    if(!localStorage.getItem("dataforchart2"))
        localStorage.setItem("dataforchart2",JSON.stringify([]));
    let data1, data2;
    if(localStorage.getItem("dataforchart1")!=null)
    {
    data1=localStorage.getItem("dataforchart1");
    data1=JSON.parse(data1);
    }
    if(localStorage.getItem("dataforchart2")!=null)
    {
    data2=localStorage.getItem("dataforchart2");
    data2=JSON.parse(data2);
    }
    const [groupData, setGroupData] = useState(JSON.parse(localStorage.getItem("Current_group")));

    


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
   
    return(
            <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
            <Header />
            
                   <div>  
                                <h1 
                                 style={{fontSize:"1.3em", fontStyle:"bold"}}
                                >
                                    {groupData.groupName}:
                                </h1>
                                
                                <label htmlFor="category" style={{  width:"9%" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em", fontStyle:"bold"}}>Category: </label>
                                <input type="text" id="category" placeholder="Kayaking..." onChange={(e)=>{setCategory(e.target.value)}} className="text-center text-2xl"  style={{ border:"solid 5px rgb(230, 232, 255)" ,borderRadius:"10px", backgroundColor:"rgb(230, 232, 255,0.3)" ,color:"black", width:"250px" , height:"30px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em"}}></input>
                                 <br></br>
                                <label htmlFor="amount" style={{  width:"9%" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em", fontStyle:"bold"}}>Amount: </label>
                                <input type="number" id="amount" placeholder="Rs.(enter as a number)" onChange={(e)=>{setAmount(e.target.value)}} className="text-center text-2xl"  style={{ border:"solid 5px rgb(230, 232, 255)" ,borderRadius:"10px", backgroundColor:"rgb(230, 232, 255,0.3)" ,color:"black", width:"250px" , height:"30px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em"}}></input>
                                {groupData.members.map((element,j)=>
                                (
                                    <div key={j}>
                                        <label htmlFor="member_" style={{  width:"9%" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em", fontStyle:"bold"}}>{element}</label>

                                        <input type="number" id="member_" placeholder="in percentage e.g.20" onChange={(e)=>{setMember(prevItems=>[...prevItems,element]),setPercent(prevItems=>[...prevItems,Number(e.target.value)])}} className="text-center text-2xl"  style={{ border:"solid 5px rgb(230, 232, 255)" ,borderRadius:"10px", backgroundColor:"rgb(230, 232, 255,0.3)" ,color:"black", width:"250px" , height:"30px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em"}}></input>

                                       
                                        <br></br>
                                    </div>
                                ))}
                                <button style={{backgroundColor:"rgb(70, 4, 70,0.8)",color:"whitesmoke",fontSize:"1.1em", borderRadius:"10px", width:"70px" }} onClick={()=>{
                                    if(amount!==0){
                                        let length=groupData.members.length;
    //                                 let split=((parseFloat(amount)/(name.members.length)));
                                        const currentUsername = localStorage.getItem("Username");
                                        let sumpercent=0;

                                        for(let z=0;z<length;z++)
                                        {
                                            console.log(percent[z]);
                                            sumpercent+=Number(percent[z]);
                                            console.log(sumpercent);
                                        }
                                        if(sumpercent!==100)
                                        {
                                            toast.error("The percentages do not add upto 100. Check your percentages pls. ")
                                        }
                                        else
                                        {
                                            for(let z=0;z<length;z++)
                                            {
                                                let message=`${member[z]} owes ${currentUsername} Rs. ${amount*(percent[z])/100} for ${category} ;`
                                                SetMessage(groupData.groupName, groupData.groupAdmin, message)
                                                
                                                let obj2={
                                                    mem:member[z],
                                                    pay:amount*(percent[z])/100,
                                                }
                                                
                                                data2.push(obj2);
                                            }
                                            toast.success("updated!!!")
                                            let obj1={
                                                    cat:category,
                                                    amt:Number(amount),
                                                }
                                                data1.push(obj1);
                                                localStorage.setItem("dataforchart1",JSON.stringify(data1));
                                                localStorage.setItem("dataforchart2",JSON.stringify(data2));

                                        }
                                    
                                }}}>Submit</button>
                               <br></br>
                                <button style={{backgroundColor:"rgb(70, 4, 70,0.8)",color:"whitesmoke",fontSize:"1.1em", borderRadius:"10px", width:"100px" }} onClick={()=>{Navigate('/charts')}}>View Charts</button>
                                <br></br>
                                
                           
                        
                
            
            
          </div>   
            
            <Footer />
            </div>
        );
}
export default GroupDetails;