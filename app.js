// CRAVE2026 Interactive Application Engine (Refactored)
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
    isAuthModalOpen: false,
    authModalMode: 'signin', // 'signin' | 'signup'
    isAddSpotModalOpen: false,
    isChatOpen: false,
    selectedSpotDetail: null,
    activeSpot: null,
    unreadCount: 1,
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
      searchPlaceholder: "What are you craving today? (e.g. Omakase, Neapolitan, Wagyu)...",
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
      searchPlaceholder: "Bugun nimani tamaddidan xohlaysiz? (masalan: Omakase, Pitsa, Wagyu)...",
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
      searchPlaceholder: "Что вы хотите попробовать сегодня? (например, Суши, Пицца, Стейк)...",
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
      searchPlaceholder: "今日のごちそうは何ですか？（おまかせ、ラーメン、ピッツァ）...",
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
      <div class="min-h-screen flex flex-col justify-between">
        <div>
          <!-- Header Bar (Clean, NO mock role switcher) -->
          <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0f0f11]/90 border-b border-[#2a2a32] shadow-xl">
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
                  <span class="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-[#ff4500]/20 text-[#ff4500] font-bold uppercase">Sensory</span>
                </div>
              </div>

              <!-- Right Actions: Language Selector, Chat, Sign In / Sign Up or Logged User Profile -->
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

          <!-- Hero Section -->
          <section class="relative py-12 px-4 text-center border-b border-[#2a2a32]/60 bg-gradient-to-b from-[#0f0f11] via-[#18181c]/50 to-[#0f0f11]">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4500]/15 border border-[#ff4500]/40 text-xs font-extrabold text-[#ff4500] uppercase mb-4 shadow-neon">
              ✨ ${t.badge}
            </div>
            <h1 class="text-3xl sm:text-5xl font-black text-white max-w-4xl mx-auto leading-tight">
              ${t.headline}
            </h1>
            <p class="text-xs sm:text-sm text-gray-400 mt-2 max-w-2xl mx-auto font-medium">
              ${t.subtitle}
            </p>

            <div class="max-w-xl mx-auto mt-6 relative">
              <input id="input-search" type="text" value="${state.searchQuery}" placeholder="${t.searchPlaceholder}" class="w-full px-5 py-3.5 rounded-2xl bg-[#1f1f24] border border-[#2a2a32] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#ff4500] shadow-xl" />
            </div>

            <div class="flex flex-wrap items-center justify-center gap-2 mt-4">
              ${['All', 'Omakase & Sushi', 'Neapolitan Pizza', 'Dry-Aged Steak', 'Craft Ramen', 'Artisanal Pastry'].map((cat) => `
                <button data-category="${cat}" class="btn-category px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${state.selectedCategory === cat ? 'bg-neon-gradient text-white shadow-neon' : 'bg-[#1f1f24] border border-[#2a2a32] text-gray-400 hover:text-white'}">
                  ${cat === 'All' ? '🔥 All Categories' : cat}
                </button>
              `).join('')}
            </div>
          </section>

          <!-- Spots Grid -->
          <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-black text-white flex items-center gap-2">🧭 Sensory Dining Spots</h2>
              <span class="text-xs text-gray-400 font-bold bg-[#18181c] px-3 py-1 rounded-full border border-[#2a2a32]">${filteredSpots.length} Spots</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              ${filteredSpots.map((spot) => `
                <div data-view-spot-id="${spot.id}" class="card-spot-item rounded-3xl bg-[#1f1f24] border border-[#2a2a32] overflow-hidden flex flex-col justify-between hover:border-[#ff4500]/60 transition-all duration-300 cursor-pointer group">
                  <div class="relative h-48 bg-[#18181c] overflow-hidden">
                    <img src="${spot.coverImage}" alt="${spot.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 text-[10px] font-extrabold text-white">${spot.category}</div>
                    <div class="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 text-[10px] font-bold text-gray-300">👁️ ${spot.viewsToday} ${t.views}</div>
                  </div>

                  <div class="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div class="flex items-center justify-between text-xs mb-2">
                        <span class="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">✓ ${t.approved}</span>
                        <span class="font-bold text-yellow-400">⭐ ${spot.rating} (${spot.reviewsCount})</span>
                      </div>
                      <h3 class="text-base font-black text-white group-hover:text-[#ff4500] transition-colors line-clamp-1">${spot.title}</h3>
                      <p class="text-xs text-gray-400 line-clamp-2 mt-1">${spot.description}</p>
                    </div>

                    <div class="pt-4 mt-4 border-t border-[#2a2a32] flex items-center justify-between gap-2">
                      <button data-spot-id="${spot.id}" class="btn-spot-chat flex-1 py-2 rounded-xl bg-[#18181c] border border-[#ff4500]/40 hover:bg-[#ff4500] text-white text-xs font-bold transition-all">
                        💬 ${t.chatWithOwner}
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        </div>

        <!-- Auth Modal (Sign In / Sign Up with DISABLED Business Tab + Coming Soon Badge) -->
        ${state.isAuthModalOpen ? `
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
            <div class="relative w-full max-w-lg rounded-3xl bg-[#1f1f24] border border-[#2a2a32] p-6 sm:p-8 shadow-2xl space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <span class="px-2.5 py-0.5 rounded bg-[#ff4500]/20 text-[#ff4500] text-[10px] font-black uppercase">Auth System</span>
                  <h3 class="text-xl font-black text-white mt-1">${state.authModalMode === 'signup' ? t.signUp : t.signIn}</h3>
                </div>
                <button id="btn-close-auth" class="p-1.5 rounded-full bg-[#18181c] text-gray-400 hover:text-white">✕</button>
              </div>

              ${state.authModalMode === 'signup' ? `
                <!-- Sign Up Registration Tabs -->
                <div class="grid grid-cols-2 gap-2 mb-2 p-1.5 rounded-2xl bg-[#18181c] border border-[#2a2a32]">
                  <button type="button" class="py-2 px-3 rounded-xl text-xs font-extrabold bg-[#ff4500] text-white shadow-neon">
                    🍕 ${t.tabClient}
                  </button>

                  <!-- CRITICAL: Visually DISABLED Business Registration Tab with Coming Soon Badge -->
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

        <!-- Spot Detail Showcase Modal with Interactive 5-Star Rating & Remove Rating Button -->
        ${state.selectedSpotDetail ? `
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
            <div class="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-[#1f1f24] border border-[#2a2a32] p-6 shadow-2xl overflow-y-auto space-y-4">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-[#ff4500]/20 text-[#ff4500] text-xs font-black uppercase">${state.selectedSpotDetail.category}</span>
                <button id="btn-close-detail-modal" class="p-1.5 rounded-full bg-[#18181c] text-gray-400 hover:text-white">✕</button>
              </div>

              <div class="relative h-60 w-full rounded-2xl overflow-hidden">
                <img src="${state.selectedSpotDetail.coverImage}" class="w-full h-full object-cover" />
                <div class="absolute bottom-3 left-3 bg-black/80 px-3 py-1 rounded-lg text-xs font-bold text-yellow-400">
                  ⭐ ${state.selectedSpotDetail.rating} (${state.selectedSpotDetail.reviewsCount} reviews)
                </div>
              </div>

              <div>
                <h3 class="text-2xl font-black text-white">${state.selectedSpotDetail.title}</h3>
                <p class="text-xs text-gray-400 mt-1 font-medium">${state.selectedSpotDetail.description}</p>
              </div>

              <!-- Interactive Rating Component -->
              <div class="p-4 rounded-2xl bg-[#18181c] border border-[#2a2a32] space-y-2">
                <h4 class="font-extrabold text-white text-xs">⭐ ${t.rateTitle}</h4>
                <div class="flex items-center gap-2">
                  ${[1, 2, 3, 4, 5].map((star) => {
                    const userRating = state.selectedSpotDetail.userRatings ? state.selectedSpotDetail.userRatings[state.currentUser?.id] : null;
                    const isStarActive = userRating && userRating >= star;
                    return `
                      <button data-star-val="${star}" class="btn-rate-star p-1 text-2xl hover:scale-125 transition-transform ${isStarActive ? 'text-yellow-400' : 'text-gray-600'}">
                        ★
                      </button>
                    `;
                  }).join('')}

                  ${state.currentUser && state.selectedSpotDetail.userRatings && state.selectedSpotDetail.userRatings[state.currentUser.id] ? `
                    <span class="text-xs font-bold text-yellow-400 ml-2">Your Rating: ⭐ ${state.selectedSpotDetail.userRatings[state.currentUser.id]}/5</span>
                  ` : ''}
                </div>

                <!-- Remove Rating Button (Bahoni o'chirish) -->
                ${state.currentUser && state.selectedSpotDetail.userRatings && state.selectedSpotDetail.userRatings[state.currentUser.id] ? `
                  <div class="pt-2">
                    <button id="btn-remove-rating" class="px-3.5 py-1.5 rounded-xl bg-red-500/15 border border-red-500/40 hover:bg-red-500 text-white text-xs font-bold transition-all">
                      🗑️ ${t.removeRatingBtn}
                    </button>
                  </div>
                ` : (!state.currentUser ? `<p class="text-[11px] text-gray-500">${t.signInToRate}</p>` : '')}
              </div>

              <button id="btn-detail-chat" class="w-full py-3 rounded-xl bg-neon-gradient text-white text-xs font-extrabold shadow-neon">
                💬 Chat Directly with Chef (${state.selectedSpotDetail.ownerName})
              </button>
            </div>
          </div>
        ` : ''}

        <!-- Chat Drawer Slideover -->
        ${state.isChatOpen ? `
          <div class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#1f1f24] border-l border-[#2a2a32] shadow-2xl flex flex-col justify-between">
            <div class="p-4 border-b border-[#2a2a32] bg-[#18181c] flex items-center justify-between">
              <h4 class="text-sm font-black text-white">💬 ${t.chatTitle}</h4>
              <button id="btn-close-chat" class="p-1.5 rounded-lg bg-[#1f1f24] text-gray-400 hover:text-white">✕</button>
            </div>

            <div class="flex-1 overflow-y-auto p-4 space-y-3">
              ${state.messages.map((m) => `
                <div class="flex flex-col ${m.isMe ? 'items-end' : 'items-start'}">
                  <span class="text-[10px] text-gray-500 font-bold mb-1">${m.senderName}</span>
                  <div class="max-w-[85%] px-3.5 py-2 rounded-2xl text-xs ${m.isMe ? 'bg-neon-gradient text-white' : 'bg-[#18181c] border border-[#2a2a32] text-gray-200'}">
                    ${m.content}
                  </div>
                </div>
              `).join('')}
            </div>

            <form id="form-chat" class="p-4 border-t border-[#2a2a32] flex gap-2">
              <input id="input-chat-msg" type="text" placeholder="Type message to owner..." class="flex-1 px-3 py-2 rounded-xl bg-[#18181c] border border-[#2a2a32] text-xs text-white focus:outline-none" />
              <button type="submit" class="px-4 py-2 rounded-xl bg-neon-gradient text-white text-xs font-bold shadow-neon">${t.send}</button>
            </form>
          </div>
        ` : ''}

        <!-- Footer -->
        <footer class="border-t border-[#2a2a32] py-6 px-4 text-center text-xs text-gray-500 font-medium">
          CRAVE2026 — Production Ready Sensory Food Discovery Engine.
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

    // Sign In / Sign Up triggers
    document.getElementById('btn-header-signin')?.addEventListener('click', () => {
      state.authModalMode = 'signin';
      state.isAuthModalOpen = true;
      render();
    });

    document.getElementById('btn-header-signup')?.addEventListener('click', () => {
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
      state.authModalMode = state.authModalMode === 'signup' ? 'signin' : 'signup';
      render();
    });

    // Form Auth submission
    document.getElementById('form-user-auth')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('reg-email').value;
      const fnameInput = document.getElementById('reg-fname');
      const lnameInput = document.getElementById('reg-lname');

      const firstName = fnameInput ? fnameInput.value : email.split('@')[0];
      const lastName = lnameInput ? lnameInput.value : 'Foodie';

      state.currentUser = {
        id: `usr_${Date.now()}`,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email,
        role: 'CLIENT'
      };

      state.isAuthModalOpen = false;
      render();
    });

    // Rating star clicks
    document.querySelectorAll('.btn-rate-star').forEach((starBtn) => {
      starBtn.addEventListener('click', () => {
        if (!state.currentUser) {
          state.authModalMode = 'signin';
          state.isAuthModalOpen = true;
          render();
          return;
        }

        const val = parseInt(starBtn.getAttribute('data-star-val'), 10);
        if (state.selectedSpotDetail) {
          if (!state.selectedSpotDetail.userRatings) state.selectedSpotDetail.userRatings = {};
          state.selectedSpotDetail.userRatings[state.currentUser.id] = val;
          state.selectedSpotDetail.rating = val;
          render();
        }
      });
    });

    // Remove Rating button click
    document.getElementById('btn-remove-rating')?.addEventListener('click', () => {
      if (state.currentUser && state.selectedSpotDetail && state.selectedSpotDetail.userRatings) {
        delete state.selectedSpotDetail.userRatings[state.currentUser.id];
        state.selectedSpotDetail.rating = 4.8;
        render();
      }
    });

    // Chat Drawer triggers
    document.getElementById('btn-open-chat')?.addEventListener('click', () => {
      state.isChatOpen = !state.isChatOpen;
      state.unreadCount = 0;
      render();
    });

    document.getElementById('btn-close-chat')?.addEventListener('click', () => {
      state.isChatOpen = false;
      render();
    });

    document.querySelectorAll('.card-spot-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.btn-spot-chat')) return;
        const id = item.getAttribute('data-view-spot-id');
        const spot = state.spots.find((s) => s.id === id);
        if (spot) {
          spot.viewsToday += 1;
          state.selectedSpotDetail = spot;
          render();
        }
      });
    });

    document.getElementById('btn-close-detail-modal')?.addEventListener('click', () => {
      state.selectedSpotDetail = null;
      render();
    });

    document.getElementById('btn-detail-chat')?.addEventListener('click', () => {
      state.activeSpot = state.selectedSpotDetail;
      state.selectedSpotDetail = null;
      state.isChatOpen = true;
      state.unreadCount = 0;
      render();
    });

    document.querySelectorAll('.btn-spot-chat').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const spotId = btn.getAttribute('data-spot-id');
        const spot = state.spots.find((s) => s.id === spotId);
        state.activeSpot = spot;
        state.isChatOpen = true;
        state.unreadCount = 0;
        render();
      });
    });

    document.getElementById('form-chat')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('input-chat-msg');
      if (!input || !input.value.trim()) return;

      state.messages.push({
        id: `msg_${Date.now()}`,
        senderName: state.currentUser ? state.currentUser.name : 'Gourmet User',
        content: input.value.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      });

      input.value = '';
      render();

      setTimeout(() => {
        state.messages.push({
          id: `msg_reply_${Date.now()}`,
          senderName: state.activeSpot ? state.activeSpot.ownerName : 'Chef / Host',
          content: 'Thank you for your message! Our kitchen team has received your request and will hold your dining slot.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false
        });
        render();
      }, 1000);
    });
  }

  window.addEventListener('DOMContentLoaded', render);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    render();
  }
})();
