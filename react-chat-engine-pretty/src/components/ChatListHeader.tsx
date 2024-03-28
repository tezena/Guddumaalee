import React, { CSSProperties } from 'react';

import { FormOutlined } from '@ant-design/icons';

interface ChatListHeaderProps {
  onNewChatClick: () => void;
}

const ChatListHeader = (props: ChatListHeaderProps) => {
  return (
    <div style={styles.chatListHeader}>
      <div style={styles.chatListHeaderTitle}>All Messages</div>

      <button
        className="ce-new-chat-button"
        style={styles.chatListHeaderButton}
        onClick={props.onNewChatClick}
      >
        <FormOutlined />
      </button>

      <style>{`.ce-new-chat-button:hover { color: rgb(24, 144, 255) !important; }`}</style>
    </div>
  );
};

const styles = {
  chatListHeader: {
    display: 'inline-block',
    width: 'calc(100% - 12px - 12px)',
    margin: '0px 12px',
    paddingTop: '28px',
    paddingBottom: '32px',
  } as CSSProperties,
  chatListHeaderTitle: {
    display: 'inline-block',
    color: 'black',
    fontSize: '24px',
    fontFamily: 'Avenir',
    fontWeight: '600',
  } as CSSProperties,
  chatListHeaderButton: {
    display: 'inline-block',
    float: 'right',
    cursor: 'pointer',
    transition: 'all 0.33s ease',
    outline: 'none',
    backgroundColor: 'white',
    fontSize: '18px',
    color: 'black',
  } as CSSProperties,
};

export default ChatListHeader;
