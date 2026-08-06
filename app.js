// CRAVE2026 Interactive Application Engine with Maps, Owner CRUD, i18n & Admin Panel
(function () {
  const state = {
    language: 'EN',   // 'EN' | 'UZ' | 'RU' | 'JP'
    currentUser: {
      id: 'usr_1',
      firstName: 'Kenji',
      lastName: 'Takahashi',
      name: 'Chef Kenji Takahashi',
      email: 'kenji@omakase.io',
      role: 'ADMIN'  // Options: 'CLIENT' | 'BUSINESS' | 'ADMIN'
    },
    searchQuery: '',
    selectedCategory: 'All',
    placeholderIndex: 0,
    isAuthModalOpen: false,
    authModalMode: 'signin',
    authError: '',
    toastMessage: null,
    isAdminViewOpen: false,
    isEditingReview: false,
    isEditingSpot: false,
    reviewRating: 5,
    reviewText: '',
    editTitle: '',
    editPhone: '',
    editPrice: '',
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
      { id: 'usr_1', name: 'Chef Kenji Takahashi', email: 'kenji@omakase.io', role: 'ADMIN' },
      { id: 'usr_2', name: 'Alex Mercer', email: 'alex@foodie.com', role: 'CLIENT' },
      { id: 'usr_3', name: 'Marco Rossi', email: 'marco@woodfire.io', role: 'BUSINESS' },
      { id: 'usr_4', name: 'Antoine Laurent', email: 'antoine@steak.io', role: 'BUSINESS' },
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
        ownerId: 'usr_1',
        ownerName: 'Chef Kenji Takahashi',
        title: 'Miyabi Omakase & Edomae Sushi',
        category: 'Omakase & Sushi',
        description: 'Ultra-exclusive 12-seat Japanese omakase experience featuring wild-caught bluefin tuna imported daily from Toyosu Market, Tokyo.',
        coverImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
        phoneNumber: '+998 90 999 88 77',
        priceInfo: 'Avg $120 / guest',
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
            text: 'The Toyosu Bluefin Toro was melt-in-your-mouth perfection! Chef Kenji personally explained the aging process.'
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
      orderBookBtn: "🛒 Buyurtma Berish / Band Qilish (Tez kunda)",
      deliveryBadge: "🚚 Yetkazib Berish Hizmati: Tez kunda",
      lockTitle: "Restoran Haqida Eksklyuziv Ma'lumotlar Bloklangan",
      lockDesc: "Telefon raqamlari, narxlar va haqiqiy sharhlarni ko'rish uchun Tizimga Kiring yoki Registratsiya qiling.",
      lockBtn: "Kirish Yoki Ro'yxatdan O'tish",
      adminPanelBtn: "🛡️ Admin Paneli",
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
      orderBookBtn: "🛒 Заказать / Забронировать (Скоро)",
      deliveryBadge: "🚚 Доставка и Курьер: Скоро",
      lockTitle: "Эксклюзивная Информация Заблокирована",
      lockDesc: "Пожалуйста, Войдите или Зарегистрируйтесь, чтобы увидеть номера телефонов, цены и отзывы.",
      lockBtn: "Войти Или Зарегистрироваться",
      adminPanelBtn: "🛡️ Панель Админа",
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
      orderBookBtn: "🛒 注文 / 予約（近日公開）",
      deliveryBadge: "🚚 配送・宅配サービス: 近日公開",
      lockTitle: "限定情報がロックされています",
      lockDesc: "電話番号、価格、レビューを表示するにはログインまたは新規登録してください。",
      lockBtn: "ログインまたは登録",
      adminPanelBtn: "🛡️ 管理者パネル",
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

    // ADMIN VIEW MODAL
    if (state.isAdminViewOpen) {
      app.innerHTML = `
        <div class="min-h-screen bg-[#0f0f11] text-white flex flex-col justify-between p-6">
          <div class="max-w-7xl mx-auto w-full space-y-8">
            <div class="flex items-center justify-between border-b border-[#2a2a32] pb-4">
              <div>
                <span class="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-400 text-[10px] font-black uppercase">Super Admin Engine</span>
                <h1 class="text-3xl font-black text-white mt-1">🛡️ CRAVE2026 Admin Dashboard</h1>
              </div>
              <button id="btn-close-admin" class="px-4 py-2 rounded-xl bg-[#18181c] border border-[#2a2a32] text-xs font-bold text-white hover:border-[#ff4500]">
                ← Back to Main Feed
              </button>
            </div>

            <!-- Manage Users Table -->
            <div class="p-6 rounded-3xl bg-[#1f1f24] border border-[#2a2a32] space-y-4">
              <h3 class="text-lg font-black text-white">1. Manage Users (${state.usersList.length})</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-gray-300">
                  <thead class="bg-[#18181c] text-gray-400 uppercase font-extrabold">
                    <tr>
                      <th class="p-3">ID</th>
                      <th class="p-3">Name</th>
                      <th class="p-3">Email</th>
                      <th class="p-3">Role</th>
                      <th class="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#2a2a32]">
                    ${state.usersList.map((u) => `
                      <tr>
                        <td class="p-3 font-mono text-gray-500">${u.id}</td>
                        <td class="p-3 font-bold text-white">${u.name}</td>
                        <td class="p-3">${u.email}</td>
                        <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#ff4500]/20 text-[#ff4500]">${u.role}</span></td>
                        <td class="p-3 text-right">
                          <button data-delete-user="${u.id}" class="btn-del-user px-3 py-1 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold">Delete User</button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Manage Spots Table -->
            <div class="p-6 rounded-3xl bg-[#1f1f24] border border-[#2a2a32] space-y-4">
              <h3 class="text-lg font-black text-white">2. Moderate Spots (${state.spots.length})</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-gray-300">
                  <thead class="bg-[#18181c] text-gray-400 uppercase font-extrabold">
                    <tr>
                      <th class="p-3">Title</th>
                      <th class="p-3">Category</th>
                      <th class="p-3">Owner</th>
                      <th class="p-3">Status</th>
                      <th class="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#2a2a32]">
                    ${state.spots.map((spot) => `
                      <tr>
                        <td class="p-3 font-bold text-white">${spot.title}</td>
                        <td class="p-3">${spot.category}</td>
                        <td class="p-3 text-gray-400">${spot.ownerName}</td>
                        <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400">${spot.status}</span></td>
                        <td class="p-3 text-right space-x-2">
                          <button data-approve-spot="${spot.id}" class="btn-appr-spot px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">Approve</button>
                          <button data-delete-spot="${spot.id}" class="btn-del-spot px-3 py-1 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold">Delete Spot</button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      `;
      bindAdminEvents();
      return;
    }

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
                  <span class="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-[#ff4500]/20 text-[#ff4500] font-bold uppercase">Spot Engine</span>
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

                ${state.currentUser && state.currentUser.role === 'ADMIN' ? `
                  <button id="btn-open-admin-panel" class="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-extrabold text-xs shadow-neon">
                    ${t.adminPanelBtn}
                  </button>
                ` : ''}

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

          <!-- Spots Grid -->
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

        <!-- Floating Gemini AI Widget Button -->
        <button id="btn-trigger-gemini" class="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-neon-gradient text-white font-extrabold text-xs shadow-neon ring-2 ring-[#ff4500]/50 ring-offset-2 ring-offset-black animate-pulse hover:scale-110 active:scale-95 transition-all duration-300">
          ${t.askGeminiBtn}
        </button>

        <!-- Spot Detail Modal with Maps, Owner Edit/Delete & Review System -->
        ${state.selectedSpotDetail ? `
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
            <div class="relative w-full max-w-3xl max-h-[90vh] rounded-3xl bg-[#1f1f24] border border-[#2a2a32] p-6 sm:p-8 shadow-2xl overflow-y-auto space-y-6">
              <button id="btn-close-detail-modal" class="absolute top-5 right-5 p-2 rounded-full bg-[#18181c] text-gray-400 hover:text-white">✕</button>

              <div class="relative h-64 w-full rounded-2xl overflow-hidden">
                <img src="${state.selectedSpotDetail.coverImage}" class="w-full h-full object-cover" />
                <div class="absolute bottom-3 left-3 bg-black/80 px-3 py-1.5 rounded-lg text-xs font-bold text-yellow-400">
                  ⭐ ${state.selectedSpotDetail.rating} (${state.selectedSpotDetail.reviewsCount} reviews)
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-3xl font-black text-white">${state.selectedSpotDetail.title}</h3>
                  <p class="text-xs text-gray-400 mt-1 font-medium">${state.selectedSpotDetail.description}</p>
                </div>
              </div>

              <!-- OWNER EDIT & DELETE CONTROLS -->
              ${state.currentUser && (state.currentUser.id === state.selectedSpotDetail.ownerId || state.currentUser.name === state.selectedSpotDetail.ownerName) ? `
                <div class="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between">
                  <span class="text-xs font-bold text-orange-400">✏️ Owner Controls (${state.selectedSpotDetail.ownerName})</span>
                  <div class="flex gap-2">
                    <button id="btn-owner-edit-spot" class="px-3 py-1.5 rounded-xl bg-[#18181c] text-xs font-bold text-white hover:border-[#ff4500]">
                      ${state.isEditingSpot ? 'Cancel Edit' : 'Edit Spot'}
                    </button>
                    <button id="btn-owner-delete-spot" class="px-3 py-1.5 rounded-xl bg-red-500/20 text-xs font-bold text-red-400">
                      Delete Spot
                    </button>
                  </div>
                </div>
              ` : ''}

              <!-- AUTH LOCK SCREEN (If NOT Logged In) -->
              ${!state.currentUser ? `
                <div class="p-8 rounded-2xl bg-[#18181c] border border-[#2a2a32] text-center space-y-4 shadow-2xl">
                  <div class="w-14 h-14 rounded-2xl bg-[#ff4500]/20 border border-[#ff4500]/40 flex items-center justify-center animate-bounce mx-auto text-2xl">
                    🔒
                  </div>
                  <h4 class="text-xl font-black text-white">${t.lockTitle}</h4>
                  <p class="text-xs text-gray-300 max-w-md mx-auto">${t.lockDesc}</p>
                  <button id="btn-lock-signin" class="px-6 py-3 rounded-xl bg-neon-gradient text-white text-xs font-black uppercase shadow-neon hover:scale-105 transition-all">
                    🔑 ${t.lockBtn}
                  </button>
                </div>
              ` : `
                <!-- AUTHENTICATED USER FULL VIEW -->
                <div class="space-y-6">
                  <!-- Delivery Banner -->
                  <div class="p-3.5 rounded-2xl bg-gradient-to-r from-orange-950/80 to-background border border-[#ff4500]/40 flex items-center gap-3">
                    <span class="text-xl animate-pulse">🚚</span>
                    <h4 class="text-xs font-black text-white">${t.deliveryBadge}</h4>
                  </div>

                  <!-- Info Grid -->
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div class="p-4 rounded-xl bg-[#18181c] border border-[#2a2a32] space-y-1">
                      <span class="text-[10px] font-bold text-gray-400">📞 Phone Number</span>
                      <p class="text-xs font-black text-white">${state.selectedSpotDetail.phoneNumber || '+998 90 999 88 77'}</p>
                    </div>

                    <div class="p-4 rounded-xl bg-[#18181c] border border-[#2a2a32] space-y-1">
                      <span class="text-[10px] font-bold text-gray-400">🏷️ Price Range</span>
                      <p class="text-xs font-black text-white">${state.selectedSpotDetail.priceInfo || 'Avg 180,000 UZS'}</p>
                    </div>

                    <div class="p-4 rounded-xl bg-[#18181c] border border-[#2a2a32] space-y-1">
                      <span class="text-[10px] font-bold text-gray-400">📍 Neighborhood</span>
                      <p class="text-xs font-black text-white">${state.selectedSpotDetail.location || 'Central Downtown'}</p>
                    </div>
                  </div>

                  <!-- MAP EMBED LOCATION SECTION -->
                  <div class="p-5 rounded-2xl bg-[#18181c] border border-[#2a2a32] space-y-3">
                    <h4 class="text-xs font-black text-white uppercase">📍 Location & Map Navigation</h4>
                    <p class="text-xs text-gray-300 font-medium">Address: <strong class="text-white">${state.selectedSpotDetail.address || '4-Chome Ginza District, Tokyo Promenade'}</strong></p>
                    <div class="w-full h-48 rounded-xl overflow-hidden border border-[#2a2a32]">
                      <iframe title="Map Embed" src="${state.selectedSpotDetail.mapEmbedUrl || 'https://maps.google.com/maps?q=Ginza,Tokyo&t=&z=13&ie=UTF8&iwloc=&output=embed'}" width="100%" height="100%" style="border:0" allowfullscreen loading="lazy"></iframe>
                    </div>
                  </div>

                  <!-- Side-by-side Action Buttons -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button id="btn-modal-chat" class="py-3 rounded-xl bg-[#18181c] border border-[#ff4500]/50 text-white text-xs font-extrabold hover:bg-[#18181c]/80">
                      💬 Chat Directly with Chef (${state.selectedSpotDetail.ownerName})
                    </button>
                    <button id="btn-modal-order" class="py-3 rounded-xl bg-neon-gradient text-white text-xs font-black shadow-neon hover:scale-105">
                      ${t.orderBookBtn}
                    </button>
                  </div>
                </div>
              `}
            </div>
          </div>
        ` : ''}

        <!-- Footer -->
        <footer class="border-t border-[#2a2a32] py-6 px-4 text-center text-xs text-gray-500 font-medium">
          CRAVE2026 — Production Ready Spot Detail & E-commerce Prep Engine.
        </footer>
      </div>
    `;

    bindEvents();
  }

  function bindAdminEvents() {
    document.getElementById('btn-close-admin')?.addEventListener('click', () => {
      state.isAdminViewOpen = false;
      render();
    });

    document.querySelectorAll('.btn-del-user').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete-user');
        state.usersList = state.usersList.filter((u) => u.id !== id);
        triggerToast("🗑️ User deleted.");
        render();
      });
    });

    document.querySelectorAll('.btn-appr-spot').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-approve-spot');
        const s = state.spots.find((sp) => sp.id === id);
        if (s) s.status = 'APPROVED';
        triggerToast("✓ Spot approved!");
        render();
      });
    });

    document.querySelectorAll('.btn-del-spot').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete-spot');
        state.spots = state.spots.filter((sp) => sp.id !== id);
        triggerToast("🗑️ Spot deleted.");
        render();
      });
    });
  }

  function bindEvents() {
    document.getElementById('lang-select')?.addEventListener('change', (e) => {
      state.language = e.target.value;
      render();
    });

    document.getElementById('btn-open-admin-panel')?.addEventListener('click', () => {
      state.isAdminViewOpen = true;
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

    document.getElementById('btn-modal-order')?.addEventListener('click', () => {
      triggerToast("🚀 Ordering and Table Reservations are launching very soon! Stay tuned.");
    });

    document.getElementById('btn-lock-signin')?.addEventListener('click', () => {
      state.selectedSpotDetail = null;
      state.authModalMode = 'signin';
      state.isAuthModalOpen = true;
      render();
    });

    document.getElementById('btn-owner-delete-spot')?.addEventListener('click', () => {
      if (state.selectedSpotDetail) {
        state.spots = state.spots.filter((s) => s.id !== state.selectedSpotDetail.id);
        state.selectedSpotDetail = null;
        triggerToast("🗑️ Restaurant deleted.");
        render();
      }
    });

    document.getElementById('btn-trigger-gemini')?.addEventListener('click', () => {
      state.isGeminiModalOpen = true;
      render();
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
  }

  window.addEventListener('DOMContentLoaded', render);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    render();
  }
})();
