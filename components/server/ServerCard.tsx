import { ReactNode } from "react";

interface ServerCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string; // Included for API compatibility but not used
}

export function ServerCard({
  children,
  className = "",
}: ServerCardProps) {
  return (
    <div className={`relative border border-white/10 bg-zinc-950/50 backdrop-blur-xl rounded-md w-full h-full ${className}`}>
      {children}
    </div>
  );
}

export default ServerCard;
