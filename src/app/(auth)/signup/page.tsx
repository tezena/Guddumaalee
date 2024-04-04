"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm: z.string().min(6, "Repeat the password"),
  type: z.string().min(2, "Required"),
});

const RegistrationUserForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  let tempUserInfo: any;
  const [registeringUser, setRegisteringUser] = useState<boolean>(false);
  if (typeof window !== "undefined") {
    tempUserInfo = JSON.parse(localStorage.getItem("tempUserInfo") || "{}");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      type: "",
    },
  });
  const createUser = useMutation({
    mutationFn: (user: any) => {
      return axios.post("/api/user", user);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.confirm) {
      form.setError("confirm", {
        message: "Passwords don't match",
      });
      return;
    }
    console.log(values);
    setRegisteringUser(true);
    createUser.mutate(
      {
        email: values.email,
        password: values.password,
        type: values.type,
      },
      {
        onSuccess: async () => {
          const res = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
          });
          console.log(res);
          if (!res?.ok) {
            {
              throw new Error("");
            }
          }
          router.push("/");
          router.refresh();
          setRegisteringUser(false);
        },
        onError: async (e) => {
          toast({
            title: "Couldn't create account",
            description: e.message,
          });
          setRegisteringUser(false);
        },
      }
    );
  }
  return (
    <div className="h-screen flex items-center justify-center px-2">
      <Card className="w-[450px] mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>create new account</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the role." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"LAWYER"}>Lawyer</SelectItem>
                        <SelectItem value={"CLIENT"}>Client</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={registeringUser}
                type="submit"
                className="w-full"
              >
                {registeringUser && (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                )}
                Create
              </Button>
              <p className="text-center text-sm">Already have an account?</p>
              <Button asChild className="w-full" variant="outline">
                <Link href={"/signin"}>Sign In</Link>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationUserForm;
