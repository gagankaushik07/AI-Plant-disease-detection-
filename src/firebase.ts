import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

export { signInWithPopup, signOut, onAuthStateChanged, doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp, query, where, getDocs, onSnapshot };
export type { User };

// Helper to get or create user profile
export async function getUserProfile(uid: string) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
}

export async function createUserProfile(user: User) {
  const userRef = doc(db, 'users', user.uid);
  const profile = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    createdAt: serverTimestamp(),
    videoUsage: {
      count: 0,
      lastReset: serverTimestamp()
    }
  };
  await setDoc(userRef, profile, { merge: true });
  return profile;
}

export async function submitFeedback(uid: string, email: string, rating: number, comment: string, type: 'feedback' | 'complaint') {
  await addDoc(collection(db, 'feedback'), {
    uid,
    userEmail: email,
    rating,
    comment,
    type,
    createdAt: serverTimestamp()
  });
}
