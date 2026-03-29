import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Copy, Check, Smartphone, Monitor, X } from 'lucide-react';
import { InvitationBlock, TemplateTheme } from '../types';
import { RenderBlock } from './blocks/InvitationBlocks';

interface PreviewProps {
  blocks: InvitationBlock[];
  theme: TemplateTheme;
  onBack: () => void;
}

export const Preview: React.FC<PreviewProps> = ({ blocks, theme, onBack }) => {
  const [viewMode, setViewMode] = useState<'full' | 'mobile'>('full');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Decorative petals for rose-themed
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([]);
  
  useEffect(() => {
    const p = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: i * 2,
      size: 14 + Math.random() * 14,
    }));
    setPetals(p);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.bgColor === '#0f172a' ? '#0a0f1a' : '#f9fafb' }}>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-gray-500 hover:text-rose-500 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к редактору
          </button>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 rounded-lg p-1 mr-2">
              <button
                onClick={() => setViewMode('full')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'full' ? 'bg-white shadow-sm text-rose-500' : 'text-gray-400'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-white shadow-sm text-rose-500' : 'text-gray-400'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              Поделиться
            </button>
          </div>
        </div>
      </div>

      {/* Preview content */}
      <div className="pt-16 pb-12 flex justify-center">
        <div
          className={`transition-all duration-500 ${viewMode === 'mobile' ? 'w-[375px] my-8' : 'w-full max-w-[640px]'}`}
        >
          {viewMode === 'mobile' && (
            <div className="bg-gray-900 rounded-t-[3rem] pt-4 pb-2 px-4">
              <div className="w-20 h-5 bg-gray-800 rounded-full mx-auto" />
            </div>
          )}
          <div
            className={`overflow-hidden ${viewMode === 'mobile' ? 'rounded-b-[2rem] border-x-4 border-b-4 border-gray-900' : ''}`}
            style={{ backgroundColor: theme.bgColor }}
          >
            {/* Decorative floating petals */}
            <div className="relative overflow-hidden">
              {petals.map(p => (
                <div
                  key={p.id}
                  className="absolute animate-petal pointer-events-none opacity-30"
                  style={{
                    left: `${p.left}%`,
                    animationDuration: `${10 + Math.random() * 8}s`,
                    animationDelay: `${p.delay}s`,
                    top: '-5%',
                    fontSize: `${p.size}px`,
                  }}
                >
                  {theme.bgColor === '#0f172a' ? '✦' : '🌸'}
                </div>
              ))}

              {blocks.map((block, i) => (
                <div
                  key={block.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}
                >
                  <RenderBlock block={block} theme={theme} />
                </div>
              ))}

              {/* Footer watermark */}
              <div className="text-center py-8 opacity-30">
                <p className="text-xs" style={{ color: theme.textColor }}>
                  Создано с ❤️ в WedInvite
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair text-xl font-semibold">Поделиться приглашением</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Скопируйте ссылку и отправьте её гостям через любой мессенджер
            </p>
            <div className="flex gap-2">
              <input
                readOnly
                value={window.location.href}
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${copied ? 'bg-green-500 text-white' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Скопировано!' : 'Копировать'}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <button className="py-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors">
                WhatsApp
              </button>
              <button className="py-3 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors">
                Telegram
              </button>
              <button className="py-3 bg-pink-50 text-pink-700 rounded-xl text-sm font-medium hover:bg-pink-100 transition-colors">
                VK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
