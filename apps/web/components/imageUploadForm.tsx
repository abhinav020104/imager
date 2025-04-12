"use client"
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";  
import axios from "axios";
import JSZip from "jszip";

export default function ImageUploadForm({onUploadDone}:{onUploadDone:(zipUrl:string)=>void}) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const CLOUD_FLARE_URL="https://pub-6e6a356a360846388ca123133dcb5963.r2.dev/pixel/"
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Upload Images</CardTitle>
        <CardDescription>Drag and drop your images or select files from your computer</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center w-full h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
            <span className="mt-4 text-gray-500 dark:text-gray-400">Uploading...</span>
          </div>
        ) : uploaded ? (
          <div className="flex flex-col items-center justify-center w-full h-[200px]">
            <span className="text-green-500 text-xl font-bold">Images Uploaded Successfully !</span>
          </div>
        ) : (
          <div className="border-dashed border-2 rounded-lg w-full h-[200px] flex flex-col items-center justify-center transition-colors dark:border-gray-700 hover:border-gray-400 border-gray-300">
            <UploadIcon className="h-8 w-8 text-gray-500 dark:text-gray-400 mb-2" />
            <span className="text-gray-500 text-sm dark:text-gray-400"></span>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <div className="flex w-full gap-2 justify-center">
          <Button className="cursor-pointer"
            disabled={isLoading} 
            onClick={async () => {
              const zip = new JSZip();
              const input = document.createElement('input');
              input.type = 'file';
              input.multiple = true;
              input.accept = 'image/*';
            //   document.body.appendChild(input);
              input.click();
              input.onchange = async () => {
                if (input.files) {
                  setIsLoading(true); 
                  try {
                    const response = await axios.get("http://localhost:4000/api/v1/presign/get-url");
                    const url = response.data.putURL;
                    
                    for (const file of input.files) {
                      const fileName = file.name;
                      const fileData = await file.arrayBuffer();
                      zip.file(fileName, fileData);
                    }

                    const content = await zip.generateAsync({ type: "blob" });
                    await axios.put(url, content);

                    onUploadDone(`${CLOUD_FLARE_URL}${response.data.key}`)
                    setUploaded(true); 

                  } catch (error) {
                    console.error(error);
                  } finally {
                    setIsLoading(false); 
                    
                  }
                }
              };
            }}
          >
            {isLoading ? "Uploading..." : uploaded ? "Re-upload Files" : "Upload Files"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

//@ts-expect-error ignore
function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
