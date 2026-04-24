import { useEffect, useState } from 'react';

import { Send } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector } from '@/store/hooks';
import type { ChatBubbleProps, ChatProps, Message } from '@/types/types';

import { Button } from './ui/button';

const ChatBubble = ({ avatarURL, username, message, type }: ChatBubbleProps) => {
  return (
    <div
      className={`flex  ${type === 'receive' ? 'flex-row justify-start' : 'flex-row-reverse '}  items-start gap-2 mx-4 my-4 `}
    >
      <Avatar className="mt-2">
        <AvatarImage src={avatarURL} />
        <AvatarFallback>{username?.toUpperCase()[0] || 'User'}</AvatarFallback>
      </Avatar>
      <div
        className={`bg-secondary  p-2 rounded-t-xl ${type === 'receive' ? 'rounded-br-xl pr-4' : 'rounded-bl-xl pl-4'} min-w-25`}
      >
        <p className={`font-mono text-sm mb-2 ${type === 'receive' ? 'text-start' : 'text-end'}`}>
          {username}
        </p>
        <p className="text-lg ">{message}</p>
      </div>
    </div>
  );
};

const Chat = ({ socket, meetingCode }: ChatProps) => {
  const user = useAppSelector((state) => state.user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [myMessage, setMyMessage] = useState('');

  useEffect(() => {
    if (!socket) return;

    const handler = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('chat-message', handler);

    return () => {
      socket.off('chat-message', handler);
    };
  }, [socket]);

  const handleSend = () => {
    if (!socket || !myMessage.trim()) return;

    socket.emit('chat-message', { meetingCode, text: myMessage });
    setMyMessage('');
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* SCROLLABLE AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar px-2">
        <div className="flex-1 min-h-0"></div>
        {messages.map((msg) => (
          <ChatBubble
            key={msg.timestamp}
            avatarURL={msg.profilePic}
            username={msg.username}
            message={msg.text}
            type={user.username == msg.username ? 'send' : 'receive'}
          />
        ))}
      </div>

      {/* INPUT AREA */}
      <div className="flex items-center gap-2 p-4 border-t border-white/10">
        <input
          type="text"
          placeholder="Your Message"
          value={myMessage}
          onChange={(event) => setMyMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 px-4 py-2 border-2 border-border rounded-xl"
        />

        <Button
          className="size-11 active:shadow-sm active:translate-y-1"
          variant={'outline'}
          onClick={handleSend}
        >
          <Send className="size-6" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
