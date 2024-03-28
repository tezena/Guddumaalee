"use client";

import React, { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Context } from "@/app/context/userContext";
import {
  ChatEngine,
  ChatList,
  ChatCard,
  NewChatForm,
  ChatFeed,
  ChatHeader,
  IceBreaker,
  MessageBubble,
  IsTyping,
  ConnectionBar,
  NewMessageForm,
  ChatSettings,
  PeopleSettings,
  PhotosSettings,
  OptionsSettings,
  ChatEngineWrapper,
  ChatSocket,
  Socket,
} from "@/components/dynamickImportsModule";
import { PrettyChatWindow } from "../../../../react-chat-engine-pretty/src";
// import { PrettyChatWindow } from "@/react-chat-engine";

const Chat = () => {
  const context = useContext(Context);

  if (!context) {
    console.log("no context");
    return null;
  }
  const { userName, secret } = context;
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== undefined) {
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    if (userName == "" || secret == "") {
      router.push("/signIn");
    }
  }, [userName, secret]);

  if (!showChat) return <div />;

  return (
    <div className="" style={{ height: "90vh", backgroundColor: "blue" }}>
      <PrettyChatWindow
        projectId="c079bdc9-9902-4ca4-b75c-a6b6d0b4f356"
        username={userName}
        secret={secret}
        style={{ height: "100%" }}
      />
    </div>
  );
};

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
