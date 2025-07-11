import { useState, useEffect } from "react";
import React from "react";
import Header from "../Components/Header3"
import Footer from "../Components/Footer"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Checkbox=()=>
{
    const Navigate=useNavigate();
    const Backend_URL='http://localhost:3000';
    
    const [category,setCategory]=useState("");
    const [amount,setAmount]=useState(0);
    const [member,setMember]=useState([]);
    const [check,setCheck]=useState([]);
    // if(!localStorage.getItem("dataforchart1"))
    //     localStorage.setItem("dataforchart1",JSON.stringify([]));
    // if(!localStorage.getItem("dataforchart2"))
    //     localStorage.setItem("dataforchart2",JSON.stringify([]));
    // let data1, data2;
    // if(localStorage.getItem("dataforchart1")!=null)
    // {
    // data1=localStorage.getItem("dataforchart1");
    // data1=JSON.parse(data1);
    // }
    // if(localStorage.getItem("dataforchart2")!=null)
    // {
    // data2=localStorage.getItem("dataforchart2");
    // data2=JSON.parse(data2);
    // }
    const [groupData, setGroupData] = useState(JSON.parse(localStorage.getItem("Current_group")));

    // useEffect(() => {
    //     console.log("entered useEffect");
    //     const storedGroupString = localStorage.getItem("Current_group");
    //     console.log(storedGroupString); // This gets the JSON string
    //     if (storedGroupString) {
    //         try {
    //             const parsedGroup = JSON.parse(storedGroupString); // This converts it back to an object
    //             setGroupData(parsedGroup);
    //         } catch (error) {
    //             console.error("Error parsing 'Current_group' from localStorage:", error);
    //             setGroupData(null);
    //         }
    //     } else {
    //         setGroupData(null); // No data found in localStorage
    //     }
    // }, []);

    
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
    // const update_percent=async()=>
    // {
    //     try{
    //         const res=await fetch(`${Backend_URL}/update_percent`,{
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 'Authorization': localStorage.getItem("Token")
    //             },
    //             body: JSON.stringify({username:localStorage.getItem("Username"),current_group:localStorage.getItem("Current_group"),category:category,amount:amount,member:member,percent:percent}),
    //         });
    //  
    //       }catch(error){
    //       }
    // }
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

                                        <input type="checkbox" id="member_"  onChange={(e)=>{setMember(prevItems=>[...prevItems,element]),setCheck(prevItems=>[...prevItems,e.target.value])}} className="text-center text-2xl"  style={{ border:"solid 5px rgb(230, 232, 255)" ,borderRadius:"10px", backgroundColor:"rgb(230, 232, 255,0.3)" ,color:"black", width:"250px" , height:"30px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em"}}></input>

                                       
                                        <br></br>
                                    </div>
                                ))}
                                <button style={{backgroundColor:"rgb(70, 4, 70,0.8)",color:"whitesmoke",fontSize:"1.1em", borderRadius:"10px", width:"70px" }} onClick={()=>{
                                    if(amount!==0){
                                        let length=groupData.members.length;
    //                                 let split=((parseFloat(amount)/(name.members.length)));
                                        const currentUsername = localStorage.getItem("Username");
                                        let number_checked=0;
                                        console.log(check[0]);
                                        for(let z=0;z<length;z++)
                                        {
                                            if(check[z]=="on")
                                            {
                                                // console.log(check[z]);
                                                number_checked+=1;
                                                // console.log(number_checked);
                                            }
                                        }
                                        let split=amount/number_checked;
                                        
                                            for(let z=0;z<length;z++)
                                            {
                                                if(check[z]=="on")
                                                {
                                                let message=`${member[z]} owes ${currentUsername} Rs. ${split} for ${category} ;`
                                                SetMessage(groupData.groupName, groupData.groupAdmin, message)
                                                // console.log(message);
                                                }
                                                
                                            }
                                            toast.success("Updated!!!")
                                            
                                                

                                        
                                    
                                }}}>Submit</button>
                               <br></br>
                                
                                
                           
                        
                
            
            {/* <label htmlFor="category" style={{  width:"9%" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em", fontStyle:"bold"}}>Category: </label>
            <input type="text" id="category" placeholder="Kayaking..." onChange={(e)=>{setCategory(e.target.value)}} className="text-center text-2xl"  style={{ border:"solid 5px rgb(230, 232, 255)" ,borderRadius:"10px", backgroundColor:"rgb(230, 232, 255,0.3)" ,color:"black", width:"250px" , height:"30px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em"}}></input>
            <br></br>
            <label htmlFor="amount" style={{  width:"9%" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em", fontStyle:"bold"}}>Amount: </label>
            <input type="number" id="amount" placeholder="Rs.(enter as a number)" onChange={(e)=>{setAmount(e.target.value)}} className="text-center text-2xl"  style={{ border:"solid 5px rgb(230, 232, 255)" ,borderRadius:"10px", backgroundColor:"rgb(230, 232, 255,0.3)" ,color:"black", width:"250px" , height:"30px", textAlign:"center", lineHeight:"45px",fontSize:"1.1em"}}></input>
                                
          <br></br>
          <button
            onClick={update}
            style={{height:"45px",backgroundColor:"rgba(18, 18, 195)", color:"white", fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", textAlign:"center",fontSize:"1.3em", fontStyle:"bold", width:"100%", borderRadius:"10px"}}>
            Update
          </button> */}
          </div>   
            
            <Footer />
            </div>
        );
}
export default Checkbox;