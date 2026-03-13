import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Loader2, User, Bot, Leaf, Image as ImageIcon, Camera, X } from 'lucide-react';
import { chatWithBhoomi } from '../services/gemini';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

export const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am BHOOMI AI, your agricultural expert. How can I help you today? You can ask me about plant care, crop management, or disease prevention. You can also upload or take a photo of a plant for diagnosis!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || loading) return;

    const userMessage = input.trim();
    const imageData = selectedImage;
    
    setInput('');
    setSelectedImage(null);
    
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage || (imageData ? 'Analyzing this image...' : ''), 
      image: imageData || undefined 
    }]);
    
    setLoading(true);

    try {
      let mimeType = 'image/jpeg';
      if (imageData && imageData.startsWith('data:')) {
        mimeType = imageData.split(';')[0].split(':')[1];
      }

      const response = await chatWithBhoomi(
        userMessage, 
        messages, 
        imageData ? { base64: imageData, mimeType } : undefined
      );
      
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
              <div className={`p-4 rounded-2xl text-sm leading-relaxed space-y-2 ${msg.role === 'user' ? 'bg-earth-600 text-white rounded-tr-none' : 'bg-white text-earth-800 shadow-sm border border-earth-100 rounded-tl-none'}`}>
                {msg.image && (
                  <img src={msg.image} alt="User upload" className="max-w-full h-auto rounded-lg mb-2 border border-white/20" />
                )}
                <p>{msg.content}</p>
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

      <div className="p-4 bg-white border-t border-earth-100 space-y-4">
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="relative inline-block"
            >
              <img src={selectedImage} alt="Selected" className="h-20 w-20 object-cover rounded-xl border-2 border-earth-200" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask BHOOMI or upload a photo..."
              className="w-full p-4 pr-14 rounded-2xl border border-earth-200 bg-earth-50 focus:outline-none focus:ring-2 focus:ring-earth-600"
            />
            <button 
              onClick={handleSend}
              disabled={(!input.trim() && !selectedImage) || loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-earth-600 text-white rounded-xl hover:bg-earth-700 transition-colors disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-4 bg-earth-100 text-earth-600 rounded-2xl hover:bg-earth-200 transition-colors"
              title="Upload Image"
            >
              <ImageIcon size={20} />
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-4 bg-earth-100 text-earth-600 rounded-2xl hover:bg-earth-200 transition-colors"
              title="Take Photo"
            >
              <Camera size={20} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageSelect} 
              className="hidden" 
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
