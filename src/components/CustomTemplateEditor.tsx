import React, { useMemo, useState } from 'react';
import { ArrowLeft, Eye, Edit3, FileCode, Save } from 'lucide-react';
import { CustomTemplateProject, Page } from '../types';

interface CustomTemplateEditorProps {
  project: CustomTemplateProject;
  onNavigate: (page: Page) => void;
}

const resolvePreviewHtml = (project: CustomTemplateProject, files: Record<string, string>): string => {
  let html = files[project.entryFile] || '';

  Object.entries(files).forEach(([path, content]) => {
    if (path === project.entryFile) return;
    const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (path.endsWith('.css')) {
      const styleTag = `<style data-inline-path="${path}">\n${content}\n</style>`;
      const cssHrefRegex = new RegExp(`<link[^>]*href=["']${escapedPath}["'][^>]*>`, 'gi');
      html = html.replace(cssHrefRegex, styleTag);
    }

    if (path.endsWith('.js')) {
      const scriptTag = `<script data-inline-path="${path}">\n${content}\n<\\/script>`;
      const jsSrcRegex = new RegExp(`<script[^>]*src=["']${escapedPath}["'][^>]*><\\/script>`, 'gi');
      html = html.replace(jsSrcRegex, scriptTag);
    }
  });

  return html;
};

export const CustomTemplateEditor: React.FC<CustomTemplateEditorProps> = ({ project, onNavigate }) => {
  const [files, setFiles] = useState<Record<string, string>>(project.files);
  const [activePath, setActivePath] = useState<string>(project.entryFile);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  const previewHtml = useMemo(() => resolvePreviewHtml(project, files), [project, files]);

  const updateActiveFile = (content: string) => {
    setFiles(prev => ({ ...prev, [activePath]: content }));
  };

  const orderedPaths = useMemo(() => Object.keys(files).sort((a, b) => {
    if (a === project.entryFile) return -1;
    if (b === project.entryFile) return 1;
    return a.localeCompare(b);
  }), [files, project.entryFile]);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('templates')}
            className="flex items-center gap-1.5 text-gray-500 hover:text-rose-500 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <div>
            <div className="text-sm font-semibold text-gray-900">{project.name}</div>
            <div className="text-xs text-gray-400">Папка шаблона</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('edit')}
            className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1.5 ${mode === 'edit' ? 'bg-rose-100 text-rose-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Edit3 className="w-4 h-4" /> Редактор
          </button>
          <button
            onClick={() => setMode('preview')}
            className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1.5 ${mode === 'preview' ? 'bg-rose-100 text-rose-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Eye className="w-4 h-4" /> Просмотр
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto p-3">
          <h3 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Файлы шаблона</h3>
          <div className="space-y-1">
            {orderedPaths.map(path => (
              <button
                key={path}
                onClick={() => {
                  setActivePath(path);
                  setMode('edit');
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${activePath === path ? 'bg-rose-100 text-rose-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FileCode className="w-4 h-4" />
                <span className="truncate">{path}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 text-xs text-gray-400 leading-relaxed">
            <p>Редактируйте HTML/CSS/JS прямо в редакторе.</p>
            <p className="mt-1">Для предпросмотра нажмите «Просмотр».</p>
          </div>
        </aside>

        <main className="flex-1 p-4">
          {mode === 'edit' ? (
            <div className="h-full bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
              <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{activePath}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Save className="w-3 h-3" /> Автосохранение в памяти
                </span>
              </div>
              <textarea
                value={files[activePath] ?? ''}
                onChange={(e) => updateActiveFile(e.target.value)}
                className="w-full flex-1 p-4 font-mono text-sm bg-gray-50 text-gray-800 focus:outline-none resize-none"
                spellCheck={false}
              />
            </div>
          ) : (
            <div className="h-full bg-white border border-gray-200 rounded-xl overflow-hidden">
              <iframe
                title="Custom template preview"
                srcDoc={previewHtml}
                className="w-full h-full"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
