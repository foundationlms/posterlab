export interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

export interface PosterSection {
  id: string;
  name: string;
  area: string;
  placeholder: string;
  type?: 'text' | 'figure' | 'table' | 'references' | 'methods' | 'results';
  required?: boolean;
  discipline?: string;
  minFontSize?: number;
  maxFontSize?: number;
  metadata?: {
    style?: 'title' | 'authors' | 'body';
  };
}

export interface PosterTemplate {
  id: string;
  name: string;
  type: 'classic' | 'modern';
  discipline?: 'medical' | 'biology' | 'chemistry' | 'physics' | 'general';
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape' | 'square';
  sections: PosterSection[];
  citationStyle?: 'apa' | 'vancouver' | 'harvard' | 'nature';
  collaborators?: string[];
  defaultFontSizes?: {
    title: number;
    heading: number;
    body: number;
  };
}

export interface PosterElement {
  id: string;
  type: string;
  content: string;
  position: { x: number; y: number };
  sectionId?: string;
  metadata?: {
    citations?: string[];
    dataSource?: string;
    chartConfig?: any;
    collaborator?: string;
    lastModified?: string;
    dimensions?: ImageDimensions;
    originalUrl?: string;
    fontSize?: number;
    fontWeight?: string;
    textAlign?: string;
  };
}