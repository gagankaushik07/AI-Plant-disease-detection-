import React from 'react';
import { Leaf, Sprout, Droplets, MessageSquare, Users, Video } from 'lucide-react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-bottom border-earth-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-earth-600 p-2 rounded-xl">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-earth-800">BHOOMI</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setActiveTab('disease')}
              className={`text-sm font-medium transition-colors ${activeTab === 'disease' ? 'active-tab text-earth-900' : 'text-earth-400 hover:text-earth-600'}`}
            >
              Disease Detection
            </button>
            <button 
              onClick={() => setActiveTab('crop')}
              className={`text-sm font-medium transition-colors ${activeTab === 'crop' ? 'active-tab text-earth-900' : 'text-earth-400 hover:text-earth-600'}`}
            >
              Crop Advisory
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
              onClick={() => setActiveTab('about')}
              className={`text-sm font-medium transition-colors ${activeTab === 'about' ? 'active-tab text-earth-900' : 'text-earth-400 hover:text-earth-600'}`}
            >
              About
            </button>
          </nav>
          
          <div className="md:hidden flex items-center gap-4">
             {/* Mobile menu could go here */}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        {children}
      </main>

      <footer className="bg-earth-900 text-earth-100 py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="text-earth-400 w-6 h-6" />
              <h2 className="text-xl font-bold font-serif">BHOOMI AI</h2>
            </div>
            <p className="text-earth-400 text-sm leading-relaxed">
              Empowering farmers with AI-driven insights for healthier crops and sustainable agriculture.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-earth-500">Quick Links</h3>
            <ul className="space-y-2 text-sm text-earth-400">
              <li><button onClick={() => setActiveTab('disease')}>Disease Detection</button></li>
              <li><button onClick={() => setActiveTab('crop')}>Crop Recommendation</button></li>
              <li><button onClick={() => setActiveTab('fertilizer')}>Fertilizer Guide</button></li>
              <li><button onClick={() => setActiveTab('about')}>About BHOOMI</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-earth-500">Contact</h3>
            <p className="text-earth-400 text-sm">gagankaushik028@gmail.com</p>
            <p className="text-earth-400 text-sm">Made with 🌿 for Agriculture</p>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-earth-200 px-6 py-3 flex justify-between items-center z-50">
        <button onClick={() => setActiveTab('disease')} className={`p-2 ${activeTab === 'disease' ? 'text-earth-600' : 'text-earth-400'}`}>
          <Leaf size={24} />
        </button>
        <button onClick={() => setActiveTab('crop')} className={`p-2 ${activeTab === 'crop' ? 'text-earth-600' : 'text-earth-400'}`}>
          <Sprout size={24} />
        </button>
        <button onClick={() => setActiveTab('fertilizer')} className={`p-2 ${activeTab === 'fertilizer' ? 'text-earth-600' : 'text-earth-400'}`}>
          <Droplets size={24} />
        </button>
        <button onClick={() => setActiveTab('chat')} className={`p-2 ${activeTab === 'chat' ? 'text-earth-600' : 'text-earth-400'}`}>
          <MessageSquare size={24} />
        </button>
        <button onClick={() => setActiveTab('video')} className={`p-2 ${activeTab === 'video' ? 'text-earth-600' : 'text-earth-400'}`}>
          <Video size={24} />
        </button>
        <button onClick={() => setActiveTab('about')} className={`p-2 ${activeTab === 'about' ? 'text-earth-600' : 'text-earth-400'}`}>
          <Users size={24} />
        </button>
      </div>
    </div>
  );
};
