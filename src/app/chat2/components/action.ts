"use server";

import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { getServerAuthSession } from "@/server/auth";
import { Console } from "console";

export async function postData(formData: FormData) {
  "use server";

  // const {data:session}=useSession()

  const session = await getServerAuthSession();
 
   //@ts-ignore
  const userType = session?.user.image?.type;

  console.log(`user type is${userType}`);

  const Pusher = require("pusher");
  // const prisma2 = new db2();

  const message = formData.get("message");
  const recipentId=Number(formData.get("recipient_id"))

  const email = session?.user?.email;

  // Check if the user exists based on the userType
  let user = null;
  let clientId="";
  let lawyerId="";

  if (userType === "client" && email) {
    user = await db.client.findUnique({
      where: { email },
    });
     
    //@ts-ignore
    clientId=user?.id
    //@ts-ignore
    lawyerId=recipentId
  } else if (userType === "lawyer" && email) {
    user = await db.lawyer.findUnique({
      where: { email },
    });
    //@ts-ignore
    lawyerId=user?.id
    //@ts-ignore
    clientId=recipentId
  }

  console.log(`user is: ${user}`);

  if (!user) {
    throw new Error("User not found");
  }

    

  // Create the message
  
   const data  = await db.message.create({
    data: {
      //@ts-ignore
      message,
      //@ts-ignore
      lawyerId,
      //@ts-ignore
      clientId ,
      reciver_email:'lla@gmail.com',
      //@ts-ignore
      sender_email:email
    },
    include: {
      ...(userType === "client"
        ? { client: { select: { full_name: true } } }
        : {}),
      ...(userType === "lawyer"
        ? { lawyer: { select: { full_name: true, photo: true } } }
        : {}),
    },
  });

  // const data = await db.message.create({
  //   data: {
  //     message: message as string,
  //     email: session?.user?.email,
  //   },
  //   include: {
  //     User: {
  //       select: {
  //         name: true,
  //         image: true,
  //       },
  //     },
  //   },
  // });

  console.log(process.env.NEXT_PUBLIC_PUSHER_KEY);

  const pusher = new Pusher({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.NEXT_PUBLIC_PUSHER_SECRET,
    cluster: "mt1",
    useTLS: true,
  });

  await pusher.trigger("chat", "hello", {
    message: `${JSON.stringify(data)}\n\n`,
  });
}
