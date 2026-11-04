import {defineArrayMember, defineField, defineType} from 'sanity'

const role = defineArrayMember({
  name: 'role',
  title: 'Role',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      options: {dateFormat: 'MM/YYYY'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      description: 'Leave empty for a current role ("Present").',
      type: 'date',
      options: {dateFormat: 'MM/YYYY'},
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 2})],
    }),
  ],
  preview: {
    select: {title: 'title', organization: 'organization', start: 'startDate', end: 'endDate'},
    prepare({title, organization, start, end}) {
      const fmt = (d?: string) => (d ? d.slice(0, 7) : 'Present')
      return {title: `${title}, ${organization}`, subtitle: `${fmt(start)} – ${fmt(end)}`}
    },
  },
})

export default defineType({
  name: 'resume',
  title: 'Résumé',
  type: 'document',
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'experience', title: 'Experience'},
    {name: 'more', title: 'Education, projects & skills'},
  ],
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', group: 'header', validation: (rule) => rule.required()}),
    defineField({name: 'headline', title: 'Headline', type: 'string', group: 'header'}),
    defineField({name: 'location', title: 'Location', type: 'string', group: 'header'}),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'header',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      group: 'header',
      of: [
        defineArrayMember({
          name: 'link',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({name: 'summary', title: 'Professional summary', type: 'text', rows: 5, group: 'header'}),
    defineField({
      name: 'pdf',
      title: 'Résumé PDF',
      description: 'Offered as the download on the résumé page.',
      type: 'file',
      group: 'header',
      options: {accept: 'application/pdf'},
    }),
    defineField({name: 'experience', title: 'Work experience', type: 'array', group: 'experience', of: [role]}),
    defineField({name: 'volunteer', title: 'Volunteer', type: 'array', group: 'experience', of: [role]}),
    defineField({
      name: 'education',
      title: 'Education and certifications',
      type: 'array',
      group: 'more',
      of: [
        defineArrayMember({
          name: 'educationItem',
          type: 'object',
          fields: [
            defineField({name: 'credential', title: 'Credential', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'institution', title: 'Institution', type: 'string'}),
            defineField({name: 'period', title: 'Year(s)', type: 'string', description: 'e.g. "2017" or "2013 – 2015"'}),
          ],
          preview: {select: {title: 'credential', subtitle: 'institution'}},
        }),
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Relevant projects',
      type: 'array',
      group: 'more',
      of: [
        defineArrayMember({
          name: 'project',
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'meta', title: 'Meta', type: 'string', description: 'Short line beside the name, e.g. repo or site.'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
          ],
          preview: {select: {title: 'name', subtitle: 'meta'}},
        }),
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      group: 'more',
      of: [
        defineArrayMember({
          name: 'skillGroup',
          type: 'object',
          fields: [
            defineField({name: 'category', title: 'Category', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'items',
              title: 'Skills',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              options: {layout: 'tags'},
            }),
          ],
          preview: {select: {title: 'category'}},
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Résumé'}),
  },
})
