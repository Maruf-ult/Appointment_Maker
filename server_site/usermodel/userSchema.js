import mongoose from "mongoose";


 const user = new mongoose.Schema({
   
     name:{
          type:String,
          required:true,
          min:[4,'name must be at least 4 ']
     },
     email:{
          type:String,
          required:true,
     },
     password:{
          type:String,
          required:true,
          min:[6,' at least 6 digits required']
     }
})

const  userSchema = mongoose.model('users',user);
export default userSchema;