'use client';

import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnimatePresence, motion } from "motion/react";
import { useUserStore } from '../../store/userStore';
import { useResumeStore } from '../../store/resumeStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NavOption = ({
  children,
  className,
  onClick
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return <button onClick={onClick} className={`transition-all duration-200 hover:text-white/90 hover:underline cursor-pointer w-max ${className || ''}`}>{children}</button>;
};

interface HomeNavbarProps {
  onBackToResumeList?: () => void;
  showMobileResumeList?: boolean;
}

const HomeNavbar: React.FC<HomeNavbarProps> = ({ onBackToResumeList, showMobileResumeList = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { userData } = useUserStore();
  const { selectedResumeId } = useResumeStore();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  // Check if we're on a page other than the main home page
  const isNotHomePage = pathname !== '/home';

  // Check if user is on profile page and not onboarded yet
  const isProfilePageNotOnboarded = pathname === '/home/profile' && userData?.onboarded !== true;

  // Check if we're on the home page and a resume is selected on mobile
  const showBackToResumesButton = isMobile && pathname === '/home' && selectedResumeId !== null && !showMobileResumeList && onBackToResumeList;

  // Get user credits from the Zustand store
  const userCredits = userData?.credits ?? null;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      toast.success('Signed out successfully');
      router.push('/');
    } else {
      toast.error('Failed to sign out');
    }
  };

  // Get user's initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.displayName) return 'U';
    return user.displayName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav
      style={{ fontFamily: "Geist Mono" }}
      className="fixed z-20 top-0 left-0 right-0 flex items-center justify-between shadow-sm shadow-white/5 md:shadow-white/10 px-4 sm:px-10 py-2 text-sm font-medium text-white bg-white/5 md:border-b-[1px] border-white/20 transition-all duration-300 backdrop-blur-xl backdrop-brightness-50"
    >
      {/* Logo and back buttons */}
      <div className="flex items-center gap-2">
        {isNotHomePage && !isProfilePageNotOnboarded && (
          <Link
            href="/home"
            className="text-white/70 hover:text-white transition-all duration-300 mr-4"
          >
            ← Back to home
          </Link>
        )}
        {showBackToResumesButton && (
          <button
            onClick={onBackToResumeList}
            className="text-white/70 hover:text-white transition-all duration-300 mr-4"
          >
            ← Back to resumes
          </button>
        )}
      </div>

      {/* Mobile menu button */}
      <button
        className="sm:hidden text-white p-2"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Desktop navigation */}
      <div className="hidden sm:flex items-center justify-center gap-x-4">
        {/* Credits display - clickable */}
        <div
          onClick={() => router.push('/home/billing')}
          className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-md hover:bg-white/20 cursor-pointer transition-all duration-200"
        >
          <span className="text-white font-medium">Credits:</span>
          <span className="text-white font-bold">{userCredits !== null ? userCredits : '...'}</span>
        </div>

        {/* User profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex items-center gap-2 hover:bg-white/10 px-3 py-1 rounded-md transition-all duration-200">
              <Avatar className="h-8 w-8 border border-white/20">
                {user?.photoURL ? (
                  <AvatarImage src={user.photoURL} alt={user?.displayName || 'User'} />
                ) : null}
                <AvatarFallback className="bg-blue-600 text-white">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block">{user?.displayName || 'User'}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border border-white/20 text-white">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.displayName || 'User'}</p>
                <p className="text-xs text-white/70 truncate">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/20" />
            <DropdownMenuItem
              className="cursor-pointer hover:bg-white/10 focus:bg-white/10"
              onClick={() => router.push('/home/profile')}
            >
              <FiUser className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-white/10 focus:bg-white/10"
              onClick={() => toast.info('Account settings coming soon!')}
            >
              <FiSettings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/20" />
            <DropdownMenuItem
              className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-white/10 focus:bg-white/10"
              onClick={handleSignOut}
            >
              <FiLogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AnimatePresence>
        {/* Mobile navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed z-30 top-full left-0 right-0 flex flex-col justify-center items-start gap-y-4 py-4 px-10 text-black bg-gray-200 shdaow-xl shadow-white backdrop-blur-3xl border border-t-0 border-white/50 rounded-b-xl sm:hidden">
            {/* Back to home option - only shown when not on home page and not on profile page when not onboarded */}
            {isNotHomePage && !isProfilePageNotOnboarded && (
              <NavOption
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push('/home');
                }}
              >
                ← Back to home
              </NavOption>
            )}

            {/* Back to resumes button removed from mobile menu */}

            {/* Credits display in mobile menu - clickable */}
            <div
              onClick={() => {
                setIsMenuOpen(false);
                router.push('/home/billing');
              }}
              className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-md mb-2 hover:bg-white/20 cursor-pointer transition-all duration-200"
            >
              <span className="text-black font-medium">Credits:</span>
              <span className="text-black font-bold">{userCredits !== null ? userCredits : '...'}</span>
            </div>

            {/* Profile option */}
            <NavOption
              onClick={() => {
                setIsMenuOpen(false);
                router.push('/home/profile');
              }}
            >
              <FiUser className="mr-2 h-4 w-4 inline" />
              Profile
            </NavOption>

            {/* Sign out option */}
            <NavOption
              className="text-red-400 hover:text-red-300"
              onClick={() => {
                setIsMenuOpen(false);
                handleSignOut();
              }}
            >
              <FiLogOut className="mr-2 h-4 w-4 inline" />
              Sign Out
            </NavOption>


            {/* User info in mobile menu */}
            <div className="w-full border-t border-white/10 mt-5 flex flex-col items-start justify-start">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-8 w-8 border border-white/20">
                  {user?.photoURL ? (
                    <AvatarImage src={user.photoURL} alt={user?.displayName || 'User'} />
                  ) : null}
                  <AvatarFallback className="bg-blue-600 text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm">{user?.displayName || 'User'}</span>
                  <span className="text-xs opacity-70 truncate max-w-[200px]">{user?.email}</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default HomeNavbar;
