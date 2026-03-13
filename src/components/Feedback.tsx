import React, { useState } from 'react';
import { Star, MessageSquare, Send, AlertCircle, CheckCircle2, Mail, Loader2 } from 'lucide-react';
import { auth, submitFeedback } from '../firebase';
import { motion } from 'motion/react';

export const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [type, setType] = useState<'feedback' | 'complaint'>('feedback');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    if (!auth.currentUser) {
      setError('You must be logged in to submit feedback');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await submitFeedback(
        auth.currentUser.uid,
        auth.currentUser.email || '',
        rating,
        comment,
        type
      );
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto text-center space-y-6 py-12"
      >
        <div className="inline-flex p-4 bg-earth-100 text-earth-600 rounded-full">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-earth-900">Thank You!</h2>
        <p className="text-earth-600">
          Your {type} has been received. We appreciate your input to help make BHOOMI better.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="btn-organic"
        >
          Send More Feedback
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-earth-900">Feedback & Support</h2>
        <p className="text-earth-600">
          Have a complaint or a suggestion? We'd love to hear from you.
        </p>
      </div>

      <div className="card-organic space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-earth-700">What would you like to do?</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setType('feedback')}
                className={`flex-1 p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  type === 'feedback' 
                    ? 'border-earth-600 bg-earth-50 text-earth-600' 
                    : 'border-earth-100 text-earth-400 hover:border-earth-200'
                }`}
              >
                <MessageSquare size={18} />
                Give Feedback
              </button>
              <button
                type="button"
                onClick={() => setType('complaint')}
                className={`flex-1 p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  type === 'complaint' 
                    ? 'border-red-600 bg-red-50 text-red-600' 
                    : 'border-earth-100 text-earth-400 hover:border-earth-200'
                }`}
              >
                <AlertCircle size={18} />
                File Complaint
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-earth-700">Rate your experience</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-2 transition-all ${rating >= star ? 'text-yellow-500 scale-110' : 'text-earth-200 hover:text-earth-300'}`}
                >
                  <Star size={32} fill={rating >= star ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-earth-700">
              {type === 'feedback' ? 'Your suggestions' : 'Describe the issue'}
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={type === 'feedback' ? "How can we improve?" : "What went wrong?"}
              className="w-full p-4 rounded-xl border border-earth-200 bg-earth-50 focus:outline-none focus:ring-2 focus:ring-earth-600 min-h-[120px]"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-organic flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Send size={20} />
                Submit {type === 'feedback' ? 'Feedback' : 'Complaint'}
              </>
            )}
          </button>
        </form>

        <div className="pt-6 border-t border-earth-100 text-center">
          <p className="text-sm text-earth-500 mb-4">Or contact us directly via email:</p>
          <a 
            href="mailto:gagankaushik028@gmail.com" 
            className="inline-flex items-center gap-2 text-earth-600 font-semibold hover:underline"
          >
            <Mail size={18} />
            gagankaushik028@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};
