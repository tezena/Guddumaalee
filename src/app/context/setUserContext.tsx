import { Context } from "@/app/context/userContext";
import { useContext } from 'react';



const SetUserContext=(userName:string,secret:string)=>{
    
const context=useContext(Context)
  if (!context) {
    return null; 
  }

  const { setUsername, setSecret } = context;
  if(userName&&secret){
    setUsername(userName)
    setSecret(secret)
  }else{
    return null;
  }
}

export {SetUserContext}