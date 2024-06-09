import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { config } from "dotenv";

// DATA_SERVICE_ADDRESS may be passed in as an in-line env variable with `docker run`.
// Default to reading from .env.local if not provided (.env.local is not part of the git repo)
if (process.env.DATA_SERVICE_ADDRESS == null) config({ path: ".env.local" });

// CAVEAT: Data returned by getClient().query(...) is immutable.
//   See (Even though the doc is for Kotlin client, what is described is relevant here too):
//   https://www.apollographql.com/docs/kotlin/v2/essentials/queries/#typed-query-results
//   This could cause unexpected errors, for example:
//   In /auth.ts, 'authorize' function authenticates the credential input.
//   If valid, it is expected to return an object with 'id' field, that is mutable! See more in /auth.ts.
//   If the customer object (with 'id' field) from Apollo client is directly returned,
//     This error will be thrown: "TypeError: Cannot assign to read only property 'id' of object"
//   If the customer object (without 'id' field) from Apollo client is directly returned,
//     This error will be thrown: "TypeError: Cannot add property id, object is not extensible"
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.DATA_SERVICE_ADDRESS,
    }),
  });
});
