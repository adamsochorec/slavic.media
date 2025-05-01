import { defineCollection, defineContentConfig, z } from "@nuxt/content";

type Collection = {
  type: "page";
  source?: string | CollectionSource;
  schema?: z.ZodObject<any>;
};

type CollectionSource = {
  include: string;
  prefix?: string;
  exclude?: string[];
  cwd?: string;
  repository?: string;
  authToken?: string;
};

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      include: "blog",
      prefix: "blog",
      schema: z.object({
        slug: z.string().max(100),
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
    } as Collection),
    legal: defineCollection({
      type: "page",
      source: "legal/*.md",
      include: "legal",
      prefix: "legal",
      schema: z.object({
        slug: z.string().max(100),
        title: z.string().max(200),
        desc: z.string().max(500),
        date: z.string().datetime(),
      }),
    } as Collection),
  },
  content: {
    components: true,
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
