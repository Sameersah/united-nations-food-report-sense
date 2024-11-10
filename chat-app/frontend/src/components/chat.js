import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatHistory from './chatHistory';
import ChatInput from './chat/chatInput';
import { Layout, Typography } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { sendMessage, clearHistory } from '../actions/chatActions';
import '../App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const Chat = () => {
  const dispatch = useDispatch();
  const { messages, loading, chatAvailable } = useSelector((state) => state.chat);

  const handleSend = (prompt) => {
    dispatch(sendMessage(prompt));
  };

  const handleClear = () => {
    dispatch(clearHistory());
  };

  return (
    <Layout className="chat-container">
      <Header className="chat-header">
        <MessageOutlined className="chat-header-icon" />
        <Title level={2} style={{ color: 'white', margin: 0 }}>United Nations Food Report Sense</Title>
      </Header>
      <Content className="chat-content">
        <ChatHistory messages={messages} />
        <ChatInput onSend={handleSend} onClear={handleClear} loading={loading} chatAvailable={chatAvailable} />
      </Content>
    </Layout>
  );
};

export default Chat;