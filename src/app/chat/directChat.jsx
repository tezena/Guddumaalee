"use client";

import React, { useState, useEffect, useContext } from "react";


import { PrettyChatWindow } from "../../../react-chat-engine-pretty/src";
import { useSession } from "next-auth/react";
import { Context } from "@/app/context/userContext";
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'








const Chat = () => {

  const myContext=useContext(Context)
  const {username2,setUsername2}=myContext
  const projectID=process.env.NEXT_PUBLIC_PROJECT_ID

  const {data:session}=useSession()

 


  // console.log(`user name is ${username2}`)
		
	// function createDirectChat(creds) {
	// 	getOrCreateChat(
	// 		creds,
	// 		{ is_direct_chat: true, usernames: [username2] },
	// 		() => setUsername('')
	// 	)
	// }

	// function renderChatForm(creds) {
	// 	return (
	// 		<div>
	// 			<input 
	// 				placeholder='Username' 
	// 				value={username} 
	// 				onChange={(e) => setUsername2(e.target.value)} 
	// 			/>
	// 			<button onClick={() => createDirectChat(creds)}>
	// 				Create
	// 			</button>
	// 		</div>
	// 	)
	// }
   
  // return (
    

  // <ChatEngine
	// 		height='100%'
	// 		userName={session?.user?.email}
	// 		userSecret={session?.user?.id}
	// 		projectID={projectID}
  //     renderNewChatForm={(creds) => renderChatForm(creds)}

	// 	/>
  

  //   )

  
  return (
    <div className="" style={{ height: "80vh", backgroundColor: "blue" }}>
      <PrettyChatWindow
        projectId={projectID}
        username= "kebe" 
        
        secret="kebe123"
        style={{ height: "100%" }}
        username2={username2}
      />
    </div>
  )
  
  
  }



export default Chat;

{
  /* <div className=" w-full h-full overflow-hidden">
      <div className="shadow">
        <ChatEngine
          classname="chatEngine"
          height="100vh"
          projectID="c079bdc9-9902-4ca4-b75c-a6b6d0b4f356"
          userName="meze"
          userSecret="mezePassword123!"
          // development={props.development}
          Customize
          UI
          renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
          renderChatCard={(chat, index) => (
            <ChatCard key={`${index}`} chat={chat} />
          )}
          renderNewChatForm={(creds) => <NewChatForm creds={creds} />}
          renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
          renderChatHeader={(chat) => <ChatHeader />}
          renderIceBreaker={(chat) => <IceBreaker />}
          renderMessageBubble={(
            creds,
            chat,
            lastMessage,
            message,
            nextMessage
          ) => (
            <MessageBubble
              lastMessage={lastMessage}
              message={message}
              nextMessage={nextMessage}
              chat={chat}
            />
          )}
          renderIsTyping={(typers) => <IsTyping />}
          renderConnectionBar={(chat) => <ConnectionBar />}
          renderNewMessageForm={(creds, chatID) => <NewMessageForm />}
          renderChatSettings={(chatAppState) => (
            // <ChatSettings {...chatAppState} />
            <div className=" hidden"></div>
          )}
          renderPeopleSettings={(creds, chat) => <div></div>}
          renderPhotosSettings={(chat) => <PhotosSettings />}
          renderOptionsSettings={(creds, chat) => <OptionsSettings />}
        />
      </div>
    </div> */
}
