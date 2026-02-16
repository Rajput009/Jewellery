import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, LoadingState } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your personal jewelry consultant. Looking for something special today?', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || loadingState === LoadingState.LOADING) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoadingState(LoadingState.LOADING);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, modelMsg]);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-white text-aurevia-green rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 group"
        >
          <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[90vw] md:w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden font-sans border border-gray-100">
          {/* Header */}
          <div className="bg-aurevia-green p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              <span className="font-semibold">Aurevia Stylist</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-aurevia-green text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loadingState === LoadingState.LOADING && (
               <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm">
                    <Loader2 size={16} className="animate-spin text-aurevia-green" />
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about our rings..."
                className="flex-1 bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-aurevia-green"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || loadingState === LoadingState.LOADING}
                className="w-9 h-9 bg-aurevia-green text-white rounded-full flex items-center justify-center hover:bg-aurevia-dark transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;