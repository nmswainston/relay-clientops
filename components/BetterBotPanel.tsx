'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '@/types/chat';
import { getBotResponse } from '@/lib/mockData';
import ChatMessageComponent from './ChatMessage';
import Button from './ui/Button';

export default function BetterBotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hello! I'm Relay Assistant. I can help you with:\n\n• Checking order status and tracking information\n• Finding product compatibility details\n• Checking stock availability\n• Answering questions about your past orders\n• Helping with reorders\n\nWhat would you like to know?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpenRelayAssistant = () => {
      setIsOpen(true);
    };

    window.addEventListener('openRelayAssistant', handleOpenRelayAssistant);
    return () =>
      window.removeEventListener('openRelayAssistant', handleOpenRelayAssistant);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getBotResponse(messageContent),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleSendMessage = () => {
    const messageContent = inputValue.trim();
    if (!messageContent) return;

    setInputValue('');
    sendMessage(messageContent);
  };

  const handleExampleQuestion = (question: string) => {
    setInputValue('');
    // Auto-send after a brief moment to allow UI update
    setTimeout(() => {
      sendMessage(question);
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const examplePrompts = [
    "When will order PO-2024-001 arrive?",
    "Are the Lenovo ThinkPads in stock?",
    "Which monitor matches my last order?",
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-accent-600 text-white rounded-full w-14 h-14 shadow-xl hover:bg-accent-700 hover:scale-110 transition-all duration-200 z-50 flex items-center justify-center group"
        aria-label="Open Relay Assistant"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      </button>
    );
  }

  return (
    <>
      {/* Panel - Popup style */}
      <div className="fixed bottom-24 right-4 sm:right-6 left-4 sm:left-auto w-auto sm:w-96 h-[600px] max-h-[85vh] bg-[var(--color-surface)] shadow-2xl z-50 flex flex-col rounded-lg border border-[var(--color-border)] dark:bg-[var(--color-surface-dark)] dark:border-[var(--color-border-dark)] transition-all duration-200 ease-out">
        {/* Header */}
        <div className="bg-accent-600 text-white p-4 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[var(--color-surface)] rounded-full flex items-center justify-center">
              <span className="text-accent-600 font-bold text-sm">RA</span>
            </div>
            <div>
              <h3 className="font-semibold">Relay Assistant</h3>
              <p className="text-xs text-accent-100">AI Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-accent-100 transition-colors"
            aria-label="Close Relay Assistant"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-[var(--color-bg-base)] dark:bg-[var(--color-bg-base-dark)]/70">
          {/* Example Prompts - shown above messages when conversation is just starting */}
          {messages.length <= 1 && (
            <div className="mb-4 space-y-3">
              <p className="text-sm font-medium text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Try asking:</p>
              <div className="space-y-2">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleQuestion(prompt)}
                    className="w-full text-left px-4 py-3 bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg hover:bg-accent-50 dark:hover:bg-[var(--color-surface-elevated-dark)] hover:border-accent-300 dark:hover:border-accent-600 transition-all duration-200 group"
                  >
                    <div className="flex items-start space-x-2">
                      <span className="text-accent-600 dark:text-accent-400 mt-0.5">•</span>
                      <span className="text-sm text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] group-hover:text-accent-700 dark:group-hover:text-accent-400">
                        {prompt}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <ChatMessageComponent key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] dark:bg-[var(--color-surface-dark)] dark:border-[var(--color-border-dark)] rounded-b-lg">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-dark)] dark:text-[var(--color-text-primary-dark)]"
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

