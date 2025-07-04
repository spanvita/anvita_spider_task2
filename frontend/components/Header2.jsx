import {useState, useEffect, useRef } from 'react';
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";


localStorage
function Header() {
    const Navigate=useNavigate();
    const location=useLocation();
    const inputbox=useRef(null);

    const [profilepic, setprofilepic] = useState(() => {
        return localStorage.getItem("dp") || "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg";
    });

    const link=new URLSearchParams(location.search);          // ?username=alice
    const initialvalue=link.get("username") || '';
    const [searchkey, setSearchKey]=useState(initialvalue);
    const Backend_URL='http://localhost:3000';
    
    const delAcc=async()=>{
      try{
        const lists=await fetch(`${Backend_URL}/delete`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("Token")
            },
            body: JSON.stringify({username:localStorage.getItem("Username")}),
        });
        const data=await lists.json();
        if (data.success){
          toast.success("Account Deleted Successfully ")
          Navigate('/')
        }
        else{
          toast.error("Account Deletion Failed");
        }
      }catch(error){
        toast.error("some error occurred. Try again later.")
      }
    }

    const dp=(e)=>
    {
      const newImageUrl = e.target.value; 
      setprofilepic(newImageUrl);
      localStorage.setItem("dp",newImageUrl);
    }
    useEffect(()=>{
        if (initialvalue !=='' && inputbox.current){
            inputbox.current.focus();
        }
    }, [initialvalue]);

    useEffect(()=>{
        const timeout=setTimeout(()=>{
            if (searchkey.trim() !== ''){
                Navigate(`/search?username=${encodeURIComponent(searchkey.trim())}`);
            }
            else if (searchkey.trim()===''){
                Navigate('/main');
            }
        },300);
        return()=>clearTimeout(timeout);
    }, [searchkey,Navigate]);

    let username=localStorage.getItem("Username");
   
    return (
      <div>
      <div style={{backgroundColor:"rgb(70, 4, 70,0.8)",position:"fixed",top:"0px",width:"100%",height:"100px",left:"0px", borderRadius:"10px"}}>
        <h1 style={{textAlign:"center",lineHeight:"100px",color:"aliceblue", fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", fontSize:"3.2em"}}>Splitwise</h1>
        <button 
          style={{color:"white",position:"absolute", left:"50px",top:"0px",lineHeight:"100px",textAlign:"center",fontSize:"3em"}}
          data-tip="Add Group"
          onClick={()=> Navigate("/group_create")}>
            +
        </button>
        <button 
          onClick={() => Navigate("/main")} 
          style={{color:"black",position:"absolute", left:"100px",top:"35px",textAlign:"center",fontSize:"1.5em",backgroundColor:"aliceblue",borderRadius:"10px", height:"40px"}}
          data-tip="Home">
          Home
        </button>
      </div>
      <div >
        <input
          type="text"
          placeholder="Search Users..."
         style={{ border:"solid 5px rgb(230, 232, 255)" ,borderRadius:"10px", backgroundColor:"rgb(230, 232, 255,0.3)" ,color:"black", width:"250px" , height:"50px", textAlign:"center", lineHeight:"45px",fontSize:"1.3em", position:"absolute",top:"25px",right:"100px"}}
           
          
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
      <div style={{position:"absolute",top:"25px",right:"10px"}}>
            <div className="dropdown dropdown-end ml-3">
            <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={profilepic} 
                  alt="User Profile"/>
              </div>
            </div>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <h1 className="text-xl p-3" style={{backgroundColor:"purple", color:"white",borderradius:"10px"}}>{username}</h1>
              <li>
                <button className="justify-between" style={{backgroundColor:"blue", color:"white"}} onClick={() => Navigate("/")}>
                  Logout
                </button>
              </li>
              <li><label htmlFor="dp"style={{backgroundColor:"blue", color:"white" }}>Change Profile Picture</label>
              <input id="dp" placeholder="enter the url for profile picture" onChange={(e)=>dp(e)}></input></li>
              <li>
                
                  <button style={{backgroundColor:"red", color:"white"}} className="text-xs max-w-21 btn bg-red-500 text-white" onClick={delAcc}>
                    Delete Account
                  </button>
                
              </li>
            </ul>
            
       </div>
       </div>
       </div>
     
  );
}
export default Header;