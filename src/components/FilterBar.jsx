import React from 'react';
import { Search, ArrowUpDown, Filter, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import InfoTooltip from './InfoTooltip';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  totalResults
}) {
  return (
    <div className="bg-white/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-4 sm:p-5 backdrop-blur-md shadow-sm dark:shadow-xl mb-6 transition-colors duration-300">
      
      {/* Search Input & Sort Dropdown Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-4">
        
        {/* Search Input Box */}
        <div className="relative flex-1 flex items-center">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search textbooks, monitors, hostel clear-outs, coffee..."
              className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl pl-10 pr-9 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs bg-slate-200 dark:bg-slate-800 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ×
              </button>
            )}
          </div>
          <InfoTooltip text="Live search searches item titles, descriptions, and bundle sub-items instantaneously." position="top" />
        </div>

        {/* Sort Dropdown & Results Counter */}
        <div className="flex items-center gap-2 justify-between sm:justify-end">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{totalResults}</span> active items
          </div>

          <div className="flex items-center">
            <div className="relative flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-2xl pl-9 pr-7 py-2.5 appearance-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shadow-sm"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="expiring-soon">Expiring Soonest</option>
              </select>
            </div>
            <InfoTooltip text="Sort listings by creation recency, price ranking, or upcoming 21-day expiration timer." position="top" />
          </div>
        </div>

      </div>

      {/* Horizontal Category Scroll Tags */}
      <div className="flex items-center gap-2">
        <div className="flex items-center text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5 text-emerald-500 mr-1" />
          <span>Categories:</span>
          <InfoTooltip text="Horizontal scrollable campus categories. Select a pill to filter the bulletin feed." position="right" />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md shadow-emerald-500/20 scale-105'
                    : 'bg-slate-100 dark:bg-slate-950/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat === 'All' && <Sparkles className="w-3 h-3 inline mr-1 text-emerald-600 dark:text-emerald-300" />}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
