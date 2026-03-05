import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Loader2, User, Bot, Leaf } from 'lucide-react';
import { chatWithBhoomi } from '../services/gemini';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am BHOOMI AI, your agricultural expert. How can I help you today? You can ask me about plant care, crop management, or disease prevention.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await chatWithBhoomi(userMessage, messages);
      setMessages(prev => [...prev, { role: 'assistant', content: response || 'I am sorry, I could not process that request.' }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[600px] card-organic p-0 overflow-hidden border-none shadow-xl">
      <div className="bg-earth-600 p-4 text-white flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-xl backdrop-blur">
          <Leaf size={20} />
        </div>
        <div>
          <h3 className="font-bold">BHOOMI AI Assistant</h3>
          <p className="text-xs text-white/60">Expert Agricultural Advice</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-earth-50/50">
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-earth-200 text-earth-600' : 'bg-earth-600 text-white'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-earth-600 text-white rounded-tr-none' : 'bg-white text-earth-800 shadow-sm border border-earth-100 rounded-tl-none'}`}>
                {msg.content}
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-earth-600 text-white flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl text-sm bg-white text-earth-800 shadow-sm border border-earth-100 rounded-tl-none flex items-center gap-2">
                <Loader2 className="animate-spin" size={16} />
                BHOOMI is thinking...
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-earth-100">
        <div className="relative">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask BHOOMI anything about farming..."
            className="w-full p-4 pr-14 rounded-2xl border border-earth-200 bg-earth-50 focus:outline-none focus:ring-2 focus:ring-earth-600"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-earth-600 text-white rounded-xl hover:bg-earth-700 transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
