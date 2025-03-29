import express from "express"
import cors from "cors"
import packRoutes from "./Routes/Pack"
import ImageRoutes from "./Routes/Image"
import AIRoutes  from "./Routes/Ai"
const app = express();

app.use(cors())
app.use(express.json());

app.listen(4000 , ()=>{
    console.log("Server listening at port 4000 !");
})

app.post("/fal-ai/webhook/train" , (req , res)=>{
   console.log(req.body);
    res.status(200).json({
        success:true,
        message:"WEBHOOK RECEIVED SUCCESSFULLY !!"
    })  
})


app.post("/fal-ai/webhook/image" , (req , res)=>{
    console.log(req.body);
    res.status(200).json({
        success:true,
        message:"WEBHOOK RECEIVED SUCCESSFULLY !!"
    })
})
app.get("/" , (req , res)=>{
    res.status(200).json({
        success:true,
        message:"You landed on a test route !"
    })
    return
    
})

app.use("/api/v1/pack" , packRoutes);
app.use("/api/v1/image" , ImageRoutes);
app.use("/api/v1/ai" , AIRoutes);


