import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { config } from "dotenv";

// DATA_SERVICE_ADDRESS may be passed in as an in-line env variable with `docker run`.
// Default to reading from .env.local if not provided (.env.local is not part of the git repo)
if (process.env.DATA_SERVICE_ADDRESS == null) config({ path: ".env.local" });

// CAVEAT: Data returned by getClient().query(...) is immutable.
//   Learn more at (Even though the doc is for Kotlin client, what is described is relevant here too):
//     https://www.apollographql.com/docs/kotlin/v2/essentials/queries/#typed-query-results
//   This could cause unexpected errors, for example:
//     In /auth.ts, 'authorize' function authenticates the credential input.
//       If valid, it is expected to return a mutable object!
//       So returning an immutable object directly an ApolloQueryResult will cause errors.
//       See more in /auth.ts.
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.DATA_SERVICE_ADDRESS,
    }),
  });
});
