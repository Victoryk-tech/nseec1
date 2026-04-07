import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "ayaihaxr",
  dataset: "production", // Or your custom dataset
  apiVersion: "2023-09-23", // Use today's date or matching your project
  useCdn: false, // `true` for public content, `false` if you're fetching drafts/auth content
  token: process.env.SANITY_API_TOKEN,
});
