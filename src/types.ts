export interface InvitationBlock {
  id: string;
  type: 'header' | 'names' | 'date' | 'venue' | 'story' | 'countdown' | 'rsvp' | 'gallery' | 'quote' | 'divider' | 'dresscode' | 'schedule';
  content: Record<string, string>;
  style?: Record<string, string>;
}

export interface InvitationTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  theme: TemplateTheme;
  blocks: InvitationBlock[];
}

export interface TemplateTheme {
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
  backgroundPattern?: string;
}

export interface Project {
  id: string;
  name: string;
  templateId: string;
  theme: TemplateTheme;
  blocks: InvitationBlock[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomTemplateProject {
  id: string;
  name: string;
  entryFile: string;
  files: Record<string, string>;
}

export type Page = 'landing' | 'templates' | 'editor' | 'preview' | 'custom-editor';
