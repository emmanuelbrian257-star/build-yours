import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { env } from "../../../env/index";

const config = {
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
};

const client = createClient(config);

/* const adminConfig = {
  ...config,
  token: env.SANITY_API_TOKEN,
};
export const adminClient = createClient(adminConfig); */
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
export default client;
