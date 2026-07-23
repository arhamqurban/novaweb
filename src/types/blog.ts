export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorRole: string;
  authorImage: string;
  category: string;
  tags: string[];
  image: string;
  readingTime: string;
  featured: boolean;
  content: string;
}

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorRole: string;
  authorImage: string;
  category: string;
  tags: string[];
  image: string;
  readingTime: string;
  featured: boolean;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}
