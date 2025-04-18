import { BaseModel } from "./BaseModel";
import { fal } from "@fal-ai/client";

const dotenv = require("dotenv");
dotenv.config();

//@ts-ignore
export class FalAIModel extends BaseModel{
    
    constructor(){
        super();    
    }

    //@ts-ignore
    public async generateImage(prompt:string , tensorPath:string){

        // const {request_id , response_url} = await fal.queue.submit("fal-ai/flux-lora", {
        //     input: {
        //       prompt:prompt,
        //       loras:[{path:tensorPath, scale:1}],
        //     },
        //   });
          return {request_id:"", response_url:""};

    }


    //@ts-ignore
    public async trainModel(zipURL:string , triggerWord:string){   

    // const { request_id , response_url } = await fal.queue.submit("fal-ai/flux-lora-fast-training", {
            
    //     input:{
    //         images_data_url:zipURL,
    //         trigger_word:triggerWord,
    //         },
    //     webhookUrl:`${process.env.WEBHOOK_URL}/fal-ai/webhook`,

    // });
        return {request_id : "", response_url :""}; 
    
    }

}