import { ChatHeaderProps, ChatObject } from 'react-chat-engine-advanced';
interface CustomChatHeaderProps extends ChatHeaderProps {
    chat?: ChatObject;
    projectId: string;
    username: string;
    secret: string;
    onDeleteChat: (oldChat: ChatObject) => void;
}
declare const ChatHeader: (props: CustomChatHeaderProps) => JSX.Element;
export default ChatHeader;