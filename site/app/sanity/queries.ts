import groq from "groq"

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`;
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
export const POST_SLUGS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { title, "slug": slug.current }`;

export const RESUME_QUERY = groq`*[_id == "resume"][0]{
  name, headline, location, email, summary,
  links[]{ _key, label, url },
  experience[]{ _key, title, organization, startDate, endDate, highlights },
  volunteer[]{ _key, title, organization, startDate, endDate, highlights },
  education[]{ _key, credential, institution, period },
  projects[]{ _key, name, meta, url, description },
  skills[]{ _key, category, items },
  "pdfUrl": pdf.asset->url
}`;
