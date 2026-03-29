import React, { useRef, useState } from 'react';
import { ArrowLeft, Heart, ChevronRight, Search, FolderUp } from 'lucide-react';
import { templates } from '../data/templates';
import { CustomTemplateProject, InvitationTemplate } from '../types';

interface TemplatesPageProps {
  onBack: () => void;
  onSelect: (template: InvitationTemplate) => void;
  onSelectCustom: (project: CustomTemplateProject) => void;
}

const themeColors: Record<string, { bg: string; border: string; badge: string }> = {
  'classic-rose': { bg: 'from-rose-100 to-rose-50', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-600' },
  'minimalist-gold': { bg: 'from-amber-50 to-yellow-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
  'botanical-garden': { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700' },
  'lavender-dream': { bg: 'from-purple-50 to-violet-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-600' },
  'rustic-charm': { bg: 'from-amber-50 to-orange-50', border: 'border-amber-300', badge: 'bg-amber-100 text-amber-800' },
  'midnight-elegance': { bg: 'from-slate-800 to-slate-900', border: 'border-slate-600', badge: 'bg-slate-700 text-amber-300' },
};

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ onBack, onSelect, onSelectCustom }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCustomFolderUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploadError(null);

    const entries = await Promise.all(Array.from(files).map(async file => ({
      path: file.webkitRelativePath || file.name,
      content: await file.text(),
    })));

    const normalizedFiles = entries.reduce<Record<string, string>>((acc, file) => {
      const normalizedPath = file.path.split('/').slice(1).join('/');
      if (!normalizedPath) return acc;
      acc[normalizedPath] = file.content;
      return acc;
    }, {});

    const entryFile = Object.keys(normalizedFiles).find(path => path.toLowerCase() === 'index.html');
    if (!entryFile) {
      setUploadError('В выбранной папке не найден файл index.html.');
      return;
    }

    onSelectCustom({
      id: `custom-${Date.now()}`,
      name: 'Мой шаблон',
      entryFile,
      files: normalizedFiles,
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
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
        <div className="text-center mb-12">
          <h1 className="font-cormorant text-4xl md:text-5xl font-semibold text-gray-900">Выберите шаблон</h1>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Можно выбрать готовый вариант или загрузить свою папку шаблона (index.html + CSS/JS) и редактировать её в редакторе.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-10">
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

        <div className="max-w-2xl mx-auto mb-12 rounded-2xl border border-dashed border-rose-300 bg-white p-6 text-center">
          <FolderUp className="w-10 h-10 text-rose-500 mx-auto mb-3" />
          <h3 className="font-playfair text-xl text-gray-900">Загрузить свой шаблон</h3>
          <p className="text-gray-500 text-sm mt-2">Выберите папку, где есть index.html и связанные файлы.</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-full text-sm font-medium"
          >
            Выбрать папку
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            onChange={(e) => handleCustomFolderUpload(e.target.files)}
            // @ts-expect-error webkitdirectory is supported by Chromium-based browsers
            webkitdirectory=""
            directory=""
          />
          {uploadError && <p className="text-sm text-red-500 mt-3">{uploadError}</p>}
        </div>

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
                <div className={`relative bg-gradient-to-br ${colors.bg} h-80 flex items-center justify-center overflow-hidden`}>
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

                <div className="p-5">
                  <h3 className="font-playfair text-lg font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">{template.description}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${colors.badge}`}>{template.blocks.length} блоков</span>
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
