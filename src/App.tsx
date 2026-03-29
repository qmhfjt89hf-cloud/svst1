import React, { useState } from 'react';
import { Landing } from './components/Landing';
import { TemplatesPage } from './components/TemplatesPage';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { CustomTemplateEditor } from './components/CustomTemplateEditor';
import { InvitationTemplate, InvitationBlock, TemplateTheme, Page, CustomTemplateProject } from './types';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('landing');
  const [selectedTemplate, setSelectedTemplate] = useState<InvitationTemplate | null>(null);
  const [selectedCustomTemplate, setSelectedCustomTemplate] = useState<CustomTemplateProject | null>(null);
  const [previewData, setPreviewData] = useState<{ blocks: InvitationBlock[]; theme: TemplateTheme } | null>(null);

  const handleSelectTemplate = (template: InvitationTemplate) => {
    setSelectedTemplate(template);
    setSelectedCustomTemplate(null);
    setPage('editor');
  };

  const handleSelectCustomTemplate = (project: CustomTemplateProject) => {
    setSelectedTemplate(null);
    setSelectedCustomTemplate(project);
    setPage('custom-editor');
  };

  const handlePreview = (blocks: InvitationBlock[], theme: TemplateTheme) => {
    setPreviewData({ blocks, theme });
    setPage('preview');
  };

  const handleNavigate = (target: Page) => {
    setPage(target);
    if (target === 'landing') {
      setSelectedTemplate(null);
      setSelectedCustomTemplate(null);
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
          onSelectCustom={handleSelectCustomTemplate}
        />
      )}

      {page === 'editor' && selectedTemplate && (
        <Editor
          template={selectedTemplate}
          onNavigate={handleNavigate}
          onPreview={handlePreview}
        />
      )}

      {page === 'custom-editor' && selectedCustomTemplate && (
        <CustomTemplateEditor
          project={selectedCustomTemplate}
          onNavigate={handleNavigate}
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
