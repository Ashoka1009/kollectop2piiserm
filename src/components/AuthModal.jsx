import React, { useState } from 'react';
import { X, Mail, Phone, Lock, Sparkles, ArrowRight, ShieldCheck, User } from 'lucide-react';
import InfoTooltip from './InfoTooltip';

export default function AuthModal({ currentUser, onSaveProfile, onClose }) {
  const [email, setEmail] = useState(currentUser?.email || '');
  const [name, setName] = useState(currentUser?.name || '');
  const [whatsapp, setWhatsapp] = useState(currentUser?.whatsapp || '+919876543210');
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
      setEmail('admin@marketplace.org');
      setName('Campus Admin Moderator');
      setWhatsapp('+919999888877');
    }
    setErrorMsg(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = cleanEmail.includes('admin');

    if (!isAdmin && !cleanEmail.endsWith('@iisermohali.ac.in')) {
      setErrorMsg('Login restricted! Student accounts must use an official @iisermohali.ac.in Google Workspace email address.');
      return;
    }

    if (!whatsapp.trim() || whatsapp.trim().length < 10) {
      setErrorMsg('Please enter a valid WhatsApp phone number (with country code, e.g. +91 9876543210).');
      return;
    }

    onSaveProfile({
      email: cleanEmail,
      name: name.trim() || cleanEmail.split('@')[0],
      whatsapp: whatsapp.trim(),
      isAdmin
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 dark:bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-emerald-500/40 shadow-sm">
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
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/90 border border-rose-200 dark:border-rose-500/40 rounded-xl text-rose-700 dark:text-rose-200 text-xs font-semibold leading-relaxed">
            {errorMsg}
          </div>
        )}

        {/* Quick Demo Switcher Buttons */}
        <div className="mb-5 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Quick Select Demo Account:</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            <button
              type="button"
              onClick={() => selectDemoPersona('student')}
              className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between transition-all"
            >
              <span>Alex Mehta <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">(alex.m22@iisermohali.ac.in)</span></span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => selectDemoPersona('senior')}
              className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between transition-all"
            >
              <span>Sarah Sharma <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">(sarah.b20@iisermohali.ac.in)</span></span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => selectDemoPersona('admin')}
              className="w-full text-left p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-500/30 text-xs text-purple-800 dark:text-purple-200 flex items-center justify-between transition-all"
            >
              <span>Campus Admin <span className="text-purple-600 dark:text-purple-300 font-mono font-bold">(admin@marketplace.org — No domain restriction)</span></span>
              <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Email Input */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-emerald-500" />
              <span>Institute Email Address *</span>
              <InfoTooltip text="Must end with @iisermohali.ac.in unless logging in as Admin." position="right" />
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. username@iisermohali.ac.in"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              required
            />
          </div>

          {/* Full Name Input */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-emerald-500" />
              <span>Display Name</span>
              <InfoTooltip text="Displayed on your active item listings." position="right" />
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Mehta"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* WhatsApp Phone Number */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>WhatsApp Number (Required) *</span>
              <InfoTooltip text="The only required profile field. Used strictly to route buyer clicks off-platform to your WhatsApp." position="right" />
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="e.g. +91 9876543210"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-98"
          >
            Authenticate & Proceed to KollectoP2P
          </button>

        </form>

      </div>
    </div>
  );
}
