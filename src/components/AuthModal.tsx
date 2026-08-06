import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useSpotStore } from '@/store/useSpotStore';
import { Role } from '@/types';
import { X, Utensils, Store, Mail, Lock, User as UserIcon, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, registerUser, loginAs, language } = useAuthStore();
  const { openAddSpotModal } = useSpotStore();

  const [isRegister, setIsRegister] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Role>('CLIENT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      const newUser = registerUser(
        name || (selectedRole === 'BUSINESS' ? 'Artisan Chef' : 'Sensory Foodie'),
        email || 'gourmet@crave2026.io',
        selectedRole
      );

      setSuccessMsg(`Welcome ${newUser.name}! Account created as ${selectedRole}`);

      setTimeout(() => {
        setSuccessMsg('');
        if (selectedRole === 'BUSINESS') {
          openAddSpotModal(); // Business onboarding: Add first spot
        }
      }, 1000);
    } else {
      loginAs({
        id: `usr_${Date.now()}`,
        name: name || 'Returning Gourmet',
        email: email || 'user@crave2026.io',
        role: selectedRole,
        createdAt: new Date().toISOString(),
      });
    }
  };

  const t = {
    EN: {
      titleRegister: "Join CRAVE2026 Sensory Platform",
      titleLogin: "Welcome Back to CRAVE2026",
      subtitle: "Register your account to unlock sensory dining or manage your restaurant",
      clientRoleTitle: "Hungry Foodie (Client)",
      clientRoleDesc: "Discover exclusive spots, sensory menus & real-time chef chat",
      businessRoleTitle: "Restaurant Owner (Business)",
      businessRoleDesc: "List your dining spots, receive direct reservations & analytics",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      submitRegister: "Create Account & Start Exploring",
      submitLogin: "Sign In to Account",
      toggleLogin: "Already registered? Sign In",
      toggleRegister: "New gourmet? Create Account",
    },
    UZ: {
      titleRegister: "CRAVE2026 Tizimida Ro'yxatdan O'tish",
      titleLogin: "CRAVE2026 Tizimiga Qaytishingiz Bilan",
      subtitle: "Oziq-ovqat kashfiyoti yoki restoraningizni boshqarish uchun hisob yarating",
      clientRoleTitle: "Mijoz / Foodie (Client)",
      clientRoleDesc: "Eksklyuziv restoranlarni kashf eting va oshpazlar bilan suhbatlashing",
      businessRoleTitle: "Restoran Egasi (Business)",
      businessRoleDesc: "O'z maskaningizni qo'shing, buyurtmalar oling va analitikani kuzating",
      nameLabel: "Ism-Familiya",
      emailLabel: "Email Manzili",
      passwordLabel: "Parol",
      submitRegister: "Ro'yxatdan O'tish va Boshlash",
      submitLogin: "Tizimga Kirish",
      toggleLogin: "Hisobingiz bormi? Kirish",
      toggleRegister: "Yangi foydalanuvchimisiz? Ro'yxatdan o'tish",
    },
    RU: {
      titleRegister: "Регистрация в CRAVE2026",
      titleLogin: "С возвращением в CRAVE2026",
      subtitle: "Создайте аккаунт для поиска заведений или управления рестораном",
      clientRoleTitle: "Гурман / Клиент",
      clientRoleDesc: "Открывайте авторские заведения и чатитесь с шеф-поварами",
      businessRoleTitle: "Владелец Заведения",
      businessRoleDesc: "Размещайте заведения, получайте чаты и аналитику в реальном времени",
      nameLabel: "Полное Имя",
      emailLabel: "Электронная почта",
      passwordLabel: "Пароль",
      submitRegister: "Зарегистрироваться",
      submitLogin: "Войти в Аккаунт",
      toggleLogin: "Уже зарегистрированы? Войти",
      toggleRegister: "Впервые у нас? Создать Аккаунт",
    },
    JP: {
      titleRegister: "CRAVE2026新規アカウント登録",
      titleLogin: "CRAVE2026へおかえりなさい",
      subtitle: "グルメ探索または店舗掲載のために登録してください",
      clientRoleTitle: "グルメクライアント (Client)",
      clientRoleDesc: "限定レストランの発見とリアルタイムシェフチャット",
      businessRoleTitle: "店舗オーナー (Business)",
      businessRoleDesc: "店舗掲載、閲覧分析、ダイレクトメッセージ機能",
      nameLabel: "お名前",
      emailLabel: "メールアドレス",
      passwordLabel: "パスワード",
      submitRegister: "新規登録して開始",
      submitLogin: "ログイン",
      toggleLogin: "アカウントをお持ちの方はこちら",
      toggleRegister: "新規登録はこちら",
    }
  }[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/30 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-surface border border-border hover:bg-border text-gray-400 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Identity & Access Engine</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white">
            {isRegister ? t.titleRegister : t.titleLogin}
          </h3>
          <p className="text-xs text-gray-400 mt-1 font-medium">{t.subtitle}</p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Role Selection Tabs (Only on Register) */}
        {isRegister && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setSelectedRole('CLIENT')}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedRole === 'CLIENT'
                  ? 'border-primary bg-primary/10 text-white shadow-neon'
                  : 'border-border bg-surface text-gray-400 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Utensils className={`w-4 h-4 ${selectedRole === 'CLIENT' ? 'text-primary' : 'text-gray-400'}`} />
                <span className="text-xs font-extrabold">{t.clientRoleTitle}</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-tight">{t.clientRoleDesc}</p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('BUSINESS')}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedRole === 'BUSINESS'
                  ? 'border-primary bg-primary/10 text-white shadow-neon'
                  : 'border-border bg-surface text-gray-400 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Store className={`w-4 h-4 ${selectedRole === 'BUSINESS' ? 'text-primary' : 'text-gray-400'}`} />
                <span className="text-xs font-extrabold">{t.businessRoleTitle}</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-tight">{t.businessRoleDesc}</p>
            </button>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.nameLabel}</label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rustamov Jamshid or Chef Marco"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-white text-xs focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.emailLabel}</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="newuser@crave2026.io"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-white text-xs focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.passwordLabel}</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-white text-xs focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-neon-gradient text-white font-extrabold text-xs shadow-neon hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{isRegister ? t.submitRegister : t.submitLogin}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Register / Login */}
        <div className="text-center mt-5 pt-4 border-t border-border/60">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs font-bold text-gray-400 hover:text-primary transition-colors"
          >
            {isRegister ? t.toggleLogin : t.toggleRegister}
          </button>
        </div>
      </div>
    </div>
  );
};
