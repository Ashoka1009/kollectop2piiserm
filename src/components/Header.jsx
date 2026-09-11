import React, { useState } from 'react';
import { PlusCircle, LayoutDashboard, ShieldCheck, User, LogOut, ChevronDown, Sparkles, Sun, Moon } from 'lucide-react';
import InfoTooltip from './InfoTooltip';

export default function Header({
  currentUser,
  onOpenUpload,
  onOpenDashboard,
  onOpenAdminPanel,
  onOpenAuth,
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode
}) {
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & KollectoP2P Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('feed')}>
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-md group-hover:scale-105 transition-all">
              <img src="/logo.jpg" alt="KollectoP2P Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  Kollecto<span className="text-emerald-500">P2P</span>
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full">
                  IISER Mohali
                </span>
                <InfoTooltip text="KollectoP2P: Campus-exclusive peer-to-peer bulletin board locked to @iisermohali.ac.in." position="bottom" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Zero-Friction Student Bulletin Board & Cart Bundles</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Dark Mode Toggle Button */}
            <div className="flex items-center">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all shadow-sm"
                title={darkMode ? 'Switch to Light Theme (White)' : 'Switch to Dark Theme'}
                aria-label="Toggle Theme"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>
              <InfoTooltip text="Switch between White Light Theme and Dark Mode." position="bottom" />
            </div>

            {/* Upload Button */}
            <div className="flex items-center">
              <button
                onClick={onOpenUpload}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-xl text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Upload Item</span>
              </button>
              <InfoTooltip text="Upload single items or multi-item hostel room clearout bundles with photos, pricing, and reference links." position="bottom" />
            </div>

            {/* Dashboard Button */}
            <div className="flex items-center">
              <button
                onClick={onOpenDashboard}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border-emerald-500/50 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-500" />
                <span className="hidden md:inline">My Dashboard</span>
              </button>
              <InfoTooltip text="Manage your active listings, extend 21-day timers, edit bundle items, or mark items as sold." position="bottom" />
            </div>

            {/* Admin Moderation Button */}
            <div className="flex items-center">
              <button
                onClick={onOpenAdminPanel}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
                  activeTab === 'admin'
                    ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-500/50'
                    : 'bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-purple-500" />
                <span className="hidden lg:inline">Admin Panel</span>
              </button>
              <InfoTooltip text="Moderator portal: Manage banned keywords, suspend spammers, force delete items, and Reroute Chat for graduating senior room clear-outs." position="bottom" />
            </div>

            {/* User Profile / Login Gateway */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-left transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden xl:block">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[120px]">{currentUser.name}</div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono truncate max-w-[120px]">{currentUser.email}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all"
                >
                  <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>Login Gateway</span>
                </button>
              )}

              {/* Persona Switcher Dropdown */}
              {showPersonaMenu && (
                <div className="absolute right-0 mt-2 w-64 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Signed in as</p>
                    <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 truncate">{currentUser?.email}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">WhatsApp: {currentUser?.whatsapp || 'Not set'}</p>
                  </div>

                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Quick Switch Persona</span>
                    <Sparkles className="w-3 h-3 text-amber-500" />
                  </div>

                  <button
                    onClick={() => {
                      onOpenAuth();
                      setShowPersonaMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-between"
                  >
                    <span>Switch / Edit Profile</span>
                    <User className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={() => {
                      setShowPersonaMenu(false);
                      onOpenAuth();
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors flex items-center justify-between mt-1 border-t border-slate-100 dark:border-slate-800/80"
                  >
                    <span>Log Out</span>
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
