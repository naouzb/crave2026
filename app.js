// CRAVE2026 Interactive Application Engine
(function () {
  const state = {
    role: 'BUSINESS', // 'CLIENT' | 'BUSINESS' | 'ADMIN'
    language: 'EN',   // 'EN' | 'UZ' | 'RU' | 'JP'
    currentUser: {
      id: 'usr_business_1',
      name: 'Chef Kenji Takahashi',
      email: 'kenji@omakase.io',
      role: 'BUSINESS'
    },
    searchQuery: '',
    selectedCategory: 'All',
    isAuthModalOpen: false,
    isRegisterMode: true,
    authSelectedRole: 'CLIENT',
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
        location: 'Upper West Promenade',
        ownerName: 'Antoine Laurent'
      },
      {
        id: 'spot_4',
        title: 'Kuro Artisan Tonkotsu Ramen Lab',
        category: 'Craft Ramen',
        description: 'Simmered 24-hour pork bone collagen broth with hand-pulled black garlic rye noodles and charred slow-braised chashu belly.',
        coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
        viewsToday: 840,
        isFeatured: false,
        status: 'APPROVED',
        rating: 4.7,
        reviewsCount: 189,
        location: 'East Financial Center',
        ownerName: 'Chef Hiroshi'
      },
      {
        id: 'spot_5',
        title: 'Velvet Noir Pastry & Caviar Lounge',
        category: 'Artisanal Pastry',
        description: 'Hyper-sensory French patisserie with gold-leaf choux, Valrhona dark chocolate tartes, and premium Oscietra caviar champagne pairings.',
        coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
        viewsToday: 620,
        isFeatured: false,
        status: 'PENDING',
        rating: 4.6,
        reviewsCount: 94,
        location: 'Grand Plaza Tower',
        ownerName: 'Elena Rostova'
      }
    ]
  };

  const I18N = {
    EN: {
      adminMode: "ADMIN MODE ACTIVE",
      businessMode: "BUSINESS OWNER MODE",
      activeSpots: "Active Spots",
      viewsToday: "Total Views Today",
      addNewSpot: "+ Add New Spot",
      login: "Sign In / Register",
      logout: "Sign Out",
      foodieRole: "Hungry Foodie",
      ownerRole: "Restaurant Owner",
      adminRole: "Super Admin",
      badge: "Sensory Food Discovery Redefined",
      headline: "Curated Culinary Artistry for True Gourmets",
      subtitle: "Explore high-gastronomy spots, woodfire pizzerias, and private chef omakases in real time.",
      searchPlaceholder: "What are you craving today? (e.g. Omakase, Neapolitan, Wagyu)...",
      chatWithOwner: "Chat with Owner",
      pendingApproval: "PENDING APPROVAL",
      approved: "VERIFIED SPOT",
      approveBtn: "Approve Spot (Admin)",
      views: "views today",
      chatTitle: "Real-Time Chef & Owner Chat",
      chatOnline: "Chef / Owner Online - Direct Channel",
      send: "Send",
      viewDetails: "View Sensory Menu & Details",
    },
    UZ: {
      adminMode: "ADMIN REJIM FAOL",
      businessMode: "RESTORAN EGASI REJIMI",
      activeSpots: "Faol Maskanlar",
      viewsToday: "Bugungi Ko'rishlar",
      addNewSpot: "+ Yangi Maskan Qo'shish",
      login: "Kirish / Ro'yxatdan O'tish",
      logout: "Chiqish",
      foodieRole: "Mijoz (Foodie)",
      ownerRole: "Restoran Egasi",
      adminRole: "Super Admin",
      badge: "Sensory Oziq-Ovqat Kashfiyoti Qaytadan Yaratildi",
      headline: "Haqiqiy Gurmanlar Uchun Saralangan Oshxona San'ati",
      subtitle: "Yuqori gastronomik maskanlar, o'tin pechida yopilgan pitsalar va xususiy oshpazlarni jonli muloqotda kashf eting.",
      searchPlaceholder: "Bugun nimani tamaddidan xohlaysiz? (masalan: Omakase, Pitsa, Wagyu)...",
      chatWithOwner: "Restoran Egasi Bilan Muloqot",
      pendingApproval: "TASDIQLANISHI KUTILMOQDA",
      approved: "TASDIQLANGAN MASKAN",
      approveBtn: "Maskanni Tasdiqlash (Admin)",
      views: "bugun ko'rildi",
      chatTitle: "Oshpaz va Restoran Egasi Bilan Muloqot",
      chatOnline: "Restoran Egasi Tarmoqda - To'g'ridan-to'g'ri",
      send: "Yuborish",
      viewDetails: "Batafsil Menyuni Ko'rish",
    },
    RU: {
      adminMode: "АДМИН РЕЖИМ АКТИВЕН",
      businessMode: "РЕЖИМ ВЛАДЕЛЬЦА",
      activeSpots: "Активные Заведения",
      viewsToday: "Просмотров За День",
      addNewSpot: "+ Добавить Заведение",
      login: "Войти / Регистрация",
      logout: "Выйти",
      foodieRole: "Гурман (Клиент)",
      ownerRole: "Владелец Заведения",
      adminRole: "Супер Админ",
      badge: "Сенсорный Поиск Заведений Redefined",
      headline: "Авторская Кулинария Для Настоящих Гурманов",
      subtitle: "Исследуйте заведения высокой кухни, дровяные пиццерии и приватные омакасе в реальном времени.",
      searchPlaceholder: "Что вы хотите попробовать сегодня? (например, Суши, Пицца, Стейк)...",
      chatWithOwner: "Чат с Владельцем",
      pendingApproval: "НА ПРОВЕРКЕ",
      approved: "ПРОВЕРЕННОЕ ЗАВЕДЕНИЕ",
      approveBtn: "Одобрить (Админ)",
      views: "просмотров",
      chatTitle: "Чат с Шефом и Владельцем",
      chatOnline: "Владелец Онлайн - Прямой Канал",
      send: "Отправить",
      viewDetails: "Посмотреть Меню и Детали",
    },
    JP: {
      adminMode: "管理者モード アクティブ",
      businessMode: "店舗オーナーモード",
      activeSpots: "アクティブな店舗",
      viewsToday: "本日の閲覧数",
      addNewSpot: "+ 新規スポット追加",
      login: "ログイン / 登録",
      logout: "ログアウト",
      foodieRole: "グルメクライアント",
      ownerRole: "レストランオーナー",
      adminRole: "スーパー管理者",
      badge: "五感で味わう新しいグルメ発見プラットフォーム",
      headline: "本物を求める人のための厳選された料理芸術",
      subtitle: "最高峰のおまかせ、薪窯ピッツァ、熟成肉をリアルタイムで検索・体験。",
      searchPlaceholder: "今日のごちそうは何ですか？（おまかせ、ラーメン、ピッツァ）...",
      chatWithOwner: "オーナーとチャット",
      pendingApproval: "承認待ち",
      approved: "認証済み店舗",
      approveBtn: "承認する（管理者）",
      views: "本日の閲覧",
      chatTitle: "シェフ・オーナーとのリアルタイムチャット",
      chatOnline: "シェフオンライン - ダイレクトチャンネル",
      send: "送信",
      viewDetails: "メニュー・詳細を見る",
    }
  };

  function render() {
    const t = I18N[state.language];
    const totalViews = state.spots.reduce((acc, s) => acc + s.viewsToday, 0);
    const activeCount = state.spots.filter((s) => s.status === 'APPROVED').length;

    const filteredSpots = state.spots.filter((s) => {
      const q = state.searchQuery.toLowerCase();
      const matchQ = s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
      const matchC = state.selectedCategory === 'All' || s.category === state.selectedCategory;
      if (state.role === 'CLIENT') {
        return matchQ && matchC && s.status === 'APPROVED';
      }
      return matchQ && matchC;
    });

    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <div class="min-h-screen flex flex-col justify-between">
        <div>
          <!-- Header Bar -->
          <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0f0f11]/90 border-b border-[#2a2a32] shadow-xl">
            ${(state.role === 'BUSINESS' || state.role === 'ADMIN') ? `
              <div class="w-full bg-gradient-to-r from-orange-950/80 via-red-950/70 to-[#0f0f11] border-b border-orange-500/30 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div class="flex items-center gap-4">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 font-extrabold border border-orange-500/40">
                    ⚡ ${state.role === 'ADMIN' ? t.adminMode : t.businessMode}
                  </span>
                  <span class="text-gray-300 font-medium">${t.activeSpots}: <strong class="text-white font-bold">${activeCount}</strong></span>
                  <span class="text-gray-300 font-medium">${t.viewsToday}: <strong class="text-white font-bold">${totalViews.toLocaleString()}</strong></span>
                </div>
                <button id="btn-add-spot" class="px-3.5 py-1.5 rounded-lg bg-neon-gradient text-white font-bold text-xs hover:scale-105 transition-all shadow-neon">
                  ${t.addNewSpot}
                </button>
              </div>
            ` : ''}

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
                  <span class="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-[#ff4500]/20 text-[#ff4500] font-bold uppercase">Sensory Engine</span>
                </div>
              </div>

              <!-- Role Selector Bar -->
              <div class="hidden sm:flex items-center bg-[#1f1f24] border border-[#2a2a32] rounded-xl p-1 gap-1">
                <button id="role-client" class="px-3 py-1 rounded-lg text-xs font-bold ${state.role === 'CLIENT' ? 'bg-[#ff4500] text-white' : 'text-gray-400'}">🍕 ${t.foodieRole}</button>
                <button id="role-business" class="px-3 py-1 rounded-lg text-xs font-bold ${state.role === 'BUSINESS' ? 'bg-[#ff4500] text-white' : 'text-gray-400'}">🧑‍🍳 ${t.ownerRole}</button>
                <button id="role-admin" class="px-3 py-1 rounded-lg text-xs font-bold ${state.role === 'ADMIN' ? 'bg-red-600 text-white' : 'text-gray-400'}">⚡ ${t.adminRole}</button>
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

                <button id="btn-open-auth-modal" class="px-3.5 py-2 rounded-xl bg-[#1f1f24] border border-[#2a2a32] text-xs font-bold text-white flex items-center gap-2 hover:border-[#ff4500]/60 transition-all shadow-sm">
                  👤 <span>${state.currentUser ? state.currentUser.name : t.login}</span>
                </button>
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

            <!-- Search Bar -->
            <div class="max-w-xl mx-auto mt-6 relative">
              <input id="input-search" type="text" value="${state.searchQuery}" placeholder="${t.searchPlaceholder}" class="w-full px-5 py-3.5 rounded-2xl bg-[#1f1f24] border border-[#2a2a32] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#ff4500] shadow-xl" />
            </div>

            <!-- Categories -->
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
                        ${spot.status === 'PENDING' ? `
                          <span class="text-[10px] font-black text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/30">⚠️ ${t.pendingApproval}</span>
                        ` : `
                          <span class="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">✓ ${t.approved}</span>
                        `}
                        <span class="font-bold text-yellow-400">★ ${spot.rating} (${spot.reviewsCount})</span>
                      </div>
                      <h3 class="text-base font-black text-white group-hover:text-[#ff4500] transition-colors line-clamp-1">${spot.title}</h3>
                      <p class="text-xs text-gray-400 line-clamp-2 mt-1">${spot.description}</p>
                    </div>

                    <div class="pt-4 mt-4 border-t border-[#2a2a32] flex items-center justify-between gap-2">
                      <button data-spot-id="${spot.id}" class="btn-spot-chat flex-1 py-2 rounded-xl bg-[#18181c] border border-[#ff4500]/40 hover:bg-[#ff4500] text-white text-xs font-bold transition-all">
                        💬 ${t.chatWithOwner}
                      </button>
                      ${(state.role === 'ADMIN' && spot.status === 'PENDING') ? `
                        <button data-approve-id="${spot.id}" class="btn-spot-approve px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold">Approve</button>
                      ` : ''}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        </div>

        <!-- Registration & Login Auth Modal -->
        ${state.isAuthModalOpen ? `
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
            <div class="relative w-full max-w-lg rounded-3xl bg-[#1f1f24] border border-[#2a2a32] p-6 sm:p-8 shadow-2xl space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <span class="px-2.5 py-0.5 rounded bg-[#ff4500]/20 text-[#ff4500] text-[10px] font-black uppercase">User Access Engine</span>
                  <h3 class="text-xl font-black text-white mt-1">${state.isRegisterMode ? '✨ CRAVE2026 Ro\'yxatdan O\'tish' : '🔑 Tizimga Kirish'}</h3>
                </div>
                <button id="btn-close-auth" class="p-1.5 rounded-full bg-[#18181c] text-gray-400 hover:text-white">✕</button>
              </div>

              ${state.isRegisterMode ? `
                <!-- Role Selection Tabs -->
                <div class="grid grid-cols-2 gap-3">
                  <button id="auth-role-client" type="button" class="p-3 rounded-2xl border text-left transition-all ${state.authSelectedRole === 'CLIENT' ? 'border-[#ff4500] bg-[#ff4500]/15 text-white font-bold' : 'border-[#2a2a32] bg-[#18181c] text-gray-400'}">
                    <div class="text-xs font-extrabold mb-0.5">🍕 Hungry Foodie (Client)</div>
                    <div class="text-[10px] text-gray-400">Sensory restoranlarni qidiring & oshpazlar bilan muloqot qiling</div>
                  </button>

                  <button id="auth-role-business" type="button" class="p-3 rounded-2xl border text-left transition-all ${state.authSelectedRole === 'BUSINESS' ? 'border-[#ff4500] bg-[#ff4500]/15 text-white font-bold' : 'border-[#2a2a32] bg-[#18181c] text-gray-400'}">
                    <div class="text-xs font-extrabold mb-0.5">🧑‍🍳 Restaurant Owner</div>
                    <div class="text-[10px] text-gray-400">O'z maskaningizni qo'shing va buyurtmalar oling</div>
                  </button>
                </div>
              ` : ''}

              <form id="form-user-auth" class="space-y-3">
                ${state.isRegisterMode ? `
                  <div>
                    <label class="block text-xs font-bold text-gray-300 mb-1">Ism va Familiya</label>
                    <input id="reg-name" type="text" required placeholder="masalan: Rustamov Jamshid" class="w-full px-4 py-2.5 rounded-xl bg-[#18181c] border border-[#2a2a32] text-white text-xs" />
                  </div>
                ` : ''}

                <div>
                  <label class="block text-xs font-bold text-gray-300 mb-1">Email Manzili</label>
                  <input id="reg-email" type="email" required placeholder="newuser@crave2026.io" class="w-full px-4 py-2.5 rounded-xl bg-[#18181c] border border-[#2a2a32] text-white text-xs" />
                </div>

                <div>
                  <label class="block text-xs font-bold text-gray-300 mb-1">Parol</label>
                  <input id="reg-pass" type="password" required placeholder="••••••••••••" class="w-full px-4 py-2.5 rounded-xl bg-[#18181c] border border-[#2a2a32] text-white text-xs" />
                </div>

                <button type="submit" class="w-full py-3 rounded-xl bg-neon-gradient text-white font-extrabold text-xs shadow-neon">
                  ${state.isRegisterMode ? '✨ Ro\'yxatdan O\'tish va Boshlash' : '🔑 Tizimga Kirish'}
                </button>
              </form>

              <div class="text-center pt-2 border-t border-[#2a2a32]">
                <button id="btn-toggle-auth-mode" class="text-xs font-bold text-gray-400 hover:text-[#ff4500]">
                  ${state.isRegisterMode ? 'Hisobingiz bormi? Tizimga Kirish' : 'Yangi foydalanuvchimisiz? Ro\'yxatdan O\'tish'}
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Spot Detail Showcase Modal -->
        ${state.selectedSpotDetail ? `
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
            <div class="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-[#1f1f24] border border-[#2a2a32] p-6 shadow-2xl overflow-y-auto space-y-4">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-[#ff4500]/20 text-[#ff4500] text-xs font-black uppercase">${state.selectedSpotDetail.category}</span>
                <button id="btn-close-detail-modal" class="p-1.5 rounded-full bg-[#18181c] text-gray-400 hover:text-white">✕</button>
              </div>

              <div class="relative h-60 w-full rounded-2xl overflow-hidden">
                <img src="${state.selectedSpotDetail.coverImage}" class="w-full h-full object-cover" />
              </div>

              <div>
                <h3 class="text-2xl font-black text-white">${state.selectedSpotDetail.title}</h3>
                <p class="text-xs text-gray-400 mt-1 font-medium">${state.selectedSpotDetail.description}</p>
              </div>

              <div class="p-4 rounded-2xl bg-[#18181c] border border-[#2a2a32] space-y-2 text-xs">
                <h4 class="font-extrabold text-[#ff4500]">🍽️ Signature Tasting Course Menu</h4>
                <p class="text-gray-300">1. Wild Toyosu Otoro Nigiri with Wasabi Root</p>
                <p class="text-gray-300">2. Vesuvian Volcanic Margherita Sourdough</p>
                <p class="text-gray-300">3. A5 Miyazaki Wagyu Tomahawk Steak</p>
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

        <!-- Add Spot Modal -->
        ${state.isAddSpotModalOpen ? `
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div class="w-full max-w-lg rounded-3xl bg-[#1f1f24] border border-[#2a2a32] p-6 shadow-2xl space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-black text-white">➕ Add New Dining Spot</h3>
                <button id="btn-close-add-spot" class="text-gray-400 hover:text-white">✕</button>
              </div>
              <form id="form-add-spot" class="space-y-3">
                <input id="new-spot-title" type="text" required placeholder="Spot Title (e.g., Lumina Steakhouse)" class="w-full px-4 py-2.5 rounded-xl bg-[#18181c] border border-[#2a2a32] text-xs text-white" />
                <select id="new-spot-category" class="w-full px-4 py-2.5 rounded-xl bg-[#18181c] border border-[#2a2a32] text-xs text-white">
                  <option>Omakase & Sushi</option>
                  <option>Neapolitan Pizza</option>
                  <option>Dry-Aged Steak</option>
                  <option>Craft Ramen</option>
                  <option>Artisanal Pastry</option>
                </select>
                <textarea id="new-spot-desc" required placeholder="Sensory Concept Description..." class="w-full px-4 py-2.5 rounded-xl bg-[#18181c] border border-[#2a2a32] text-xs text-white" rows="3"></textarea>
                <input id="new-spot-img" type="url" required placeholder="Cover Image URL (HD Photo)" class="w-full px-4 py-2.5 rounded-xl bg-[#18181c] border border-[#2a2a32] text-xs text-white" />
                <button type="submit" class="w-full py-3 rounded-xl bg-neon-gradient text-white font-extrabold text-xs shadow-neon">Submit Spot for Approval (PENDING)</button>
              </form>
            </div>
          </div>
        ` : ''}

        <!-- Footer -->
        <footer class="border-t border-[#2a2a32] py-6 px-4 text-center text-xs text-gray-500 font-medium">
          CRAVE2026 — Production Ready Sensory Food Discovery & Restaurant Management Engine.
        </footer>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    document.getElementById('role-client')?.addEventListener('click', () => { state.role = 'CLIENT'; render(); });
    document.getElementById('role-business')?.addEventListener('click', () => { state.role = 'BUSINESS'; render(); });
    document.getElementById('role-admin')?.addEventListener('click', () => { state.role = 'ADMIN'; render(); });

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

    // Auth Modal Triggers & Form Submission
    document.getElementById('btn-open-auth-modal')?.addEventListener('click', () => {
      state.isAuthModalOpen = true;
      render();
    });

    document.getElementById('btn-close-auth')?.addEventListener('click', () => {
      state.isAuthModalOpen = false;
      render();
    });

    document.getElementById('auth-role-client')?.addEventListener('click', () => {
      state.authSelectedRole = 'CLIENT';
      render();
    });

    document.getElementById('auth-role-business')?.addEventListener('click', () => {
      state.authSelectedRole = 'BUSINESS';
      render();
    });

    document.getElementById('btn-toggle-auth-mode')?.addEventListener('click', () => {
      state.isRegisterMode = !state.isRegisterMode;
      render();
    });

    document.getElementById('form-user-auth')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('reg-email').value;
      const nameInput = document.getElementById('reg-name');
      const name = nameInput ? nameInput.value : email.split('@')[0];
      const role = state.isRegisterMode ? state.authSelectedRole : state.role;

      state.currentUser = {
        id: `usr_${Date.now()}`,
        name: name || 'New Gourmet User',
        email,
        role: role
      };

      state.role = role;
      state.isAuthModalOpen = false;
      render();

      if (role === 'BUSINESS' && state.isRegisterMode) {
        setTimeout(() => {
          state.isAddSpotModalOpen = true; // Automatically launch Business Onboarding
          render();
        }, 400);
      }
    });

    document.getElementById('btn-add-spot')?.addEventListener('click', () => {
      state.isAddSpotModalOpen = true;
      render();
    });

    document.getElementById('btn-close-add-spot')?.addEventListener('click', () => {
      state.isAddSpotModalOpen = false;
      render();
    });

    document.getElementById('form-add-spot')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('new-spot-title').value;
      const category = document.getElementById('new-spot-category').value;
      const description = document.getElementById('new-spot-desc').value;
      const coverImage = document.getElementById('new-spot-img').value;

      state.spots.unshift({
        id: `spot_${Date.now()}`,
        title,
        category,
        description,
        coverImage,
        viewsToday: 1,
        isFeatured: false,
        status: 'PENDING',
        rating: 5.0,
        reviewsCount: 1,
        location: 'Downtown District',
        ownerName: state.currentUser.name
      });

      state.isAddSpotModalOpen = false;
      render();
    });

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
        if (e.target.closest('.btn-spot-chat') || e.target.closest('.btn-spot-approve')) return;
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

    document.querySelectorAll('.btn-spot-approve').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const spotId = btn.getAttribute('data-approve-id');
        const spot = state.spots.find((s) => s.id === spotId);
        if (spot) spot.status = 'APPROVED';
        render();
      });
    });

    document.getElementById('form-chat')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('input-chat-msg');
      if (!input || !input.value.trim()) return;

      state.messages.push({
        id: `msg_${Date.now()}`,
        senderName: state.currentUser.name,
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
