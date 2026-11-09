export type ImageBlock = { _type: "image"; _key: string; width: number; height: number; alt: string; caption: string; src: string; srcSet: string };
export type BodyBlock = ImageBlock | ({ _type: string; _key: string; style?: string; id?: string } & Record<string, unknown>);
export type Heading = { id: string; text: string };
export type NavLinkData = { title: string; slug: string } | null;

export type ProjectSummary = { title: string; description: string; tags: string[]; publishedAt: string; updatedAt: string; slug: string; index: number; image: string | null };
export type Project = ProjectSummary & { body: BodyBlock[]; headings: Heading[]; previous: NavLinkData; next: NavLinkData };

export type ArticleSummary = { title: string; excerpt: string; format: "note" | "essay"; tags: string[]; publishedAt: string; updatedAt: string; slug: string; minutes: number };
export type Article = ArticleSummary & { body: BodyBlock[]; headings: Heading[]; previous: NavLinkData; next: NavLinkData };

export type Role = { _key: string; title: string; organization: string; startDate: string; endDate?: string | null; highlights?: string[] };
export type Resume = {
  name: string;
  headline?: string;
  location?: string;
  email?: string;
  summary?: string;
  links?: { _key: string; label: string; url: string }[];
  experience?: Role[];
  volunteer?: Role[];
  education?: { _key: string; credential: string; institution?: string; period?: string }[];
  projects?: { _key: string; name: string; meta?: string; url?: string | null; description?: string }[];
  skills?: { _key: string; category: string; items?: string[] }[];
  pdfUrl?: string;
};
