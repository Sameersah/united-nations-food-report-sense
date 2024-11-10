import React, { useState } from 'react';

const SpeechBubble = ({ text, isUser, isPlaceholder }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const isLongText = text.length > 100; // Adjust the length as needed

  return (
    <div className={`speech-bubble ${isUser ? 'speech-bubble-user' : 'speech-bubble-llm'} ${isPlaceholder ? 'speech-bubble-placeholder' : ''}`}>
      <div className="speech-bubble-content">
        <span className="speech-bubble-text">
          {isPlaceholder ? '...' : expanded || !isLongText ? text : `${text.substring(0, 100)}...`}
        </span>
        {!isPlaceholder && isLongText && (
          <span className="read-more" onClick={toggleExpanded}>
            {expanded ? 'Read less' : 'Read more'}
          </span>
        )}
      </div>
    </div>
  );
};

export default SpeechBubble;
