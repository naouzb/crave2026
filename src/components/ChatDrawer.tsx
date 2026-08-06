import React, { useState, useEffect, useRef } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { X, Send, Utensils, MessageSquare, ChefHat, CheckCheck, Sparkles } from 'lucide-react';

export const ChatDrawer: React.FC = () => {
  const { isChatOpen, closeChat, activeSpot, messages, sendMessage } = useChatStore();
  const { currentUser, language } = useAuthStore();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatOpen]);

  if (!isChatOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    sendMessage(
      currentUser?.id || 'usr_client_1',
      currentUser?.name || 'Alex Foodie',
      activeSpot?.ownerId || 'usr_business_1',
      inputMessage.trim()
    );
    setInputMessage('');
  };

  const t = {
    EN: {
      title: "Real-Time Chef & Owner Chat",
      onlineStatus: "Chef / Owner Online - Direct Channel",
      placeholder: "Type a inquiry about reservations, dietary preferences, wine pairing...",
      send: "Send",
      spotContext: "Inquiring about",
    },
    UZ: {
      title: "Oshpaz va Restoran Egasi Bilan Muloqot",
      onlineStatus: "Restoran Egasi Tarmoqda - To'g'ridan-to me'yor",
      placeholder: "Buyurtma, maxsus taomlar yoki joy bron qilish haqida yozing...",
      send: "Yuborish",
      spotContext: "Maskan haqida",
    },
    RU: {
      title: "Чат с Шефом и Владельцем",
      onlineStatus: "Владелец Онлайн - Прямой Канал",
      placeholder: "Напишите вопрос о бронировании, меню или винной карте...",
      send: "Отправить",
      spotContext: "Вопрос по заведению",
    },
    JP: {
      title: "シェフ・オーナーとのリアルタイムチャット",
      onlineStatus: "シェフオンライン - ダイレクトチャンネル",
      placeholder: "ご予約、アレルギー、ペアリングのご質問を入力...",
      send: "送信",
      spotContext: "対象スポット",
    }
  }[language];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-card border-l border-border shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-border bg-surface/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neon-gradient p-0.5 shadow-neon flex items-center justify-center">
            <div className="w-full h-full bg-card rounded-[10px] flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-black text-white">{t.title}</h4>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.onlineStatus}</span>
            </div>
          </div>
        </div>

        <button
          onClick={closeChat}
          className="p-2 rounded-xl bg-card border border-border hover:bg-border text-gray-400 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Spot Context Bar */}
      {activeSpot && (
        <div className="px-4 py-2 bg-primary/10 border-b border-primary/20 flex items-center justify-between text-xs text-gray-300">
          <span className="text-[11px] font-bold text-gray-400">{t.spotContext}:</span>
          <span className="font-extrabold text-primary truncate max-w-[220px]">{activeSpot.title}</span>
        </div>
      )}

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.senderId === (currentUser?.id || 'usr_client_1');
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[10px] text-gray-500 font-bold mb-1">
                {msg.senderName}
              </span>
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs font-medium leading-relaxed ${
                  isMe
                    ? 'bg-neon-gradient text-white rounded-br-none shadow-neon'
                    : 'bg-surface border border-border text-gray-200 rounded-bl-none'
                }`}
              >
                <p>{msg.content}</p>
                <div className={`flex items-center gap-1 mt-1 text-[9px] ${isMe ? 'text-white/80 justify-end' : 'text-gray-400'}`}>
                  <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-white" />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Footer */}
      <form onSubmit={handleSend} className="p-4 border-t border-border bg-surface/90 backdrop-blur-md">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={t.placeholder}
            className="w-full pl-4 pr-12 py-3 rounded-2xl bg-card border border-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-primary transition-all shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-2 p-2 rounded-xl bg-neon-gradient text-white shadow-neon hover:scale-105 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
