"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Playfair_Display, 
  Montserrat, 
  Great_Vibes, 
  Cinzel 
} from 'next/font/google';
import { ArrowLeft, ChefHat, Star } from 'lucide-react';

// --- Font Configuration ---
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'], variable: '--font-great-vibes' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });

export default function CustomizationPage() {
  return (
    <div className={`min-h-[80vh] flex flex-col items-center justify-center bg-background text-[var(--text)] relative overflow-hidden px-4
      ${playfair.variable} ${montserrat.variable} ${greatVibes.variable} ${cinzel.variable}`}>
      
      {/* Background Texture/Gradient */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
        
        {/* Icon / Brand Element */}
        <div className="relative">
          <div className="absolute -inset-4 bg-[#D4AF37]/20 blur-xl rounded-full"></div>
          <ChefHat className="w-20 h-20 text-[#2C241B] relative z-10 drop-shadow-lg" strokeWidth={1.5} />
          <Star className="w-6 h-6 text-[#D4AF37] absolute -top-2 -right-2" fill="currentColor" />
        </div>

        {/* Headlines */}
        <div className="space-y-4">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-[#2C241B] tracking-tight">
            Coming Soon
          </h1>
          <p className="font-great-vibes text-3xl md:text-4xl text-[#D4AF37]">
            Something delicious is in the oven...
          </p>
        </div>

        {/* Description */}
        <p className="font-montserrat text-gray-600 text-sm md:text-base leading-relaxed max-w-lg">
          We are currently crafting a unique digital studio where you will be able to design your own 
          custom cakes and pizzas. We are putting the final touches on the ingredients to ensure 
          your experience is as delightful as our baking.
        </p>

        {/* Action Button */}
        <div className="pt-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#2C241B] text-white rounded-full overflow-hidden shadow-xl"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-cinzel font-bold tracking-widest text-sm">Return Home</span>
          </Link>
        </div>
      </div>

      {/* Footer Decorative Line */}
      <div className="absolute bottom-10 flex items-center gap-4 opacity-30">
        <div className="h-[1px] w-24 bg-[#2C241B]"></div>
        <div className="font-cinzel text-xs tracking-[0.2em] text-[#2C241B]">CRUMBS O' BLISS</div>
        <div className="h-[1px] w-24 bg-[#2C241B]"></div>
      </div>

    </div>
  );
}