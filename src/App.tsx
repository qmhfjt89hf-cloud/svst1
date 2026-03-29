import React, { useState } from 'react';
import { Landing } from './components/Landing';
import { TemplatesPage } from './components/TemplatesPage';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { InvitationTemplate, InvitationBlock, TemplateTheme, Page } from './types';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('landing');
  const [selectedTemplate, setSelectedTemplate] = useState<InvitationTemplate | null>(null);
  const [previewData, setPreviewData] = useState<{ blocks: InvitationBlock[]; theme: TemplateTheme } | null>(null);

  const handleSelectTemplate = (template: InvitationTemplate) => {
    setSelectedTemplate(template);
    setPage('editor');
  };

  const handlePreview = (blocks: InvitationBlock[], theme: TemplateTheme) => {
    setPreviewData({ blocks, theme });
    setPage('preview');
  };

  const handleNavigate = (target: Page) => {
    setPage(target);
    if (target === 'landing') {
      setSelectedTemplate(null);
      setPreviewData(null);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      {page === 'landing' && (
        <Landing onNavigate={() => handleNavigate('templates')} />
      )}

      {page === 'templates' && (
        <TemplatesPage
          onBack={() => handleNavigate('landing')}
          onSelect={handleSelectTemplate}
        />
      )}

      {page === 'editor' && selectedTemplate && (
        <Editor
          template={selectedTemplate}
          onNavigate={handleNavigate}
          onPreview={handlePreview}
        />
      )}

      {page === 'preview' && previewData && (
        <Preview
          blocks={previewData.blocks}
          theme={previewData.theme}
          onBack={() => handleNavigate('editor')}
        />
      )}
    </div>
  );
};

export default App;
