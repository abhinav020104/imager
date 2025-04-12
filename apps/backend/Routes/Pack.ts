import express from "express"
import { GenerateImageFromPack } from "../types";
import {PrismaClient} from "@prisma/client"
import { dmmfToRuntimeDataModel } from "@prisma/client/runtime/library";
import { errorUtil } from "zod/lib/helpers/errorUtil";
const prismaClient = new PrismaClient();
const router = express.Router();
import { authMiddleWare } from "../middleware";
//@ts-ignore
router.post("/generate" , authMiddleWare,  async(req , res)=>{

    const parsedBody = GenerateImageFromPack.safeParse(req.body)
    try{
        if (!parsedBody.success){
            return res.status(411).json({
                success:false,
                message:"Incorrect Input",
            })
        }
    
        const prompts = await prismaClient.packPrompts.findMany({
            where:{
                packId:parsedBody.data.packId,
            }
        })
    
        const images = await prismaClient.outputImages.createManyAndReturn({
            data:prompts.map((prompt)=>({
                prompt:prompt.prompt,
                //@ts-ignore
                userId:req.userId!,
                modelId:parsedBody.data.modelId,
            }))
        })

        return res.status(200).json({
            success:true,
            images:images.map((image) => (image.id))
        })
          
    }catch(err:any){
        console.log("An error occured while generating images from pack !")
        console.log(err.message);
        return res.status(400).json({
            success:false,
            message:"Failed to generate images from pack"
        })
    }
})


//@ts-ignore
router.get("/bulk" , authMiddleWare , async(req , res)=>{
    try{    
        const packs = await prismaClient.packs.findMany({})
        return res.status(200).json({
            success:true,
            message:"Packs fetched successfully !",
            data:packs,
        })
    }catch(err:any){
        console.log("An error occured while fetching all the packs !")
        console.log(err.message);
        res.status(400).json({
            success:false,
            message:"Failed to fetch the packs "
        })
        return;
    }
})


export default router;