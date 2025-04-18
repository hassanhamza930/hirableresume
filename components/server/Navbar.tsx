import Link from "next/link";
import { HiMenu } from "react-icons/hi";

const NavOption = ({
  children,
  className,
  href
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) => {
  if (href) {
    return (
      <Link href={href} className={`transition-all duration-200 hover:text-white/90 hover:underline cursor-pointer w-max ${className || ''}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`transition-all duration-200 hover:text-white/90 hover:underline cursor-pointer w-max ${className || ''}`}>
      {children}
    </button>
  );
};

export default function ServerNavbar() {
  return (
    <nav style={{fontFamily:"Geist Mono"}} className="fixed z-20 top-0 left-1/2 -translate-x-1/2 flex items-center justify-end md:justify-between shadow-md md:shadow-xl shadow-white/5 md:shadow-white/10 px-4 sm:px-10 pb-0 md:pb-3 pt-0 md:pt-2 text-sm font-medium text-white bg-white/5 md:border md:border-t-0 border-white/40 border-dashed transition-all duration-300 backdrop-blur-xl backdrop-brightness-50 rounded-none md:rounded-b-xl md:w-auto w-full">
      {/* Mobile menu button */}
      <button
        className="sm:hidden text-white p-2"
        aria-label="Open mobile menu"
        aria-expanded="false"
      >
        <HiMenu size={24} />
      </button>

      {/* Desktop navigation */}
      <ul className="hidden sm:flex items-center justify-center gap-x-10 list-none">
        <li><NavOption>Features</NavOption></li>
        <li><NavOption>Pricing</NavOption></li>
        <li><NavOption>Affiliate</NavOption></li>
        <li><Link href="/signin"><NavOption>Login</NavOption></Link></li>
      </ul>
    </nav>
  );
}
