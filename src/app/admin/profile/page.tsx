'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function Profile(){
    return(
        <div className="w-full font-sans min-h-screen pt-28 pl-72 bg-[#f2f6fa] text-black overflow-auto flex flex-col gap-4">
           <div className="w-3/5 h-fit p-10 bg-white m-auto rounded-xl shadow-md ">
            <form className="flex flex-col gap-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" className="bg-gray-200 border-none"/>
                </div>
                <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input type="text" id="phone" className="bg-gray-200 border-none"/>
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" className="bg-gray-200 border-none"/>
                </div>
                <div className="flex justify-between ">
                    <Button className="outline-[#7b3094] text-[#3b1c45] outline">Clear</Button>
                    <Button className="bg-[#7b3094] text-white">Save</Button>
                </div>
            </form>
               
           </div>
        </div>
    )
}

export default Profile