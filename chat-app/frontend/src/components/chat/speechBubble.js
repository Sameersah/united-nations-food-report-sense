import React, { useState } from 'react';

const SpeechBubble = ({ text, isUser, isPlaceholder }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const isLongText = text.length > 100;
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(text); // Simple regex to check if text contains HTML tags

  return (
    <div className={`speech-bubble ${isUser ? 'speech-bubble-user' : 'speech-bubble-llm'} ${isPlaceholder ? 'speech-bubble-placeholder' : ''}`}>
      <div className="speech-bubble-content">
        {isPlaceholder ? (
          <span className="speech-bubble-text">...</span>
        ) : isHTML ? (
          <span className="speech-bubble-text" dangerouslySetInnerHTML={{ __html: text}} />
        ) : (
          <span className="speech-bubble-text">
            {expanded || !isLongText ? text : `${text.substring(0, 100)}...`}
          </span>
        )}
        {!isPlaceholder && isLongText && !isHTML && (
          <span className="read-more" onClick={toggleExpanded}>
            {expanded ? 'Read less' : 'Read more'}
          </span>
        )}
      </div>
    </div>
  );
};

export default SpeechBubble;