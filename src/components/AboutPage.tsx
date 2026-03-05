import React from 'react';
import { Leaf, ShieldCheck, Users, Globe, Award, Heart } from 'lucide-react';
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
