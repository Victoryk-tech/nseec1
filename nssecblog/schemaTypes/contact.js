import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),

    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      options: {
        source: 'description',
        maxLength: 140,
      },
    }),

    defineField({
      name: 'message',
      title: 'Message',
      type: 'string',
    }),
  ],
})
