import React, { useState } from 'react';
import { ShieldCheck, UserX, UserCheck, Trash2, PhoneCall, Plus, X, Layers } from 'lucide-react';
import InfoTooltip from './InfoTooltip';

export default function AdminPanel({
  listings,
  users,
  onToggleSuspendUser,
  onForceDeleteListing,
  onToggleRerouteChat,
  bannedKeywords,
  onAddBannedKeyword,
  onRemoveBannedKeyword
}) {
  const [activeTab, setActiveTab] = useState('moderation');
  const [keywordInput, setKeywordInput] = useState('');
  const [filterReroutedOnly, setFilterReroutedOnly] = useState(false);

  const handleAddKeyword = (e) => {
    e.preventDefault();
    if (!keywordInput.trim()) return;
    onAddBannedKeyword(keywordInput.trim());
    setKeywordInput('');
  };

  const filteredListings = filterReroutedOnly
    ? listings.filter(l => l.reroutedToAdmin || l.isCartSell)
    : listings;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in">
      
      {/* Admin Panel Header Banner */}
      <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-xs font-extrabold bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/40 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Moderator Access
              </span>
              <InfoTooltip text="Secure backend moderator dashboard for IISER Mohali campus logistics & moderation." position="bottom" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Admin & Logistics Control
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage user suspensions, content moderation, automated banned keywords, and June-August room handoffs.
            </p>
          </div>

          {/* Admin Navigation Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('moderation')}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                activeTab === 'moderation'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Feed Moderation ({listings.length})
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                activeTab === 'users'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              User Control ({users.length})
            </button>

            <button
              onClick={() => setActiveTab('keywords')}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                activeTab === 'keywords'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Banned Keywords ({bannedKeywords.length})
            </button>
          </div>
        </div>
      </div>

      {/* 1. MASTER FEED MODERATION & CHAT REROUTE */}
      {activeTab === 'moderation' && (
        <div className="space-y-4">
          <div className="bg-white/90 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white">Filter:</span>
              <button
                onClick={() => setFilterReroutedOnly(false)}
                className={`px-2.5 py-1 rounded-lg border ${!filterReroutedOnly ? 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800'}`}
              >
                All Listings ({listings.length})
              </button>
              <button
                onClick={() => setFilterReroutedOnly(true)}
                className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 ${filterReroutedOnly ? 'bg-purple-100 dark:bg-purple-900/60 border-purple-400 text-purple-800 dark:text-purple-200 font-bold' : 'text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800'}`}
              >
                <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                Cart Sell & Rerouted Only
              </button>
            </div>
            <InfoTooltip text="June-August Bridge: Rerouting chat swaps the seller's WhatsApp number to Admin Support so student admins can sell graduating senior room bundles to incoming first-years." position="top" />
          </div>

          <div className="space-y-3">
            {filteredListings.map((item) => (
              <div
                key={item.id}
                className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-purple-400 dark:hover:border-purple-500/30 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 shrink-0 border border-slate-200 dark:border-slate-800">
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">by {item.sellerEmail}</span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm mt-0.5">{item.title}</h4>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-black">₹{item.price.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {item.isCartSell && (
                    <div className="flex items-center">
                      <button
                        onClick={() => onToggleRerouteChat(item.id)}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                          item.reroutedToAdmin
                            ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-purple-400'
                        }`}
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{item.reroutedToAdmin ? 'Chat Rerouted to Admin' : 'Reroute Chat (June Bridge)'}</span>
                      </button>
                      <InfoTooltip text="Reroutes embedded WhatsApp number to Admin Support (+919999888877). Perfect for graduating seniors leaving room essentials over summer break." position="top" />
                    </div>
                  )}

                  <div className="flex items-center">
                    <button
                      onClick={() => onForceDeleteListing(item.id)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-300 dark:border-rose-500/40 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Force Delete</span>
                    </button>
                    <InfoTooltip text="Instantly purge item from public feed for policy violations." position="top" />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. USER CONTROL & SUSPENSION */}
      {activeTab === 'users' && (
        <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Registered Student Accounts</h3>
            <InfoTooltip text="One-click suspend toggle blocks spammers from creating listings or sending messages." position="left" />
          </div>

          <div className="space-y-2">
            {users.map((usr) => (
              <div
                key={usr.email}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
              >
                <div>
                  <div className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span>{usr.name || 'IISER Student'}</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">({usr.email})</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    WhatsApp: {usr.whatsapp || 'Not configured'}
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => onToggleSuspendUser(usr.email)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                      usr.isSuspended
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-100 hover:text-rose-700 dark:hover:bg-rose-950 dark:hover:text-rose-300 border border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {usr.isSuspended ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                    <span>{usr.isSuspended ? 'Suspended (Click to Unsuspend)' : 'Active (Suspend User)'}</span>
                  </button>
                  <InfoTooltip text="Blocks user from uploading new items or initiating chats." position="left" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. BANNED KEYWORDS MANAGEMENT */}
      {activeTab === 'keywords' && (
        <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Automated Banned Keywords</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Listings containing these restricted terms will automatically block upload.</p>
            </div>
            <InfoTooltip text="Banned keywords scanner runs client-side prior to listing publishing." position="left" />
          </div>

          <form onSubmit={handleAddKeyword} className="flex gap-2">
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="Enter new prohibited term (e.g. vape, exam paper)..."
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Keyword
            </button>
          </form>

          <div className="flex flex-wrap gap-2 pt-2">
            {bannedKeywords.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-slate-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30 text-xs font-mono font-bold flex items-center gap-2"
              >
                <span>{kw}</span>
                <button
                  onClick={() => onRemoveBannedKeyword(kw)}
                  className="hover:text-rose-900 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
