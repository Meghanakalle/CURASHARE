import React from 'react';
import logoImg from '../assets/images/curashare_logo_1786035662096.jpg';

interface CuraShareLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  className?: string;
  variant?: 'full' | 'icon-only' | 'light-text';
}

export const CuraShareLogo: React.FC<CuraShareLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  variant = 'full',
}) => {
  const sizeMap = {
    sm: { img: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { img: 'w-9 h-9', text: 'text-xl', sub: 'text-[10px]' },
    lg: { img: 'w-14 h-14', text: 'text-2xl', sub: 'text-xs' },
    xl: { img: 'w-24 h-24', text: 'text-4xl', sub: 'text-sm' },
    '2xl': { img: 'w-36 h-36', text: 'text-5xl', sub: 'text-base' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative group">
        {/* Glow backdrop behind logo */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-sm opacity-40 group-hover:opacity-75 transition duration-300" />
        <div className={`relative ${currentSize.img} rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 p-0.5 shrink-0 flex items-center justify-center shadow-lg`}>
          <img
            src={logoImg}
            alt="CuraShare Logo"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {showText && variant !== 'icon-only' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-0.5">
            <span className={`font-black tracking-tight ${currentSize.text} text-white`}>
              Cura<span className="text-cyan-400">Share</span>
            </span>
            <span className="text-emerald-400 font-bold ml-0.5 text-xs bg-emerald-950/80 border border-emerald-500/30 px-1 rounded">
              +
            </span>
          </div>
          <span className={`font-medium text-emerald-400 ${currentSize.sub} tracking-wide`}>
            Share today, Heal tomorrow.
          </span>
        </div>
      )}
    </div>
  );
};
