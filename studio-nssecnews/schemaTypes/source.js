import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'source',
  title: 'Media Source',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Source Name',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g. "Vanguard Nigeria", "Punch", "Channels TV"',
    }),
    defineField({
      name: 'domain',
      title: 'Domain',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g. "vanguardngr.com" — used for favicon lookup',
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
      description: 'Full homepage URL, e.g. https://www.vanguardngr.com',
    }),
    defineField({
      name: 'favicon',
      title: 'Custom Favicon URL (optional)',
      type: 'url',
      description: 'Leave blank — favicon is auto-fetched from domain via Google S2',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'domain'},
  },
})
