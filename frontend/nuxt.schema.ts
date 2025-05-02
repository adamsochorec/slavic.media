export default defineNuxtSchema({
  authors: group({
    title: "Authors",
    description: "Select an author and their details.",
    icon: "i-mdi-account-outline",
    fields: {
      author: field({
        type: "select",
        title: "Author",
        description: "Choose an author from the list.",
        options: [
          {
            label: "Adam Sochorec",
            value: {
              authorId: "adam",
              authorName: "Adam S.",
              department: "Creative Director",
              authorLinkedin: "https://www.linkedin.com/in/adamsochorec",
            },
          },
          {
            label: "Marcel Hájik",
            value: {
              authorId: "marcel",
              authorName: "Marcel H.",
              department: "Director of Photography",
              authorLinkedin: "https://www.linkedin.com/in/marcelhajik",
            },
          },
          {
            label: "Gabrieala Sochorcová",
            value: {
              authorId: "gabriela",
              authorName: "Gabriela S.",
              department: "Marketing Consultant",
              authorLinkedin: "https://www.linkedin.com/in/gabrielasochorcova",
            },
          },
        ],
      }),
    },
  }),
});
