import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";






  const HandleChat = async () => {

 const {data:session}=useSession()
 const router=useRouter()

const userName=session?.user?.email
  const secret=session?.user?.id
   
    await axios.put(
      "https://api.chatengine.io/users/",
      {
        username: userName,
        secret: secret,
      },
      { headers: { "PRIVATE-KEY": "a555c019-7fc0-483f-8750-7f545b753544" } }
    ).then((res)=>{
      console.log(res.data)

      router.push("/chat")
    }).catch((e)=>{
      console.log(e.message)
    });
  };


  export {HandleChat}
