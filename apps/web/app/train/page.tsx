"use client"
import { Button } from "../../@#/components/ui/button"
import { useState } from "react"
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../@#/components/ui/card"
import { Input } from "../../@#/components/ui/input"
import { Label } from "../../@#/components/ui/label"
import { Switch } from "../../@#/components/ui/switch"
import ImageUploadForm from "../../@#/components/imageUploadForm"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@#/components/ui/select"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
const Train = () => {
  const router = useRouter();
  const { getToken }   = useAuth();
  const [zipUrl, setZipUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [ethinicity, setEthinicity] = useState<string>("");
  const [eyecolor, setEyecolor] = useState<string>("");
  const [bald, setBald] = useState<boolean>(false);

  const isFormValid = name && age && type && ethinicity && eyecolor && zipUrl;

  const resetFormData = () => {
    setName("");  
    setAge("");
    setType("");
    setEthinicity("");
    setEyecolor("");
    setZipUrl("");
    setBald(false);
  }



  const trainModel = async() =>{
    const data = {
      name,
      age: parseInt(age),
      type,
      ethinicity,
      eyeColor:eyecolor,
      zipURL:zipUrl,
      bald,
    };
    try{
      const token = await getToken();
      await axios.post("http://localhost:4000/api/v1/ai/training", data , {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
    }catch(e){
      console.log(" >>> ERROR OCCURED WHILE TRAINING THE MODEL >>> ", e);
    }
  }

  return (
    <div className="h-screen w-screen">
      <div className="items-center flex justify-center gap-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 h-full">
        <Card className="w-[400px] mt-10">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Name of the model" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Man">Man</SelectItem>
                    <SelectItem value="Woman">Woman</SelectItem>
                    <SelectItem value="Other">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="ethinicity">Ethinicity</Label>
                <Select value={ethinicity} onValueChange={setEthinicity}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Ethinicity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asian">Asian</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                    <SelectItem value="White">White</SelectItem>
                    <SelectItem value="Hispanic">Hispanic</SelectItem>
                    <SelectItem value="Middle Eastern">Middle Eastern</SelectItem>
                    <SelectItem value="Pacific">Pacific</SelectItem>
                    <SelectItem value="South East Asian">South East Asian</SelectItem>
                    <SelectItem value="South Asian">South Asian</SelectItem>
                    <SelectItem value="East Asian">East Asian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="eyecolor">Eye Color</Label>
                <Select value={eyecolor} onValueChange={setEyecolor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Eye Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Brown">Brown</SelectItem>
                    <SelectItem value="Blue">Blue</SelectItem>
                    <SelectItem value="Hazel">Hazel</SelectItem>
                    <SelectItem value="Gray">Gray</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex gap-2 items-center">
                  <Label htmlFor="bald">Bald</Label>
                  <Switch id="bald" checked={bald} onCheckedChange={setBald} />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="cursor-pointer" onClick = {()=>{
              resetFormData();
              router.push("/");
            }}>Cancel</Button>
            <Button className="cursor-pointer" disabled={!isFormValid} onClick={()=>{
              trainModel();
              resetFormData();
              router.push("/");
            }}>
              Train Model
            </Button>
          </CardFooter>
        </Card>

        <ImageUploadForm onUploadDone={(url: string) => setZipUrl(url)} />
      </div>
    </div>
  );
};

export default Train;
