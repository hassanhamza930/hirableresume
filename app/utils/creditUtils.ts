import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { useUserStore } from '../store/userStore';

/**
 * Deducts credits from a user's account
 * @param userId The user's ID
 * @param amount The number of credits to deduct (default: 1)
 * @returns A promise that resolves to true if successful, false otherwise
 */
export const deductCredits = async (userId: string, amount: number = 1): Promise<boolean> => {
  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);
    
    // Get the current user data to check credits
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      console.error('User document not found');
      return false;
    }
    
    const userData = userSnap.data();
    const currentCredits = userData.credits || 0;
    
    // Check if user has enough credits
    if (currentCredits < amount) {
      return false;
    }
    
    // Deduct credits
    await updateDoc(userRef, {
      credits: currentCredits - amount
    });
    
    // The Firestore onSnapshot listener will update the Zustand store automatically
    return true;
  } catch (error) {
    console.error('Error deducting credits:', error);
    return false;
  }
};
