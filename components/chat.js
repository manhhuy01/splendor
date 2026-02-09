import {
  useRef, useCallback, useEffect,
} from 'react';

const chat = ({ messages, send, socketId }) => {
  const inputRef = useRef();

  const sendHandle = useCallback(
    () => {
      if (inputRef.current.value.trim()) {
        send(inputRef.current.value);
        inputRef.current.value = '';
      }
    },
    [inputRef],
  );

  useEffect(() => {
    const element = document.getElementById('chat-content');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        if (inputRef.current.value.trim()) {
          send(inputRef.current.value);
        }
        inputRef.current.value = '';
      }
    },
    [inputRef],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        event.target.blur();
      }
    },
    [inputRef],
  );

  return (
    <div className="chat-container">
      <div className="chat__title">Trò chuyện</div>
      <div className="chat__content" id="chat-content">
        {
          !!messages.length && messages.reduce((rs, message, index) => {
            let result = {};
            if (rs.pre !== message.socketId) {
              result = {
                pre: message.socketId,
                arr: [...rs.arr,
                  <div key={index} className={`chat__message ${socketId === message.socketId ? 'my' : ''}`}>
                    <div className="chat__name">{message.name}</div>
                    <div className="chat__text">{message.text}</div>
                  </div>,
                ],
              };
            } else {
              result = {
                pre: rs.pre,
                arr: [...rs.arr,
                  <div key={index} className={`chat__message ${socketId === message.socketId ? 'my' : ''}`}>
                    <div className="chat__text">{message.text}</div>
                  </div>,
                ],
              };
            }
            if (index === messages.length - 1) {
              return result.arr;
            }
            return result;
          }, { arr: [], pre: undefined })
        }
      </div>
      <div className="chat__input__container">
        <input 
          className="chat__input" 
          ref={inputRef} 
          onKeyPress={handleKeyPress} 
          onKeyDown={handleKeyDown} 
          placeholder="Nhập tin nhắn..."
        />
        <button type="button" onClick={sendHandle}>Gửi</button>
      </div>
    </div>
  );
};

export default chat;
