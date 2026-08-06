import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { X, Lock, Mail, User as UserIcon, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, setRole, login, language } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'CLIENT' | 'BUSINESS'>('CLIENT');
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const cleanEmail = email.toLowerCase().trim();

    // GOD-MODE ADMIN LOGIN INTERCEPTOR
    if (cleanEmail === 'naouzb11@gmail.com' && password === '1111') {
      login({
        id: 'usr_admin',
        firstName: 'Super',
        lastName: 'Admin',
        name: 'Super Admin',
        email: cleanEmail,
        role: 'ADMIN',
        createdAt: new Date().toISOString(),
      });
      setIsLoading(false);
      triggerToast("👑 Welcome Super Admin! God-Mode Activated.");
      return;
    }

    if (authModalMode === 'signup') {
      if (!firstName || !lastName || !email || !password) {
        setError('Please fill in all required fields.');
        setIsLoading(false);
        return;
      }

      // Check duplicate email simulation
      if (cleanEmail === 'alex@foodie.com' || cleanEmail === 'kenji@omakase.io') {
        setError('⚠️ User already exists with this email.');
        setIsLoading(false);
        return;
      }

      login({
        id: `usr_${Date.now()}`,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        name: `${firstName.trim()} ${lastName.trim()}`,
        email: cleanEmail,
        role: selectedRole,
        createdAt: new Date().toISOString(),
      });
      setIsLoading(false);
      triggerToast("✨ Account created successfully!");
    } else {
      if (!email || !password) {
        setError('Email and Password are required.');
        setIsLoading(false);
        return;
      }

      // Standard user check
      if (cleanEmail !== 'alex@foodie.com' && cleanEmail !== 'kenji@omakase.io') {
        setError('⚠️ Invalid credentials. No registered user found.');
        setIsLoading(false);
        return;
      }

      login({
        id: `usr_${Date.now()}`,
        firstName: cleanEmail.includes('alex') ? 'Alex' : 'Chef Kenji',
        lastName: cleanEmail.includes('alex') ? 'Mercer' : 'Takahashi',
        name: cleanEmail.includes('alex') ? 'Alex Mercer' : 'Chef Kenji Takahashi',
        email: cleanEmail,
        role: cleanEmail.includes('kenji') ? 'BUSINESS' : 'CLIENT',
        createdAt: new Date().toISOString(),
      });
      setIsLoading(false);
      triggerToast("🔑 Logged in successfully!");
    }
  };

  const t = {
    EN: {
      signInTitle: "Access CRAVE2026",
      signUpTitle: "Join CRAVE2026 Gourmet Network",
      clientTab: "Standard Registration",
      businessTab: "Business Registration",
      comingSoon: "Coming Soon (Tez kunda)",
      submitSignIn: "Sign In to CRAVE2026",
      submitSignUp: "Create Account",
      toggleToSignUp: "Don't have an account? Sign Up",
      toggleToSignIn: "Already have an account? Sign In",
    },
    UZ: {
      signInTitle: "CRAVE2026 Tizimiga Kirish",
      signUpTitle: "Gurmanlar Safiga Qo'shilish",
      clientTab: "Mijoz (Gourmet Foodie)",
      businessTab: "Biznes uchun (Business)",
      comingSoon: "Tez kunda",
      submitSignIn: "Tizimga Kirish",
      submitSignUp: "Ro'yxatdan O'tish",
      toggleToSignUp: "Hisobingiz yo'qmi? Registratsiya",
      toggleToSignIn: "Hisobingiz bormi? Kirish",
    },
    RU: {
      signInTitle: "Вход в CRAVE2026",
      signUpTitle: "Регистрация Гурмана",
      clientTab: "Клиент (Гурман)",
      businessTab: "Для Бизнеса",
      comingSoon: "Скоро",
      submitSignIn: "Войти в аккаунт",
      submitSignUp: "Зарегистрироваться",
      toggleToSignUp: "Нет аккаунта? Зарегистрироваться",
      toggleToSignIn: "Уже есть аккаунт? Войти",
    },
    JP: {
      signInTitle: "CRAVE2026 ログイン",
      signUpTitle: "新規会員登録",
      clientTab: "一般登録 (Client)",
      businessTab: "ビジネス登録",
      comingSoon: "近日公開",
      submitSignIn: "ログイン",
      submitSignUp: "アカウント作成",
      toggleToSignUp: "アカウントをお持ちでない方はこちら",
      toggleToSignIn: "既にアカウントをお持ちの方はこちら",
    }
  }[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-neon-gradient text-white text-xs font-black shadow-neon animate-in fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Glow Background Accent */}
        <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-surface border border-border hover:bg-border text-gray-400 hover:text-white transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div>
          <span className="px-2.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 text-[10px] font-black uppercase tracking-wider">
            Strict Auth Engine
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            {authModalMode === 'signup' ? t.signUpTitle : t.signInTitle}
          </h2>
        </div>

        {/* Business Tab (Disabled with Coming Soon Badge on Sign Up) */}
        {authModalMode === 'signup' && (
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-surface border border-border">
            <button
              type="button"
              onClick={() => setSelectedRole('CLIENT')}
              className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all ${selectedRole === 'CLIENT' ? 'bg-neon-gradient text-white shadow-neon' : 'text-gray-400 hover:text-white'}`}
            >
              🍕 {t.clientTab}
            </button>
            <div className="relative cursor-not-allowed">
              <button
                type="button"
                disabled
                className="w-full py-2 px-3 rounded-xl text-xs font-extrabold bg-surface/50 text-gray-500 border border-dashed border-gray-700 opacity-60 cursor-not-allowed select-none flex items-center justify-center gap-1"
              >
                🧑‍🍳 {t.businessTab} 🔒
              </button>
              <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[9px] font-black uppercase shadow-neon animate-pulse">
                {t.comingSoon}
              </div>
            </div>
          </div>
        )}

        {/* Error Alert Banner */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-extrabold flex items-center gap-2 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalMode === 'signup' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Alex"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Mercer"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.mercer@foodie.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-primary"
              />
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-primary"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-neon-gradient text-white font-black text-xs uppercase tracking-wider shadow-neon hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>{authModalMode === 'signup' ? t.submitSignUp : t.submitSignIn}</span>
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center pt-3 border-t border-border">
          <button
            onClick={() => {
              setError(null);
              useAuthStore.setState({
                authModalMode: authModalMode === 'signup' ? 'signin' : 'signup',
              });
            }}
            className="text-xs font-bold text-gray-400 hover:text-primary transition-colors"
          >
            {authModalMode === 'signup' ? t.toggleToSignIn : t.toggleToSignUp}
          </button>
        </div>
      </div>
    </div>
  );
};
