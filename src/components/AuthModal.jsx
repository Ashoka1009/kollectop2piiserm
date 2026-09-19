import React, { useState } from 'react';
import { X, Mail, Phone, Lock, Sparkles, ArrowRight, ShieldCheck, User, Loader2 } from 'lucide-react';
import InfoTooltip from './InfoTooltip';
import { signUpUser, signInUser } from '../supabase';
import { isUserAdmin } from '../data/mockData';

export default function AuthModal({ currentUser, onSaveProfile, onClose }) {
  const [email, setEmail] = useState(currentUser?.email || '');
  const [name, setName] = useState(currentUser?.name || '');
  const [whatsapp, setWhatsapp] = useState(currentUser?.whatsapp || '+917988860162');
  const [password, setPassword] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const selectDemoPersona = (persona) => {
    if (persona === 'student') {
      setEmail('alex.m22@iisermohali.ac.in');
      setName('Alex Mehta (BS-MS 2022)');
      setWhatsapp('+919812345678');
    } else if (persona === 'senior') {
      setEmail('sarah.b20@iisermohali.ac.in');
      setName('Sarah Sharma (Graduating Senior)');
      setWhatsapp('+919876543210');
    } else if (persona === 'admin') {
      setEmail('ms25237@iisermohali.ac.in');
      setName('divanshu(admin)');
      setWhatsapp('+917988860162');
      setPassword('Divanshu#057');
    }
    setErrorMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = isUserAdmin(cleanEmail);


    if (!isAdmin && !cleanEmail.endsWith('@iisermohali.ac.in')) {
      setErrorMsg('Login restricted! Student accounts must use an official @iisermohali.ac.in Google Workspace email address.');
      return;
    }

    if (!whatsapp.trim() || whatsapp.trim().length < 10) {
      setErrorMsg('Please enter a valid WhatsApp phone number (with country code, e.g. +91 9876543210).');
      return;
    }

    setIsAuthLoading(true);

    // Try Supabase Auth if password is provided
    if (password.trim()) {
      try {
        await signInUser(cleanEmail, password);
      } catch (signInErr) {
        // If sign in fails, attempt sign up automatically
        try {
          await signUpUser(cleanEmail, password, name.trim() || cleanEmail.split('@')[0], whatsapp.trim());
        } catch (signUpErr) {
          console.warn("Supabase Auth notice:", signUpErr.message);
        }
      }
    }

    setIsAuthLoading(false);

    onSaveProfile({
      email: cleanEmail,
      name: name.trim() || cleanEmail.split('@')[0],
      whatsapp: whatsapp.trim(),
      isAdmin
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in">
      <div className="glass-modal rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/10 shadow-sm">
              <img src="/logo.jpg" alt="KollectoP2P" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-1">
                <span>KollectoP2P Login Gateway</span>
                <InfoTooltip text="Students strictly require @iisermohali.ac.in. Admins can enter without domain restriction." position="bottom" />
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">IISER Mohali Campus Peer-to-Peer Marketplace</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-white/40 dark:hover:bg-slate-800/40">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 glass-badge border-rose-500/30 rounded-2xl text-rose-700 dark:text-rose-300 text-xs font-semibold leading-relaxed">
            {errorMsg}
          </div>
        )}

        {/* Quick Demo Switcher Buttons */}
        <div className="mb-5 glass-badge p-3 rounded-2xl space-y-2">
          <div className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Quick Select Demo Account:</span>
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            <button
              type="button"
              onClick={() => selectDemoPersona('student')}
              className="w-full text-left p-2.5 rounded-xl glass-badge hover:bg-white/80 dark:hover:bg-slate-800/80 text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between transition-all"
            >
              <span>Alex Mehta <span className="text-slate-500 dark:text-slate-400 font-mono font-bold">(alex.m22@iisermohali.ac.in)</span></span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => selectDemoPersona('senior')}
              className="w-full text-left p-2.5 rounded-xl glass-badge hover:bg-white/80 dark:hover:bg-slate-800/80 text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between transition-all"
            >
              <span>Sarah Sharma <span className="text-slate-500 dark:text-slate-400 font-mono font-bold">(sarah.b20@iisermohali.ac.in)</span></span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => selectDemoPersona('admin')}
              className="w-full text-left p-2.5 rounded-xl glass-badge hover:bg-white/80 dark:hover:bg-slate-800/80 text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between transition-all"
            >
              <span>Divanshu (Admin) <span className="text-slate-500 dark:text-slate-400 font-mono font-bold">(ms25237@iisermohali.ac.in)</span></span>
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Email Input */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" style={{color:'var(--apple-blue)'}} />
              <span>Institute Email Address *</span>
              <InfoTooltip text="Must end with @iisermohali.ac.in unless logging in as Admin." position="right" />
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. username@iisermohali.ac.in"
              className="glass-input w-full rounded-xl p-2.5 text-xs placeholder-slate-400"
              required
            />
          </div>

          {/* Full Name Input */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5" style={{color:'var(--apple-blue)'}} />
              <span>Display Name</span>
              <InfoTooltip text="Displayed on your active item listings." position="right" />
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Mehta"
              className="glass-input w-full rounded-xl p-2.5 text-xs placeholder-slate-400"
            />
          </div>

          {/* WhatsApp Phone Number */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" style={{color:'var(--apple-blue)'}} />
              <span>WhatsApp Number (Required) *</span>
              <InfoTooltip text="The only required profile field. Used strictly to route buyer clicks off-platform to your WhatsApp." position="right" />
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="e.g. +91 9876543210"
              className="glass-input w-full rounded-xl p-2.5 text-xs font-mono placeholder-slate-400"
              required
            />
          </div>

          {/* Password (Optional for Supabase Auth) */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" style={{color:'var(--apple-blue)'}} />
              <span>Password (Optional for Supabase Auth)</span>
              <InfoTooltip text="Enter a password to register or authenticate your account with Supabase Auth." position="right" />
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (min. 6 characters)"
              className="glass-input w-full rounded-xl p-2.5 text-xs placeholder-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={isAuthLoading}
            className="btn-primary w-full py-3 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isAuthLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-current" />
                <span>Connecting to Supabase...</span>
              </>
            ) : (
              <span>Authenticate & Proceed to KollectoP2P</span>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
