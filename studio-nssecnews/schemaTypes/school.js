import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'school',
  title: 'School',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'School Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),

    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'lga',
      title: 'LGA',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Mixed', value: 'Mixed'},
          {title: 'Boys', value: 'Boys'},
          {title: 'Girls', value: 'Girls'},
        ],
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'ownership',
      title: 'Ownership',
      type: 'string',
      options: {
        list: [
          {title: 'Federal', value: 'Federal'},
          {title: 'State', value: 'State'},
          {title: 'Private', value: 'Private'},
        ],
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Operational', value: 'Operational'},
          {title: 'Closed', value: 'Closed'},
        ],
      },
      initialValue: 'Operational',
    }),

    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),

    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
  ],
})
