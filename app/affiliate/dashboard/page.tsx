"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { AffiliateData } from '@/app/interfaces/affiliate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { Copy, LogOut } from 'lucide-react';
import { useAffiliateAuth } from '@/app/hooks/useAffiliateAuth';
import AffiliateWrapper from '../components/AffiliateWrapper';

export default function AffiliateDashboardPage() {
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const router = useRouter();
  const { affiliate, signOut: affiliateSignOut } = useAffiliateAuth();

  const handleSignOut = async () => {
    const result = await affiliateSignOut();
    if (result.success) {
      router.push('/affiliate');
      toast.success('Signed out successfully');
    }
  };

  const generateReferralCode = async () => {
    if (!affiliate?.id) return;

    setIsGeneratingCode(true);

    try {
      // Generate a unique code
      const code = uuidv4().substring(0, 8);

      // Create the full referral link
      const baseUrl = window.location.origin;
      const referralLink = `${baseUrl}/start?refid=${code}`;

      // Update the affiliate document
      const db = getFirestore();
      const affiliateRef = doc(db, 'affiliates', affiliate.id);

      await updateDoc(affiliateRef, {
        referralCode: code,
        referralLink: referralLink
      });

      // Update local state - we don't need to manually update the state
      // The onSnapshot listener in useAffiliateAuth will update it automatically

      toast.success('Referral code generated successfully');
    } catch (error) {
      console.error('Error generating referral code:', error);
      toast.error('Failed to generate referral code');
    } finally {
      setIsGeneratingCode(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <AffiliateWrapper>
    <div className="w-full min-h-screen flex flex-col px-[5%] md:px-[10%] pt-24 md:pt-32 pb-36 bg-black">
      {/* Header with sign out button */}
      <div className="w-full flex justify-between items-center mb-8">
        <h1
          style={{ fontFamily: "Special Gothic Expanded One" }}
          className="text-2xl md:text-4xl text-white"
        >
          Affiliate Dashboard
        </h1>

        <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2 text-white">
          <LogOut className="h-4 w-4 text-white" />
          Sign Out
        </Button>
      </div>

      {/* Welcome message */}
      <p
        style={{ fontFamily: "Geist Mono" }}
        className="text-sm md:text-md font-normal text-white mb-8"
      >
        Welcome back, {affiliate?.name || affiliate?.email}
      </p>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8 bg-white/10">
          <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">Overview</TabsTrigger>
          <TabsTrigger value="referrals" className="text-white data-[state=active]:bg-white/20">Referral Link</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats cards */}
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Page Views</CardTitle>
                <CardDescription className="text-white/70">Total link clicks</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-white">{affiliate?.stats?.views || 0}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Signups</CardTitle>
                <CardDescription className="text-white/70">Users who created an account</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-white">{affiliate?.stats?.signups || 0}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Purchases</CardTitle>
                <CardDescription className="text-white/70">Users who purchased a plan</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-white">{affiliate?.stats?.purchases || 0}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="referrals">
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Your Referral Link</CardTitle>
              <CardDescription className="text-white/70">Share this link to earn commissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {affiliate?.referralLink ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">Referral Code</label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={affiliate.referralCode}
                        readOnly
                        className="bg-white/10 text-white"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(affiliate.referralCode!)}
                        className="text-white border-white/20 hover:bg-white/10"
                      >
                        <Copy className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-white/70">Referral Link</label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={affiliate.referralLink}
                        readOnly
                        className="bg-white/10 text-white"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(affiliate.referralLink!)}
                        className="text-white border-white/20 hover:bg-white/10"
                      >
                        <Copy className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-white mb-4">You haven't generated a referral code yet.</p>
                  <Button
                    onClick={generateReferralCode}
                    disabled={isGeneratingCode}
                    className=""
                  >
                    {isGeneratingCode ? 'Generating...' : 'Generate Referral Code'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </AffiliateWrapper>
  );
}
