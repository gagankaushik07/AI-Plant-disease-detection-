import React, { useState, useEffect } from 'react';
import { Video, Sparkles, Loader2, Download, Play, AlertCircle, Clock } from 'lucide-react';
import { generateFarmingVideo } from '../services/gemini';
import { auth, db, doc, getDoc, updateDoc, serverTimestamp } from '../firebase';
import { motion } from 'motion/react';

export const VideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [usage, setUsage] = useState<{ count: number; lastReset: any } | null>(null);

  const DAILY_LIMIT = 5;

  useEffect(() => {
    const fetchUsage = async () => {
      if (!auth.currentUser) return;
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setUsage(data.videoUsage || { count: 0, lastReset: null });
      }
    };
    fetchUsage();
  }, []);

  const checkAndIncrementUsage = async () => {
    if (!auth.currentUser) return false;
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) return false;
    
    const data = userSnap.data();
    let currentUsage = data.videoUsage || { count: 0, lastReset: null };
    
    // Check if reset is needed (if lastReset was more than 24h ago)
    const now = new Date();
    const lastReset = currentUsage.lastReset?.toDate() || new Date(0);
    const diffHours = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);
    
    if (diffHours >= 24) {
      currentUsage = { count: 0, lastReset: serverTimestamp() };
    }

    if (currentUsage.count >= DAILY_LIMIT) {
      return false;
    }

    const newUsage = { ...currentUsage, count: currentUsage.count + 1 };
    if (currentUsage.count === 0) newUsage.lastReset = serverTimestamp();
    
    await updateDoc(userRef, { videoUsage: newUsage });
    setUsage(newUsage);
    return true;
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    setVideoUrl(null);
    setStatus('Checking daily limit...');

    try {
      const canGenerate = await checkAndIncrementUsage();
      if (!canGenerate) {
        throw new Error(`Daily limit reached. You can generate up to ${DAILY_LIMIT} videos every 24 hours.`);
      }

      setStatus('Initializing generation...');
      const statusInterval = setInterval(() => {
        const statuses = [
          'Analyzing prompt...',
          'Synthesizing agricultural data...',
          'Generating frames...',
          'Rendering video...',
          'Finalizing quality...'
        ];
        setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      }, 5000);

      const url = await generateFarmingVideo(prompt, aspectRatio);
      clearInterval(statusInterval);
      setVideoUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate video. Please try again.');
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-earth-100 text-earth-600 rounded-2xl">
          <Video size={32} />
        </div>
        <h2 className="text-3xl font-bold text-earth-900">AI Video Generator</h2>
        <p className="text-earth-600 max-w-2xl mx-auto">
          Create high-quality educational agricultural videos using Veo 3. Describe what you want to see, and our AI will bring it to life.
        </p>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-earth-100 text-earth-700 rounded-full text-sm font-medium">
          <Clock size={16} />
          Daily Limit: {usage?.count || 0} / {DAILY_LIMIT} used
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card-organic space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-earth-700">Describe your video</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A time-lapse of a tomato plant growing from a seed to a fruit-bearing plant in a sunny garden..."
              className="w-full p-4 rounded-xl border border-earth-200 bg-earth-50 focus:outline-none focus:ring-2 focus:ring-earth-600 min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-earth-700">Aspect Ratio</label>
            <div className="flex gap-4">
              <button
                onClick={() => setAspectRatio('16:9')}
                className={`flex-1 p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  aspectRatio === '16:9' 
                    ? 'border-earth-600 bg-earth-50 text-earth-600' 
                    : 'border-earth-100 text-earth-400 hover:border-earth-200'
                }`}
              >
                <div className="w-6 h-4 border-2 border-current rounded-sm" />
                Landscape (16:9)
              </button>
              <button
                onClick={() => setAspectRatio('9:16')}
                className={`flex-1 p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  aspectRatio === '9:16' 
                    ? 'border-earth-600 bg-earth-50 text-earth-600' 
                    : 'border-earth-100 text-earth-400 hover:border-earth-200'
                }`}
              >
                <div className="w-4 h-6 border-2 border-current rounded-sm" />
                Portrait (9:16)
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || loading || (usage?.count || 0) >= DAILY_LIMIT}
            className="w-full py-4 bg-earth-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-earth-700 transition-colors disabled:opacity-50 shadow-lg shadow-earth-200"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                {status || 'Generating...'}
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Video
              </>
            )}
          </button>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-start gap-3 border border-red-100">
              <AlertCircle className="shrink-0 mt-0.5" size={18} />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className={`aspect-video rounded-3xl overflow-hidden bg-earth-100 border-2 border-dashed border-earth-200 flex flex-col items-center justify-center relative ${aspectRatio === '9:16' ? 'aspect-[9/16] max-w-[300px] mx-auto' : ''}`}>
            {videoUrl ? (
              <video 
                src={videoUrl} 
                controls 
                className="w-full h-full object-cover"
                autoPlay
              />
            ) : loading ? (
              <div className="text-center space-y-4 p-8">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-earth-200 border-t-earth-600 rounded-full animate-spin mx-auto" />
                  <Video className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-earth-600" size={24} />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-earth-900">Creating your video</p>
                  <p className="text-sm text-earth-500 animate-pulse">{status}</p>
                </div>
                <p className="text-xs text-earth-400 italic">This may take 1-2 minutes. Please don't close this tab.</p>
              </div>
            ) : (
              <div className="text-center space-y-2 p-8 text-earth-400">
                <Play size={48} className="mx-auto opacity-20" />
                <p>Your generated video will appear here</p>
              </div>
            )}
          </div>

          {videoUrl && (
            <div className="flex gap-4">
              <a
                href={videoUrl}
                download="bhoomi-ai-video.mp4"
                className="flex-1 py-3 bg-white border border-earth-200 text-earth-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-earth-50 transition-colors"
              >
                <Download size={18} />
                Download Video
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
