"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import axios from "axios"


const formSchema = z.object({
  fullName: z.string({ required_error: "Name is required",
  invalid_type_error: "Name must be a string",}),
  email: z.string().email({message:"Enter a valid email please."}),
  password: z.string().min(4,{message:"password must be above 4 characters."}),
  confirmPassword: z.string().min(4,{message:"password must be above 4 characters."})
}).required();

const CreateAccountForm=()=> {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        fullName:"",
      email: "",
      password: "",
      confirmPassword:""
    },
  });

  function  onSubmit (values: z.infer<typeof formSchema>) {

    axios.post("",values).then(res=>{
      console.log(`res : ${res.data}`)

      toast({
        title: "Accouont created successfully",
        duration: 5000,
      });

      router.push("/signin")


    }).catch(e=>{
      console.log(`Error : ${e.message}`)

      toast({
        title:"Error",
        description:"Failed to create account. Please try again .",
        duration:5000,
      })
    })
    
  }

  return (
    <Card className=" w-full sm:w-[70%] md:w-[50] lg:w-[40%] sm:p-8 p-4">
    <CardHeader className="w-full">
      <CardTitle className="mx-auto font-semibold">Create Client Account</CardTitle>

    </CardHeader>
    <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="">
        <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Kebed Lemma" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="tttttttt@gmail.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input  type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )} />
            <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input  type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )} />
          
        </div>
        <Button className="w-full bg-[#7B3B99]" type="submit">Create Account</Button> 
 
 <div className="w-full flex item-center  mx-auto justify-center">
 <p className=   "text "> Aleady have account ?  </p>
 <Link href={"/signin"} >
   <p className="ml-3 text-[#7B3B99] font-bold"> Login </p>
 </Link> 
 </div>
 <Button className="w-full bg-[#D0D0D0]" type="submit">Became Lawyer</Button> 

      
      </form>
    </Form>
    </CardContent>
  </Card>
    
  );
}


export default CreateAccountForm






