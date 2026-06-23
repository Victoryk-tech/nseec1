import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mediaPost',
  title: 'Media Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description / Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200),
    }),
    defineField({
      name: 'summary',
      title: 'Summary (Lead Paragraph)',
      type: 'text',
      rows: 5,
      description: 'The full lead paragraph shown on the press release detail page',
      hidden: ({parent}) => parent?.mainCategory !== 'press-release',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Original URL where this press release was published',
      hidden: ({parent}) => parent?.mainCategory !== 'press-release',
      validation: Rule =>
        Rule.custom((val, ctx) => {
          if (ctx.parent?.mainCategory !== 'press-release') return true
          if (!val) return 'Source URL is required for press releases'
          return true
        }),
    }),
    defineField({
      name: 'source',
      title: 'Source (Media Outlet)',
      type: 'reference',
      to: [{type: 'source'}],
      description: 'Select or create the media outlet. Fallback: fill Source Name / Domain below.',
      hidden: ({parent}) => parent?.mainCategory !== 'press-release',
    }),
    defineField({
      name: 'sourceName',
      title: 'Source Name (fallback)',
      type: 'string',
      description: 'Use if Source reference is not set — e.g. "Vanguard Nigeria"',
      hidden: ({parent}) => parent?.mainCategory !== 'press-release',
    }),
    defineField({
      name: 'sourceDomain',
      title: 'Source Domain (fallback)',
      type: 'string',
      description: 'Use if Source reference is not set — e.g. "vanguardngr.com"',
      hidden: ({parent}) => parent?.mainCategory !== 'press-release',
    }),
    defineField({
      name: 'urlMetadata',
      title: 'URL Metadata (auto-populated)',
      type: 'object',
      description: 'Fetched automatically from Source URL when saved via the dashboard. Do not edit manually.',
      hidden: ({parent}) => parent?.mainCategory !== 'press-release',
      readOnly: true,
      fields: [
        defineField({name: 'image', title: 'OG / Preview Image URL', type: 'url'}),
        defineField({name: 'title', title: 'Page Title', type: 'string'}),
        defineField({name: 'description', title: 'Meta Description', type: 'text'}),
        defineField({name: 'siteName', title: 'Site Name', type: 'string'}),
        defineField({name: 'favicon', title: 'Favicon URL', type: 'url'}),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'newsCategory'}]}],
      description: 'Select categories from the shared newsCategory list',
      hidden: ({parent}) => parent?.mainCategory === 'photo-gallery',
    }),
    defineField({
      name: 'breaking',
      title: 'Breaking News',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.mainCategory !== 'press-release',
    }),
    defineField({
      name: 'trending',
      title: 'Trending',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.mainCategory !== 'press-release',
    }),
    defineField({
      name: 'mainCategory',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'NSSEC News', value: 'nssec-news'},
          {title: 'Photo Gallery', value: 'photo-gallery'},
          {title: 'Press Release', value: 'press-release'},
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subCategory',
      title: 'Sub-Category',
      type: 'string',
      options: {
        list: [
          {title: 'Conference', value: 'conference'},
          {title: 'Events', value: 'events'},
          {title: 'Announcement', value: 'announcement'},
          {title: 'Education', value: 'education'},
          {title: 'Policy', value: 'policy'},
          {title: 'Uncategorized', value: 'uncategorized'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => parent?.mainCategory === 'photo-gallery',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'cloudinaryUrl',
      title: 'Cloudinary Image URL (optional)',
      type: 'url',
      description: 'Paste a Cloudinary URL here to use Cloudinary instead of Sanity for this image',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      hidden: ({parent}) => parent?.mainCategory === 'photo-gallery',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      hidden: ({parent}) => parent?.mainCategory !== 'photo-gallery',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
            defineField({name: 'cloudinaryUrl', title: 'Cloudinary URL (optional)', type: 'url'}),
            defineField({name: 'caption', title: 'Caption', type: 'string'}),
            defineField({name: 'altText', title: 'Alt Text', type: 'string'}),
          ],
          preview: {select: {title: 'caption', media: 'image'}},
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),
    defineField({
      name: 'hashtags',
      title: 'Hashtags',
      description: 'Add hashtags without the # symbol (e.g., "NSSECNews", "Education")',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'comments',
      title: 'Comments',
      type: 'array',
      hidden: ({parent}) => parent?.mainCategory === 'photo-gallery',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({name: 'email', title: 'Email', type: 'string'}),
            defineField({name: 'website', title: 'Website (optional)', type: 'url'}),
            defineField({name: 'comment', title: 'Comment', type: 'text'}),
            defineField({name: 'createdAt', title: 'Comment Date', type: 'datetime'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image', subtitle: 'mainCategory'},
  },
})
