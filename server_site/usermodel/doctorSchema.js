import mongoose  from "mongoose";

const docSchema = new mongoose.Schema({
     firstName:{
          type:String,
          required:true
     },
     lastName:{
          type:String,
          required:true
     },
     email:{
          type:String,
          required:true,
     },
     phoneNumber:{
          type:String,
          required:true,
     },
     website:{
          type:String,
          required:true
     },
     address:{
          type:String,
          required:true
     },
     specialization:{
          type:String,
          required:true,
     },
     experience:{
          type:String,
          required:true,
     },
     feeperCunsultation:{
          type:Number,
          required:true,
     },
     consultationHours:{
          type:Number,
          required:true,
     },
     fromTime:{
          type:String,
          required:true,
     },
     toTime:{
          type:String,
          required:true,
     }


},{timestamps:true})

const doctorModel = mongoose.model("doctors",docSchema);
export default doctorModel;