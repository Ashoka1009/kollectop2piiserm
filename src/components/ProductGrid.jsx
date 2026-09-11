import React from 'react';
import ProductCard from './ProductCard';
import { PackageSearch, PlusCircle } from 'lucide-react';
import InfoTooltip from './InfoTooltip';

export default function ProductGrid({ listings, onSelectProduct, onOpenUpload }) {
  if (listings.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center my-8 max-w-xl mx-auto backdrop-blur-md shadow-sm">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800/80 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-500">
          <PackageSearch className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-200">No Campus Listings Found</h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          No active items match your current search query or category filter. Try clearing your search or upload a new item!
        </p>
        <button
          onClick={onOpenUpload}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Upload First Item</span>
        </button>
      </div>
    );
  }

  return (
    <section aria-label="Campus Listings Grid">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
          <span>Displaying verified KollectoP2P bulletin posts</span>
          <InfoTooltip text="Items automatically expire after 21 days unless extended by the seller." position="right" />
        </div>
      </div>

      <div className="masonry-grid pb-12">
        {listings.map((item) => (
          <ProductCard key={item.id} item={item} onClick={onSelectProduct} />
        ))}
      </div>
    </section>
  );
}
