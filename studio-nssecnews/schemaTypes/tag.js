import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tag Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Tag Category',
      description: 'Group tags by type for easier management',
      type: 'string',
      options: {
        list: [
          {title: 'News', value: 'news'},
          {title: 'Press Release', value: 'press-release'},
          {title: 'Gallery', value: 'gallery'},
          {title: 'Publications', value: 'publications'},
          {title: 'General', value: 'general'},
        ],
      },
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category'},
  },
})
