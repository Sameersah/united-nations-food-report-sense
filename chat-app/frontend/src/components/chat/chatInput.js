import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';

const { TextArea } = Input;

const ChatInput = ({ onSend, onClear, loading, chatAvailable }) => {
  const [prompt, setPrompt] = useState('');

  const handleSend = () => {
    onSend(prompt);
    setPrompt('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input">
      <TextArea
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={loading || !chatAvailable}
      />
      <Space>
        <Button type="primary" onClick={handleSend} loading={loading} disabled={!chatAvailable}>
          Send
        </Button>
        <Button onClick={onClear} disabled={loading}>
          Clear History
        </Button>
      </Space>
    </div>
  );
};

export default ChatInput;