import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { X, Mail, Lock, User as UserIcon, ArrowRight, Sparkles, Store, Utensils, LockKeyhole } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, signUpUser, signInUser, language, openAuthModal } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'client' | 'business'>('client');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const isSignUp = authModalMode === 'signup';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
        setError('Barcha maydonlarni to\'ldiring');
        return;
      }
      signUpUser(firstName.trim(), lastName.trim(), email.trim(), 'CLIENT');
    } else {
      if (!email.trim() || !password.trim()) {
        setError('Email va parolni kiriting');
        return;
      }
      signInUser(email.trim());
    }

    // Reset inputs
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const t = {
    EN: {
      titleSignUp: "Create CRAVE2026 Account",
      titleSignIn: "Sign In to CRAVE2026",
      subtitle: "Experience sensory food discovery and direct gourmet reservation engine.",
      tabClient: "Standard Registration",
      tabBusiness: "Business Registration",
      comingSoon: "Coming Soon (Tez kunda)",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      password: "Password",
      btnSignUp: "Create Account",
      btnSignIn: "Sign In",
      toggleSignIn: "Already have an account? Sign In",
      toggleSignUp: "Don't have an account? Sign Up",
    },
    UZ: {
      titleSignUp: "CRAVE2026 Ro'yxatdan O'tish",
      titleSignIn: "CRAVE2026 Tizimiga Kirish",
      subtitle: "Sensory restoranlarni kashf etish va oshpazlar bilan muloqot qilish uchun kiring.",
      tabClient: "Mijoz (Gourmet Foodie)",
      tabBusiness: "Biznes uchun (Business)",
      comingSoon: "Tez kunda",
      firstName: "Ism (First Name)",
      lastName: "Familiya (Last Name)",
      email: "Email Manzili",
      password: "Parol",
      btnSignUp: "Ro'yxatdan O'tish",
      btnSignIn: "Tizimga Kirish",
      toggleSignIn: "Hisobingiz bormi? Kirish",
      toggleSignUp: "Hisobingiz yo'qmi? Registratsiya",
    },
    RU: {
      titleSignUp: "Регистрация в CRAVE2026",
      titleSignIn: "Вход в CRAVE2026",
      subtitle: "Открывайте авторские заведения и чатитесь с шеф-поварами.",
      tabClient: "Клиент (Гурман)",
      tabBusiness: "Для Бизнеса",
      comingSoon: "Скоро",
      firstName: "Имя",
      lastName: "Фамилия",
      email: "Электронная почта",
      password: "Пароль",
      btnSignUp: "Создать Аккаунт",
      btnSignIn: "Войти",
      toggleSignIn: "Уже есть аккаунт? Войти",
      toggleSignUp: "Еще нет аккаунта? Зарегистрироваться",
    },
    JP: {
      titleSignUp: "CRAVE2026 新規アカウント登録",
      titleSignIn: "CRAVE2026 ログイン",
      subtitle: "五感で愉しむレストラン検索とリアルタイム予約チャット",
      tabClient: "一般登録 (Client)",
      tabBusiness: "ビジネス登録",
      comingSoon: "近日公開 (Coming Soon)",
      firstName: "名 (First Name)",
      lastName: "姓 (Last Name)",
      email: "メールアドレス",
      password: "パスワード",
      btnSignUp: "登録して開始",
      btnSignIn: "ログイン",
      toggleSignIn: "アカウントをお持ちの方はこちら",
      toggleSignUp: "新規登録はこちら",
    }
  }[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

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
            <span>Auth Engine</span>
          </div>
          <h3 className="text-2xl font-black text-white">
            {isSignUp ? t.titleSignUp : t.titleSignIn}
          </h3>
          <p className="text-xs text-gray-400 mt-1 font-medium">{t.subtitle}</p>
        </div>

        {/* Business Registration Toggle Tabs (Only on Sign Up) */}
        {isSignUp && (
          <div className="grid grid-cols-2 gap-2 mb-6 p-1.5 rounded-2xl bg-surface border border-border">
            <button
              type="button"
              onClick={() => setActiveTab('client')}
              className={`py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'client'
                  ? 'bg-primary text-white shadow-neon'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>{t.tabClient}</span>
            </button>

            {/* CRITICAL: Visually DISABLED Business Registration Tab with Coming Soon Badge */}
            <div className="relative group cursor-not-allowed">
              <button
                type="button"
                disabled
                className="w-full py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 bg-card/40 text-gray-500 border border-dashed border-gray-700 opacity-60 cursor-not-allowed select-none"
              >
                <Store className="w-3.5 h-3.5 text-gray-500" />
                <span>{t.tabBusiness}</span>
                <LockKeyhole className="w-3 h-3 text-orange-400 ml-1" />
              </button>
              {/* Coming Soon Badge Overlay */}
              <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[9px] font-black uppercase shadow-neon tracking-wider animate-pulse">
                {t.comingSoon}
              </div>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold text-center">
            {error}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.firstName}</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Alex"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-surface border border-border text-white text-xs focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.lastName}</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Mercer"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-surface border border-border text-white text-xs focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.email}</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.mercer@foodie.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-white text-xs focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.password}</label>
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
            <span>{isSignUp ? t.btnSignUp : t.btnSignIn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Mode Switcher */}
        <div className="text-center mt-5 pt-4 border-t border-border/60">
          <button
            type="button"
            onClick={() => openAuthModal(isSignUp ? 'signin' : 'signup')}
            className="text-xs font-bold text-gray-400 hover:text-primary transition-colors"
          >
            {isSignUp ? t.toggleSignIn : t.toggleSignUp}
          </button>
        </div>
      </div>
    </div>
  );
};
