'use client';

import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { UserData } from '../interfaces';

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

    // Update user's credits with plan credits and set the plan
    await updateDoc(userRef, {
      credits: (userData.credits || 0) + planDetails.credits,
      plan: planType
    });

    toast.success(`${planDetails.planName} plan (${planDetails.credits} credits) added to your account!`);
    return true;
  } catch (error) {
    console.error(`Error adding ${planType} plan:`, error);
    toast.error(`Failed to add ${planType} plan. Please try again.`);
    return false;
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
