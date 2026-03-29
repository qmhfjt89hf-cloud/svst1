import React, { useState } from 'react';
import {
  ArrowLeft, Eye, Plus, Trash2, ChevronUp, ChevronDown,
  Edit3, Heart, Save, Smartphone, Monitor, X, GripVertical,
  Type, Calendar, MapPin, Clock, MessageSquare, Minus, Shirt, ListOrdered, Quote
} from 'lucide-react';
import { InvitationBlock, TemplateTheme, InvitationTemplate, Page } from '../types';
import { RenderBlock } from './blocks/InvitationBlocks';

interface EditorProps {
  template: InvitationTemplate;
  onNavigate: (page: Page) => void;
  onPreview: (blocks: InvitationBlock[], theme: TemplateTheme) => void;
}

const blockTypes = [
  { type: 'header', label: 'Заголовок', icon: <Type className="w-4 h-4" />, defaults: { title: 'Заголовок', subtitle: 'Подзаголовок' } },
  { type: 'names', label: 'Имена', icon: <Heart className="w-4 h-4" />, defaults: { name1: 'Имя', name2: 'Имя', connector: '&' } },
  { type: 'date', label: 'Дата', icon: <Calendar className="w-4 h-4" />, defaults: { date: '1 января 2027', time: '16:00', day: 'Суббота' } },
  { type: 'venue', label: 'Место', icon: <MapPin className="w-4 h-4" />, defaults: { name: 'Название места', address: 'Адрес', details: '' } },
  { type: 'countdown', label: 'Таймер', icon: <Clock className="w-4 h-4" />, defaults: { targetDate: '2027-01-01T16:00:00' } },
  { type: 'story', label: 'Наша история', icon: <MessageSquare className="w-4 h-4" />, defaults: { title: 'Наша история', text: 'Расскажите свою историю любви...' } },
  { type: 'quote', label: 'Цитата', icon: <Quote className="w-4 h-4" />, defaults: { text: 'Ваша любимая цитата', author: '' } },
  { type: 'schedule', label: 'Программа', icon: <ListOrdered className="w-4 h-4" />, defaults: { items: JSON.stringify([{ time: '16:00', event: 'Церемония' }, { time: '18:00', event: 'Банкет' }]) } },
  { type: 'dresscode', label: 'Дресс-код', icon: <Shirt className="w-4 h-4" />, defaults: { colors: '#e11d48,#c9a84c,#ffffff', note: 'Просим поддержать цветовую гамму' } },
  { type: 'divider', label: 'Разделитель', icon: <Minus className="w-4 h-4" />, defaults: { style: 'ornament' } },
  { type: 'rsvp', label: 'RSVP', icon: <Save className="w-4 h-4" />, defaults: { message: 'Подтвердите присутствие', deadline: 'до ...' } },
] as const;

