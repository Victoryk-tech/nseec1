import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'publications',
  title: 'Publications',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Upload the publication cover page or a representative image',
    }),
    defineField({
      name: 'cloudinaryUrl',
      title: 'Cloudinary Cover Image URL (optional)',
      type: 'url',
    }),
    defineField({
      name: 'download',
      title: 'PDF File',
      type: 'file',
      options: {storeOriginalFilename: true, accept: 'application/pdf'},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Reports', value: 'reports'},
          {title: 'Digest', value: 'digest'},
          {title: 'Research / Journals', value: 'research-journals'},
          {title: 'NSSEC Establishment Act', value: 'nssec-establishment-act'},
          {title: 'National Policy on SSE', value: 'national-policy-sse'},
          {title: 'Minimum Standards for Senior Secondary Education', value: 'minimum-standards'},
          {title: 'Implementation Guidelines for the National Policy', value: 'implementation-guidelines'},
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),
    defineField({
      name: 'author',
      title: 'Author / Publisher',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'fileSize',
      title: 'File Size (e.g., "2.4 MB")',
      type: 'string',
    }),
    defineField({
      name: 'pageCount',
      title: 'Page Count',
      type: 'number',
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'downloadCount',
      title: 'Download Count',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Publication',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'coverImage'},
  },
})
