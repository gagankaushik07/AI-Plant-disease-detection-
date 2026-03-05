import React, { useState, useRef } from 'react';
import { Upload, Camera, Loader2, CheckCircle2, AlertCircle, RefreshCw, Sprout } from 'lucide-react';
import { analyzePlantDisease } from '../services/gemini';
import { PlantAnalysis } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const DiseaseDetection: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlantAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const mimeType = image.split(";")[0].split(":")[1];
      const analysis = await analyzePlantDisease(image, mimeType);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-4xl font-bold font-serif">Plant Disease Detection</h2>
        <p className="text-earth-500">
          Upload a clear photo of the affected plant leaf to get an instant diagnosis and treatment plan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="card-organic space-y-6">
          {!image ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-earth-300 rounded-[32px] aspect-square flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-earth-500 transition-colors bg-earth-50"
            >
              <div className="bg-white p-4 rounded-full shadow-sm">
                <Upload className="text-earth-600 w-8 h-8" />
              </div>
              <div className="text-center">
                <p className="font-medium text-earth-800">Click to upload or drag and drop</p>
                <p className="text-sm text-earth-400">PNG, JPG or JPEG (max. 10MB)</p>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>
          ) : (
            <div className="relative rounded-[32px] overflow-hidden aspect-square shadow-inner bg-earth-200">
              <img src={image} alt="Plant to analyze" className="w-full h-full object-cover" />
              <button 
                onClick={reset}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-md hover:bg-white transition-colors"
              >
                <RefreshCw size={20} className="text-earth-600" />
              </button>
            </div>
          )}

          <button 
            disabled={!image || loading}
            onClick={handleAnalyze}
            className="btn-organic w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Analyzing Plant...
              </>
            ) : (
              <>
                <Camera size={20} />
                Start Diagnosis
              </>
            )}
          </button>
          
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-2xl text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="card-organic border-l-8 border-l-earth-600">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-earth-400">Diagnosis</span>
                    <h3 className="text-2xl font-bold text-earth-900">{result.diseaseName}</h3>
                  </div>
                  <div className="bg-earth-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={16} className="text-earth-600" />
                    <span className="text-sm font-bold text-earth-700">{Math.round(result.confidence * 100)}% Confidence</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <section>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-earth-500 mb-3">Symptoms</h4>
                    <ul className="space-y-2">
                      {result.symptoms.map((s, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-earth-400 mt-1.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-earth-500 mb-3">Possible Causes</h4>
                    <ul className="space-y-2">
                      {result.causes.map((c, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-earth-400 mt-1.5 shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>

              <div className="card-organic bg-earth-600 text-white border-none">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Sprout size={20} />
                  Treatment & Recovery
                </h4>
                <ul className="space-y-3">
                  {result.treatment.map((t, i) => (
                    <li key={i} className="text-sm bg-white/10 p-3 rounded-xl border border-white/10">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-organic">
                <h4 className="font-bold text-lg mb-4 text-earth-800 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-earth-600" />
                  Prevention Steps
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {result.prevention.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-earth-50 text-sm text-earth-700">
                      <div className="w-6 h-6 rounded-full bg-earth-200 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {i + 1}
                      </div>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-4 opacity-40 grayscale">
               <LeafIcon size={80} className="text-earth-400" />
               <p className="text-lg font-serif italic">Analysis results will appear here</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const LeafIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a13 13 0 0 1-10 10Z" />
    <path d="M19 2c-1.5 3-2 3.5-7 8" />
    <path d="M7 22c-3 0-5-1-5-4 3 0 6-1 6-4" />
  </svg>
);
