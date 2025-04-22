export interface AffiliateData {
  id: string;           // Unique identifier for the affiliate
  email: string;        // Affiliate's email address
  password: string;     // Hashed password (in a real app, you'd use proper auth)
  name?: string;        // Affiliate's name (optional)
  createdAt: Date;      // When the affiliate account was created
  lastLogin?: Date;     // Last login timestamp
  referralCode?: string; // Unique referral code for tracking
  referralLink?: string; // Full referral link
  
  // Analytics data
  stats?: {
    views: number;      // Number of page views through affiliate link
    signups: number;    // Number of signups through affiliate link
    purchases: number;  // Number of purchases through affiliate link
    
    // We could add more detailed analytics here in the future
    // For example, tracking by date, plan type, etc.
  };
}

// Interface for tracking referral data in user documents
export interface ReferralData {
  referralCode: string;  // The affiliate's referral code
  referredAt: Date;      // When the user was referred
  converted?: boolean;   // Whether the user has converted to a paid plan
  conversionDate?: Date; // When the user converted to a paid plan
}
