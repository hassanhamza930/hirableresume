'use client';

import { doc, getFirestore, updateDoc, getDoc, collection, query, where, getDocs, increment, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import { UserData } from '../interfaces';
import { ReferralData } from '../interfaces/affiliate';

type PlanType = 'basic' | 'premium';

interface PlanDetails {
  credits: number;
  planName: string;
  price: string;
  period: string;
}

const PLAN_CREDITS: Record<PlanType, PlanDetails> = {
  basic: {
    credits: 30,
    planName: 'Basic',
    price: '$7.99',
    period: 'monthly'
  },
  premium: {
    credits: 150,
    planName: 'Premium',
    price: '$19.99',
    period: 'monthly'
  }
};

/**
 * Gets plan details for a specific plan type
 * @param planType The plan type ('basic' or 'premium')
 * @returns PlanDetails object
 */
export const getPlanDetails = (planType: PlanType): PlanDetails => {
  return PLAN_CREDITS[planType];
};

/**
 * Adds credits to a user's account based on the plan type
 * @param uid User ID
 * @param planType The plan type ('basic' or 'premium')
 * @returns Promise<boolean> Success status
 */
export const addPlanCredits = async (uid: string, planType: PlanType): Promise<boolean> => {
  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);

    // Get current user data
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      toast.error('User account not found');
      return false;
    }

    const userData = userSnap.data() as UserData;
    const planDetails = PLAN_CREDITS[planType];

    // Check if this is a conversion from a referral
    const updateData: any = {
      credits: (userData.credits || 0) + planDetails.credits,
      plan: planType
    };

    // If the user has referral data and hasn't converted yet, mark as converted
    if (userData.referral && !userData.referral.converted) {
      updateData['referral.converted'] = true;
      updateData['referral.conversionDate'] = serverTimestamp();

      // Track the conversion in the affiliate's stats
      await trackAffiliatePurchase(userData.referral.referralCode);
    }

    // Update user's credits with plan credits and set the plan
    await updateDoc(userRef, updateData);

    toast.success(`${planDetails.planName} plan (${planDetails.credits} credits) added to your account!`);
    return true;
  } catch (error) {
    console.error(`Error adding ${planType} plan:`, error);
    toast.error(`Failed to add ${planType} plan. Please try again.`);
    return false;
  }
};

/**
 * Tracks a purchase conversion for an affiliate
 * @param referralCode The affiliate's referral code
 */
const trackAffiliatePurchase = async (referralCode: string): Promise<void> => {
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

/**
 * Checks if a user has an active subscription plan
 * @param userData User data object
 * @returns boolean indicating if user has an active plan
 */
export const hasActivePlan = (userData: Partial<UserData> | null): boolean => {
  if (!userData) return false;
  return userData.plan === 'basic' || userData.plan === 'premium';
};

/**
 * Gets the current plan type from user data
 * @param userData User data object
 * @returns The current plan type or null if no active plan
 */
export const getCurrentPlan = (userData: Partial<UserData> | null): PlanType | null => {
  if (!userData) return null;
  if (userData.plan === 'basic' || userData.plan === 'premium') {
    return userData.plan;
  }
  return null;
};
