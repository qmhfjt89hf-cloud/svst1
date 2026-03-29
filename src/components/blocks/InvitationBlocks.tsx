import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Calendar, Heart, Send, Shirt } from 'lucide-react';
import { InvitationBlock, TemplateTheme } from '../../types';

interface BlockProps {
  block: InvitationBlock;
  theme: TemplateTheme;
  isEditing?: boolean;
  onUpdate?: (block: InvitationBlock) => void;
}

// Ornament dividers
const Dividers: Record<string, React.FC<{ color: string }>> = {
  ornament: ({ color }) => (
    <div className="flex items-center justify-center gap-3 py-4">
      <div className="h-px w-16 opacity-30" style={{ backgroundColor: color }} />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-40">
        <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" fill={color} />
      </svg>
      <div className="h-px w-16 opacity-30" style={{ backgroundColor: color }} />
    </div>
  ),
  line: ({ color }) => (
    <div className="flex items-center justify-center py-4">
      <div className="h-px w-32 opacity-20" style={{ backgroundColor: color }} />
    </div>
  ),
  leaves: (_props) => (
    <div className="flex items-center justify-center gap-2 py-4 text-2xl opacity-40">
      🌿✦🌿
    </div>
  ),
  rustic: (_props) => (
    <div className="flex items-center justify-center gap-2 py-4 text-xl opacity-40">
      ─── 🌾 ───
    </div>
  ),
  stars: (_props) => (
    <div className="flex items-center justify-center gap-2 py-4 text-lg opacity-40">
      ✦ · ✦ · ✦
    </div>
  ),
};

export const HeaderBlock: React.FC<BlockProps> = ({ block, theme }) => (
  <div className="text-center py-12 px-6">
    <p className="text-sm uppercase tracking-[0.3em] opacity-60 font-light" style={{ color: theme.primaryColor }}>
      {block.content.subtitle}
    </p>
    <h1
      className={`${theme.fontHeading} text-3xl md:text-4xl font-light mt-4`}
      style={{ color: theme.textColor }}
    >
      {block.content.title}
    </h1>
  </div>
);

export const NamesBlock: React.FC<BlockProps> = ({ block, theme }) => (
  <div className="text-center py-10 px-6">
    <div className={`${theme.fontHeading} text-4xl md:text-6xl font-light leading-tight`} style={{ color: theme.textColor }}>
      <span className="block">{block.content.name1}</span>
      <span
        className="block text-3xl md:text-4xl my-4 font-vibes"
        style={{ color: theme.accentColor }}
      >
        {block.content.connector}
      </span>
      <span className="block">{block.content.name2}</span>
    </div>
  </div>
);

export const DateBlock: React.FC<BlockProps> = ({ block, theme }) => (
  <div className="text-center py-10 px-6">
    <div className="inline-flex flex-col items-center">
      <Calendar className="w-6 h-6 mb-3 opacity-50" style={{ color: theme.primaryColor }} />
      <p className="text-sm uppercase tracking-widest opacity-60" style={{ color: theme.textColor }}>
        {block.content.day}
      </p>
      <p className={`${theme.fontHeading} text-2xl md:text-3xl mt-2 font-medium`} style={{ color: theme.textColor }}>
        {block.content.date}
      </p>
      <div className="flex items-center gap-2 mt-3 opacity-70">
        <Clock className="w-4 h-4" style={{ color: theme.primaryColor }} />
        <span className="text-sm" style={{ color: theme.textColor }}>{block.content.time}</span>
      </div>
    </div>
  </div>
);

export const VenueBlock: React.FC<BlockProps> = ({ block, theme }) => (
  <div className="text-center py-10 px-6">
    <MapPin className="w-6 h-6 mx-auto mb-3 opacity-50" style={{ color: theme.primaryColor }} />
    <h3 className={`${theme.fontHeading} text-xl md:text-2xl font-medium`} style={{ color: theme.textColor }}>
      {block.content.name}
    </h3>
    <p className="text-sm mt-2 opacity-60" style={{ color: theme.textColor }}>
      {block.content.address}
    </p>
    {block.content.details && (
      <p className="text-sm mt-1 opacity-50 italic" style={{ color: theme.textColor }}>
        {block.content.details}
      </p>
    )}
  </div>
);

