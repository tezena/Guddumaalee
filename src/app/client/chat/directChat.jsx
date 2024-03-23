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
  ChatSettingsTop,
  PeopleSettings,
  PhotosSettings,
  OptionsSettings,
} from "@/components/dynamickImportsModule";

// const ChatEngine = dynamic(() =>
//   import("react-chat-engine").then((module) => module.ChatEngine)
// );
// const MessageFormSocial = dynamic(() =>
//   import("react-chat-engine").then((module) => module.MessageFormSocial)
// );

// interface ChatEngineProps {
//   height: string;
//   projectID: string;
//   userName: string;
//   userSecret: string;
//   renderNewMessageForm: () => React.ReactNode;
// }

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
    <div className=" w-full h-full">
      <div className="shadow">
        <ChatEngine
          classname="chatEngine"
          height="[calc(100vh-3.5rem)]"
          projectID="c079bdc9-9902-4ca4-b75c-a6b6d0b4f356"
          userName={userName}
          userSecret={secret}
          // development={props.development}
          // Customize UI
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
            <ChatSettings {...chatAppState} />
          )}
          renderChatSettingsTop={(creds, chat) => <ChatSettingsTop />}
          renderPeopleSettings={(creds, chat) => <PeopleSettings />}
          renderPhotosSettings={(chat) => <PhotosSettings />}
          renderOptionsSettings={(creds, chat) => <OptionsSettings />}
        />
      </div>
    </div>
  );
};

export default Chat;
