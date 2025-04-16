'use client';

import { useState, useEffect } from 'react';
import {
  getAuth,
  signInWithPopup,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { UserData } from '../interfaces';
import { toast } from 'sonner';

type AuthError = {
  code: string;
  message: string;
};

type AuthResult = {
  success: boolean;
  error?: AuthError;
  user?: User;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<ReturnType<typeof getAuth> | null>(null);
  const [provider, setProvider] = useState<GoogleAuthProvider | null>(null);

  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyDvcBIKyIsOY2mEptI1NNjoTqCVFRseXO4",
    authDomain: "chatapp-dda45.firebaseapp.com",
    databaseURL: "https://chatapp-dda45.firebaseio.com",
    projectId: "chatapp-dda45",
    storageBucket: "chatapp-dda45.firebasestorage.app",
    messagingSenderId: "912752217974",
    appId: "1:912752217974:web:33385b2084d62e7bf77457",
    measurementId: "G-3ZNFS8EW3H"
  };

  // Initialize Firebase Auth and Google Provider
  useEffect(() => {
    try {
      // Make sure Firebase is initialized
      if (typeof window !== 'undefined') {
        if (getApps().length === 0) {
          console.log('Firebase not initialized. Initializing now...');
          initializeApp(firebaseConfig);
        }

        const authInstance = getAuth();
        setAuth(authInstance);
        setProvider(new GoogleAuthProvider());
      }
    } catch (error) {
      console.error('Error initializing Firebase Auth:', error);
    }
  }, []);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);





  const createUserDocument = async (user: User, displayName: string | null = null) => {
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);

      // Check if the document exists first
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // Document doesn't exist, create a new one with all fields
        const userData: Partial<UserData> = {
          uid: user.uid,
          email: user.email || '',
          displayName: displayName || user.displayName,
          photoURL: user.photoURL,
          createdAt: serverTimestamp() as unknown as Date,
          lastLogin: serverTimestamp() as unknown as Date,
          resumes: [],
          plan: 'free'
        };

        await setDoc(userRef, userData);
      } else {
        // Document exists, only update specific fields
        // Don't overwrite resumes, plan, or other important data
        const updateData = {
          lastLogin: serverTimestamp(),
          // Update email, displayName and photoURL only if they've changed
          ...(user.email && { email: user.email }),
          ...(displayName && { displayName }),
          ...(user.displayName && !displayName && { displayName: user.displayName }),
          ...(user.photoURL && { photoURL: user.photoURL })
        };

        await updateDoc(userRef, updateData);
      }

      return true;
    } catch (error) {
      console.error('Error creating/updating user document:', error);
      toast.error('Failed to update user profile');
      return false;
    }
  };



  const signInWithGoogle = async (): Promise<AuthResult> => {
    try {
      if (!auth || !provider) {
        throw new Error('Firebase Auth or Google Provider not initialized');
      }

      const result = await signInWithPopup(auth, provider);
      localStorage.setItem('uid', result.user.uid);

      // Create or update user document in Firestore
      // This will preserve existing data and only update necessary fields
      await createUserDocument(result.user);

      return { success: true, user: result.user };
    } catch (error) {
      const authError = error as AuthError;
      return { success: false, error: authError };
    }
  };

  const signOut = async (): Promise<AuthResult> => {
    try {
      if (!auth) {
        // If auth is not initialized, just remove from localStorage
        localStorage.removeItem('uid');
        return { success: true };
      }

      await firebaseSignOut(auth);
      localStorage.removeItem('uid');
      return { success: true };
    } catch (error) {
      const authError = error as AuthError;
      return { success: false, error: authError };
    }
  };

  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('uid');
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signOut,
    isAuthenticated
  };
}