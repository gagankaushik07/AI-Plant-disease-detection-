import React from 'react';
import { Leaf, Sprout, Droplets, MessageSquare, Users, Video, Star, Mail } from 'lucide-react';
import { AppTab } from '../types';
import { Auth } from './Auth';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-earth-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-earth-600 p-2 rounded-xl shadow-lg shadow-earth-200">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-earth-900 font-serif">BHOOMI</h1>
          </div>
          
          <nav className="hidden lg:flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('disease')}
              className={`text-sm font-medium transition-colors ${activeTab === 'disease' ? 'active-tab text-earth-900' : 'text-earth-400 hover:text-earth-600'}`}
            >
              Disease
            </button>
            <button 
              onClick={() => setActiveTab('crop')}
              className={`text-sm font-medium transition-colors ${activeTab === 'crop' ? 'active-tab text-earth-900' : 'text-earth-400 hover:text-earth-600'}`}
            >
              Crops
            </button>
            <button 
              onClick={() => setActiveTab('fertilizer')}
              className={`text-sm font-medium transition-colors ${activeTab === 'fertilizer' ? 'active-tab text-earth-900' : 'text-earth-400 hover:text-earth-600'}`}
            >
              Fertilizer
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`text-sm font-medium transition-colors ${activeTab === 'chat' ? 'active-tab text-earth-900' : 'text-earth-400 hover:text-earth-600'}`}
            >
              Assistant
            </button>
            <button 
              onClick={() => setActiveTab('video')}
              className={`text-sm font-medium transition-colors ${activeTab === 'video' ? 'active-tab text-earth-900' : 'text-earth-400 hover:text-earth-600'}`}
            >
              Video AI
            </button>
            <button 
              onClick={() => setActiveTab('feedback')}
              className={`text-sm font-medium transition-colors ${activeTab === 'feedback' ? 'active-tab text-earth-900' : 'text-earth-400 hover:text-earth-600'}`}
            >
              Feedback
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`text-sm font-medium transition-colors ${activeTab === 'about' ? 'active-tab text-earth-900' : 'text-earth-400 hover:text-earth-600'}`}
            >
              About
            </button>
          </nav>

          <Auth />
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        {children}
      </main>

      <footer className="bg-earth-900 text-earth-100 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="text-earth-400 w-6 h-6" />
              <h2 className="text-2xl font-bold font-serif">BHOOMI AI</h2>
            </div>
            <p className="text-earth-400 text-sm leading-relaxed">
              Empowering farmers with AI-driven insights for healthier crops and sustainable agriculture. Your personal forest-themed farming companion.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-earth-500">Tools</h3>
            <ul className="space-y-3 text-sm text-earth-400">
              <li><button onClick={() => setActiveTab('disease')} className="hover:text-white transition-colors">Disease Detection</button></li>
              <li><button onClick={() => setActiveTab('crop')} className="hover:text-white transition-colors">Crop Recommendation</button></li>
              <li><button onClick={() => setActiveTab('fertilizer')} className="hover:text-white transition-colors">Fertilizer Guide</button></li>
              <li><button onClick={() => setActiveTab('video')} className="hover:text-white transition-colors">AI Video Generator</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-earth-500">Support</h3>
            <ul className="space-y-3 text-sm text-earth-400">
              <li><button onClick={() => setActiveTab('feedback')} className="hover:text-white transition-colors">Give Feedback</button></li>
              <li><button onClick={() => setActiveTab('feedback')} className="hover:text-white transition-colors">File a Complaint</button></li>
              <li><button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">About Us</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-earth-500">Contact</h3>
            <div className="space-y-3">
              <a href="mailto:gagankaushik028@gmail.com" className="flex items-center gap-2 text-earth-400 hover:text-white transition-colors text-sm">
                <Mail size={16} />
                gagankaushik028@gmail.com
              </a>
              <p className="text-earth-500 text-xs italic">
                Available on Mobile Data & Wi-Fi
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-earth-100 px-4 py-3 flex justify-between items-center z-50">
        <button onClick={() => setActiveTab('disease')} className={`p-2 flex flex-col items-center gap-1 ${activeTab === 'disease' ? 'text-earth-600' : 'text-earth-400'}`}>
          <Leaf size={20} />
          <span className="text-[10px] font-medium">Disease</span>
        </button>
        <button onClick={() => setActiveTab('crop')} className={`p-2 flex flex-col items-center gap-1 ${activeTab === 'crop' ? 'text-earth-600' : 'text-earth-400'}`}>
          <Sprout size={20} />
          <span className="text-[10px] font-medium">Crops</span>
        </button>
        <button onClick={() => setActiveTab('chat')} className={`p-2 flex flex-col items-center gap-1 ${activeTab === 'chat' ? 'text-earth-600' : 'text-earth-400'}`}>
          <MessageSquare size={20} />
          <span className="text-[10px] font-medium">Chat</span>
        </button>
        <button onClick={() => setActiveTab('video')} className={`p-2 flex flex-col items-center gap-1 ${activeTab === 'video' ? 'text-earth-600' : 'text-earth-400'}`}>
          <Video size={20} />
          <span className="text-[10px] font-medium">Video</span>
        </button>
        <button onClick={() => setActiveTab('feedback')} className={`p-2 flex flex-col items-center gap-1 ${activeTab === 'feedback' ? 'text-earth-600' : 'text-earth-400'}`}>
          <Star size={20} />
          <span className="text-[10px] font-medium">Feedback</span>
        </button>
      </div>
    </div>
  );
};
