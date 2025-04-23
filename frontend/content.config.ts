import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: "blog/*.md",
      type: "page",
      schema: z.object({
        _id: z.string().max(100),
        title: z.string().max(200),
        date: z.string().datetime(),
        flag: z.string().length(2).optional(),
        keywords: z.array(z.string()),
        linkedin: z.string().url().optional(),
        thumbnail: z.string().max(100),
        icon: z.string().max(50),
        desc: z.string().max(1000),
        length: z.number().min(1),
        authorName: z.string().max(100),
        authorId: z.string().max(50),
        authorLinkedin: z.string().url(),
      }),
    }),
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          include: { h2: true, h3: true, h4: true },
        },
      },
    },
  },
});
