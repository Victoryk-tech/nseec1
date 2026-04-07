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
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),


    // ✅ Use 'file' type for PDFs
    defineField({
      name: 'download',
      title: 'PDF File',
      type: 'file',
      options: {
        storeOriginalFilename: true,   // keep original filename
        accept: "application/pdf",     // restrict to pdf
      },
      validation: Rule => Rule.required(),
    }),

    // ✅ Ensure each category value is unique
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Reports', value: 'reports' },
          { title: 'Digest', value: 'digest' },
          { title: 'Research / Journals', value: 'research-journals' },
          { title: 'NSSEC Establishment Act', value: 'nssec-establishment-act' },
          { title: 'National Policy on SSE', value: 'national-policy-sse' },
          { title: 'Minimum Standards for Senior Secondary Education', value: 'minimum-standards' },
          { title: 'Implementation Guidelines for the National Policy', value: 'implementation-guidelines' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
  ],
})
