'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '@/types/chat';
import { getBotResponse, mockBotResponses } from '@/lib/mockData';
import ChatMessageComponent from './ChatMessage';
import Button from './ui/Button';

export default function BetterBotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm BetterBot, your AI assistant for the Better Direct Client Portal. I can help you with:\n\n• Checking order status and tracking information\n• Finding product compatibility details\n• Checking stock availability\n• Answering questions about your past orders\n• Helping with reorders\n\nWhat would you like to know?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpenBetterBot = () => {
      setIsOpen(true);
    };

    window.addEventListener('openBetterBot', handleOpenBetterBot);
    return () => window.removeEventListener('openBetterBot', handleOpenBetterBot);
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
        className="fixed bottom-6 right-6 bg-primary-600 text-white rounded-full w-14 h-14 shadow-xl hover:bg-primary-700 hover:scale-110 transition-all duration-200 z-50 flex items-center justify-center group"
        aria-label="Open BetterBot"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      </button>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col dark:bg-slate-900 dark:shadow-slate-950/50">
        {/* Header */}
        <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-bold text-sm">BB</span>
            </div>
            <div>
              <h3 className="font-semibold">BetterBot</h3>
              <p className="text-xs text-primary-100">AI Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-primary-100 transition-colors"
            aria-label="Close BetterBot"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-slate-900/70">
          {/* Example Prompts - shown above messages when conversation is just starting */}
          {messages.length <= 1 && (
            <div className="mb-4 space-y-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Try asking:</p>
              <div className="space-y-2">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleQuestion(prompt)}
                    className="w-full text-left px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 group"
                  >
                    <div className="flex items-start space-x-2">
                      <span className="text-primary-600 dark:text-primary-400 mt-0.5">•</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-400">
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
        <div className="p-4 bg-white border-t border-gray-200 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100"
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

