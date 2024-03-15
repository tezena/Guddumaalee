'use client';

import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <Card className=" w-full sm:w-[70%] md:w-[50] lg:w-[40%] sm:p-8 p-4">
    <Form {...form} className='space-y-4'>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
      <div className="max-w-md w-full mx-auto">
        
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">Log Into Gudumaalee</div>
      </div>
        <div className='space-y-2 ' min-h-screen bg-gray-50 flex flex-col justify-center>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold text-gray-600 block">Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field}  className="w-full p-2 border border-gray-300 rounded mt-1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"' type='submit'>
          Sign in
        </Button>
      </form>
      
      
     
    </Form>
   </Card>
  );
};

export default SignInForm;