
export interface Person {
  id: string;
  slug: string;
  name: string;
  biography: string;
  imageUrls: string[];
}

export interface Submission {
  id: string;
  name: string;
  email: string;
  type: 'person' | 'news' | 'article' | 'other';
  content: string;
  status: 'new' | 'viewed' | 'archived';
  createdAt: string;
}

export interface Article {
    id: string;
    slug: string;
    title: string;
    summary: string;
    content: string;
    author: string;
    date: string; // Consider using a timestamp for better sorting
    tags: string[];
    imageUrls: string[];
    imageHint: string;
}

export interface News {
    id: string;
    slug: string;
    title: string;
    summary: string;
    content: string;
    date: string; // Consider using a timestamp
    category: string;
    imageUrls: string[];
    imageHint: string;
}

export interface GenealogyMember {
  id: string;
  name: string;
  parentId: string | null; // null for the root member
}
