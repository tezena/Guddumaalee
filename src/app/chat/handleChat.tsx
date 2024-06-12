import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { Context } from "@/app/context/userContext";
import { useContext } from 'react';






  const HandleChat = async () => {

 const context=useContext(Context)
 
 const {userName,secret}={context}

 const router=useRouter()


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
