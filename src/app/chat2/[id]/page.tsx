import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Form from "./../components/Form";
import ChatComponent from "./../components/Chat";
import { db } from "@/lib/db";
import { getServerAuthSession } from "@/server/auth";
import { Context } from "@/app/context/userContext";


//@ts-ignore

type ChatProps = {
  id: string ;
};

async function getData(id:number) {

  const session = await getServerAuthSession();

  // const prisma2 = new PrismaClient2();
  //@ts-ignore
  const userType = session?.user.image?.type;
  const email=session?.user?.email
  const userId=session?.user?.id
  let data;
  if (userType == "client") {
    data = await db.message.findMany({
      

      where: {
        OR: [
          {
            //@ts-ignore
            clientId: userId,
          },
          {
            //@ts-ignore
            lawyerId: id,
          }
        ]
      },
      select: {
        message: true,
        id: true,
        client: {
          select: {
            full_name: true,
          },
        },
        lawyer: {
            select: {
              full_name: true,
              photo: true,
            },
          },
          lawyerId:true,
          clientId:true,
          sender_email:true
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 50,
    });
  } else {
    data = await db.message.findMany({
      where: {
        OR: [
          {
            //@ts-ignore
            clientId: userId,
          },
          {
            //@ts-ignore
            lawyerId: id,
          }
        ]
      },
      select: {
        message: true,
        id: true,
        lawyer: {
          select: {
            full_name: true,
            photo: true,
          },
        },
        client: {
            select: {
              full_name: true,
            },
          },
          lawyerId:true,
          clientId:true,
          sender_email:true
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 50,
    });
  }

  return data;
}

// Add
export const dynamic = "force-dynamic";

export default async function Chathomepage({params}:{params:{id:string}}) {
  

  const session = await getServerAuthSession();
  const recipentId=Number(params.id)
  //@ts-ignore
  const data =await getData(recipentId) 

  if (!session) {
    redirect("/signin");
  }

   

  console.log(`session is: ${session.user.email}`);

  return (
    <div className="h-screen bg-gray-200 flex flex-col">
      <ChatComponent data={data as any} />
      
      <Form   recipent_id={recipentId}/>
    </div>
  );
}
