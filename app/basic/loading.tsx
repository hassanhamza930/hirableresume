export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <img
          src="/logo.png"
          alt="Hirable Resume Logo"
          className="w-32 h-32 animate-pulse"
          style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
        />
      </div>
    </div>
  );
}
