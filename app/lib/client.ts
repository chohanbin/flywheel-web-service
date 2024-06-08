import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { config } from "dotenv";

// DATA_SERVICE_ADDRESS may be passed in as an in-line env variable with `docker run`.
// Default to reading from .env.local if not provided.
if (process.env.DATA_SERVICE_ADDRESS == null) config({ path: ".env.local" });

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.DATA_SERVICE_ADDRESS,
    }),
  });
});
