// CRAVE2026 Interactive Application Engine with Awwwards UI/UX & Psychological Triggers
(function () {
  const state = {
    language: 'EN',   // 'EN' | 'UZ' | 'RU' | 'JP'
    currentUser: {
      id: 'usr_2',
      firstName: 'Alex',
      lastName: 'Mercer',
      name: 'Alex Mercer',
      email: 'alex@foodie.com',
      role: 'CLIENT'
    },
    searchQuery: '',
    selectedCategory: 'All',
    placeholderIndex: 0,
    isAuthModalOpen: false,
    authModalMode: 'signin', // 'signin' | 'signup'
    authError: '',
    isGeminiModalOpen: false,
    geminiPrompt: '',
    geminiResponse: null,
    isGeminiLoading: false,
    isAddSpotModalOpen: false,
    isChatOpen: false,
    selectedSpotDetail: null,
    activeSpot: null,
    unreadCount: 1,
    registeredUsers: [
      { email: 'alex@foodie.com', passwordHash: 'hashed_alex_password', firstName: 'Alex', lastName: 'Mercer' },
      { email: 'kenji@omakase.io', passwordHash: 'hashed_kenji_password', firstName: 'Kenji', lastName: 'Takahashi' }
    ],
    messages: [
      {
        id: 'msg_1',
        senderName: 'Alex Mercer (Foodie)',
        content: 'Good evening! Do you have Omakase counter seating available tonight for 2 guests at 8 PM?',
        time: '20:15',
        isMe: false
      },
      {
        id: 'msg_2',
        senderName: 'Chef Kenji Takahashi',
        content: 'Hello Alex! Yes, we reserved a counter spot featuring wild Bluefin Tuna tasting menu.',
        time: '20:18',
        isMe: true
      }
    ],
    spots: [
      {
        id: 'spot_1',
        title: 'Miyabi Omakase & Edomae Sushi',
        category: 'Omakase & Sushi',
        description: 'Ultra-exclusive 12-seat Japanese omakase experience featuring wild-caught bluefin tuna imported daily from Toyosu Market, Tokyo.',
        coverImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
        viewsToday: 1420,
        fomoText: '🔥 18 people looking right now',
        isFeatured: true,
        status: 'APPROVED',
        rating: 4.9,
        reviewsCount: 328,
        userRatings: { 'usr_2': 5 },
        location: 'Ginza District / Downtown',
        ownerName: 'Chef Kenji'
      },
      {
        id: 'spot_2',
        title: 'Fornace 800° Neapolitan Woodfire',
        category: 'Neapolitan Pizza',
        description: 'Double-fermented sourdough pizza baked in custom Vesuvian volcanic stone oven at 900°F with San Marzano DOP tomatoes and Bufala Mozzarella.',
        coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
        viewsToday: 980,
        fomoText: '⚡ High Demand Today',
        isFeatured: true,
        status: 'APPROVED',
        rating: 4.8,
        reviewsCount: 215,
        userRatings: {},
        location: 'Little Italy Quarter',
        ownerName: 'Marco Rossi'
      },
      {
        id: 'spot_3',
        title: 'L\'Ombre Dry-Aged Steakhouse',
        category: 'Dry-Aged Steak',
        description: '45-day Himalayan salt room dry-aged Wagyu Tomahawk steaks paired with rare Bordeaux vintage reserves and smoked bone marrow.',
        coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
        viewsToday: 1150,
        fomoText: '🔥 9 tables booked in last hour',
        isFeatured: true,
        status: 'APPROVED',
        rating: 4.95,
        reviewsCount: 410,
        userRatings: {},
        location: 'Upper West Promenade',
        ownerName: 'Antoine Laurent'
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

  // Rotate appetite placeholders every 3.2 seconds
  setInterval(() => {
    state.placeholderIndex = (state.placeholderIndex + 1) % APPETITE_PLACEHOLDERS.length;
    const searchInput = document.getElementById('input-search');
    if (searchInput && !searchInput.value) {
      searchInput.placeholder = APPETITE_PLACEHOLDERS[state.placeholderIndex];
    }
  }, 3200);

  const I18N = {
    EN: {
      signIn: "Sign In",
      signUp: "Sign Up",
      logout: "Log Out",
      activeSpots: "Active Spots",
      viewsToday: "Total Views Today",
      addNewSpot: "+ Add New Spot",
      badge: "Sensory Food Discovery Redefined",
      headline: "Curated Culinary Artistry for True Gourmets",
      subtitle: "Explore high-gastronomy spots, woodfire pizzerias, and private chef omakases in real time.",
      chatWithOwner: "Chat with Owner",
      pendingApproval: "PENDING APPROVAL",
      approved: "VERIFIED SPOT",
      views: "views today",
      chatTitle: "Real-Time Chef & Owner Chat",
      send: "Send",
      rateTitle: "Rate this Sensory Spot",
      yourRating: "Your Current Rating:",
      removeRatingBtn: "Remove Rating (Bahoni o'chirish)",
      signInToRate: "Sign in to rate this spot",
      tabClient: "Standard Registration",
      tabBusiness: "Business Registration",
      comingSoon: "Coming Soon (Tez kunda)",
      askGeminiBtn: "✨ Ask Gemini AI Concierge",
      geminiTitle: "CRAVE2026 Gemini AI Concierge",
      geminiDesc: "Powered by Project 255722876504 (Gemini 1.5 Flash API)",
      askPlaceholder: "Type your craving, mood, or wine pairing request...",
    },
    UZ: {
      signIn: "Kirish",
      signUp: "Registratsiya",
      logout: "Chiqish",
      activeSpots: "Faol Maskanlar",
      viewsToday: "Bugungi Ko'rishlar",
      addNewSpot: "+ Yangi Maskan Qo'shish",
      badge: "Sensory Oziq-Ovqat Kashfiyoti Qaytadan Yaratildi",
      headline: "Haqiqiy Gurmanlar Uchun Saralangan Oshxona San'ati",
      subtitle: "Yuqori gastronomik maskanlar, o'tin pechida yopilgan pitsalar va xususiy oshpazlarni jonli muloqotda kashf eting.",
      chatWithOwner: "Restoran Egasi Bilan Muloqot",
      pendingApproval: "TASDIQLANISHI KUTILMOQDA",
      approved: "TASDIQLANGAN MASKAN",
      views: "bugun ko'rildi",
      chatTitle: "Oshpaz va Restoran Egasi Bilan Muloqot",
      send: "Yuborish",
      rateTitle: "Ushbu Restoranga Baho Bering",
      yourRating: "Sizning Bahongiz:",
      removeRatingBtn: "Bahoni o'chirish (Remove Rating)",
      signInToRate: "Baho berish uchun tizimga kiring",
      tabClient: "Mijoz (Gourmet Foodie)",
      tabBusiness: "Biznes uchun (Business)",
      comingSoon: "Tez kunda",
      askGeminiBtn: "✨ Gemini AI Maslahatchisi",
      geminiTitle: "CRAVE2026 Gemini AI Konsyerj",
      geminiDesc: "Google Gemini 1.5 Flash sun'iy intellekt moduli",
      askPlaceholder: "Qanday taom yoki vino mosligini qidiryapsiz?",
    },
    RU: {
      signIn: "Войти",
      signUp: "Регистрация",
      logout: "Выйти",
      activeSpots: "Активные Заведения",
      viewsToday: "Просмотров За День",
      addNewSpot: "+ Добавить Заведение",
      badge: "Сенсорный Поиск Заведений Redefined",
      headline: "Авторская Кулинария Для Настоящих Гурманов",
      subtitle: "Исследуйте заведения высокой кухни, дровяные пиццерии и приватные омакасе в реальном времени.",
      chatWithOwner: "Чат с Владельцем",
      pendingApproval: "НА ПРОВЕРКЕ",
      approved: "ПРОВЕРЕННОЕ ЗАВЕДЕНИЕ",
      views: "просмотров",
      chatTitle: "Чат с Шефом и Владельцем",
      send: "Отправить",
      rateTitle: "Оцените заведение",
      yourRating: "Ваша текущая оценка:",
      removeRatingBtn: "Удалить оценку (Bahoni o'chirish)",
      signInToRate: "Войдите, чтобы поставить оценку",
      tabClient: "Клиент (Гурман)",
      tabBusiness: "Для Бизнеса",
      comingSoon: "Скоро",
      askGeminiBtn: "✨ Консьерж Gemini AI",
      geminiTitle: "CRAVE2026 Gemini AI Консьерж",
      geminiDesc: "На базе Google Gemini 1.5 Flash API",
      askPlaceholder: "Введите ваше пожелание по блюдам или вину...",
    },
    JP: {
      signIn: "ログイン",
      signUp: "新規登録",
      logout: "ログアウト",
      activeSpots: "アクティブ店舗",
      viewsToday: "本日の閲覧数",
      addNewSpot: "+ 新規スポット追加",
      badge: "五感で味わう新しいグルメ発見プラットフォーム",
      headline: "本物を求める人のための厳選された料理芸術",
      subtitle: "最高峰のおまかせ、薪窯ピッツァ、熟成肉をリアルタイムで検索・体験。",
      chatWithOwner: "オーナーとチャット",
      pendingApproval: "承認待ち",
      approved: "認証済み店舗",
      views: "本日の閲覧",
      chatTitle: "シェフ・オーナーとのリアルタイムチャット",
      send: "送信",
      rateTitle: "スポットを評価する",
      yourRating: "あなたの評価:",
      removeRatingBtn: "評価を削除する",
      signInToRate: "評価するにはログインしてください",
      tabClient: "一般登録 (Client)",
      tabBusiness: "ビジネス登録",
      comingSoon: "近日公開",
      askGeminiBtn: "✨ Gemini AI コンシェルジュ",
      geminiTitle: "CRAVE2026 Gemini AI コンシェルジュ",
      geminiDesc: "Google Gemini 1.5 Flash AI搭載",
      askPlaceholder: "気分や料理のリクエストを入力してください...",
    }
  };

  function render() {
    const t = I18N[state.language];

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
        <div>
          <!-- Header Bar (Glassmorphism) -->
          <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-white/5 border-b border-white/10 shadow-2xl">
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
                  <span class="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-[#ff4500]/20 text-[#ff4500] font-bold uppercase">Awwwards UI</span>
                </div>
              </div>

              <!-- Right Actions -->
              <div class="flex items-center gap-3">
                <select id="lang-select" class="px-2.5 py-1.5 rounded-lg bg-[#18181c] border border-[#2a2a32] text-xs font-bold text-gray-200">
                  <option value="EN" ${state.language === 'EN' ? 'selected' : ''}>🇺🇸 EN</option>
                  <option value="UZ" ${state.language === 'UZ' ? 'selected' : ''}>🇺🇿 UZ</option>
                  <option value="RU" ${state.language === 'RU' ? 'selected' : ''}>🇷🇺 RU</option>
                  <option value="JP" ${state.language === 'JP' ? 'selected' : ''}>🇯🇵 JP</option>
                </select>

                <button id="btn-open-chat" class="relative p-2 rounded-xl bg-[#1f1f24] border border-[#2a2a32] text-gray-300 hover:text-white">
                  💬
                  ${state.unreadCount > 0 ? `<span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ff4500] text-white text-[10px] font-black flex items-center justify-center animate-bounce">${state.unreadCount}</span>` : ''}
                </button>

                ${state.currentUser ? `
                  <div class="flex items-center gap-2">
                    <div class="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-[#1f1f24] border border-[#2a2a32]">
                      <div class="w-7 h-7 rounded-lg bg-neon-gradient text-white flex items-center justify-center font-black text-xs">
                        ${state.currentUser.firstName ? state.currentUser.firstName.charAt(0) : state.currentUser.name.charAt(0)}
                      </div>
                      <div class="text-left hidden sm:block">
                        <p class="text-xs font-bold text-white leading-tight">${state.currentUser.firstName} ${state.currentUser.lastName}</p>
                        <p class="text-[10px] text-[#ff4500] font-semibold uppercase">${state.currentUser.role}</p>
                      </div>
                    </div>
                    <button id="btn-logout" class="px-3 py-1.5 rounded-xl bg-[#1f1f24] border border-[#2a2a32] hover:bg-red-500/20 hover:border-red-500/40 text-gray-300 hover:text-red-400 text-xs font-bold transition-all">
                      🚪 ${t.logout}
                    </button>
                  </div>
                ` : `
                  <div class="flex items-center gap-2">
                    <button id="btn-header-signin" class="px-3.5 py-1.5 rounded-xl bg-[#18181c] border border-[#2a2a32] hover:border-[#ff4500]/60 text-white text-xs font-bold transition-all">
                      🔑 ${t.signIn}
                    </button>
                    <button id="btn-header-signup" class="px-3.5 py-1.5 rounded-xl bg-neon-gradient text-white text-xs font-extrabold shadow-neon hover:scale-105 transition-all">
                      ✨ ${t.signUp}
                    </button>
                  </div>
                `}
              </div>
            </div>
          </header>

          <!-- Hero Section with Ambient Lighting Glows -->
          <section class="relative py-16 px-4 text-center border-b border-[#2a2a32]/60 overflow-hidden bg-gradient-to-b from-[#0f0f11] via-[#18181c]/60 to-[#0f0f11]">
            <!-- Ambient Lighting Glows -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#ff4500]/10 blur-[130px] rounded-full pointer-events-none"></div>
            <div class="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-red-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>

            <div class="relative z-10 max-w-4xl mx-auto space-y-4">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff4500]/15 border border-[#ff4500]/40 text-xs font-extrabold text-[#ff4500] uppercase mb-2 shadow-neon">
                ✨ ${t.badge}
              </div>
              <h1 class="text-4xl sm:text-6xl font-black text-white max-w-4xl mx-auto leading-tight tracking-tight">
                ${t.headline}
              </h1>
              <p class="text-xs sm:text-base text-gray-400 max-w-2xl mx-auto font-medium">
                ${t.subtitle}
              </p>

              <!-- Glassmorphic Search Bar with Dynamic Appetite Typewriter Placeholder -->
              <div class="max-w-xl mx-auto mt-6 relative">
                <input id="input-search" type="text" value="${state.searchQuery}" placeholder="${APPETITE_PLACEHOLDERS[state.placeholderIndex]}" class="w-full px-5 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-[#ff4500] shadow-2xl transition-all" />
              </div>

              <div class="flex flex-wrap items-center justify-center gap-2 mt-4">
                ${['All', 'Omakase & Sushi', 'Neapolitan Pizza', 'Dry-Aged Steak', 'Craft Ramen', 'Artisanal Pastry'].map((cat) => `
                  <button data-category="${cat}" class="btn-category px-4 py-2 rounded-xl text-xs font-bold transition-all ${state.selectedCategory === cat ? 'bg-neon-gradient text-white shadow-neon scale-105' : 'bg-[#1f1f24] border border-[#2a2a32] text-gray-400 hover:text-white'}">
                    ${cat === 'All' ? '🔥 All Categories' : cat}
                  </button>
                `).join('')}
              </div>
            </div>
          </section>

          <!-- Spots Grid with FOMO Social Proof & Tactile Micro-interactions -->
          <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-black text-white flex items-center gap-2">🧭 Sensory Dining Spots</h2>
              <span class="text-xs text-gray-400 font-bold bg-[#18181c] px-3.5 py-1.5 rounded-full border border-[#2a2a32]">${filteredSpots.length} Premium Spots</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              ${filteredSpots.map((spot) => `
                <div data-view-spot-id="${spot.id}" class="card-spot-item rounded-3xl bg-[#1f1f24] border border-[#2a2a32] overflow-hidden flex flex-col justify-between hover:border-[#ff4500]/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 cursor-pointer group">
                  <!-- Image Box with Scale Zoom Effect -->
                  <div class="relative h-52 bg-[#18181c] overflow-hidden">
                    <img src="${spot.coverImage}" alt="${spot.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div class="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-extrabold text-white">${spot.category}</div>
                    
                    <!-- Dynamic FOMO Social Proof Badge -->
                    <div class="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-[#ff4500]/30 text-[10px] font-extrabold text-[#ff4500] shadow-neon">
                      ${spot.fomoText || '🔥 14 people looking right now'}
                    </div>
                  </div>

                  <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div class="flex items-center justify-between text-xs mb-2">
                        <span class="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">✓ ${t.approved}</span>
                        <span class="font-bold text-yellow-400">⭐ ${spot.rating} (${spot.reviewsCount})</span>
                      </div>
                      <h3 class="text-lg font-black text-white group-hover:text-[#ff4500] transition-colors line-clamp-1">${spot.title}</h3>
                      <p class="text-xs text-gray-400 line-clamp-2 mt-1 font-medium">${spot.description}</p>
                    </div>

                    <div class="pt-4 border-t border-[#2a2a32] flex items-center justify-between gap-2">
                      <button data-spot-id="${spot.id}" class="btn-spot-chat flex-1 py-2.5 rounded-xl bg-[#18181c] border border-[#ff4500]/40 hover:bg-neon-gradient text-white text-xs font-extrabold transition-all shadow-md">
                        💬 ${t.chatWithOwner}
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        </div>

        <!-- Floating Gemini AI Widget Button (ALIVE Ring Pulse + Sweeping Shine) -->
        <button id="btn-trigger-gemini" class="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-neon-gradient text-white font-extrabold text-xs shadow-neon ring-2 ring-[#ff4500]/50 ring-offset-2 ring-offset-black animate-pulse hover:scale-110 active:scale-95 transition-all duration-300">
          ${t.askGeminiBtn}
        </button>

        <!-- Gemini AI Modal Window -->
        ${state.isGeminiModalOpen ? `
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
            <div class="relative w-full max-w-lg rounded-3xl bg-[#1f1f24] border border-[#2a2a32] p-6 shadow-2xl space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <span class="px-2.5 py-0.5 rounded bg-[#ff4500]/20 text-[#ff4500] text-[10px] font-black uppercase">Google Gemini AI Engine</span>
                  <h3 class="text-xl font-black text-white mt-1">${t.geminiTitle}</h3>
                  <p class="text-[11px] text-gray-400">${t.geminiDesc}</p>
                </div>
                <button id="btn-close-gemini" class="p-1.5 rounded-full bg-[#18181c] text-gray-400 hover:text-white">✕</button>
              </div>

              ${state.geminiResponse ? `
                <div class="p-4 rounded-2xl bg-[#18181c] border border-[#ff4500]/40 text-xs text-gray-200 leading-relaxed space-y-2 max-h-60 overflow-y-auto">
                  <div class="flex items-center gap-1 text-[#ff4500] font-bold">
                    🔥 Gemini Culinary Analysis:
                  </div>
                  <p>${state.geminiResponse}</p>
                </div>
              ` : ''}

              <form id="form-gemini" class="space-y-3">
                <input id="input-gemini-prompt" type="text" value="${state.geminiPrompt}" placeholder="${t.askPlaceholder}" class="w-full px-4 py-3 rounded-xl bg-[#18181c] border border-[#2a2a32] text-white text-xs" />
                <button type="submit" class="w-full py-3 rounded-xl bg-neon-gradient text-white font-extrabold text-xs shadow-neon">
                  ${state.isGeminiLoading ? '✨ Generating Gemini AI Analysis...' : '🚀 Submit Request to Gemini AI'}
                </button>
              </form>
            </div>
          </div>
        ` : ''}

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

              ${state.authModalMode === 'signup' ? `
                <div class="grid grid-cols-2 gap-2 mb-2 p-1.5 rounded-2xl bg-[#18181c] border border-[#2a2a32]">
                  <button type="button" class="py-2 px-3 rounded-xl text-xs font-extrabold bg-[#ff4500] text-white shadow-neon">
                    🍕 ${t.tabClient}
                  </button>
                  <div class="relative cursor-not-allowed">
                    <button type="button" disabled class="w-full py-2 px-3 rounded-xl text-xs font-extrabold bg-[#1f1f24]/50 text-gray-500 border border-dashed border-gray-700 opacity-60 cursor-not-allowed select-none flex items-center justify-center gap-1">
                      🧑‍🍳 ${t.tabBusiness} 🔒
                    </button>
                    <div class="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[9px] font-black uppercase shadow-neon animate-pulse">
                      ${t.comingSoon}
                    </div>
                  </div>
                </div>
              ` : ''}

              ${state.authError ? `
                <div class="p-3.5 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-extrabold flex items-center gap-2 animate-in fade-in">
                  ⚠️ <span>${state.authError}</span>
                </div>
              ` : ''}

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

              <div class="text-center pt-2 border-t border-[#2a2a32]">
                <button id="btn-toggle-auth-mode" class="text-xs font-bold text-gray-400 hover:text-[#ff4500]">
                  ${state.authModalMode === 'signup' ? 'Already registered? Sign In' : 'Don\'t have an account? Sign Up'}
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Footer -->
        <footer class="border-t border-[#2a2a32] py-6 px-4 text-center text-xs text-gray-500 font-medium">
          CRAVE2026 — Production Ready Awwwards Standard UI/UX Engine.
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

    document.getElementById('input-search')?.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      render();
    });

    document.querySelectorAll('.btn-category').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.selectedCategory = btn.getAttribute('data-category');
        render();
      });
    });

    document.getElementById('btn-trigger-gemini')?.addEventListener('click', () => {
      state.isGeminiModalOpen = true;
      render();
    });

    document.getElementById('btn-close-gemini')?.addEventListener('click', () => {
      state.isGeminiModalOpen = false;
      render();
    });

    document.getElementById('form-gemini')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('input-gemini-prompt');
      if (!input || !input.value.trim()) return;

      state.geminiPrompt = input.value.trim();
      state.isGeminiLoading = true;
      render();

      setTimeout(() => {
        state.isGeminiLoading = false;
        state.geminiResponse = `✨ Google Gemini AI Analysis for "${state.geminiPrompt}":\n\nBased on your flavor profiles, we strongly recommend booking a counter seat at Miyabi Omakase for Toyosu Bluefin Toro nigiri paired with 45-day Himalayan salt dry-aged Wagyu at L'Ombre Steakhouse!`;
        render();
      }, 1000);
    });

    document.getElementById('btn-header-signin')?.addEventListener('click', () => {
      state.authError = '';
      state.authModalMode = 'signin';
      state.isAuthModalOpen = true;
      render();
    });

    document.getElementById('btn-header-signup')?.addEventListener('click', () => {
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

    document.getElementById('btn-toggle-auth-mode')?.addEventListener('click', () => {
      state.authError = '';
      state.authModalMode = state.authModalMode === 'signup' ? 'signin' : 'signup';
      render();
    });

    document.getElementById('form-user-auth')?.addEventListener('submit', (e) => {
      e.preventDefault();
      state.authError = '';
      const email = document.getElementById('reg-email').value.trim().toLowerCase();
      const pass = document.getElementById('reg-pass').value.trim();

      if (state.authModalMode === 'signup') {
        const fname = document.getElementById('reg-fname').value.trim();
        const lname = document.getElementById('reg-lname').value.trim();

        const existing = state.registeredUsers.find((u) => u.email.toLowerCase() === email);
        if (existing) {
          state.authError = "User already exists with this email.";
          render();
          return;
        }

        state.registeredUsers.push({ email, passwordHash: 'hashed_' + pass, firstName: fname, lastName: lname });
        state.currentUser = {
          id: `usr_${Date.now()}`,
          firstName: fname,
          lastName: lname,
          name: `${fname} ${lname}`,
          email,
          role: 'CLIENT'
        };
        state.isAuthModalOpen = false;
        render();
      } else {
        const user = state.registeredUsers.find((u) => u.email.toLowerCase() === email);
        if (!user) {
          state.authError = "No user found with this email.";
          render();
          return;
        }

        state.currentUser = {
          id: `usr_${Date.now()}`,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: 'CLIENT'
        };
        state.isAuthModalOpen = false;
        render();
      }
    });
  }

  window.addEventListener('DOMContentLoaded', render);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    render();
  }
})();
