import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Chat from './components/chat';
import store from './store/store';
import 'antd/dist/reset.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Chat />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;