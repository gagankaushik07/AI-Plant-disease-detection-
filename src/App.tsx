import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { DiseaseDetection } from './components/DiseaseDetection';
import { CropAdvisory } from './components/CropAdvisory';
import { FertilizerAdvisory } from './components/FertilizerAdvisory';
import { ChatAssistant } from './components/ChatAssistant';
import { VideoGenerator } from './components/VideoGenerator';
import { Feedback } from './components/Feedback';
import { AboutPage } from './components/AboutPage';
import { Auth, LoginOverlay } from './components/Auth';
import { auth } from './firebase';
import { AppTab } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('disease');
  const [user, setUser] = useState(auth.currentUser);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'disease':
        return <DiseaseDetection />;
      case 'crop':
        return <CropAdvisory />;
      case 'fertilizer':
        return <FertilizerAdvisory />;
      case 'chat':
        return <ChatAssistant />;
      case 'video':
        return <VideoGenerator />;
      case 'feedback':
        return <Feedback />;
      case 'about':
        return <AboutPage />;
      default:
        return <DiseaseDetection />;
    }
  };

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-earth-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-earth-200 border-t-earth-600 rounded-full animate-spin mx-auto" />
          <p className="text-earth-600 font-medium">Growing BHOOMI...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!user && <LoginOverlay />}
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
}
