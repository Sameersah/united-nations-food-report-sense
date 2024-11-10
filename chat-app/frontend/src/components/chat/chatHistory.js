import React from 'react';
import { List } from 'antd';
import SpeechBubble from './speechBubble';

const ChatHistory = ({ messages, loading }) => {
  return (
    <div className="chat-history">
      <List
        dataSource={messages}
        renderItem={(msg) => (
          <List.Item>
            <SpeechBubble text={msg.text} isUser={msg.isUser} />
          </List.Item>
        )}
      />
      {loading && (
        <List.Item>
          <SpeechBubble text="..." isUser={false} isPlaceholder={true} />
        </List.Item>
      )}
    </div>
  );
};

export default ChatHistory;
