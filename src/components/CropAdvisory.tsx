import React, { useState } from 'react';
import { Sprout, Loader2, CheckCircle2, MapPin, Thermometer, Droplets } from 'lucide-react';
import { getCropRecommendation } from '../services/gemini';
import { CropRecommendation } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const CropAdvisory: React.FC = () => {
  const [soilType, setSoilType] = useState('');
  const [climate, setClimate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CropRecommendation | null>(null);

  const handleRecommend = async () => {
    if (!soilType || !climate) return;
    setLoading(true);
    try {
      const recommendation = await getCropRecommendation(soilType, climate, location);
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
        <h2 className="text-4xl font-bold font-serif">Crop Advisory</h2>
        <p className="text-earth-500">
          Get personalized crop recommendations based on your soil type, climate, and location.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="card-organic space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-earth-500">Soil Type</label>
              <select 
                value={soilType} 
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full p-4 rounded-2xl border border-earth-200 bg-earth-50 focus:outline-none focus:ring-2 focus:ring-earth-600 appearance-none"
              >
                <option value="">Select Soil Type</option>
                <option value="Alluvial">Alluvial Soil</option>
                <option value="Black">Black Soil (Regur)</option>
                <option value="Red">Red Soil</option>
                <option value="Laterite">Laterite Soil</option>
                <option value="Desert">Desert / Arid Soil</option>
                <option value="Mountain">Mountain / Forest Soil</option>
                <option value="Peaty">Peaty / Marshy Soil</option>
                <option value="Saline">Saline / Alkaline Soil</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-earth-500">Climate</label>
              <select 
                value={climate} 
                onChange={(e) => setClimate(e.target.value)}
                className="w-full p-4 rounded-2xl border border-earth-200 bg-earth-50 focus:outline-none focus:ring-2 focus:ring-earth-600 appearance-none"
              >
                <option value="">Select Climate</option>
                <option value="Tropical">Tropical</option>
                <option value="Subtropical">Subtropical</option>
                <option value="Arid">Arid / Dry</option>
                <option value="Semi-arid">Semi-arid</option>
                <option value="Temperate">Temperate</option>
                <option value="Continental">Continental</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-earth-500">Location (Optional)</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400" size={18} />
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Karnataka, India"
                  className="w-full p-4 pl-12 rounded-2xl border border-earth-200 bg-earth-50 focus:outline-none focus:ring-2 focus:ring-earth-600"
                />
              </div>
            </div>
          </div>

          <button 
            disabled={!soilType || !climate || loading}
            onClick={handleRecommend}
            className="btn-organic w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Finding Best Crop...
              </>
            ) : (
              <>
                <Sprout size={20} />
                Get Recommendation
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
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60">Recommended Crop</span>
                    <h3 className="text-3xl font-bold font-serif">{result.crop}</h3>
                  </div>
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur">
                    <Sprout size={32} />
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed italic">
                  "{result.reason}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card-organic flex items-center gap-4">
                  <div className="bg-earth-100 p-3 rounded-2xl">
                    <Thermometer className="text-earth-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-earth-400">Best Season</p>
                    <p className="font-bold text-earth-800">{result.season}</p>
                  </div>
                </div>
                <div className="card-organic flex items-center gap-4">
                  <div className="bg-earth-100 p-3 rounded-2xl">
                    <Droplets className="text-earth-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-earth-400">Water Need</p>
                    <p className="font-bold text-earth-800">{result.waterRequirement}</p>
                  </div>
                </div>
              </div>

              <div className="card-organic">
                <h4 className="font-bold text-lg mb-4 text-earth-800 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-earth-600" />
                  Soil Requirements
                </h4>
                <p className="text-earth-600 text-sm leading-relaxed">
                  {result.soilType}
                </p>
              </div>
            </motion.div>
          ) : !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-4 opacity-40 grayscale">
               <Sprout size={80} className="text-earth-400" />
               <p className="text-lg font-serif italic">Recommendations will appear here</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
