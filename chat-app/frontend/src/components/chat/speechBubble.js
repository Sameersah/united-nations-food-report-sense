import React, { useState } from 'react';

const SpeechBubble = ({ text, isUser, isPlaceholder }) => {
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(text); 
  
  return (
    <div className={`speech-bubble ${isUser ? 'speech-bubble-user' : 'speech-bubble-llm'} ${isPlaceholder ? 'speech-bubble-placeholder' : ''}`}>
      <div className="speech-bubble-content">
        {isPlaceholder ? (
          <span className="speech-bubble-text">...</span>
        ) : isHTML ? (
          <span className="speech-bubble-text" dangerouslySetInnerHTML={{ __html: text}} />
        ) : (
          <span className="speech-bubble-text">
            {text}
          </span>
        )}
      </div>
    </div>
  );
};

export default SpeechBubble;