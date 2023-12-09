import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'
import cors from 'cors'
import router from './Routes/index.js'
import mongoose from 'mongoose'




const app = express()
dotenv.config()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// app.use((req,res,next)=>{
//     console.log("hi santosh from middleware")
//     next()
// })

// app.get("/",function(req,res){
//     res.send("hello santosh")
// })

app.use('/api/v3',router)

mongoose.connect(process.env.MONGOURL).then(()=>console.log("database connected"))
// mongoose.connect('mongodb+srv://survesantosh09:67kDdxwCIBYPytGO@cluster0.hhewsjk.mongodb.net/practice1').then(()=>console.log("Database connected"))

app.listen(8000,()=>console.log("app is running on port 8000"))