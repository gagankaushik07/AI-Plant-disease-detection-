import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { DiseaseDetection } from './components/DiseaseDetection';
import { CropAdvisory } from './components/CropAdvisory';
import { FertilizerAdvisory } from './components/FertilizerAdvisory';
import { ChatAssistant } from './components/ChatAssistant';
import { AboutPage } from './components/AboutPage';
import { AppTab } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('disease');

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
      case 'about':
        return <AboutPage />;
      default:
        return <DiseaseDetection />;
    }
  };

  return (
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
  );
}
