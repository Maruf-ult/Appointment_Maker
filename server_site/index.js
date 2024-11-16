import express from "express";
import cors from  'cors'
import dotenv from 'dotenv'
import dbCon from "./Utils/database.js";

const app = express();



dotenv.config();
app.use(cors());
app.use(express.json());
dbCon();
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
     console.log(`server is running on ${PORT}`)
})
