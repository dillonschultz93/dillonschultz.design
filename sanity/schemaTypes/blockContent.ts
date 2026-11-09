import {defineArrayMember, defineField, defineType} from 'sanity'

type Block = {_type: string; _key: string; children?: {text?: string}[]}

const isEmptyParagraph = (block: Block) =>
  block._type === 'block' && !(block.children ?? []).some((span) => span.text?.trim())

/**
 * The rich text used by case studies (post) and writing (article).
 *
 * Offers only what the site renders. The document title is the page's only h1, so headings
 * start at H2; sections (H2) also fill the page's contents list.
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Paragraph', value: 'normal'},
        {title: 'Section (H2)', value: 'h2'},
        {title: 'Subsection (H3)', value: 'h3'},
        {title: 'Minor heading (H4)', value: 'h4'},
        {title: 'Pull quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          defineArrayMember({
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              defineField({
                title: 'URL',
                name: 'href',
                type: 'url',
                description: 'A full URL, an email (mailto:), or a page on this site such as /projects/quieto-tokens.',
                validation: (rule) =>
                  rule.required().uri({allowRelative: true, scheme: ['http', 'https', 'mailto']}),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'What the image shows, for people who can’t see it. Not the caption repeated.',
          hidden: ({parent}) => Boolean(parent?.decorative),
          validation: (rule) =>
            rule.custom((alt, context) => {
              const parent = context.parent as {decorative?: boolean} | undefined
              return parent?.decorative || alt?.trim() ? true : 'Describe the image, or mark it decorative.'
            }),
        }),
        defineField({
          name: 'decorative',
          title: 'Decorative',
          type: 'boolean',
          description: 'Adds nothing a reader would miss, so screen readers skip it.',
          initialValue: false,
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Shown under the image.',
        }),
      ],
    }),
    defineArrayMember({
      type: 'code',
      title: 'Code block',
      options: {
        language: 'tsx',
        withFilename: true,
        languageAlternatives: [
          {title: 'TSX', value: 'tsx'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'JavaScript', value: 'javascript'},
          {title: 'CSS', value: 'css'},
          {title: 'HTML', value: 'html'},
          {title: 'JSON', value: 'json'},
          {title: 'Shell', value: 'sh'},
          {title: 'Plain text', value: 'text'},
        ],
      },
    }),
  ],
  validation: (rule) =>
    rule
      .custom((blocks: Block[] | undefined) => {
        const empty = (blocks ?? []).filter(isEmptyParagraph)
        if (!empty.length) return true
        return {
          message: 'Empty paragraphs aren’t shown on the site. Remove them; spacing comes from the design.',
          paths: empty.map((block) => [{_key: block._key}]),
        }
      })
      .warning(),
})
