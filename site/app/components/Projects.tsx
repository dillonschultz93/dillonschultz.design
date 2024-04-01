import type { SanityDocument } from "@sanity/client";

import { Link } from "@remix-run/react";

export default function Projects({ posts }: { posts: SanityDocument[] }) {
  return (
    <main className="flex flex-col gap-8 mb-12 md:gap-24 min-w-0">
      {posts?.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="project flex flex-col gap-6 min-w-0">
            <div className="project-info flex flex-col gap-2 items-start">
              <Link to={`/projects/${post.slug.current}`} className="title-lg link">
                { post.title }
              </Link>
              <div className="flex">
                <span>
                  { new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }
                </span>
                { post.tags && post.tags.length > 0 ? (
                  <span>
                    &nbsp;|&nbsp;
                    { post.tags.map((tag: string, index: number) => (
                      <span key={index} className="tag">
                        { tag }
                        { index < post.tags.length - 1 ? ', ' : '' }
                      </span>
                    )) }
                  </span>
                ) : null }
              </div>
            </div>
            <p className="project-description">
              { post.description }
            </p>
          </div>
        ))
      ) : (
        <div className="p-4">No projects found</div>
      )}
    </main>
  );
}
