import React, { useState } from 'react';
import { Droplets, Loader2, CheckCircle2, FlaskConical, Beaker, Calendar } from 'lucide-react';
import { getFertilizerRecommendation } from '../services/gemini';
import { FertilizerRecommendation } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const FertilizerAdvisory: React.FC = () => {
  const [crop, setCrop] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [soilCondition, setSoilCondition] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FertilizerRecommendation | null>(null);

  const handleRecommend = async () => {
    if (!crop || !growthStage) return;
    setLoading(true);
    try {
      const recommendation = await getFertilizerRecommendation(crop, growthStage, soilCondition);
      setResult(recommendation);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-4xl font-bold font-serif">Fertilizer Advisory</h2>
        <p className="text-earth-500">
          Get precise fertilizer recommendations based on your crop, growth stage, and soil condition.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="card-organic space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-earth-500">Crop Name</label>
              <input 
                type="text" 
                value={crop} 
                onChange={(e) => setCrop(e.target.value)}
                placeholder="e.g. Rice, Wheat, Tomato"
                className="w-full p-4 rounded-2xl border border-earth-200 bg-earth-50 focus:outline-none focus:ring-2 focus:ring-earth-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-earth-500">Growth Stage</label>
              <select 
                value={growthStage} 
                onChange={(e) => setGrowthStage(e.target.value)}
                className="w-full p-4 rounded-2xl border border-earth-200 bg-earth-50 focus:outline-none focus:ring-2 focus:ring-earth-600 appearance-none"
              >
                <option value="">Select Growth Stage</option>
                <option value="Seedling">Seedling</option>
                <option value="Vegetative">Vegetative</option>
                <option value="Flowering">Flowering</option>
                <option value="Fruiting">Fruiting</option>
                <option value="Harvest">Harvest Ready</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-earth-500">Soil Condition (Optional)</label>
              <input 
                type="text" 
                value={soilCondition} 
                onChange={(e) => setSoilCondition(e.target.value)}
                placeholder="e.g. Low Nitrogen, High Acidity"
                className="w-full p-4 rounded-2xl border border-earth-200 bg-earth-50 focus:outline-none focus:ring-2 focus:ring-earth-600"
              />
            </div>
          </div>

          <button 
            disabled={!crop || !growthStage || loading}
            onClick={handleRecommend}
            className="btn-organic w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Calculating Dosage...
              </>
            ) : (
              <>
                <Droplets size={20} />
                Get Fertilizer Guide
              </>
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="card-organic bg-earth-600 text-white border-none">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60">Recommended Fertilizer</span>
                    <h3 className="text-3xl font-bold font-serif">{result.fertilizer}</h3>
                  </div>
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur">
                    <FlaskConical size={32} />
                  </div>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Dosage</p>
                  <p className="text-lg font-bold">{result.dosage}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card-organic flex items-center gap-4">
                  <div className="bg-earth-100 p-3 rounded-2xl">
                    <Beaker className="text-earth-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-earth-400">Application Method</p>
                    <p className="font-bold text-earth-800">{result.applicationMethod}</p>
                  </div>
                </div>
                <div className="card-organic flex items-center gap-4">
                  <div className="bg-earth-100 p-3 rounded-2xl">
                    <Calendar className="text-earth-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-earth-400">Frequency</p>
                    <p className="font-bold text-earth-800">{result.frequency}</p>
                  </div>
                </div>
              </div>

              <div className="card-organic">
                <h4 className="font-bold text-lg mb-4 text-earth-800 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-earth-600" />
                  Important Notes
                </h4>
                <p className="text-earth-600 text-sm leading-relaxed">
                  Always test your soil before applying large amounts of fertilizer. Ensure proper irrigation after application to prevent nutrient runoff.
                </p>
              </div>
            </motion.div>
          ) : !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-4 opacity-40 grayscale">
               <Droplets size={80} className="text-earth-400" />
               <p className="text-lg font-serif italic">Fertilizer advice will appear here</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
