import express from "express"
const router = express.Router();
import {PrismaClient} from "@prisma/client"
const prismaClient  = new PrismaClient();
import { authMiddleWare } from "../middleware";

//@ts-ignore
router.get("/bulk" , authMiddleWare , async (req , res)=>{

    const ids = req.query.ids  as string[];
    const limit = req.query.limit as string ?? "10";
    const offset = req.query.offset as string ?? "0";
    console.log(ids); 
    try{
        const imagesData = await prismaClient.outputImages.findMany({
            where:{
                id:{in: ids},
                //@ts-ignore
                userId:req.userId!,
            },
            skip:parseInt(offset),
            take:parseInt(limit),
        })
        
        res.status(200).json({
            success:true,
            message:"Images fetched successfully ",
            data:imagesData,
        })

        return; 

    }catch(err:any){
        console.log("an error occured while fetching the images ");
        console.error(err.message);
        res.status(400).json({
            success:false,
            message:"an error occured while fetching the images"
        })

        return;

    }

})

export default router;