import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { fetchCustomer, makeMutableCopy } from '@/app/lib/data';
import { credentialSchema } from './app/lib/definitions';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
            const parsedCredentials = credentialSchema.safeParse(credentials);

            if (parsedCredentials.success) {
                const { email } = parsedCredentials.data;
                const customer = await fetchCustomer(email);
                // TODO idea: Once the app starts supporting password,
                //   Then validate that here.
                //   For now, validating that email exists is enough.
                //   Better yet, consider using more robust auth providers.
                //   See comments at /auth.config.ts -> 'providers' for suggestions.

                if (customer) {
                    //
                    // Why bother making a mutable copy?
                    //   If the user credential is valid, 'authorize' is expected to return the user object
                    //     (as demonstrated by Learn NextJS Chapter 15: https://nextjs.org/learn/dashboard-app/adding-authentication )
                    //   Downstream in the NextAuthJS flow, returnedObject.id field will attempt to be set.
                    //   But the response from Apollo client is read-only. See more in /app/lib/client.ts.
                    //   So if the customer object from the query result has 'id' field, 
                    //     this error will be thrown: "TypeError: Cannot assign to read only property 'id' of object"
                    //   Even if the customer object lacks 'id' field,
                    //     another error will be thrown: "TypeError: Cannot add property id, object is not extensible"
                    // Hence, decided to return a mutable copy of the customer data.

                    return makeMutableCopy(customer);
                }
            }

            console.log('Invalid credentials');
            return null;
        },
    })
  ],
});
