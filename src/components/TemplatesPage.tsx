import React, { useState } from 'react';
import { ArrowLeft, Heart, ChevronRight, Search } from 'lucide-react';
import { templates } from '../data/templates';
import { InvitationTemplate } from '../types';

interface TemplatesPageProps {
  onBack: () => void;
  onSelect: (template: InvitationTemplate) => void;
}

const themeColors: Record<string, { bg: string; border: string; badge: string }> = {
  'classic-rose': { bg: 'from-rose-100 to-rose-50', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-600' },
  'minimalist-gold': { bg: 'from-amber-50 to-yellow-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
  'botanical-garden': { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700' },
  'lavender-dream': { bg: 'from-purple-50 to-violet-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-600' },
  'rustic-charm': { bg: 'from-amber-50 to-orange-50', border: 'border-amber-300', badge: 'bg-amber-100 text-amber-800' },
  'midnight-elegance': { bg: 'from-slate-800 to-slate-900', border: 'border-slate-600', badge: 'bg-slate-700 text-amber-300' },
  'wedmaker-romance': { bg: 'from-amber-100 to-orange-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
};

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ onBack, onSelect }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">На главную</span>
          </button>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" fill="currentColor" />
            <span className="font-playfair text-lg font-bold">WedInvite</span>
          </div>
          <div className="w-24" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="font-cormorant text-4xl md:text-5xl font-semibold text-gray-900">
            Выберите шаблон
          </h1>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Каждый шаблон полностью настраивается — измените цвета, тексты и блоки под вашу свадьбу
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по шаблонам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-rose-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Templates grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => {
            const colors = themeColors[template.id] || themeColors['classic-rose'];
            const isHovered = hoveredId === template.id;
            const isDark = template.id === 'midnight-elegance';

            return (
              <div
                key={template.id}
                className={`template-card rounded-2xl overflow-hidden border ${colors.border} bg-white`}
                onMouseEnter={() => setHoveredId(template.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Preview area */}
                <div className={`relative bg-gradient-to-br ${colors.bg} h-80 flex items-center justify-center overflow-hidden`}>
                  {/* Template preview content */}
                  <div className={`text-center px-6 transition-all duration-300 ${isHovered ? 'scale-95 opacity-70' : ''}`}>
                    <div className="text-5xl mb-4">{template.preview}</div>
                    <div className={`text-xs uppercase tracking-widest mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {template.blocks[0]?.content.subtitle || ''}
                    </div>
                    <div className={`${template.theme.fontHeading} text-3xl ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {template.blocks.find(b => b.type === 'names')?.content.name1 || 'Имя'}
                      <span className="mx-2 text-xl opacity-50">
                        {template.blocks.find(b => b.type === 'names')?.content.connector || '&'}
                      </span>
                      {template.blocks.find(b => b.type === 'names')?.content.name2 || 'Имя'}
                    </div>
                    <div className={`text-sm mt-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {template.blocks.find(b => b.type === 'date')?.content.date || ''}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <button
                      onClick={() => onSelect(template)}
                      className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-rose-50 transition-colors shadow-lg"
                    >
                      Выбрать
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-playfair text-lg font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">{template.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${colors.badge}`}>
                      {template.blocks.length} блоков
                    </span>
                    <div className="flex gap-1 ml-auto">
                      {[template.theme.primaryColor, template.theme.secondaryColor, template.theme.bgColor].map((c, i) => (
                        <div key={i} className="w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Ничего не найдено по запросу «{searchQuery}»</p>
          </div>
        )}
      </div>
    </div>
  );
};
