import React, { useState } from 'react';
import { LogIn, LogOut, User as UserIcon, Loader2, Leaf } from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut, createUserProfile } from '../firebase';
import { motion } from 'motion/react';

export const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await createUserProfile(result.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-bold text-earth-900">{user.displayName}</span>
          <span className="text-xs text-earth-500">{user.email}</span>
        </div>
        <img 
          src={user.photoURL || ''} 
          alt={user.displayName || ''} 
          className="w-10 h-10 rounded-full border-2 border-earth-200"
        />
        <button 
          onClick={handleLogout}
          className="p-2 text-earth-400 hover:text-red-500 transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="btn-organic flex items-center gap-2"
    >
      {loading ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        <>
          <LogIn size={20} />
          Login with Google
        </>
      )}
    </button>
  );
};

export const LoginOverlay: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await createUserProfile(result.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-earth-900/40 backdrop-blur-xl flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl text-center space-y-8"
      >
        <div className="inline-flex p-5 bg-earth-600 text-white rounded-3xl shadow-xl shadow-earth-200">
          <Leaf size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-earth-900">Welcome to BHOOMI</h2>
          <p className="text-earth-600">
            Your personal AI farming companion. Please login to access expert advice and track your plant health.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 bg-earth-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-earth-700 transition-all shadow-lg shadow-earth-200 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <LogIn size={24} />
                Continue with Google
              </>
            )}
          </button>
          <p className="text-xs text-earth-400">
            By continuing, you agree to our terms and privacy policy.
          </p>
        </div>

        <div className="pt-6 border-t border-earth-100 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-earth-600 font-bold">Unlimited</div>
            <div className="text-[10px] text-earth-400 uppercase tracking-wider">Diagnosis</div>
          </div>
          <div className="text-center">
            <div className="text-earth-600 font-bold">Expert</div>
            <div className="text-[10px] text-earth-400 uppercase tracking-wider">Advisory</div>
          </div>
          <div className="text-center">
            <div className="text-earth-600 font-bold">Daily</div>
            <div className="text-[10px] text-earth-400 uppercase tracking-wider">AI Videos</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
