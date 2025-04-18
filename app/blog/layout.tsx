import Navbar from "@/components/Navbar";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative z-0 w-full flex flex-col justify-start items-center overflow-x-hidden pb-36">
      <Navbar/>
      {children}
    </div>
  );
}
