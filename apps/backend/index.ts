import express from "express"
import cors from "cors"
import packRoutes from "./Routes/Pack"
import ImageRoutes from "./Routes/Image"
import AIRoutes  from "./Routes/Ai"
import WebhookRoutes from "./Routes/Webhook"
import PreSignRoutes from "./Routes/PreSign"
import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

const app = express();

app.use(cors())
app.use(express.json());

app.listen(4000 , ()=>{
    console.log("Server listening at port 4000 !");
})

app.get("/" , async (req , res)=>{
    res.status(200).json({
        success:true,
        message:"You landed on a test route !"
    })
    return
    
})

app.get("/set-cors" , async(req , res)=>{

dotenv.config();

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.S3_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
});

async function setBucketCors() {
  const corsCommand = new PutBucketCorsCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedHeaders: ["*"],
          AllowedMethods: ["PUT", "GET", "POST"],
          AllowedOrigins: ["*"],
          ExposeHeaders: ["x-amz-server-side-encryption"],
          MaxAgeSeconds: 3000,
        },
      ],
    },
  });

  try {
    const response = await s3Client.send(corsCommand);
    console.log("CORS configuration set successfully!", response);
  } catch (error: any) {
    console.error("Error setting CORS configuration:", error.message);
  }
}

setBucketCors();

})
app.use("/api/v1/pack" , packRoutes);
app.use("/api/v1/image" , ImageRoutes);
app.use("/api/v1/ai" , AIRoutes);
app.use("/fal-ai/webhook" , WebhookRoutes);
app.use("/api/v1/presign",PreSignRoutes);