export const Editor: React.FC<EditorProps> = ({ template, onNavigate, onPreview }) => {
  const [blocks, setBlocks] = useState<InvitationBlock[]>([...template.blocks]);
  const [theme, setTheme] = useState<TemplateTheme>({ ...template.theme });
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showSidebar, setShowSidebar] = useState(true);

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  const updateBlock = (id: string, content: Record<string, string>) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, content: { ...b.content, ...content } } : b));
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === prev.length - 1)) return prev;
      const next = [...prev];
      const swap = direction === 'up' ? idx - 1 : idx + 1;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
  };

  const deleteBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const addBlock = (type: string, defaults: Record<string, string>) => {
    const newBlock: InvitationBlock = {
      id: `block-${Date.now()}`,
      type: type as InvitationBlock['type'],
      content: { ...defaults },
    };
    setBlocks(prev => [...prev, newBlock]);
    setShowAddMenu(false);
    setSelectedBlockId(newBlock.id);
  };

  const renderFieldEditor = (block: InvitationBlock) => {
    const fields = Object.entries(block.content);
    return (
      <div className="space-y-4">
        {fields.map(([key, value]) => {
          if (key === 'items') {
            let items: Array<{ time: string; event: string }> = [];
            try { items = JSON.parse(value); } catch {}
            return (
              <div key={key}>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Программа</label>
                {items.map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      className="w-20 px-2 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                      value={item.time}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[i] = { ...newItems[i], time: e.target.value };
                        updateBlock(block.id, { items: JSON.stringify(newItems) });
                      }}
                    />
                    <input
                      className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                      value={item.event}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[i] = { ...newItems[i], event: e.target.value };
                        updateBlock(block.id, { items: JSON.stringify(newItems) });
                      }}
                    />
                    <button
                      onClick={() => {
                        const newItems = items.filter((_, j) => j !== i);
                        updateBlock(block.id, { items: JSON.stringify(newItems) });
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newItems = [...items, { time: '00:00', event: 'Событие' }];
                    updateBlock(block.id, { items: JSON.stringify(newItems) });
                  }}
                  className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 mt-1"
                >
                  <Plus className="w-3 h-3" /> Добавить пункт
                </button>
              </div>
            );
          }

          if (key === 'style') {
            return (
              <div key={key}>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Стиль</label>
                <select
                  value={value}
                  onChange={(e) => updateBlock(block.id, { [key]: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  <option value="ornament">Орнамент</option>
                  <option value="line">Линия</option>
                  <option value="leaves">Листья</option>
                  <option value="rustic">Рустик</option>
                  <option value="stars">Звёзды</option>
                </select>
              </div>
            );
          }

          const labelMap: Record<string, string> = {
            title: 'Заголовок', subtitle: 'Подзаголовок', name1: 'Имя жениха', name2: 'Имя невесты',
            connector: 'Соединитель', date: 'Дата', time: 'Время', day: 'День недели',
            name: 'Название', address: 'Адрес', details: 'Детали', targetDate: 'Дата и время',
            text: 'Текст', author: 'Автор', message: 'Сообщение', deadline: 'Срок',
            colors: 'Цвета (через запятую)', note: 'Примечание',
          };

          const isTextarea = key === 'text' || key === 'note';

          return (
            <div key={key}>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">
                {labelMap[key] || key}
              </label>
              {isTextarea ? (
                <textarea
                  value={value}
                  onChange={(e) => updateBlock(block.id, { [key]: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
                />
              ) : (
                <input
                  type={key === 'targetDate' ? 'datetime-local' : 'text'}
                  value={value}
                  onChange={(e) => updateBlock(block.id, { [key]: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('templates')}
            className="flex items-center gap-1.5 text-gray-500 hover:text-rose-500 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
            <span className="font-playfair font-bold text-sm">WedInvite</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-1.5 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-white shadow-sm text-rose-500' : 'text-gray-400'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-1.5 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-white shadow-sm text-rose-500' : 'text-gray-400'}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1.5"
          >
            <Edit3 className="w-4 h-4" />
            {showSidebar ? 'Скрыть' : 'Панель'}
          </button>
          <button
            onClick={() => onPreview(blocks, theme)}
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            Просмотр
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto flex flex-col">
            {/* Theme settings */}
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Тема оформления</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Основной</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <span className="text-xs text-gray-400">{theme.primaryColor}</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Фон</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.bgColor}
                      onChange={(e) => setTheme(prev => ({ ...prev, bgColor: e.target.value }))}
                      className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <span className="text-xs text-gray-400">{theme.bgColor}</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Текст</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.textColor}
                      onChange={(e) => setTheme(prev => ({ ...prev, textColor: e.target.value }))}
                      className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <span className="text-xs text-gray-400">{theme.textColor}</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Акцент</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.accentColor}
                      onChange={(e) => setTheme(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <span className="text-xs text-gray-400">{theme.accentColor}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <label className="text-xs text-gray-500 mb-1 block">Шрифт заголовков</label>
                <select
                  value={theme.fontHeading}
                  onChange={(e) => setTheme(prev => ({ ...prev, fontHeading: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  <option value="font-cormorant">Cormorant Garamond</option>
                  <option value="font-playfair">Playfair Display</option>
                  <option value="font-vibes">Great Vibes</option>
                  <option value="font-montserrat">Montserrat</option>
                </select>
              </div>
            </div>

            {/* Blocks list */}
            <div className="p-4 flex-1">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Блоки</h3>
              <div className="space-y-2">
                {blocks.map((block, i) => {
                  const blockDef = blockTypes.find(bt => bt.type === block.type);
                  const isSelected = selectedBlockId === block.id;
                  return (
                    <div
                      key={block.id}
                      className={`rounded-xl border transition-all cursor-pointer ${isSelected ? 'border-rose-300 bg-rose-50 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                    >
                      <div
                        className="flex items-center gap-2 p-3"
                        onClick={() => setSelectedBlockId(isSelected ? null : block.id)}
                      >
                        <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        <span className="text-gray-400 flex-shrink-0">{blockDef?.icon}</span>
                        <span className="text-sm font-medium text-gray-700 flex-1 truncate">{blockDef?.label || block.type}</span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'up'); }}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            disabled={i === 0}
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'down'); }}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            disabled={i === blocks.length - 1}
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      {isSelected && selectedBlock && (
                        <div className="px-3 pb-3 border-t border-rose-100/50">
                          <div className="pt-3">
                            {renderFieldEditor(selectedBlock)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Add block button */}
              <div className="mt-4 relative">
                <button
                  onClick={() => setShowAddMenu(!showAddMenu)}
                  className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-rose-500 hover:border-rose-300 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Добавить блок
                </button>
                {showAddMenu && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="p-2 max-h-64 overflow-y-auto">
                      {blockTypes.map((bt) => (
                        <button
                          key={bt.type}
                          onClick={() => addBlock(bt.type, bt.defaults as Record<string, string>)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-rose-50 rounded-lg transition-colors text-left"
                        >
                          <span className="text-rose-400">{bt.icon}</span>
                          <span className="text-sm text-gray-700">{bt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Preview area */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center">
          <div
            className={`transition-all duration-300 ${previewMode === 'mobile' ? 'w-[375px]' : 'w-full max-w-[600px]'}`}
          >
            <div
              className="invitation-shadow rounded-2xl overflow-hidden min-h-[600px]"
              style={{ backgroundColor: theme.bgColor }}
            >
              {/* Background pattern overlay */}
              <div className="relative">
                {blocks.map((block) => (
                  <div
                    key={block.id}
                    className={`editor-block relative cursor-pointer transition-all ${selectedBlockId === block.id ? 'ring-2 ring-rose-400 ring-offset-2 rounded-lg' : ''}`}
                    onClick={() => setSelectedBlockId(block.id === selectedBlockId ? null : block.id)}
                  >
                    <RenderBlock block={block} theme={theme} />
                  </div>
                ))}

                {blocks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-32 text-gray-400">
                    <Plus className="w-12 h-12 mb-4 opacity-30" />
                    <p className="text-lg">Добавьте блоки</p>
                    <p className="text-sm opacity-60 mt-1">Используйте панель слева</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
