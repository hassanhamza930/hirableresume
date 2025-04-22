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
import { getFirestore, doc, setDoc, getDoc, updateDoc, serverTimestamp, collection, query, where, getDocs, increment } from 'firebase/firestore';
import { UserData } from '../interfaces';
import { toast } from 'sonner';
import { useUserStore } from '../store/userStore';
import { firebaseConfig } from '../config/firebase';

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

  // Track affiliate signup - increment the signups count for the affiliate
  const trackAffiliateSignup = async (referralCode: string) => {
    try {
      const db = getFirestore();

      // Find the affiliate with this referral code
      const affiliatesRef = collection(db, 'affiliates');
      const affiliateQuery = query(affiliatesRef, where('referralCode', '==', referralCode));
      const affiliateSnapshot = await getDocs(affiliateQuery);

      if (!affiliateSnapshot.empty) {
        const affiliateDoc = affiliateSnapshot.docs[0];

        // Increment the signups count
        await updateDoc(doc(db, 'affiliates', affiliateDoc.id), {
          'stats.signups': increment(1)
        });
      }
    } catch (error) {
      console.error('Error tracking affiliate signup:', error);
    }
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
          plan: 'free',
          credits: 5,
          onboarded: false // New users need to complete onboarding
        };

        // Check if there's a referral code in localStorage
        const refid = typeof window !== 'undefined' ? localStorage.getItem('refid') : null;

        if (refid) {
          // Add referral information to the user document
          userData.referral = {
            referralCode: refid,
            referredAt: serverTimestamp() as unknown as Date,
            converted: false
          };

          // Track the signup in the affiliate's document
          await trackAffiliateSignup(refid);
        }

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

  // Function to get user data from Firestore or Zustand store
  const getUserData = async (): Promise<Partial<UserData> | null> => {
    if (!user) return null;

    // First check if we have data in the Zustand store
    const { userData, isLoading } = useUserStore.getState();

    // If we have data in the store and it's not loading, return it
    if (userData && !isLoading) {
      return userData;
    }

    // Otherwise, fetch from Firestore (this is a fallback and should rarely be needed)
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as Partial<UserData>;
        // Update the store with the fetched data
        useUserStore.getState().setUserData(data);
        return data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // Function to update user data in Firestore
  const updateUserData = async (data: Partial<UserData>): Promise<boolean> => {
    if (!user) return false;

    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, data);

      // No need to update the store as the onSnapshot listener will do that
      return true;
    } catch (error) {
      console.error('Error updating user data:', error);
      toast.error('Failed to update user data');
      return false;
    }
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signOut,
    isAuthenticated,
    getUserData,
    updateUserData
  };
}