import {defineField, defineType} from 'sanity'

/**
 * A blog post. Format decides the layout: a note is one narrow column, and an essay
 * adds a large title, a contents list and the reading progress blob. Reading time is
 * calculated from the body when the site builds.
 */
export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          {title: 'Note', value: 'note'},
          {title: 'Essay', value: 'essay'},
        ],
        layout: 'radio',
      },
      initialValue: 'note',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      description: 'One line for the blog list. On an essay, it also appears under the title.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'publishedAt', title: 'Published at', type: 'datetime', validation: (rule) => rule.required()}),
    defineField({name: 'tags', title: 'Tags', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}}),
    defineField({name: 'body', title: 'Body', type: 'blockContent'}),
  ],
  orderings: [{title: 'Newest first', name: 'publishedDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'format'}},
})