export const CountdownBlock: React.FC<BlockProps> = ({ block, theme }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const diff = new Date(block.content.targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calculateTime());
    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000);
    return () => clearInterval(timer);
  }, [block.content.targetDate]);

  const units = [
    { value: timeLeft.days, label: 'дней' },
    { value: timeLeft.hours, label: 'часов' },
    { value: timeLeft.minutes, label: 'минут' },
    { value: timeLeft.seconds, label: 'секунд' },
  ];

  return (
    <div className="text-center py-10 px-6">
      <p className="text-sm uppercase tracking-widest opacity-60 mb-6" style={{ color: theme.textColor }}>
        До свадьбы осталось
      </p>
      <div className="flex justify-center gap-4 md:gap-8">
        {units.map((u, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-2xl md:text-3xl font-light"
              style={{
                backgroundColor: theme.primaryColor + '15',
                color: theme.primaryColor,
                border: `1px solid ${theme.primaryColor}30`,
              }}
            >
              {String(u.value).padStart(2, '0')}
            </div>
            <span className="text-xs mt-2 opacity-50" style={{ color: theme.textColor }}>{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StoryBlock: React.FC<BlockProps> = ({ block, theme }) => (
  <div className="text-center py-10 px-6 max-w-lg mx-auto">
    <Heart className="w-6 h-6 mx-auto mb-4 opacity-50" style={{ color: theme.primaryColor }} />
    <h3 className={`${theme.fontHeading} text-xl md:text-2xl font-medium mb-4`} style={{ color: theme.textColor }}>
      {block.content.title}
    </h3>
    <p className="leading-relaxed opacity-70 text-sm md:text-base" style={{ color: theme.textColor }}>
      {block.content.text}
    </p>
  </div>
);

export const QuoteBlock: React.FC<BlockProps> = ({ block, theme }) => (
  <div className="text-center py-10 px-8 max-w-lg mx-auto">
    <div className="text-4xl opacity-20 mb-2" style={{ color: theme.accentColor }}>❝</div>
    <p className={`${theme.fontHeading} text-lg md:text-xl italic leading-relaxed`} style={{ color: theme.textColor }}>
      {block.content.text}
    </p>
    {block.content.author && (
      <p className="mt-4 text-sm opacity-50" style={{ color: theme.textColor }}>
        — {block.content.author}
      </p>
    )}
  </div>
);

export const DividerBlock: React.FC<BlockProps> = ({ block, theme }) => {
  const DividerComponent = Dividers[block.content.style] || Dividers.line;
  return <DividerComponent color={theme.primaryColor} />;
};

export const ScheduleBlock: React.FC<BlockProps> = ({ block, theme }) => {
  let items: Array<{ time: string; event: string }> = [];
  try {
    items = JSON.parse(block.content.items);
  } catch {}

  return (
    <div className="py-10 px-6 max-w-md mx-auto">
      <h3 className={`${theme.fontHeading} text-xl md:text-2xl font-medium text-center mb-8`} style={{ color: theme.textColor }}>
        Программа дня
      </h3>
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <div
              className="w-16 text-center text-sm font-medium py-2 px-3 rounded-lg"
              style={{ backgroundColor: theme.primaryColor + '15', color: theme.primaryColor }}
            >
              {item.time}
            </div>
            <div className="h-px flex-1 opacity-20" style={{ backgroundColor: theme.primaryColor }} />
            <p className="text-sm flex-1" style={{ color: theme.textColor }}>{item.event}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DresscodeBlock: React.FC<BlockProps> = ({ block, theme }) => {
  const colors = block.content.colors?.split(',') || [];

  return (
    <div className="text-center py-10 px-6">
      <Shirt className="w-6 h-6 mx-auto mb-3 opacity-50" style={{ color: theme.primaryColor }} />
      <h3 className={`${theme.fontHeading} text-xl font-medium mb-4`} style={{ color: theme.textColor }}>
        Дресс-код
      </h3>
      <div className="flex justify-center gap-3 mb-4">
        {colors.map((c, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: c.trim() }}
          />
        ))}
      </div>
      {block.content.note && (
        <p className="text-sm opacity-60 max-w-sm mx-auto" style={{ color: theme.textColor }}>
          {block.content.note}
        </p>
      )}
    </div>
  );
};

export const RSVPBlock: React.FC<BlockProps> = ({ block, theme }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <div className="text-4xl mb-4">💌</div>
        <p className={`${theme.fontHeading} text-xl`} style={{ color: theme.textColor }}>
          Спасибо за ответ!
        </p>
        <p className="text-sm opacity-60 mt-2" style={{ color: theme.textColor }}>
          Мы с нетерпением ждём встречи
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-12 px-6 max-w-md mx-auto">
      <Send className="w-6 h-6 mx-auto mb-3 opacity-50" style={{ color: theme.primaryColor }} />
      <h3 className={`${theme.fontHeading} text-xl md:text-2xl font-medium mb-2`} style={{ color: theme.textColor }}>
        {block.content.message}
      </h3>
      <p className="text-sm opacity-50 mb-6" style={{ color: theme.textColor }}>
        {block.content.deadline}
      </p>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 text-sm"
          style={{
            borderColor: theme.primaryColor + '40',
            backgroundColor: theme.bgColor,
            color: theme.textColor,
          }}
        />
        <div className="flex gap-3">
          <button
            onClick={() => setAttending('yes')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${attending === 'yes' ? 'text-white shadow-md' : 'opacity-60 hover:opacity-100'}`}
            style={{
              backgroundColor: attending === 'yes' ? theme.primaryColor : theme.primaryColor + '15',
              color: attending === 'yes' ? '#fff' : theme.primaryColor,
            }}
          >
            Приду ✓
          </button>
          <button
            onClick={() => setAttending('no')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${attending === 'no' ? 'text-white shadow-md' : 'opacity-60 hover:opacity-100'}`}
            style={{
              backgroundColor: attending === 'no' ? theme.textColor + 'cc' : theme.textColor + '10',
              color: attending === 'no' ? '#fff' : theme.textColor,
            }}
          >
            Не смогу
          </button>
        </div>
        <button
          onClick={() => { if (name && attending) setSubmitted(true); }}
          className="w-full py-3 rounded-xl text-white text-sm font-medium transition-all hover:shadow-lg"
          style={{ backgroundColor: theme.primaryColor }}
        >
          Отправить ответ
        </button>
      </div>
    </div>
  );
};

// Block renderer
export const RenderBlock: React.FC<BlockProps> = (props) => {
  switch (props.block.type) {
    case 'header': return <HeaderBlock {...props} />;
    case 'names': return <NamesBlock {...props} />;
    case 'date': return <DateBlock {...props} />;
    case 'venue': return <VenueBlock {...props} />;
    case 'countdown': return <CountdownBlock {...props} />;
    case 'story': return <StoryBlock {...props} />;
    case 'quote': return <QuoteBlock {...props} />;
    case 'divider': return <DividerBlock {...props} />;
    case 'schedule': return <ScheduleBlock {...props} />;
    case 'dresscode': return <DresscodeBlock {...props} />;
    case 'rsvp': return <RSVPBlock {...props} />;
    default: return null;
  }
};
