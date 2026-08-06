import React, { useState } from 'react';
import { useSpotStore } from '@/store/useSpotStore';
import { useAuthStore } from '@/store/useAuthStore';
import { X, Utensils, Image as ImageIcon, FileText, MapPin, Sparkles, Check } from 'lucide-react';

const CATEGORY_OPTIONS = [
  'Omakase & Sushi',
  'Neapolitan Pizza',
  'Dry-Aged Steak',
  'Craft Ramen',
  'Artisanal Pastry',
  'Private Dining',
  'Gourmet Tapas',
];

export const AddSpotModal: React.FC = () => {
  const { isAddSpotModalOpen, closeAddSpotModal, addSpot } = useSpotStore();
  const { currentUser, language } = useAuthStore();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [location, setLocation] = useState('');
  const [step, setStep] = useState(1);

  if (!isAddSpotModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSpot({
      ownerId: currentUser?.id || 'usr_business_1',
      ownerName: currentUser?.name || 'Artisan Owner',
      title: title || 'New Sensory Spot',
      category: category,
      description: description || 'Exquisite dining culinary experience crafted with seasonal premium ingredients.',
      coverImage: coverImage || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      location: location || 'Downtown Culinary District',
    });
    // Reset form
    setTitle('');
    setDescription('');
    setCoverImage('');
    setLocation('');
    setStep(1);
  };

  const t = {
    EN: {
      modalTitle: "Add New Sensory Dining Spot",
      modalSubtitle: "List your restaurant for thousands of food enthusiasts",
      step1: "1. Basic Spot Details",
      step2: "2. Sensory Media & Location",
      titleLabel: "Spot Title / Restaurant Name",
      categoryLabel: "Culinary Category",
      descLabel: "Sensory Concept Description",
      imageLabel: "Cover Image URL (Unsplash or direct HD link)",
      locationLabel: "City / District Location",
      nextBtn: "Next Step",
      submitBtn: "Submit Spot for Approval (PENDING)",
    },
    UZ: {
      modalTitle: "Yangi Restoran Maskanini Qo'shish",
      modalSubtitle: "Maskaningizni minglab gurmanlarga taqdim eting",
      step1: "1. Asosiy Ma'lumotlar",
      step2: "2. Fotosurat va Joylashuv",
      titleLabel: "Maskan Nomi / Restoran",
      categoryLabel: "Kategoriya",
      descLabel: "Oshxona va Kontseptsiya Tavsifi",
      imageLabel: "Muqova Rasmi URL (HD rasm havolasi)",
      locationLabel: "Joylashgan Manzil / Tuman",
      nextBtn: "Keyingi Bosqich",
      submitBtn: "Tasdiqlashga Yuborish (PENDING)",
    },
    RU: {
      modalTitle: "Добавить Заведение",
      modalSubtitle: "Разместите ваше заведение для тысяч клиентов",
      step1: "1. Основные Детали",
      step2: "2. Фото и Локация",
      titleLabel: "Название Заведения",
      categoryLabel: "Категория Блюд",
      descLabel: "Описание Концепции",
      imageLabel: "URL Обложки (HD Ссылка на фото)",
      locationLabel: "Локация / Район",
      nextBtn: "Далее",
      submitBtn: "Отправить на Проверку (PENDING)",
    },
    JP: {
      modalTitle: "新規感性スポットの追加",
      modalSubtitle: "あなたのレストランを多くのグルメファンへ発信",
      step1: "1. 基本情報",
      step2: "2. 画像＆ロケーション",
      titleLabel: "店舗名 / スポットタイトル",
      categoryLabel: "料理カテゴリー",
      descLabel: "コンセプト詳細説明",
      imageLabel: "カバー画像URL (HD画像リンク)",
      locationLabel: "所在地 / エリア",
      nextBtn: "次へ進む",
      submitBtn: "承認申請を送信 (PENDING)",
    }
  }[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAddSpotModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-surface border border-border hover:bg-border text-gray-400 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Business Spot Builder</span>
          </div>
          <h3 className="text-2xl font-black text-white">{t.modalTitle}</h3>
          <p className="text-xs text-gray-400 font-medium">{t.modalSubtitle}</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between gap-3 mb-6 p-2 rounded-xl bg-surface border border-border">
          <button
            onClick={() => setStep(1)}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              step === 1 ? 'bg-primary text-white shadow-neon' : 'text-gray-400'
            }`}
          >
            {t.step1}
          </button>
          <button
            onClick={() => setStep(2)}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              step === 2 ? 'bg-primary text-white shadow-neon' : 'text-gray-400'
            }`}
          >
            {t.step2}
          </button>
        </div>

        {/* Multi-Step Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.titleLabel}</label>
                <div className="relative">
                  <Utensils className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Lumina Omakase Dining"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-white text-xs focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.categoryLabel}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-white text-xs focus:outline-none focus:border-primary transition-all"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat} className="bg-card text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.descLabel}</label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your signature dishes, dry-aging techniques, ambient music, or reservation details..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-white text-xs focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl bg-neon-gradient text-white font-extrabold text-xs shadow-neon hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {t.nextBtn} →
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.imageLabel}</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    required
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-white text-xs focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.locationLabel}</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Ginza District 4th Ave, Tokyo"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-white text-xs focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Preview Box */}
              {coverImage && (
                <div className="relative h-28 w-full rounded-xl overflow-hidden border border-border">
                  <img src={coverImage} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-xs font-bold text-white">
                    Image Preview Ready
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-xl bg-surface border border-border text-gray-300 font-bold text-xs hover:bg-border transition-all"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-neon-gradient text-white font-extrabold text-xs shadow-neon hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{t.submitBtn}</span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
