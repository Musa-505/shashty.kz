
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
