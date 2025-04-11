"use client"
import { Button } from "../../@#/components/ui/button"
import { useState } from "react"
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

const Train = () => {
  const [zipUrl, setZipUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [ethinicity, setEthinicity] = useState<string>("");
  const [eyecolor, setEyecolor] = useState<string>("");
  const [bald, setBald] = useState<boolean>(false);

  const isFormValid = name && age && type && ethinicity && eyecolor && zipUrl;

  return (
    <div className="h-screen w-screen">
      <div className="items-center flex justify-center gap-24 bg-green-200 h-full">
        <Card className="w-[400px]">
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
                    <SelectItem value="1">Man</SelectItem>
                    <SelectItem value="2">Woman</SelectItem>
                    <SelectItem value="3">Others</SelectItem>
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
                    <SelectItem value="1">Asian</SelectItem>
                    <SelectItem value="2">Black</SelectItem>
                    <SelectItem value="3">White</SelectItem>
                    <SelectItem value="4">Hispanic</SelectItem>
                    <SelectItem value="5">Middle Eastern</SelectItem>
                    <SelectItem value="6">Pacific</SelectItem>
                    <SelectItem value="7">South East Asian</SelectItem>
                    <SelectItem value="8">South Asian</SelectItem>
                    <SelectItem value="9">East Asian</SelectItem>
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
                    <SelectItem value="1">Brown</SelectItem>
                    <SelectItem value="2">Blue</SelectItem>
                    <SelectItem value="3">Hazel</SelectItem>
                    <SelectItem value="4">Gray</SelectItem>
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
            <Button variant="outline" className="cursor-pointer">Cancel</Button>
            <Button className="cursor-pointer" disabled={!isFormValid}>
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
