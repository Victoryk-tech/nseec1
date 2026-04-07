import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mediaPost',
  title: 'Media Post',
  type: 'document',
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(120),
    }),

    // Slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    // Description
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(180),
    }),

    // Content (not needed for gallery)
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      hidden: ({parent}) => parent?.mainCategory === 'gallery',
    }),

    // Image (required for gallery)
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      validation: Rule =>
        Rule.custom((value, context) => {
          if (context.parent?.mainCategory === 'gallery' && !value) {
            return 'An image is required for gallery posts.'
          }
          return true
        }),
    }),

    // Main Category
    defineField({
      name: 'mainCategory',
      title: 'Main Category',
      type: 'string',
      options: {
        list: [
          {title: 'Gallery', value: 'gallery'},
          {title: 'News Headlines', value: 'news-headlines'},
          {title: 'Press Release', value: 'press-release'},
          {title: 'Announcements', value: 'announcements'},
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),

    // Sub-category (only for News Headlines)
    defineField({
      name: 'subCategory',
      title: 'Sub-Category (for News Headlines)',
      type: 'string',
      options: {
        list: [
          {title: 'Conference', value: 'conference'},
          {title: 'Events', value: 'events'},
          {title: 'Uncategorized', value: 'uncategorized'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => parent?.mainCategory !== 'news-headlines',
    }),

    // Views (not relevant for gallery but can still track)
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),

    // Comments (hide for gallery)
    defineField({
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({name: 'email', title: 'Email', type: 'string'}),
            defineField({name: 'website', title: 'Website (optional)', type: 'url'}),
            defineField({name: 'comment', title: 'Comment', type: 'text'}),
            defineField({name: 'createdAt', title: 'Comment Date', type: 'datetime'}),
          ],
        }),
      ],
      hidden: ({parent}) => parent?.mainCategory === 'gallery',
    }),

    // Published Date
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'mainCategory',
    },
  },
})
