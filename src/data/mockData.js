// Initial Seed Data for IISER Mohali Campus Marketplace

export const INITIAL_BANNED_KEYWORDS = [
  'exam paper', 'leak', 'weed', 'alcohol', 'drugs', 'weapon',
  'knife', 'cheat', 'vape', 'tobacco', 'stolen'
];

export const CATEGORIES = [
  'All',
  'Stationery',
  'Grocery',
  'Electronics',
  'Ready to Eat',
  'Clothes',
  'Utilities',
  'Supplements',
  'Textbooks',
  'Miscellaneous'
];

export const CONDITIONS = ['New', 'Like New', 'Good', 'Heavily Used'];

export const INITIAL_LISTINGS = [
  {
    id: 'item-1',
    title: 'Graduation Hostel Room Clearout (BS-MS 2024)',
    price: 3200,
    category: 'Utilities',
    condition: 'Good',
    description: 'Moving out after thesis defense! Selling complete hostel room bundle. Items can be bought together or selected individually using checkboxes below.',
    isCartSell: true,
    isNegotiable: true,
    sellerEmail: 'sarah.b20@iisermohali.ac.in',
    sellerName: 'Sarah Sharma (BS-MS 2020)',
    sellerWhatsapp: '+919876543210',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    reroutedToAdmin: false,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnailIndex: 0,
    referenceLinks: [
      { label: 'Similar Mattress retail price on Amazon', url: 'https://www.amazon.in/dp/B073WG89XY' },
      { label: 'Study Table Lamp Flipkart', url: 'https://www.flipkart.com/search?q=desk+lamp' }
    ],
    subItems: [
      { id: 'sub-1', title: 'Orthopedic Single Bed Mattress (6x3 ft)', price: 1400, selected: true },
      { id: 'sub-2', title: 'Winter Mink Warm Blanket (Double Ply)', price: 900, selected: true },
      { id: 'sub-3', title: 'Adjustable LED Desk Study Lamp', price: 400, selected: true },
      { id: 'sub-4', title: '4-Socket Surge Extension Board (3m)', price: 300, selected: false },
      { id: 'sub-5', title: 'Mesh Laundry Basket + Hangers Set', price: 200, selected: false }
    ]
  },
  {
    id: 'item-2',
    title: 'Quantum Mechanics by David J. Griffiths (3rd Edition)',
    price: 550,
    category: 'Textbooks',
    condition: 'Like New',
    description: 'Essential physics textbook for PHY301. Crisp pages, no highlights or pen marks. Comes with plastic cover.',
    isCartSell: false,
    isNegotiable: false,
    sellerEmail: 'alex.m22@iisermohali.ac.in',
    sellerName: 'Alex Mehta',
    sellerWhatsapp: '+919812345678',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    reroutedToAdmin: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnailIndex: 0,
    referenceLinks: [
      { label: 'Amazon India Retail Price (₹890)', url: 'https://www.amazon.in/Introduction-Quantum-Mechanics-David-Griffiths/dp/1108422411' }
    ],
    subItems: []
  },
  {
    id: 'item-3',
    title: 'Dell 24-inch Full HD IPS Monitor (1080p, 75Hz)',
    price: 4800,
    category: 'Electronics',
    condition: 'Good',
    description: 'Great for dual monitor research setups, coding, and watching movies in hostel. Includes HDMI cable & power adapter.',
    isCartSell: false,
    isNegotiable: true,
    sellerEmail: 'rohan.k21@iisermohali.ac.in',
    sellerName: 'Rohan Kumar',
    sellerWhatsapp: '+919988776655',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Expiring soon!
    reroutedToAdmin: false,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnailIndex: 0,
    referenceLinks: [
      { label: 'Dell Monitor Amazon retail link', url: 'https://www.amazon.in/dp/B08J5F3G18' }
    ],
    subItems: []
  },
  {
    id: 'item-4',
    title: 'Pre-Exam Snack & Instant Coffee Cravings Bundle',
    price: 350,
    category: 'Ready to Eat',
    condition: 'New',
    description: 'Unopened hostel survival pack bought from Metro Cash & Carry. 12x Maggi Masala + Nescafe Classic 100g Jar + 5x Dark Chocolate Bars.',
    isCartSell: true,
    isNegotiable: false,
    sellerEmail: 'priya.s23@iisermohali.ac.in',
    sellerName: 'Priya Singh',
    sellerWhatsapp: '+919765432109',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString(),
    reroutedToAdmin: false,
    images: [
      'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnailIndex: 0,
    referenceLinks: [],
    subItems: [
      { id: 'snack-1', title: 'Maggi 12-pack (Unopened)', price: 160, selected: true },
      { id: 'snack-2', title: 'Nescafe Classic Instant Coffee 100g Jar', price: 140, selected: true },
      { id: 'snack-3', title: 'Amul Dark Chocolate (2x 150g)', price: 50, selected: true }
    ]
  },
  {
    id: 'item-5',
    title: 'Pigeon Electric Kettle 1.8 Litre (1500W)',
    price: 400,
    category: 'Utilities',
    condition: 'Like New',
    description: 'Used for only one semester in Hostel 5. Boiling water in 2 minutes for tea, coffee, and noodles. Stainless steel body.',
    isCartSell: false,
    isNegotiable: true,
    sellerEmail: 'aniket.v22@iisermohali.ac.in',
    sellerName: 'Aniket Verma',
    sellerWhatsapp: '+919811223344',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString(),
    reroutedToAdmin: false,
    images: [
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnailIndex: 0,
    referenceLinks: [
      { label: 'Amazon India Retail Page', url: 'https://www.amazon.in/dp/B07W55DDFB' }
    ],
    subItems: []
  },
  {
    id: 'item-6',
    title: 'Optimum Nutrition Gold Standard 100% Whey Protein (Double Rich Chocolate 1kg)',
    price: 1800,
    category: 'Supplements',
    condition: 'New',
    description: 'Sealed container with authentic verification scratch code intact. Expiry date: Dec 2027. Selling because doctor advised different diet.',
    isCartSell: false,
    isNegotiable: false,
    sellerEmail: 'dev.p21@iisermohali.ac.in',
    sellerName: 'Dev Patel',
    sellerWhatsapp: '+919900112233',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    reroutedToAdmin: false,
    images: [
      'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnailIndex: 0,
    referenceLinks: [
      { label: 'Nutrabay Retail Link (₹3,200)', url: 'https://nutrabay.com/product/optimum-nutrition-on-gold-standard-100-whey-protein/' }
    ],
    subItems: []
  }
];

export const DEFAULT_ADMIN_SUPPORT_WHATSAPP = '+919999888877';
