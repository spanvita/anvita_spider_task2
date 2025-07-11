import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import bcrypt from 'bcrypt';
import Joi from 'joi';
import mongoose, { trusted } from 'mongoose';

const app = express();
const port = process.env.PORT||3000;
const JWTKey=process.env.JWTKey

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost/billsplit')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection failed:", err));

const userSchema= new mongoose.Schema({
    username: {
        type:String, 
        unique:true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    friends: {
        type: [String],
        default: [],
    },
    friendrequest: {
        type: [String],
        default: [],
    },
    groups: {
        type: [String],
        default: [],
    },
    dp: {
        type: [String],
        default: ["https://static.wikia.nocookie.net/characters/images/a/a5/Latest_%2810%29.jpg"],
    }
});


userSchema.pre('deleteOne',{ document: true, query: false }, async function (next){
    const username_remove=this.username;
     try {
        await this.model('Users').updateMany(
            { $or: [{ friends: username_remove }, { friendrequest:username_remove }] },
            {
                $pull: {
                    friends: username_remove,
                    friendrequest: username_remove
                }
            }
        );
        next();
    } catch (err) {
        next(err);
    }
});
const User= mongoose.model('Users',userSchema);

const groupSchema= new mongoose.Schema({
    groupId :{
        type: String,
        unique: true,
        required: true
    },
    groupName:{
        type: String,
        required: true
    },
    groupAdmin:{
        type: String,
        required: true
    },
    members: [String],
    message:[String],
    expenses: [
        {
            description: {
                type: String,
                required: true
            },
            paidBy: {
                type: String,
                required: true
            },
            splits: [
                {
                    username: {
                        type: String,
                        required: true
                    },
                    amount: {
                        type: Number,
                        required: true
                    }
                }
            ],
            
        }
    ]
});
const Group=mongoose.model("Group",groupSchema);

//for authorizing all pages using JWT
function verify(req,res,next){
    const token=req.headers['authorization'];
    if (!token){
        return res.status(401).json({message: 'No token given'});
    }
    jwt.verify(token, JWTKey,(erro,decoded)=>{
        if (erro){
            return res.status(403).json({message: 'Token expired!'});
        }
        req.user=decoded;
        next();
    });
}

//create account
app.post('/signup',async(req,res)=>{
    const schema=Joi.object(
        {
            username:Joi.string().min(8).required(),
            password:Joi.string().min(8).required()
        }
    )
    const { error } = schema.validate(req.body);
    if (error) 
    {
        return res.status(400).send({message:error.details[0].message,
            success:false
        });
    }
    let {username,password}=req.body;
    
    const user_exist=await User.findOne({username});
    if (user_exist){
        return res.send({
            success:false,
            message:'This username exists. Pls try another name...'
        });
    }
    
    let hashed_password=await bcrypt.hash(password,10);
    let user=new User({username,password:hashed_password});
    await user.save();
    const token=jwt.sign({username},JWTKey,{expiresIn:'1h'});
    return res.send({
        success:true,
        message:"Credentials saved successfully",
        token
    });
});

//login account
app.post('/login',async (req,res)=>{
    let {username,password}=req.body;
    
    const user_cred=await User.findOne({username});
    if (!user_cred){
        return res.send({
            success:false,
            message:'Username or password is incorrect'
        });
    }
    const match=await bcrypt.compare(password,user_cred.password);
    if (!match) 
        {
            return res.send({
            success:false,
            message:'Username or password incorrect'
            });
        }
    const token=jwt.sign({username},JWTKey,{expiresIn:'1h'});
    return res.send({
        message: "Authenticated",
        success:true,
        token
    });
});

app.get('/main',verify,(req,res)=>{
    res.json({
        success:true,
        message: "Splitwise welcomes you!!!"
    });
})

app.post('/search',verify, async(req,res)=>{
    const {username}=req.body;
    if (!username){
        return res.status(400).json({message:"Missing username"});
    }
    const users=await User.find({
        username:{$regex: `^${username}`, $options: 'i'}
    }).limit(10);

    const results=users.map(user=>user.username);
    res.json(results);
})

app.post('/addfriend',verify, async(req,res)=>{
    const {name,username}=req.body;
    if (!name){
        return res.status(400).json({message:"Missing username"});
    }
    const user=await User.findOne({username:username})
    if (user.friends.includes(name)){
        res.json({
            success:false,
        })
    }
    else{
        await User.updateOne(
            {username: name},
            {$addToSet:{friendrequest:username}}
        );
        res.json({
            success:true,
        })
    }
})

app.post('/delete',verify, async(req,res)=>{
    const {username}=req.body;
    if (!username){
        return res.status(400).json({message:"Missing username"});
    }
    const result= await User.findOne({username:username});
    if (result){
        await result.deleteOne();
    }
    res.json({success:true});
})


// app.post('/update_percent',verify, async(req,res)=>{
//     const {username,current_group,category, amount,member,percent}=req.body;
//     if (!username || !current_group || !member ||! percent){
//         return res.status(400).json({message:"Missing details"});
//     }
//     const result = await Group.updateOne(
//             {
//                 groupAdmin: username, // Assuming 'username' from req.body is the groupAdmin
//                 groupName: current_group,
//                 "expenses.description": category // This is the key to target the specific expense
//             },
//             {
//                 // Use the positional operator '$' to update the matched element in the 'expenses' array
//                 // and then $push into its 'splits' array.
//                 $push: {
//                     "expenses.$.splits": {
//                         username: member, // The username for the split
//                         amount: percent   // The amount for this split (assuming 'percent' is the actual amount)
//                     }
//                 }
//             }
//         );
    
//     res.json({success:true});
// })

app.listen(port,()=>{
    console.log(`Working on port ${port}.....`);
});

app.post('/friend',verify,async(req,res)=>{
    const {username}=req.body;
    if (!username){
        return res.status(400).json({message:"Missing username"});
    }
    const users=await User.findOne({username});
    if (!users) return res.status(404).json({message:"User not found"})
    res.json(users.friendrequest);
})

app.post('/friendlist',verify,async(req,res)=>{
    const {username}=req.body;
    
    const users=await User.findOne({username});
    if (!users) return res.status(404).send({message:"User not found"})
    return res.send(users.friends);
})


app.post('/getgroups',verify, async (req, res) => {

    const { username } = req.body;
    // console.log({username});
    if (!username) {
        return res.status(400).json({ message: "Username is required." });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

   
        const groupIds = user.groups || [];
        // console.log(groupIds);

 
        const groupDetails = [];


        const groupPromises = groupIds.map(async (groupId) => {
      
            const group = await Group.findOne({groupId});
            // console.log(group);
            return group;

        });


        const resolvedGroups = await Promise.all(groupPromises);


        resolvedGroups.forEach(group => {
            if (group) {
                groupDetails.push(group);
            }
        });
        console.log(groupDetails);
 
        return res.status(200).json({groupDetails});

    } catch (error) {
        console.error("Error in /getgroups:", error);

        return res.status(500).json({ message: "Internal server error." });
    }
});

app.post('/acceptfriend',verify, async(req,res)=>{
    const {name, username}=req.body;
    if (!username || !name){
        return res.status(400).json({success:false, message:"Missing names"});
    }
    try{
        await User.updateOne(
            {username: username},
            {
                $pull: {friendrequest: name},
                $addToSet: {friends: name}
            }
        );
        await User.updateOne(
            {username: name},
            {$addToSet: {friends: username}}
        );
        res.json({success:true})
    }catch(err){
        res.status(500).json({success:false,message:'Error'})
    }
});

app.post('/deletefriendinv',verify, async(req,res)=>{
    const {name,username}=req.body;
    if (!username || !name){
        return res.status(404).json({success:false, message:"Username Not Found"});
    }
    try{
        await User.updateOne(
            {username},
            {
                $pull: {friendrequest: name},
            }
        );
        res.send({success:true,message:"friend invitation declined"})
    }catch(err){
        res.status(500).send({success:false,message:'Error'})
    }
})

app.post('/setmessage',verify, async(req,res)=>{
    const {groupName,groupAdmin,message}=req.body;
    if (!groupName || !groupAdmin ||!message){
        return res.status(404).json({success:false, message:"Details missing"});
    }
    try{
        await Group.updateOne(
            {groupName,groupAdmin},
            {
                $push: {message: message},
            }
        );
        res.send({success:true,message:"message added"})
    }catch(err){
        res.status(500).send({success:false,message:'Error'})
    }
})

app.post('/deletefriend',verify, async(req,res)=>{
    const {name, username}=req.body;
    if (!username || !name){
        return res.status(404).send({message:"username not found"});
    }
    try{
        await User.updateOne(
            {username},
            {$pull: {friends: name}}
        );
        await User.updateOne(
            {username: name},
            {$pull: {friends: username}}
        );
        
        res.send({success:true, message:"Friend successfully removed"})
    }catch(err){
        res.status(500).send({success:false,message:'Error'})
    }
});

app.post('/deletegroup',verify, async(req,res)=>{
    const {groupName, groupId,groupAdmin}=req.body;
    if (!groupName || !groupId || !groupAdmin){
        return res.status(404).send({message:"Missing credentials"});
    }
    try{
        await User.updateOne(
            {username:groupAdmin},
            {$pull: {groups: groupId}}
        );
        const del= await Group.findOne(
            {groupAdmin,groupName},
           
        );
        if(del)
        {await del.deleteOne()}
        
        res.send({success:true, message:"Friend successfully removed"})
    }catch(err){
        res.status(500).send({success:false,message:'Error'})
    }
});

app.post('/updateprofile',verify, async(req,res)=>{
    const {username,newusername,password}=req.body;
    if (!username || !newusername || !password){
        return res.status(404).send({message:"Missing credentials"});
    }
    try{
        const hashedPw=await bcrypt.hash(password,10)
        await User.updateOne(
            {username:username},
            {$set: {username:newusername,password:hashedPw}}
        );
        
        
        res.send({success:true, message:"updated details"})
    }catch(err){
        res.status(500).send({success:false,message:'Error'})
    }
});


app.post('/creategroup',verify, async(req,res)=>{
    const {groupName,groupAdmin,members}=req.body;
   
    const delay =ms => new Promise(resolve => setTimeout(resolve,ms));
    if (!groupAdmin||!groupName||!members){
        return res.status(400).json({sucess:false,message:"Missing values"});
    }
    
    const usernames = members.map(m => m.username); 
    let groupId=''
    while(true){ 
        groupId=Math.random().toString().substring(2,12);
        if (!await Group.findOne({groupId})){
            break;
        }
        await delay(10); 
    }

    await new Group({groupId,groupName,groupAdmin,members: usernames}).save(); 
    for (let i=0; i<usernames.length;i++){
        await User.updateOne(
            {username: usernames[i]},
            {$addToSet: {groups:groupId}}
        );
    }
    await User.updateOne(
            {username: groupAdmin},
            {$addToSet: {groups: groupId}} 
        );

    res.json({success:true, message: "Group created successfully!"}); 
})


// app.post('/creategroup',verify, async(req,res)=>{
//     const {groupName,groupAdmin,members}=req.body;
//     //below function is to create a slight delay so that 
//     //there arent too many requests to database
//     const delay =ms => new Promise(resolve => setTimeout(resolve,ms));
//     if (!groupAdmin||!groupName||!members){
//         return res.status(400).json({sucess:false,message:"Missing values"});
//     }
//     const usernames=members;
//     let groupId=''
//     while(1){
//         groupId=Math.random().toString().substring(2,12);
//         if (!await Group.findOne({groupId})){
//             break;
//         }
//         delay(10);
//     }
//     await new Group({groupId,groupName,groupAdmin,members}).save();
//     for (let i=0; i<usernames.length;i++){
//         await User.updateOne(
//             {username: usernames[i]},
//             {$addToSet: {groups:groupId}}
//         );
//     }
//     await User.updateOne(
//             {username: groupAdmin},
//             {$addtoSet: {groups: groupName}}
//         );

//     res.json({success:true,});
// })


