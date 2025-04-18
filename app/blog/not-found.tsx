import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogNotFound() {
  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 text-center">
      <h1 
        style={{ fontFamily: "Special Gothic Expanded One" }}
        className="text-3xl md:text-5xl font-bold text-white mb-6"
      >
        Page Not Found
      </h1>
      
      <p 
        style={{ fontFamily: "Geist Mono" }}
        className="text-white/70 text-md md:text-lg max-w-2xl mx-auto mb-10"
      >
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </main>
  );
}
