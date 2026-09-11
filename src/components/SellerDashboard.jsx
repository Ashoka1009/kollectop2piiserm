import React from 'react';
import { Clock, RefreshCw, CheckCircle, Trash2, Layers, PlusCircle } from 'lucide-react';
import InfoTooltip from './InfoTooltip';

export default function SellerDashboard({
  userListings,
  onExtendTimer,
  onMarkAsSold,
  onDeleteListing,
  onOpenUpload,
  currentUser
}) {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in">
      
      {/* Dashboard Overview Banner */}
      <div className="bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full">
                Seller Command Center
              </span>
              <InfoTooltip text="Manage active items, extend 21-day timers, edit bundle items, or mark items as sold." position="bottom" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              My Active Listings
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Currently managing items listed under <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{currentUser?.email}</span>
            </p>
          </div>

          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload New Item</span>
          </button>
        </div>
      </div>

      {/* Seller Listings List */}
      {userListings.length === 0 ? (
        <div className="bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-500">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Active Listings Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            You haven't posted any items yet under your verified email. Click upload to create your first listing!
          </p>
          <button
            onClick={onOpenUpload}
            className="mt-4 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
          >
            Post First Item
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {userListings.map((item) => {
            const now = new Date();
            const expiresAt = new Date(item.expiresAt);
            const diffTime = expiresAt - now;
            const daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
            const isExpiringSoon = daysLeft <= 3;

            return (
              <div
                key={item.id}
                className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm"
              >
                
                {/* Item Thumbnail & Information */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 shrink-0 border border-slate-200 dark:border-slate-800">
                    <img
                      src={item.images[item.thumbnailIndex || 0] || item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700">
                        {item.category}
                      </span>
                      {item.isCartSell && (
                        <span className="px-2 py-0.5 text-[10px] font-extrabold bg-teal-50 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30 rounded flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          Cart Sell ({item.subItems?.length || 0} sub-items)
                        </span>
                      )}
                    </div>

                    <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm sm:text-base line-clamp-1">
                      {item.title}
                    </h4>

                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">₹{item.price.toLocaleString('en-IN')}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-semibold">
                        <Clock className={`w-3.5 h-3.5 ${isExpiringSoon ? 'text-rose-600 dark:text-rose-400 animate-pulse' : 'text-slate-400'}`} />
                        <span className={isExpiringSoon ? 'text-rose-600 dark:text-rose-400 font-bold' : ''}>
                          {daysLeft === 0 ? 'Expired' : `${daysLeft} Days Remaining`}
                        </span>
                      </span>
                      <InfoTooltip text="Item automatically disappears after 21 days. Click 'Extend Timer' to add 21 more days." position="top" />
                    </div>
                  </div>
                </div>

                {/* Dashboard Action Controls */}
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                  
                  {/* Extend Timer Button */}
                  <div className="flex items-center">
                    <button
                      onClick={() => onExtendTimer(item.id)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-amber-50 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Extend (+21d)</span>
                    </button>
                    <InfoTooltip text="Resets the 21-day countdown timer back to full length." position="top" />
                  </div>

                  {/* Mark as Sold Button */}
                  <div className="flex items-center">
                    <button
                      onClick={() => onMarkAsSold(item.id)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-extrabold rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 border border-emerald-500/40 transition-all"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Mark as Sold</span>
                    </button>
                    <InfoTooltip text="Instantly and permanently removes item from public bulletin feed to stop incoming WhatsApp messages." position="top" />
                  </div>

                  {/* Delete Button */}
                  <div className="flex items-center">
                    <button
                      onClick={() => onDeleteListing(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-all border border-transparent hover:border-rose-300 dark:hover:border-rose-500/30"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <InfoTooltip text="Delete listing from database." position="top" />
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
