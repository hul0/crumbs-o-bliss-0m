import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative w-24 h-24 animate-pulse">
        <Image 
          src="/icon.png" 
          alt="Loading..." 
          fill
          className="object-contain drop-shadow-xl animate-spin-slow"
        />
      </div>
      <h2 className="mt-4 text-xl font-serif text-primary animate-bounce">
        Crumbs O' Bliss...
      </h2>
      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}