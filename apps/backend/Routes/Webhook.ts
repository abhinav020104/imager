import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";  
const prismaClient = new PrismaClient();    

router.post("/train", async(req , res)=>{
   console.log(req.body);
   const requestId = req.body.request_id; 
   const response = await prismaClient.model.update({   
    //@ts-ignore    
        where:{
            falAiRequestId:requestId,
        },
        data:{
            //@ts-ignore
            trainingStatus:"Generated", 
            tensorPath:req.body.tensor_path,    
    }})
    res.status(200).json({
        success:true,
        message:"WEBHOOK RECEIVED SUCCESSFULLY !!"
    })
    
    return;
})

router.post("/image" , async(req , res)=>{
    console.log(req.body);
    const requestId = req.body.request_id; 
    await prismaClient.outputImages.update({
            //@ts-ignore    
            where:{
                falAiRequestId:requestId,
            },
            data:{
                //@ts-ignore
                status:"Generated", 
                imageUrl:req.body.image_url
        }}) 
    
    res.status(200).json({
            success:true,
            message:"WEBHOOK RECEIVED SUCCESSFULLY !!"
    })
    return
    
})


export default router;


