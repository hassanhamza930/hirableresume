'use client';

import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { AffiliateData } from '../interfaces/affiliate';

/**
 * Gets affiliate data by ID
 * @param affiliateId The affiliate's ID
 * @returns The affiliate data or null if not found
 */
export const getAffiliateById = async (affiliateId: string): Promise<AffiliateData | null> => {
  try {
    const db = getFirestore();
    const affiliateRef = doc(db, 'affiliates', affiliateId);
    const affiliateSnap = await getDoc(affiliateRef);
    
    if (!affiliateSnap.exists()) {
      return null;
    }
    
    return {
      id: affiliateSnap.id,
      ...affiliateSnap.data()
    } as AffiliateData;
  } catch (error) {
    console.error('Error fetching affiliate data:', error);
    return null;
  }
};

/**
 * Gets affiliate data by email
 * @param email The affiliate's email
 * @returns The affiliate data or null if not found
 */
export const getAffiliateByEmail = async (email: string): Promise<AffiliateData | null> => {
  try {
    const db = getFirestore();
    const affiliatesRef = collection(db, 'affiliates');
    const affiliateQuery = query(affiliatesRef, where('email', '==', email));
    const affiliateSnapshot = await getDocs(affiliateQuery);
    
    if (affiliateSnapshot.empty) {
      return null;
    }
    
    const affiliateDoc = affiliateSnapshot.docs[0];
    return {
      id: affiliateDoc.id,
      ...affiliateDoc.data()
    } as AffiliateData;
  } catch (error) {
    console.error('Error fetching affiliate data by email:', error);
    return null;
  }
};

/**
 * Gets affiliate data by referral code
 * @param referralCode The affiliate's referral code
 * @returns The affiliate data or null if not found
 */
export const getAffiliateByReferralCode = async (referralCode: string): Promise<AffiliateData | null> => {
  try {
    const db = getFirestore();
    const affiliatesRef = collection(db, 'affiliates');
    const affiliateQuery = query(affiliatesRef, where('referralCode', '==', referralCode));
    const affiliateSnapshot = await getDocs(affiliateQuery);
    
    if (affiliateSnapshot.empty) {
      return null;
    }
    
    const affiliateDoc = affiliateSnapshot.docs[0];
    return {
      id: affiliateDoc.id,
      ...affiliateDoc.data()
    } as AffiliateData;
  } catch (error) {
    console.error('Error fetching affiliate data by referral code:', error);
    return null;
  }
};

/**
 * Checks if a referral code is valid
 * @param referralCode The referral code to check
 * @returns True if the code is valid, false otherwise
 */
export const isValidReferralCode = async (referralCode: string): Promise<boolean> => {
  const affiliate = await getAffiliateByReferralCode(referralCode);
  return affiliate !== null;
};

/**
 * Tracks a page view for an affiliate
 * @param referralCode The affiliate's referral code
 */
export const trackAffiliateView = async (referralCode: string): Promise<void> => {
  try {
    const db = getFirestore();
    
    // Find the affiliate with this referral code
    const affiliatesRef = collection(db, 'affiliates');
    const affiliateQuery = query(affiliatesRef, where('referralCode', '==', referralCode));
    const affiliateSnapshot = await getDocs(affiliateQuery);
    
    if (!affiliateSnapshot.empty) {
      const affiliateDoc = affiliateSnapshot.docs[0];
      
      // Increment the views count
      await updateDoc(doc(db, 'affiliates', affiliateDoc.id), {
        'stats.views': increment(1)
      });
    }
  } catch (error) {
    console.error('Error tracking affiliate view:', error);
  }
};

/**
 * Tracks a signup for an affiliate
 * @param referralCode The affiliate's referral code
 */
export const trackAffiliateSignup = async (referralCode: string): Promise<void> => {
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

/**
 * Tracks a purchase for an affiliate
 * @param referralCode The affiliate's referral code
 */
export const trackAffiliatePurchase = async (referralCode: string): Promise<void> => {
  try {
    const db = getFirestore();
    
    // Find the affiliate with this referral code
    const affiliatesRef = collection(db, 'affiliates');
    const affiliateQuery = query(affiliatesRef, where('referralCode', '==', referralCode));
    const affiliateSnapshot = await getDocs(affiliateQuery);
    
    if (!affiliateSnapshot.empty) {
      const affiliateDoc = affiliateSnapshot.docs[0];
      
      // Increment the purchases count
      await updateDoc(doc(db, 'affiliates', affiliateDoc.id), {
        'stats.purchases': increment(1)
      });
    }
  } catch (error) {
    console.error('Error tracking affiliate purchase:', error);
  }
};
