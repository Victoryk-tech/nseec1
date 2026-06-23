import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'nssecnews',
  title: 'NSSEC News',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'taxonomy', title: 'Taxonomy'},
    {name: 'seo', title: 'SEO'},
    {name: 'analytics', title: 'Analytics'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    // ── CORE ─────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Short teaser shown on listing pages (max 160 chars)',
      type: 'text',
      rows: 2,
      group: 'content',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'summary',
      title: 'Summary / Lead Paragraph',
      description: 'Longer intro shown at the top of the article page',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'settings',
      initialValue: () => new Date().toISOString(),
    }),

    // ── RELATIONSHIPS ────────────────────────────────────────────────
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'content',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      description: 'Select reusable categories created in the News Categories section',
      type: 'array',
      group: 'taxonomy',
      of: [{type: 'reference', to: [{type: 'newsCategory'}]}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Select reusable tags created in the Tags section',
      type: 'array',
      group: 'taxonomy',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),
    defineField({
      name: 'hashtags',
      title: 'Hashtags',
      description: 'Without # symbol — e.g. "NSSECNews", "Education"',
      type: 'array',
      group: 'taxonomy',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),

    // ── FEATURED MEDIA (exclusive: image OR video) ───────────────────
    defineField({
      name: 'featuredMediaType',
      title: 'Featured Media Type',
      description: 'Choose ONE type. The other fields will be hidden.',
      type: 'string',
      group: 'media',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image (Sanity)',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.featuredMediaType === 'video',
      fields: [
        defineField({name: 'alt', title: 'Alt Text', type: 'string'}),
        defineField({name: 'caption', title: 'Caption', type: 'string'}),
      ],
    }),
    defineField({
      name: 'featuredImageCloudinaryUrl',
      title: 'Featured Image — Cloudinary URL',
      type: 'url',
      group: 'media',
      description: 'Paste a Cloudinary delivery URL. Takes priority over the Sanity image above.',
      hidden: ({parent}) => parent?.featuredMediaType === 'video',
    }),
    defineField({
      name: 'featuredVideo',
      title: 'Featured Video',
      type: 'object',
      group: 'media',
      hidden: ({parent}) => parent?.featuredMediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((value, {parent}) => {
          if (parent?.featuredMediaType === 'video' && !value?.url) {
            return 'A video URL is required when Featured Media Type is set to Video'
          }
          return true
        }),
      fields: [
        defineField({
          name: 'url',
          title: 'Video URL',
          type: 'url',
          description: 'YouTube, Vimeo, Cloudinary, or direct video URL',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'provider',
          title: 'Video Provider',
          type: 'string',
          options: {
            list: [
              {title: 'YouTube', value: 'youtube'},
              {title: 'Vimeo', value: 'vimeo'},
              {title: 'Cloudinary', value: 'cloudinary'},
              {title: 'Direct URL', value: 'direct'},
            ],
          },
        }),
        defineField({name: 'thumbnail', title: 'Thumbnail URL', type: 'url'}),
        defineField({name: 'caption', title: 'Caption', type: 'string'}),
      ],
    }),

    // ── MEDIA GALLERY (multiple images + videos) ─────────────────────
    defineField({
      name: 'gallery',
      title: 'Media Gallery',
      description: 'Additional images or videos for this article',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          title: 'Gallery Item',
          fields: [
            defineField({
              name: 'mediaType',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Image', value: 'image'},
                  {title: 'Video', value: 'video'},
                ],
                layout: 'radio',
              },
              initialValue: 'image',
            }),
            defineField({
              name: 'image',
              title: 'Image (Sanity)',
              type: 'image',
              options: {hotspot: true},
              hidden: ({parent}) => parent?.mediaType === 'video',
            }),
            defineField({
              name: 'cloudinaryUrl',
              title: 'Cloudinary URL',
              type: 'url',
              description: 'Image or video URL from Cloudinary (takes priority over Sanity image)',
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              hidden: ({parent}) => parent?.mediaType !== 'video',
            }),
            defineField({name: 'caption', title: 'Caption', type: 'string'}),
            defineField({name: 'alt', title: 'Alt Text', type: 'string'}),
          ],
          preview: {
            select: {title: 'caption', media: 'image', mediaType: 'mediaType'},
            prepare({title, media, mediaType}) {
              return {title: title || (mediaType === 'video' ? 'Video' : 'Image'), media}
            },
          },
        },
      ],
    }),

    // ── SEO ──────────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      description: 'Overrides the article title in browser tab & search results (max 60 chars)',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      description: 'Meta description for search engines (max 160 chars)',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      group: 'seo',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Open Graph Image (Sanity)',
      description: '1200×630 px recommended. Falls back to featured image.',
      type: 'image',
      group: 'seo',
      options: {hotspot: true},
    }),
    defineField({
      name: 'openGraphImageCloudinaryUrl',
      title: 'Open Graph Image — Cloudinary URL',
      type: 'url',
      group: 'seo',
      description: 'Takes priority over the Sanity Open Graph image above',
    }),

    // ── ANALYTICS ────────────────────────────────────────────────────
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      group: 'analytics',
      initialValue: 0,
      readOnly: true,
      description: 'Incremented automatically on each article page visit',
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'number',
      group: 'analytics',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'shares',
      title: 'Shares',
      type: 'number',
      group: 'analytics',
      initialValue: 0,
      readOnly: true,
    }),

    // ── SETTINGS ─────────────────────────────────────────────────────
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      description: 'Leave blank to auto-calculate from body content',
      type: 'number',
      group: 'settings',
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: 'featuredNews',
      title: 'Featured',
      description: 'Pin to the featured slot on the news listing page',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),
    defineField({
      name: 'breakingNews',
      title: 'Breaking News',
      description: 'Shows a breaking news badge on the article',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),
    defineField({
      name: 'trendingNews',
      title: 'Trending',
      description: 'Marks article as trending in the sidebar',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Published (Latest first)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published (Oldest first)',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
    {
      title: 'Most Views',
      name: 'viewsDesc',
      by: [{field: 'views', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      media: 'featuredImage',
      date: 'publishedAt',
      breaking: 'breakingNews',
    },
    prepare({title, status, media, date, breaking}) {
      const d = date
        ? new Date(date).toLocaleDateString('en-NG', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : ''
      const flags = [status?.toUpperCase() || 'DRAFT', breaking ? '🔴 BREAKING' : null]
        .filter(Boolean)
        .join(' · ')
      return {title, subtitle: `${flags} · ${d}`, media}
    },
  },
})
