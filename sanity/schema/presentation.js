import { defineField, defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "presentation",
  title: "Presentation",
  type: "document",
  icon: "P",
  fields: [
    defineField({
      name: "card",
      title: "PresentationCard",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          name: "cardItem",
          title: "CardItem",
          type: "object",
          fields: [
            defineField({
              name: "cardImage",
              title: "CardImage",
              type: "image",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "problemTitle",
              title: "ProblemTitle",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "solutionTitle",
              title: "SolutionTitle",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "createdAt",
              title: "CreatedAt",
              type: "date",
              options: {
                dateFormat: "YYYY-MM-DD",
              },
              initialValue: () => new Date().toISOString(),
            }),
          ],
        },
      ],
    }),
  ],
});
