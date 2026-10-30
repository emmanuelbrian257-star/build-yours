import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",
  icon: "P",
  fields: [
    defineField({
      name: "projectCard",
      title: "ProjectCard",
      type: "array",
      of: [
        {
          name: "card",
          title: "Card",
          type: "image",
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required().max(3),
        },
      ],
      validation: (Rule) => Rule.required().max(1),
    }),
  ],
});
