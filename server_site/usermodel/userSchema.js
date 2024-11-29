import mongoose from "mongoose";

 const user = new mongoose.Schema({
   
     name:{
          type:String,
          required:true,
          min:[4,'name must be at least 4 ']
     },
     email:{
          type:String,
          unique:true,
          required:true,
     },
     password:{
          type:String,
          required:true,
          min:[6,' at least 6 digits required']
     },
     isDoctor:{
          type:Boolean,
          default:false,
     },
     isAdmin:{
          type:Boolean,
          default:false,
     },
     seenNotifications:{
          type:Array,
          default:[],
     },
     unseenNotifications:{
          type:Array,
          default:[],
     },


},{timestamps:true})

const  userSchema = mongoose.model('users',user);
export default userSchema;