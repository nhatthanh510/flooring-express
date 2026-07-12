import {defineType, defineField} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Timber floors in a Manly terrace"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'suburb',
      title: 'Suburb',
      type: 'string',
      description: 'Where the job was — helps local buyers picture it.',
    }),
    defineField({
      name: 'category',
      title: 'Flooring type',
      type: 'string',
      options: {
        list: [
          {title: 'Carpet', value: 'carpet'},
          {title: 'Timber / Hardwood', value: 'hardwood'},
          {title: 'Hybrid', value: 'hybrid'},
          {title: 'Laminate', value: 'laminate'},
          {title: 'Vinyl / LVP', value: 'vinyl'},
          {title: 'Tile', value: 'tile'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      description: 'The main "after" shot used on the landing page gallery.',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      description: 'Additional photos of the finished job.',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
          ],
        },
      ],
      options: {layout: 'grid'},
    }),
    defineField({
      name: 'featured',
      title: 'Feature on homepage',
      type: 'boolean',
      description: 'Show this project in the landing-page gallery.',
      initialValue: true,
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'One or two lines about the job.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'suburb', media: 'coverImage'},
  },
})
