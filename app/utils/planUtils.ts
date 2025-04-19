'use client';

import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';

type PlanType = 'basic' | 'premium';

interface PlanDetails {
  credits: number;
  planName: string;
}

const PLAN_CREDITS: Record<PlanType, PlanDetails> = {
  basic: { credits: 30, planName: 'Basic' },
  premium: { credits: 150, planName: 'Premium' }
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
    
    const userData = userSnap.data();
    const planDetails = PLAN_CREDITS[planType];
    
    // Update user's credits with plan credits
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
