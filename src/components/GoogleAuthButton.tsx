import React, { useState } from 'react';

interface GoogleAuthButtonProps {
  role: 'donor' | 'patient' | 'pharmacy' | 'ngo' | 'admin';
  roleTitle: string;
  onGoogleSuccess: (email: string, name: string) => void;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  roleTitle,
  onGoogleSuccess,
}) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleGoogleSignIn = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onGoogleSuccess('bunny24005@gmail.com', 'Google User');
    }, 800);
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isAuthenticating}
        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-bold py-3 px-4 rounded-xl shadow-md border border-slate-200 transition-all text-xs sm:text-sm active:scale-[0.99] disabled:opacity-70"
      >
        {isAuthenticating ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            <span>Connecting to Google OAuth...</span>
          </div>
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.37 7.37 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.98 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.26 2.63 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google ({roleTitle})</span>
          </>
        )}
      </button>

      <div className="relative flex items-center justify-center my-3">
        <div className="border-t border-slate-800 w-full" />
        <span className="bg-slate-900 px-3 text-[10px] text-slate-500 uppercase tracking-wider font-bold shrink-0">
          Or sign in with Gmail address
        </span>
      </div>
    </div>
  );
};
