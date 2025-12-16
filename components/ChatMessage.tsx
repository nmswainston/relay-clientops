'use client';

import { ChatMessage as ChatMessageType } from '@/types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2.5 ${
          isUser
            ? 'bg-accent-600 text-white'
            : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] dark:bg-[var(--color-surface-dark)] dark:text-[var(--color-text-primary-dark)] dark:border-[var(--color-border-dark)]'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p
          className={`text-xs mt-1.5 ${
            isUser ? 'text-accent-100' : 'text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}

