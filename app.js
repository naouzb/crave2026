// CRAVE2026 Master Final Application Engine with Micro-Icons, Native Web Share, Auth-Gated Rating & Admin Spot Creator
(function () {
  const state = {
    language: 'EN',
    currentUser: null,
    searchQuery: '',
    selectedCategory: 'All',
    placeholderIndex: 0,
    isAuthModalOpen: false,
    authModalMode: 'signin',
    authError: '',
    toastMessage: null,
    isAdminViewOpen: false,
    adminActiveTab: 'overview',
    // Add Spot Form
    newSpotTitle: '',
    newSpotCategory: 'Omakase & Sushi',
    newSpotDesc: '',
    newSpotCover: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
    newSpotPrice: 'Avg 180,000 UZS',
    newSpotLoc: 'Ginza Promenade',
    newSpotPhone: '+998 90 999 88 77',
    newSpotCal: '850 kcal',
    isEditingReview: false,
    isEditingSpot: false,
    reviewRating: 5,
    reviewText: '',
    isGeminiModalOpen: false,
    geminiPrompt: '',
    geminiResponse: null,
    isGeminiLoading: false,
    isAddSpotModalOpen: false,
    isChatOpen: false,
    selectedSpotDetail: null,
    activeSpot: null,
    unreadCount: 1,
    usersList: [
      { id: 'usr_admin', name: 'Super Admin', email: 'naouzb11@gmail.com', role: 'ADMIN' },
      { id: 'usr_1', name: 'Chef Kenji Takahashi', email: 'kenji@omakase.io', role: 'BUSINESS' },
      { id: 'usr_2', name: 'Alex Mercer', email: 'alex@foodie.com', role: 'CLIENT' },
    ],
    spots: [
      {
        id: 'spot_1',
        ownerId: 'usr_1',
        ownerName: 'Chef Kenji Takahashi',
        title: 'Miyabi Omakase & Edomae Sushi',
        category: 'Omakase & Sushi',
        description: 'Ultra-exclusive 12-seat Japanese omakase experience featuring wild-caught bluefin tuna imported daily from Toyosu Market, Tokyo.',
        coverImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
        phoneNumber: '+998 90 999 88 77',
        priceInfo: 'Avg $120 / guest',
        calories: '650 kcal',
        features: ['Halal Options', 'Free Parking', 'Chef Counter', 'Private Dining Room'],
        address: '4-Chome Ginza District, Tokyo Promenade',
        mapEmbedUrl: 'https://maps.google.com/maps?q=Ginza,Tokyo&t=&z=13&ie=UTF8&iwloc=&output=embed',
        viewsToday: 1420,
        fomoText: '🔥 18 people looking right now',
        isFeatured: true,
        status: 'APPROVED',
        rating: 4.9,
        reviewsCount: 328,
        reviewsList: [
          {
            id: 'rev_1',
            userId: 'usr_2',
            userName: 'Alex Mercer',
            rating: 5,
            text: 'The Toyosu Bluefin Toro was melt-in-your-mouth perfection!'
          }
        ],
        location: 'Ginza District / Downtown'
      },
      {
        id: 'spot_2',
        ownerId: 'usr_3',
        ownerName: 'Marco Rossi',
        title: 'Fornace 800° Neapolitan Woodfire',
        category: 'Neapolitan Pizza',
        description: 'Double-fermented sourdough pizza baked in custom Vesuvian volcanic stone oven at 900°F with San Marzano DOP tomatoes and Bufala Mozzarella.',
        coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
        phoneNumber: '+998 97 123 45 67',
        priceInfo: 'Avg 150,000 UZS / pizza',
        calories: '920 kcal',
        features: ['Woodfire Oven', 'Free WiFi', 'Outdoor Terrace', 'Pet Friendly'],
        address: 'Via Tribunali 32, Neapolitan Quarter',
        mapEmbedUrl: 'https://maps.google.com/maps?q=Naples,Italy&t=&z=13&ie=UTF8&iwloc=&output=embed',
        viewsToday: 980,
        fomoText: '⚡ High Demand Today',
        isFeatured: true,
        status: 'APPROVED',
        rating: 4.8,
        reviewsCount: 215,
        reviewsList: [],
        location: 'Little Italy Quarter'
      },
      {
        id: 'spot_3',
        ownerId: 'usr_4',
        ownerName: 'Antoine Laurent',
        title: 'L\'Ombre Dry-Aged Steakhouse',
        category: 'Dry-Aged Steak',
        description: '45-day Himalayan salt room dry-aged Wagyu Tomahawk steaks paired with rare Bordeaux vintage reserves and smoked bone marrow.',
        coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
        phoneNumber: '+998 93 555 44 33',
        priceInfo: 'Avg 450,000 UZS / guest',
        calories: '1,150 kcal',
        features: ['Himalayan Salt Dry-Age Room', 'Wine Cellar', 'Valet Parking', 'Live Jazz'],
        address: '742 Park Avenue, Upper West Promenade',
        mapEmbedUrl: 'https://maps.google.com/maps?q=Park+Avenue,NYC&t=&z=13&ie=UTF8&iwloc=&output=embed',
        viewsToday: 1150,
        fomoText: '🔥 9 tables booked in last hour',
        isFeatured: true,
        status: 'APPROVED',
        rating: 4.95,
        reviewsCount: 410,
        reviewsList: [],
        location: 'Upper West Promenade'
      }
    ]
  };

  const APPETITE_PLACEHOLDERS = [
    "Craving 45-day Himalayan salt dry-aged Wagyu?...",
    "Looking for romantic 900° woodfire Neapolitan pizza?...",
    "Craving wild Toyosu Bluefin Toro Omakase?...",
    "Need 24-hour slow-cooked spicy Tonkotsu ramen?...",
    "Searching for artisanal French patisserie & soufflé?..."
  ];

  function triggerToast(msg) {
    state.toastMessage = msg;
    render();
    setTimeout(() => {
      state.toastMessage = null;
      render();
    }, 3500);
  }

  const I18N = {
    EN: {
      signIn: "Sign In",
      signUp: "Sign Up",
      logout: "Log Out",
      badge: "Sensory Food Discovery Redefined",
      headline: "Curated Culinary Artistry for True Gourmets",
      subtitle: "Explore high-gastronomy spots, woodfire pizzerias, and private chef omakases in real time.",
      chatWithOwner: "Chat with Owner",
      approved: "VERIFIED SPOT",
      askGeminiBtn: "✨ Ask Gemini AI Concierge",
      orderBookBtn: "🛒 Order / Book (Coming Soon)",
      deliveryBadge: "🚚 Delivery & Direct Courier: Coming Soon",
      lockTitle: "Exclusive Spot Information Locked",
      lockDesc: "Please Log In or Register to view phone numbers, prices, and exclusive reviews.",
      lockBtn: "Please Log In or Register",
      adminPanelBtn: "🛡️ Admin Panel",
    },
    UZ: {
      signIn: "Kirish",
      signUp: "Registratsiya",
      logout: "Chiqish",
      badge: "Sensory Oziq-Ovqat Kashfiyoti Qaytadan Yaratildi",
      headline: "Haqiqiy Gurmanlar Uchun Saralangan Oshxona San'ati",
      subtitle: "Yuqori gastronomik maskanlar, o'tin pechida yopilgan pitsalar va xususiy oshpazlarni jonli muloqotda kashf eting.",
      chatWithOwner: "Restoran Egasi Bilan Muloqot",
      approved: "TASDIQLANGAN MASKAN",
      askGeminiBtn: "✨ Gemini AI Maslahatchisi",
      orderBookBtn: "🛒 Buyurtma Berish / Band Qilish (Tez kunda)",
      deliveryBadge: "🚚 Yetkazib Berish Hizmati: Tez kunda",
      lockTitle: "Restoran Haqida Eksklyuziv Ma'lumotlar Bloklangan",
      lockDesc: "Telefon raqamlari, narxlar va haqiqiy sharhlarni ko'rish uchun Tizimga Kiring yoki Registratsiya qiling.",
      lockBtn: "Kirish Yoki Ro'yxatdan O'tish",
      adminPanelBtn: "🛡️ Admin Paneli",
    }
  };

  function render() {
    const t = I18N[state.language] || I18N.EN;

    const filteredSpots = state.spots.filter((s) => {
      const q = state.searchQuery.toLowerCase();
      const matchQ = s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
      const matchC = state.selectedCategory === 'All' || s.category === state.selectedCategory;
      return matchQ && matchC;
    });

    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <div class="min-h-screen flex flex-col justify-between bg-[#0f0f11] text-white">
        <!-- Toast Notification -->
        ${state.toastMessage ? `
          <div class="fixed top-20 right-6 z-50 px-5 py-3.5 rounded-2xl bg-neon-gradient text-white text-xs font-black shadow-neon animate-in fade-in flex items-center gap-2">
            ✨ <span>${state.toastMessage}</span>
          </div>
        ` : ''}

        <div>
          <!-- Header Bar -->
          <header class="sticky top-0 z-50 w-full backdrop-blur-md bg-white/5 border-b border-white/10 shadow-2xl relative pointer-events-auto">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <!-- Brand Logo -->
              <div class="flex items-center gap-3 cursor-pointer" id="btn-logo">
                <div class="w-10 h-10 rounded-xl bg-neon-gradient p-0.5 shadow-neon flex items-center justify-center">
                  <div class="w-full h-full bg-[#0f0f11] rounded-[10px] flex items-center justify-center font-black text-xl text-[#ff4500]">
                    🔥
                  </div>
                </div>
                <div>
                  <span class="text-xl font-black text-white">CRAVE<span class="text-[#ff4500]">2026</span></span>
                  <span class="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-[#ff4500]/20 text-[#ff4500] font-bold uppercase">Spot Engine</span>
                </div>
              </div>

              <!-- Right Actions -->
              <div class="flex items-center gap-3 relative z-50 pointer-events-auto">
                <select id="lang-select" class="px-2.5 py-1.5 rounded-lg bg-[#18181c] border border-[#2a2a32] text-xs font-bold text-gray-200">
                  <option value="EN" ${state.language === 'EN' ? 'selected' : ''}>🇺🇸 EN</option>
                  <option value="UZ" ${state.language === 'UZ' ? 'selected' : ''}>🇺🇿 UZ</option>
                </select>

                ${state.currentUser && state.currentUser.role === 'ADMIN' ? `
                  <button id="btn-open-admin-panel" class="px-3.5 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-extrabold text-xs shadow-neon">
                    ${t.adminPanelBtn}
                  </button>
                ` : ''}

                ${state.currentUser ? `
                  <div class="flex items-center gap-2">
                    <div class="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-[#1f1f24] border border-[#2a2a32]">
                      <div class="w-7 h-7 rounded-lg bg-neon-gradient text-white flex items-center justify-center font-black text-xs">
                        ${state.currentUser.firstName ? state.currentUser.firstName.charAt(0) : 'U'}
                      </div>
                      <div class="text-left hidden sm:block">
                        <p class="text-xs font-bold text-white leading-tight">${state.currentUser.firstName} ${state.currentUser.lastName}</p>
                        <p class="text-[10px] text-[#ff4500] font-semibold uppercase">${state.currentUser.role}</p>
                      </div>
                    </div>
                    <button id="btn-logout" class="px-3 py-1.5 rounded-xl bg-[#1f1f24] border border-[#2a2a32] hover:bg-red-500/20 text-gray-300 text-xs font-bold transition-all cursor-pointer">
                      🚪 ${t.logout}
                    </button>
                  </div>
                ` : `
                  <div class="flex items-center gap-2 relative z-50 pointer-events-auto">
                    <button id="btn-header-signin" class="px-4 py-2 rounded-xl bg-[#18181c] border border-[#2a2a32] hover:border-[#ff4500]/60 text-white text-xs font-extrabold transition-all cursor-pointer relative z-50 pointer-events-auto hover:scale-105 active:scale-95 shadow-md">
                      🔑 ${t.signIn}
                    </button>
                    <button id="btn-header-signup" class="px-4 py-2 rounded-xl bg-neon-gradient text-white text-xs font-black shadow-neon hover:scale-105 active:scale-95 transition-all cursor-pointer relative z-50 pointer-events-auto">
                      ✨ ${t.signUp}
                    </button>
                  </div>
                `}
              </div>
            </div>
          </header>

          <!-- Hero Section -->
          <section class="relative py-16 px-4 text-center border-b border-[#2a2a32]/60 overflow-hidden bg-gradient-to-b from-[#0f0f11] via-[#18181c]/60 to-[#0f0f11]">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#ff4500]/10 blur-[130px] rounded-full pointer-events-none"></div>
            <div class="relative z-10 max-w-4xl mx-auto space-y-4">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff4500]/15 border border-[#ff4500]/40 text-xs font-extrabold text-[#ff4500] uppercase mb-2 shadow-neon">
                ✨ ${t.badge}
              </div>
              <h1 class="text-4xl sm:text-6xl font-black text-white max-w-4xl mx-auto leading-tight">
                ${t.headline}
              </h1>
              <p class="text-xs sm:text-base text-gray-400 max-w-2xl mx-auto font-medium">
                ${t.subtitle}
              </p>

              <!-- Glassmorphic Search Bar -->
              <div class="max-w-xl mx-auto mt-6 relative">
                <input id="input-search" type="text" value="${state.searchQuery}" placeholder="${APPETITE_PLACEHOLDERS[state.placeholderIndex]}" class="w-full px-5 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-[#ff4500] shadow-2xl transition-all" />
              </div>

              <!-- Category Pills Row -->
              <div class="flex flex-wrap items-center justify-center gap-2 mt-4">
                ${['All', 'Omakase & Sushi', 'Neapolitan Pizza', 'Dry-Aged Steak', 'Craft Ramen', 'Artisanal Pastry'].map((cat) => `
                  <button data-category="${cat}" class="btn-category px-4 py-2 rounded-xl text-xs font-bold transition-all ${state.selectedCategory === cat ? 'bg-neon-gradient text-white shadow-neon scale-105' : 'bg-[#1f1f24] border border-[#2a2a32] text-gray-400 hover:text-white'}">
                    ${cat === 'All' ? '🔥 All Categories' : cat}
                  </button>
                `).join('')}
              </div>
            </div>
          </section>

          <!-- Spots Grid with Micro-Icons (Price, Location, Phone, Calories) & Web Share -->
          <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-black text-white flex items-center gap-2">🧭 Sensory Dining Spots</h2>
              <span class="text-xs text-gray-400 font-bold bg-[#18181c] px-3.5 py-1.5 rounded-full border border-[#2a2a32]">${filteredSpots.length} Premium Spots</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              ${filteredSpots.map((spot) => `
                <div data-view-spot-id="${spot.id}" class="card-spot-item rounded-3xl bg-[#1f1f24] border border-[#2a2a32] overflow-hidden flex flex-col justify-between hover:border-[#ff4500]/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 cursor-pointer group">
                  <div class="relative h-52 bg-[#18181c] overflow-hidden">
                    <img src="${spot.coverImage}" alt="${spot.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div class="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-extrabold text-white">${spot.category}</div>
                    
                    <button data-share-spot="${spot.title}" class="btn-share-spot absolute top-3 right-3 p-2 rounded-full bg-black/75 border border-white/10 text-gray-300 hover:text-white transition-all shadow-lg">
                      🔗
                    </button>

                    <div class="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-[#ff4500]/30 text-[10px] font-extrabold text-[#ff4500] shadow-neon">
                      ${spot.fomoText || '🔥 14 people looking right now'}
                    </div>
                  </div>

                  <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div class="space-y-2">
                      <div class="flex items-center justify-between text-xs">
                        <span class="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">✓ ${t.approved}</span>
                        
                        <button data-rate-spot-id="${spot.id}" class="btn-rate-stars font-bold text-yellow-400 hover:scale-105">
                          ⭐ ${spot.rating} (${spot.reviewsCount})
                        </button>
                      </div>

                      <h3 class="text-lg font-black text-white group-hover:text-[#ff4500] transition-colors line-clamp-1">${spot.title}</h3>
                      <p class="text-xs text-gray-400 line-clamp-2 font-medium">${spot.description}</p>

                      <!-- Micro-Icons Data Bar -->
                      <div class="grid grid-cols-2 gap-2 pt-2 text-[11px] text-gray-300 font-bold border-t border-[#2a2a32]">
                        <div class="truncate">🏷️ ${spot.priceInfo || '150,000 UZS'}</div>
                        <div class="truncate">📍 ${spot.location || 'Downtown'}</div>
                        <div class="truncate">📞 ${spot.phoneNumber || '+998 90 999'}</div>
                        <div class="truncate text-red-400">🔥 ${spot.calories || '850 kcal'}</div>
                      </div>
                    </div>

                    <div class="pt-4 border-t border-[#2a2a32] grid grid-cols-2 gap-2">
                      <button data-spot-id="${spot.id}" class="btn-spot-chat py-2.5 rounded-xl bg-[#18181c] border border-[#ff4500]/40 hover:bg-neon-gradient text-white text-xs font-extrabold transition-all shadow-md">
                        💬 ${t.chatWithOwner}
                      </button>
                      <button class="btn-spot-order py-2.5 rounded-xl bg-neon-gradient text-white text-xs font-black shadow-neon hover:scale-105">
                        🛒 Order
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        </div>

        <!-- Auth Modal -->
        ${state.isAuthModalOpen ? `
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
            <div class="relative w-full max-w-lg rounded-3xl bg-[#1f1f24] border border-[#2a2a32] p-6 sm:p-8 shadow-2xl space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <span class="px-2.5 py-0.5 rounded bg-[#ff4500]/20 text-[#ff4500] text-[10px] font-black uppercase">Strict Auth Engine</span>
                  <h3 class="text-xl font-black text-white mt-1">${state.authModalMode === 'signup' ? t.signUp : t.signIn}</h3>
                </div>
                <button id="btn-close-auth" class="p-1.5 rounded-full bg-[#18181c] text-gray-400 hover:text-white">✕</button>
              </div>

              <form id="form-user-auth" class="space-y-3">
                ${state.authModalMode === 'signup' ? `
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-bold text-gray-300 mb-1">First Name</label>
                      <input id="reg-fname" type="text" required placeholder="Alex" class="w-full px-4 py-2.5 rounded-xl bg-[#18181c] border border-[#2a2a32] text-white text-xs" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-300 mb-1">Last Name</label>
                      <input id="reg-lname" type="text" required placeholder="Mercer" class="w-full px-4 py-2.5 rounded-xl bg-[#18181c] border border-[#2a2a32] text-white text-xs" />
                    </div>
                  </div>
                ` : ''}

                <div>
                  <label class="block text-xs font-bold text-gray-300 mb-1">Email Address</label>
                  <input id="reg-email" type="email" required placeholder="alex.mercer@foodie.com" class="w-full px-4 py-2.5 rounded-xl bg-[#18181c] border border-[#2a2a32] text-white text-xs" />
                </div>

                <div>
                  <label class="block text-xs font-bold text-gray-300 mb-1">Password</label>
                  <input id="reg-pass" type="password" required placeholder="••••••••••••" class="w-full px-4 py-2.5 rounded-xl bg-[#18181c] border border-[#2a2a32] text-white text-xs" />
                </div>

                <button type="submit" class="w-full py-3 rounded-xl bg-neon-gradient text-white font-extrabold text-xs shadow-neon">
                  ${state.authModalMode === 'signup' ? t.signUp : t.signIn}
                </button>
              </form>
            </div>
          </div>
        ` : ''}

        <!-- Footer -->
        <footer class="border-t border-[#2a2a32] py-6 px-4 text-center text-xs text-gray-500 font-medium">
          CRAVE2026 — Master Final Production Ready Engine.
        </footer>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    document.getElementById('lang-select')?.addEventListener('change', (e) => {
      state.language = e.target.value;
      render();
    });

    document.querySelectorAll('.btn-share-spot').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(window.location.href);
        triggerToast("🔗 Restaurant link copied to clipboard!");
      });
    });

    document.querySelectorAll('.btn-spot-order').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerToast("🚀 Ordering and Table Reservations are launching very soon! Stay tuned.");
      });
    });

    document.querySelectorAll('.btn-rate-stars').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!state.currentUser) {
          triggerToast("🔒 Please log in to rate this spot.");
          state.authModalMode = 'signin';
          state.isAuthModalOpen = true;
          render();
        } else {
          triggerToast("⭐ Thank you! Your 5-star rating has been registered.");
        }
      });
    });

    document.getElementById('btn-header-signin')?.addEventListener('click', (e) => {
      e.stopPropagation();
      state.authError = '';
      state.authModalMode = 'signin';
      state.isAuthModalOpen = true;
      render();
    });

    document.getElementById('btn-header-signup')?.addEventListener('click', (e) => {
      e.stopPropagation();
      state.authError = '';
      state.authModalMode = 'signup';
      state.isAuthModalOpen = true;
      render();
    });

    document.getElementById('btn-logout')?.addEventListener('click', () => {
      state.currentUser = null;
      render();
    });

    document.getElementById('btn-close-auth')?.addEventListener('click', () => {
      state.isAuthModalOpen = false;
      render();
    });

    document.getElementById('form-user-auth')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('reg-email').value.trim().toLowerCase();
      const pass = document.getElementById('reg-pass').value.trim();

      if (email === 'naouzb11@gmail.com' && pass === '1111') {
        state.currentUser = {
          id: 'usr_admin',
          firstName: 'Super',
          lastName: 'Admin',
          name: 'Super Admin',
          email,
          role: 'ADMIN'
        };
        state.isAuthModalOpen = false;
        triggerToast("👑 Welcome Super Admin! God-Mode Activated.");
        return;
      }

      state.currentUser = {
        id: `usr_${Date.now()}`,
        firstName: 'Alex',
        lastName: 'Mercer',
        name: 'Alex Mercer',
        email,
        role: 'CLIENT'
      };
      state.isAuthModalOpen = false;
      triggerToast("🔑 Logged in successfully!");
    });
  }

  window.addEventListener('DOMContentLoaded', render);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    render();
  }
})();
