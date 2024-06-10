import React, { useState } from 'react';

import axios from 'axios';

import {
  useMultiChatLogic,
  ChatList,
  MultiChatWindowProps,
  MultiChatSocket,
  ChatFeed,
  ChatCardProps,
  ChatHeaderProps,
  MessageFormProps,
  MessageListProps,
  MessageList,
  PersonObject,
} from 'react-chat-engine-advanced';

import { useIsMobile } from './functions/isMobile';

import ChatHeader from './components/ChatHeader';
import ChatForm, { OptionType } from './components/ChatForm';
import ChatCard from './components/ChatCard';
import MessageForm from './components/MessageForm';
import ChatListHeader from './components/ChatListHeader';

interface PrettyChatWindowProps extends MultiChatWindowProps {
  projectId: string;
  username: string;
  secret: string;
  httpUrl?: string;
  height?: string;
  username2?:string;
}

export const PrettyChatWindow = (props: PrettyChatWindowProps) => {
  const [isChatFormActive, setIsChatFormActive] = useState(false);
  const [chatFormUsers, setChatFromUsers] = useState<PersonObject[]>([]);
  const isMobile: boolean = useIsMobile();
  const username2=props.username2

  const chatProps = useMultiChatLogic(
    props.projectId,
    props.username,
    props.secret,
    props.httpUrl,
  );

  async function getOrCreateChat() {
    const usernames = chatFormUsers.map(user => user.username);
   
    const data = {
      usernames: username2,
    };
    const headers = {
      'Project-ID': chatProps.projectId,
      'User-Name': chatProps.username,
      'User-Secret': chatProps.secret,
    };

    axios.put('https://api.chatengine.io/chats/', data, { headers }).then(r => {
      setIsChatFormActive(false);
      setChatFromUsers([]);
      chatProps.onChatCardClick(r.data.id);
    });
  }

  const onChatFormChange = (options: OptionType[]) => {
    const users: PersonObject[] = options.map(option =>
      JSON.parse(option.value)
    );
    setChatFromUsers(users);
  };

  return (
    <div
      style={{
        height: props.height ? props.height : '100%',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}
    >
      <MultiChatSocket {...chatProps} />

      <div style={isMobile ? styles.col0 : styles.col8}>
        <ChatList
          {...chatProps}
          renderChatForm={() => (
            <ChatListHeader
              onNewChatClick={() => {
                chatProps.setActiveChatId(undefined);
                setIsChatFormActive(true);
              }}
            />
          )}
          renderChatCard={(props: ChatCardProps) => (
            <ChatCard
              {...props}
              username={chatProps.username}
              onChatCardClick={(chatId: number) => {
                setIsChatFormActive(false);
                setChatFromUsers([]);
                chatProps.onChatCardClick(chatId);
              }}
              isActive={
                props.chat !== undefined &&
                chatProps.activeChatId === props.chat.id
              }
              chat={props.chat}
            />
          )}
        />
      </div>

      <div style={isMobile ? styles.col22 : styles.col14}>
        <ChatFeed
          {...chatProps}
          renderChatHeader={(chatHeaderProps: ChatHeaderProps) => {
            if (isChatFormActive) {
              return (
                <ChatForm
                  projectId={chatProps.projectId}
                  username={chatProps.username}
                  secret={chatProps.secret}
                  onChange={onChatFormChange}
                  onCancel={getOrCreateChat}
                />
              );
            } else {
              return (
                <ChatHeader
                  {...chatHeaderProps}
                  chat={chatProps.chat}
                  projectId={chatProps.projectId}
                  username={chatProps.username}
                  secret={chatProps.secret}
                  onDeleteChat={chatProps.onDeleteChat}
                />
              );
            }
          }}
          renderMessageList={(props: MessageListProps) => (
            <MessageList
              {...props}
              renderMessageList={undefined}
              messages={isChatFormActive ? [] : chatProps.messages}
            />
          )}
          renderMessageForm={(props: MessageFormProps) => {
            if (isChatFormActive) {
              return <div style={styles.messageForm} />;
            } else {
              return <MessageForm {...props} />;
            }
          }}
        />
      </div>

      <style>{`
      .ce-chat-list { background-color: white !important;border: .5px solid black !important; margin-top: 4vh !important; !important; margin-right: 2vw !important; margin-left: 2vw !important;border-radius: 40px !important ; padding:25px !important; box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; !important; }
      .ce-chat-form { background-color: white !important; padding-bottom: 14px !important;  }
      .ce-chat-form-title { color: black !important; }

      .ce-chat-feed-column { border: none !important;background-color: white  !important; }
      .ce-chat-feed { background-color: white  !important;border: .5px solid black !important; margin-top: 4vh !important; margin-left: 3vw !important; margin-right: 4vw !important; border-radius: 40px !important ; padding:25px !important; box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; !important; }
      .ce-message-list { margin-top: 24px !important; margin-left: 12px !important; margin-right: 12px !important; padding: 0px 3.3vw !important; background: white !important ; border-radius: 8px 8px 0px 0px !important; height: calc((100% - 85px) - 72px - 24px - 12px) !important; }

      .ce-message-date-text { font-weight: 600; letter-spacing: 0.1px !important; font-family: 'Avenir' !important; color: rgb(153, 153, 153) !important; font-size: 14px !important; letter-spacing: -1px; }
      .ce-my-message-body { font-family: 'Avenir' !important; padding: 15px !important; background-color: #7B3B99 !important ; min-width: 60px !important;}
      .ce-my-message-timestamp { font-weight: 600; letter-spacing: 0.1px !important; font-family: 'Avenir' !important; font-size: 12px !important; padding: 15px !important; margin-right: 0px !important; letter-spacing: -1px; }
      .ce-their-message-body { font-family: 'Avenir' !important; padding: 15px !important; background-color: #434756 !important; color: white !important; }
      .ce-their-message-timestamp { font-weight: 600; letter-spacing: 0.1px !important; font-family: 'Avenir' !important; font-size: 12px !important; padding: 15px !important; margin-left: 0px !important; letter-spacing: -1px; }
      .ce-their-message-timestamp { color: rgb(241, 240, 240) !important; letter-spacing: -1px; }
      .ce-their-message-sender-username { color: #999 !important; }
      .ce-message-file { background-color: #434758 !important; color: #c5c5c5 !important; border-radius: 8px !important; }
      .ce-message-image { background-color: #434758 !important; color: #c5c5c5 !important; border-radius: 8px !important; padding: 0px !important; max-width: 124px !important; max-height: 124px !important; }

      .ce-mobile-chat-list-button { top: 32px !important; left: 0px !important; }
      .ce-mobile-chat-settings-button { display: none !important; }

      .ce-avatar-status { border: 2px solid rgb(40,43,54) !important; width: 7px !important; height: 7px !important; }
      .ce-custom-message-form {background-color: white !important ; color : black !important }
      .ce-custom-message-input {background-color: white !important ; color : black !important ; border : 1px solid #7B3B99 !important; color : black !important ; margin-right: 0px !important }
      .ce-custom-send-button {background-color: #7B3B99 !important ; width: 50px ! important; }
      .ce-custom-chat-header {width: 100% !important; padding-left:2vw !important ; padding-right:2vw !important; border-bottom : 2px solid black !important;}
      .
      `}</style>
    </div>
  );
};

const styles = {
  col0: {
    display: 'block',
    flex: '0 0 0%',
    maxWidth: '0%',
    backgroundColor: 'white',
  } as React.CSSProperties,
  col1: {
    display: 'block',
    flex: '0 0 4.16666667%',
    maxWidth: '4.16666667%',
    backgroundColor: 'white',
  } as React.CSSProperties,
  col8: {
    display: 'block',
    flex: '0 0 28.33333%',
    maxWidth: '28.3333%',
    backgroundColor: 'white',
  } as React.CSSProperties,
  col9: {
    display: 'block',
    flex: '0 0 37.5%',
    maxWidth: '37.5%',
    backgroundColor: 'white',
  } as React.CSSProperties,
  col14: {
    display: 'block',
    flex: '0 0 66.33333333%',
    maxWidth: '66.33333333%',
    backgroundColor: 'white',
  } as React.CSSProperties,
  col16: {
    display: 'block',
    flex: '0 0 66.66666667%',
    maxWidth: '66.66666667%',
    backgroundColor: 'white',
  } as React.CSSProperties,
  col22: {
    display: 'block',
    flex: '0 0 91.66666667%',
    maxWidth: '91.66666667%',
    backgroundColor: 'white',
  } as React.CSSProperties,
  col24: {
    display: 'block',
    flex: '0 0 100%',
    maxWidth: '100%',
    backgroundColor: 'white',
  } as React.CSSProperties,
  messageForm: {
    height: '68px',
    marginLeft: '12px',
    marginRight: '12px',
    width: 'calc(100% - 12px - 12px)',
    borderRadius: '0px 0px 8px 8px',
    backgroundColor: 'white',
  } as React.CSSProperties,
};
