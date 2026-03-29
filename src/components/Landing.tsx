import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Star, ArrowRight, Check, Palette, Smartphone, Share2, Zap, Layout, Type } from 'lucide-react';

interface LandingProps {
  onNavigate: (page: 'templates') => void;
}

const Petal: React.FC<{ delay: number; left: number; size: number }> = ({ delay, left, size }) => (
  <div
    className="absolute animate-petal pointer-events-none opacity-60"
    style={{
      left: `${left}%`,
      animationDuration: `${8 + Math.random() * 6}s`,
      animationDelay: `${delay}s`,
      top: '-5%',
    }}
  >
    <div style={{ fontSize: `${size}px`, transform: `rotate(${Math.random() * 360}deg)` }}>
      🌸
    </div>
  </div>
);

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const petals = Array.from({ length: 15 }, (_, i) => ({
    delay: i * 1.2,
    left: Math.random() * 100,
    size: 16 + Math.random() * 20,
  }));

  const features = [
    { icon: <Layout className="w-7 h-7" />, title: 'Готовые шаблоны', desc: 'Более 6 уникальных дизайнов для любого стиля свадьбы' },
    { icon: <Palette className="w-7 h-7" />, title: 'Полная кастомизация', desc: 'Измените цвета, шрифты и контент под вашу свадьбу' },
    { icon: <Type className="w-7 h-7" />, title: 'Блочный редактор', desc: 'Добавляйте, удаляйте и перемещайте блоки как в конструкторе' },
    { icon: <Smartphone className="w-7 h-7" />, title: 'Адаптивный дизайн', desc: 'Отлично выглядит на любом устройстве' },
    { icon: <Zap className="w-7 h-7" />, title: 'Обратный отсчёт', desc: 'Встроенный таймер до дня свадьбы' },
    { icon: <Share2 className="w-7 h-7" />, title: 'Простая отправка', desc: 'Поделитесь ссылкой с гостями в один клик' },
  ];

  const steps = [
    { num: '01', title: 'Выберите шаблон', desc: 'Просмотрите коллекцию и выберите дизайн, который подходит именно вам' },
    { num: '02', title: 'Настройте дизайн', desc: 'Измените тексты, цвета и добавьте ваши фото — всё в визуальном редакторе' },
    { num: '03', title: 'Отправьте гостям', desc: 'Скопируйте ссылку и отправьте приглашение через мессенджеры или соцсети' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500" fill="currentColor" />
            <span className="font-playfair text-xl font-bold text-gray-900">WedInvite</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-rose-500 transition-colors">Возможности</a>
            <a href="#how" className="hover:text-rose-500 transition-colors">Как это работает</a>
            <a href="#templates" className="hover:text-rose-500 transition-colors">Шаблоны</a>
          </div>
          <button
            onClick={() => onNavigate('templates')}
            className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-rose-200"
          >
            Создать приглашение
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-blush-50" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #fda4af 0%, transparent 50%), radial-gradient(circle at 80% 20%, #c4b5fd 0%, transparent 50%), radial-gradient(circle at 50% 80%, #fef08a 0%, transparent 50%)',
          }}
        />
        
        {/* Falling petals */}
        {petals.map((p, i) => (
          <Petal key={i} {...p} />
        ))}

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 animate-float opacity-20" style={{ animationDelay: '0s' }}>
          <Sparkles className="w-12 h-12 text-gold-500" />
        </div>
        <div className="absolute top-40 right-20 animate-float opacity-20" style={{ animationDelay: '2s' }}>
          <Star className="w-8 h-8 text-rose-300" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float opacity-15" style={{ animationDelay: '4s' }}>
          <Heart className="w-10 h-10 text-blush-300" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <div className="inline-flex items-center gap-2 bg-rose-100/80 text-rose-600 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Конструктор свадебных приглашений
            </div>
          </div>

          <h1 className="animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <span className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 block leading-tight">
              Создайте идеальное
            </span>
            <span className="font-vibes text-6xl md:text-8xl lg:text-9xl text-rose-500 block mt-2">
              приглашение
            </span>
          </h1>

          <p className="animate-fade-in-up mt-8 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed" style={{ animationDelay: '0.6s', opacity: 0 }}>
            Выберите из коллекции элегантных шаблонов, настройте каждую деталь
            и отправьте гостям онлайн-приглашение, которое запомнится навсегда
          </p>

          <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4 mt-10" style={{ animationDelay: '0.8s', opacity: 0 }}>
            <button
              onClick={() => onNavigate('templates')}
              className="group bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:shadow-xl hover:shadow-rose-200 flex items-center gap-2"
            >
              Начать бесплатно
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#templates"
              className="text-gray-600 hover:text-rose-500 px-8 py-4 rounded-full text-lg font-medium transition-colors border border-gray-200 hover:border-rose-200"
            >
              Смотреть шаблоны
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto" style={{ animationDelay: '1s', opacity: 0 }}>
            <div>
              <div className="font-playfair text-3xl font-bold text-gray-900">6+</div>
              <div className="text-sm text-gray-400 mt-1">Шаблонов</div>
            </div>
            <div>
              <div className="font-playfair text-3xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-400 mt-1">Типов блоков</div>
            </div>
            <div>
              <div className="font-playfair text-3xl font-bold text-gray-900">∞</div>
              <div className="text-sm text-gray-400 mt-1">Возможностей</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-rose-300 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-rose-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-rose-500 text-sm font-medium uppercase tracking-wider">Возможности</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-gray-900 mt-3">
              Всё для идеального приглашения
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Профессиональные инструменты дизайна, доступные каждому
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-gradient-to-br from-white to-rose-50/30 border border-rose-100/50 hover:border-rose-200 transition-all hover:shadow-xl hover:shadow-rose-100/50"
              >
                <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-playfair text-xl font-semibold text-gray-900 mt-5">{f.title}</h3>
                <p className="text-gray-500 mt-3 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6 bg-gradient-to-b from-rose-50/50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-rose-500 text-sm font-medium uppercase tracking-wider">Просто и быстро</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-gray-900 mt-3">
              Три простых шага
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((s, i) => (
              <div key={i} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-rose-200" />
                )}
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-rose-100 relative z-10">
                  <span className="font-playfair text-3xl font-bold text-rose-500">{s.num}</span>
                </div>
                <h3 className="font-playfair text-xl font-semibold text-gray-900 mt-6">{s.title}</h3>
                <p className="text-gray-500 mt-3">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase image */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-rose-50/30">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/30">
            <img src="/images/hero-mockup.jpg" alt="Свадебные приглашения" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Preview Templates */}
      <section id="templates" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-rose-500 text-sm font-medium uppercase tracking-wider">Коллекция</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-gray-900 mt-3">
              Популярные шаблоны
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Выберите дизайн, который отразит стиль вашей свадьбы
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: '🌹', name: 'Классическая роза', color: 'from-rose-100 to-rose-50', border: 'border-rose-200' },
              { emoji: '✨', name: 'Минималистичное золото', color: 'from-amber-50 to-yellow-50', border: 'border-amber-200' },
              { emoji: '🌿', name: 'Ботанический сад', color: 'from-green-50 to-emerald-50', border: 'border-green-200' },
            ].map((t, i) => (
              <div
                key={i}
                className={`template-card rounded-2xl overflow-hidden border ${t.border} cursor-pointer`}
                onClick={() => onNavigate('templates')}
              >
                <div className={`bg-gradient-to-br ${t.color} h-64 flex items-center justify-center`}>
                  <div className="text-center">
                    <div className="text-6xl mb-4">{t.emoji}</div>
                    <div className="font-cormorant text-2xl text-gray-800 italic">Александр & Екатерина</div>
                    <div className="text-sm text-gray-500 mt-2">15 августа 2026</div>
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <h3 className="font-playfair text-lg font-semibold">{t.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">Нажмите для просмотра</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('templates')}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:shadow-xl"
            >
              Все шаблоны
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Pricing hint */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-900 to-rose-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-12 h-12 text-rose-400 mx-auto mb-6 animate-heartbeat" />
          <h2 className="font-cormorant text-4xl md:text-6xl font-light">
            Начните создавать <span className="italic text-rose-300">бесплатно</span>
          </h2>
          <p className="text-gray-400 mt-6 text-lg max-w-xl mx-auto">
            Никаких скрытых платежей. Создайте приглашение мечты прямо сейчас и отправьте его всем вашим гостям.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-gray-300">
            {['Все шаблоны', 'Все блоки', 'Без водяных знаков', 'Без ограничений'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-rose-400" />
                {item}
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('templates')}
            className="mt-10 bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-full text-lg font-medium transition-all hover:shadow-xl hover:shadow-rose-500/30"
          >
            Создать приглашение
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" fill="currentColor" />
            <span className="font-playfair text-lg font-bold">WedInvite</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2026 WedInvite. Создано с любовью 💕
          </p>
        </div>
      </footer>
    </div>
  );
};
