/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import {
  useRef, useCallback, useEffect, useState,
} from 'react';

const chat = ({ messages, send, socketId }) => {
  const inputRef = useRef();
  const [isHidden, setIsHidden] = useState(true);
  const [isNewMessage, setIsNewMessage] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-container');
      const widget = document.getElementById('chat-widget');
      const widgetBoundary = widget.getBoundingClientRect();
      chatContainer.style.bottom = `${widgetBoundary.height + 16}px`;
      chatContainer.style.left = `${widgetBoundary.right - 300}px`;
    }, 0.5);
  }, []);
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
    if (element.scrollHeight >= element.scrollTop + element.offsetHeight + 2) {
      element.scrollTop = element.scrollHeight - element.offsetHeight - 2;
    }
    if (isHidden) {
      setIsNewMessage(true);
    }
  }, [messages]);

  const onDragStart = useCallback(
    (e) => {
      const rect = e.target.getBoundingClientRect();
      const dragImage = document.createElement('div');
      dragImage.id = 'drag-image';
      dragImage.style.background = 'gray';
      dragImage.style.height = '30%';
      dragImage.style.width = `${rect.width}px`;
      dragImage.style.position = 'absolute';
      dragImage.style.top = '-500px';
      dragImage.style.right = '-500px';
      document.body.appendChild(dragImage);
      e.dataTransfer.setDragImage(dragImage, 0, 0);
    },
    [inputRef],
  );

  const onDragEnd = useCallback(
    () => {
      document.getElementById('drag-image').remove();
      // setPosition({ x: e.pageX, y: e.pageY });
    },
    [inputRef],
  );

  const onClickWidget = useCallback(
    () => {
      setIsHidden(!isHidden);
      if (isHidden) {
        inputRef.current.focus();
      }
      const chatContainer = document.getElementById('chat-container');
      const widget = document.getElementById('chat-widget');
      const widgetBoundary = widget.getBoundingClientRect();
      chatContainer.style.bottom = `${widgetBoundary.height + 16}px`;
      chatContainer.style.left = `${widgetBoundary.right - 300}px`;
      setIsNewMessage(false);
    },
    [isHidden],
  );

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
        setIsHidden(true);
        event.target.blur();
      }
    },
    [inputRef],
  );

  return (
    <>
      <div
        id="chat-widget"
        className={`chat-widget ${isNewMessage ? 'chat-widget--new' : ''}`}
        draggable="true"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onClick={onClickWidget}

      >
        chat
      </div>
      <div id="chat-container" className={`chat-container ${isHidden ? 'minimum' : ''}`}>
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
          <input className="chat__input" ref={inputRef} onKeyPress={handleKeyPress} onKeyDown={handleKeyDown} />
          <button type="button" onClick={sendHandle}>send</button>
        </div>
      </div>
    </>

  );
};

export default chat;
