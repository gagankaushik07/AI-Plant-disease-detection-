import React from 'react';
import { Leaf, ShieldCheck, Users, Globe, Award, Heart, Smartphone, Download } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 py-8">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block bg-earth-600 p-4 rounded-3xl mb-4"
        >
          <Leaf className="text-white w-10 h-10" />
        </motion.div>
        <h2 className="text-5xl font-bold font-serif text-earth-900">About BHOOMI AI</h2>
        <p className="text-xl text-earth-600 font-serif italic">
          "Nurturing the earth, empowering the farmer."
        </p>
        <p className="text-earth-500 leading-relaxed text-lg">
          BHOOMI is an AI-powered agricultural ecosystem designed to bridge the gap between traditional farming wisdom and modern technological precision. Our mission is to ensure global food security by providing every farmer with a world-class agricultural expert in their pocket.
        </p>
      </div>

      {/* New Get the App Section */}
      <div className="card-organic bg-earth-50 border-earth-200 p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-earth-200 text-earth-700 text-xs font-bold uppercase tracking-wider">
              <Smartphone size={14} /> Mobile Experience
            </div>
            <h3 className="text-3xl font-bold font-serif text-earth-900">Get BHOOMI on your Phone</h3>
            <p className="text-earth-600 leading-relaxed">
              You can install BHOOMI directly on your smartphone as a Progressive Web App (PWA). This gives you a full-screen experience, an app icon on your home screen, and faster access in the field.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-earth-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <p className="font-bold text-earth-900">Open in Browser</p>
                  <p className="text-sm text-earth-500">Open the shared link in Safari (iOS) or Chrome (Android).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-earth-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <p className="font-bold text-earth-900">Add to Home Screen</p>
                  <p className="text-sm text-earth-500">Tap the "Share" icon (iOS) or "Menu" dots (Android) and select <strong>"Add to Home Screen"</strong>.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-earth-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <p className="font-bold text-earth-900">Launch BHOOMI</p>
                  <p className="text-sm text-earth-500">Find the BHOOMI icon on your home screen and start using it like a native app!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="aspect-[9/16] bg-earth-900 rounded-[2.5rem] border-[8px] border-earth-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-earth-800 rounded-b-2xl z-20" />
              <div className="absolute inset-0 bg-earth-100 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="bg-earth-600 p-3 rounded-2xl shadow-lg">
                  <Leaf className="text-white w-8 h-8" />
                </div>
                <p className="font-serif font-bold text-earth-900">BHOOMI</p>
                <div className="w-full h-1 bg-earth-200 rounded-full" />
                <div className="w-2/3 h-1 bg-earth-200 rounded-full" />
                <div className="mt-4 p-2 bg-white rounded-xl shadow-sm border border-earth-200 flex items-center gap-2">
                  <Download size={16} className="text-earth-600" />
                  <span className="text-[10px] font-bold text-earth-400 uppercase">Installing...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card-organic space-y-4 hover:shadow-lg transition-shadow">
          <div className="bg-earth-100 w-12 h-12 rounded-2xl flex items-center justify-center text-earth-600">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-bold font-serif">Reliable Data</h3>
          <p className="text-sm text-earth-500 leading-relaxed">
            Our AI models are trained on vast datasets of plant pathology and agronomy to provide accurate, science-backed recommendations.
          </p>
        </div>
        <div className="card-organic space-y-4 hover:shadow-lg transition-shadow">
          <div className="bg-earth-100 w-12 h-12 rounded-2xl flex items-center justify-center text-earth-600">
            <Globe size={24} />
          </div>
          <h3 className="text-xl font-bold font-serif">Global Reach</h3>
          <p className="text-sm text-earth-500 leading-relaxed">
            Designed to work across different climates and soil types globally, supporting diverse agricultural practices.
          </p>
        </div>
        <div className="card-organic space-y-4 hover:shadow-lg transition-shadow">
          <div className="bg-earth-100 w-12 h-12 rounded-2xl flex items-center justify-center text-earth-600">
            <Users size={24} />
          </div>
          <h3 className="text-xl font-bold font-serif">Community First</h3>
          <p className="text-sm text-earth-500 leading-relaxed">
            We prioritize the needs of small-scale farmers, providing tools that were previously only accessible to large industrial farms.
          </p>
        </div>
      </div>

      <div className="card-organic bg-earth-900 text-white border-none p-12 overflow-hidden relative">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl font-bold font-serif mb-6">Our Vision for 2030</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-white/10 p-2 rounded-lg h-fit mt-1"><Award size={20} /></div>
              <p className="text-earth-300">Reduce crop loss due to preventable diseases by 40% globally.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 p-2 rounded-lg h-fit mt-1"><Heart size={20} /></div>
              <p className="text-earth-300">Promote organic and sustainable farming practices to restore soil health.</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 opacity-10 rotate-12">
          <Leaf size={400} />
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-earth-400 text-sm font-medium uppercase tracking-widest">The Team Behind BHOOMI</p>
        <div className="flex justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-earth-200 border-2 border-white shadow-sm" />
          <div className="w-12 h-12 rounded-full bg-earth-300 border-2 border-white shadow-sm" />
          <div className="w-12 h-12 rounded-full bg-earth-400 border-2 border-white shadow-sm" />
        </div>
        <p className="text-earth-500 italic font-serif">"Building a greener future, one leaf at a time."</p>
      </div>
    </div>
  );
};
