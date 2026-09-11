import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ProductGrid from './components/ProductGrid';
import ProductDetailModal from './components/ProductDetailModal';
import UploadModal from './components/UploadModal';
import SellerDashboard from './components/SellerDashboard';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import { INITIAL_LISTINGS, INITIAL_BANNED_KEYWORDS } from './data/mockData';
import { ShieldAlert, RotateCcw } from 'lucide-react';
import InfoTooltip from './components/InfoTooltip';

export default function App() {
  // ─── Dark Mode State ────────────────────────────────────────────────────────
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('kollecto_darkmode');
    return saved !== null ? JSON.parse(saved) : false; // Default: Light/White mode
  });

  // Apply/remove 'dark' class on <html> whenever darkMode changes
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('kollecto_darkmode', JSON.stringify(darkMode));
  }, [darkMode]);

  // ─── App State ──────────────────────────────────────────────────────────────
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('iiserm_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  const [bannedKeywords, setBannedKeywords] = useState(() => {
    const saved = localStorage.getItem('iiserm_banned_keywords');
    return saved ? JSON.parse(saved) : INITIAL_BANNED_KEYWORDS;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('iiserm_users');
    return saved ? JSON.parse(saved) : [
      { email: 'alex.m22@iisermohali.ac.in', name: 'Alex Mehta', whatsapp: '+919812345678', isSuspended: false },
      { email: 'sarah.b20@iisermohali.ac.in', name: 'Sarah Sharma', whatsapp: '+919876543210', isSuspended: false },
      { email: 'rohan.k21@iisermohali.ac.in', name: 'Rohan Kumar', whatsapp: '+919988776655', isSuspended: false }
    ];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('iiserm_current_user');
    return saved ? JSON.parse(saved) : {
      email: 'alex.m22@iisermohali.ac.in',
      name: 'Alex Mehta (BS-MS 2022)',
      whatsapp: '+919812345678',
      isAdmin: false
    };
  });

  // ─── Navigation & Modal State ───────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // ─── Sync to LocalStorage ───────────────────────────────────────────────────
  useEffect(() => { localStorage.setItem('iiserm_listings', JSON.stringify(listings)); }, [listings]);
  useEffect(() => { localStorage.setItem('iiserm_banned_keywords', JSON.stringify(bannedKeywords)); }, [bannedKeywords]);
  useEffect(() => { localStorage.setItem('iiserm_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { if (currentUser) localStorage.setItem('iiserm_current_user', JSON.stringify(currentUser)); }, [currentUser]);

  // ─── Derived State ──────────────────────────────────────────────────────────
  const currentUserRecord = users.find(u => u.email.toLowerCase() === currentUser?.email?.toLowerCase());
  const isSuspended = currentUserRecord ? currentUserRecord.isSuspended : false;

  // Filter & Sort Logic
  const filteredListings = listings.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      const matchSub = item.subItems && item.subItems.some(s => s.title.toLowerCase().includes(query));
      if (!matchTitle && !matchDesc && !matchSub) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'expiring-soon') return new Date(a.expiresAt) - new Date(b.expiresAt);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // ─── User Action Handlers ───────────────────────────────────────────────────
  const handleCreateListing = (newListing) => {
    if (isSuspended) {
      alert('Your account has been suspended by campus moderators. You cannot create new listings.');
      return;
    }
    setListings([newListing, ...listings]);
    setActiveTab('feed');
  };

  const handleExtendTimer = (id) => {
    setListings(listings.map(item =>
      item.id === id
        ? { ...item, expiresAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString() }
        : item
    ));
  };

  const handleMarkAsSold = (id) => setListings(listings.filter(item => item.id !== id));
  const handleDeleteListing = (id) => setListings(listings.filter(item => item.id !== id));

  // ─── Admin Handlers ─────────────────────────────────────────────────────────
  const handleToggleSuspendUser = (email) => {
    setUsers(users.map(u => u.email === email ? { ...u, isSuspended: !u.isSuspended } : u));
  };

  const handleForceDeleteListing = (id) => setListings(listings.filter(item => item.id !== id));

  const handleToggleRerouteChat = (id) => {
    setListings(listings.map(item =>
      item.id === id ? { ...item, reroutedToAdmin: !item.reroutedToAdmin } : item
    ));
  };

  const handleAddBannedKeyword = (kw) => {
    if (!bannedKeywords.includes(kw.toLowerCase())) {
      setBannedKeywords([...bannedKeywords, kw.toLowerCase()]);
    }
  };

  const handleRemoveBannedKeyword = (kw) => setBannedKeywords(bannedKeywords.filter(k => k !== kw));

  const handleResetSeedData = () => {
    if (window.confirm('Reset all listings, banned keywords, and user accounts back to initial demo state?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const userListings = listings.filter(item => item.sellerEmail?.toLowerCase() === currentUser?.email?.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      
      {/* Top Navigation Bar */}
      <Header
        currentUser={currentUser}
        onOpenUpload={() => setShowUploadModal(true)}
        onOpenDashboard={() => setActiveTab('dashboard')}
        onOpenAdminPanel={() => setActiveTab('admin')}
        onOpenAuth={() => setShowAuthModal(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Account Suspended Alert Banner */}
      {isSuspended && (
        <div className="bg-rose-50 dark:bg-rose-950/90 border-b border-rose-200 dark:border-rose-500/50 p-3 text-center text-xs font-bold text-rose-700 dark:text-rose-200 flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-500" />
          <span>Account Suspended: Your access has been restricted by moderators. Contact admin for resolution.</span>
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* BUYER FEED VIEW */}
        {activeTab === 'feed' && (
          <>
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalResults={filteredListings.length}
            />
            <ProductGrid
              listings={filteredListings}
              onSelectProduct={(item) => setSelectedProduct(item)}
              onOpenUpload={() => setShowUploadModal(true)}
            />
          </>
        )}

        {/* SELLER DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <SellerDashboard
            userListings={userListings}
            onExtendTimer={handleExtendTimer}
            onMarkAsSold={handleMarkAsSold}
            onDeleteListing={handleDeleteListing}
            onOpenUpload={() => setShowUploadModal(true)}
            currentUser={currentUser}
          />
        )}

        {/* ADMIN PANEL VIEW */}
        {activeTab === 'admin' && (
          <AdminPanel
            listings={listings}
            users={users}
            onToggleSuspendUser={handleToggleSuspendUser}
            onForceDeleteListing={handleForceDeleteListing}
            onToggleRerouteChat={handleToggleRerouteChat}
            bannedKeywords={bannedKeywords}
            onAddBannedKeyword={handleAddBannedKeyword}
            onRemoveBannedKeyword={handleRemoveBannedKeyword}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-6 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="KollectoP2P" className="w-5 h-5 rounded-md" />
            <span className="font-bold text-slate-700 dark:text-slate-300">KollectoP2P</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span>© 2026 IISER Mohali Campus Marketplace</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">@iisermohali.ac.in verified</span>
            <InfoTooltip text="Zero-friction campus bulletin board routing off-platform to WhatsApp." position="top" />
          </div>

          <button
            onClick={handleResetSeedData}
            className="flex items-center gap-1 text-slate-400 hover:text-rose-500 transition-colors text-[11px]"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Seed Data</span>
          </button>
        </div>
      </footer>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <ProductDetailModal
          item={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onReportItem={(id, reason) => alert(`Report for item ${id} received: ${reason}`)}
          currentUser={currentUser}
        />
      )}

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onSubmit={handleCreateListing}
          currentUser={currentUser}
          bannedKeywords={bannedKeywords}
        />
      )}

      {/* AUTH & PROFILE SETUP MODAL */}
      {showAuthModal && (
        <AuthModal
          currentUser={currentUser}
          onSaveProfile={(profile) => {
            setCurrentUser(profile);
            if (!users.some(u => u.email === profile.email)) {
              setUsers([...users, { ...profile, isSuspended: false }]);
            }
          }}
          onClose={() => setShowAuthModal(false)}
        />
      )}

    </div>
  );
}
