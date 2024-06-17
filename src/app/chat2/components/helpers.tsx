import { db } from "../../../lib/db";
import { getServerAuthSession } from "../../../server/auth";

async function getData(recipent_id: number) {
  const session = await getServerAuthSession();

  // const prisma2 = new PrismaClient2();
  //@ts-ignore
  const userType = session?.user.image?.type;
  const email = session?.user?.email;
  //@ts-ignore
  const userId = session?.user?.image?.id;

  console.log(`userId ${userId}`);
  console.log(recipent_id);
  let data;
  if (userType == "client") {
    data = await db.message.findMany({
      where: {
        //@ts-ignore
        clientId: userId,

        //@ts-ignore
        lawyerId: recipent_id,
      },
      select: {
        message: true,
        //@ts-ignore
        messageType:true,
        fileType:true,
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
        lawyerId: true,
        clientId: true,
        sender_email: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 50,
    });
  } else {
    data = await db.message.findMany({
      where: {
        //@ts-ignore
        clientId: recipent_id,

        //@ts-ignore
        lawyerId: userId,
      },
      select: {
        message: true,
        //@ts-ignore
        messageType:true,
        fileType:true,
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
        lawyerId: true,
        clientId: true,
        sender_email: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 50,
    });
  }

  return data;
}

async function getUserList() {
  const session = await getServerAuthSession();

  // const prisma2 = new PrismaClient2();
  //@ts-ignore
  const userType = session?.user.image?.type;
  const email = session?.user?.email;
  //@ts-ignore
  const userId = session?.user?.image?.id;
  let data;
  let final_result;
  if (userType == "client") {
    data = await db.message.findMany({
      where: {
        //@ts-ignore
        clientId: userId,
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
        lawyerId: true,
        clientId: true,
        sender_email: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 50,
    });

    type LawyerInfo = {
      lawyerId: number;
      full_name: string;
      photo: string | null;
    };

    console.log(data);

    //@ts-ignore
    const uniqueLawyersMap = data.reduce(
      (acc: { [key: number]: any }, curr) => {
        //@ts-ignore
        if (curr.lawyerId !== undefined && curr.lawyer !== undefined) {
          if (!acc[curr.lawyerId]) {
            acc[curr.lawyerId] = {
              lawyerId: curr.lawyerId,
              //@ts-ignore

              full_name: curr.lawyer.full_name,
              //@ts-ignore

              photo: curr.lawyer.photo,
            };
          }
        }
        return acc;
      },
      {}
    );

    const uniqueLawyers = Object.values(uniqueLawyersMap);
    return uniqueLawyers;
  } else {
    data = await db.message.findMany({
      where: {
        //@ts-ignore
        lawyerId: userId,
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
        lawyerId: true,
        clientId: true,
        sender_email: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 50,
    });

    //@ts-ignore
    const uniqueClientsMap = data.reduce(
      (acc: { [key: number]: any }, curr) => {
        if (!acc[curr.clientId]) {
          acc[curr.clientId] = {
            clientId: curr.clientId,
            //@ts-ignore
            full_name: curr.client.full_name,
          };
        }
        return acc;
      },
      {}
    );

    const uniqueClients = Object.values(uniqueClientsMap);

    return uniqueClients;
  }
}

export { getData, getUserList };
