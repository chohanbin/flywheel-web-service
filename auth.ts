'use server'

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { getClient } from './app/lib/data-service/client';
import { customerQuery } from './app/lib/data-service/queries';
import { Customer } from './app/types/Customer';
import { CustomerQueryResponse } from './app/types/Customer';
 
async function getCustomer(username: string): Promise<Customer | undefined> {
  try {
	const { data } = await getClient().query({
		query: customerQuery,
		variables: {
		  username: username,
		},
	  });
	
	  const customer =
		(data as CustomerQueryResponse)?.customer ?? undefined;
	
		return customer;

  } catch (error) {
    throw new Error('Failed to fetch customer.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { username } = parsedCredentials.data;
          const customer: Customer | undefined = await getCustomer(username);
		  // TODO if DB supports password in the future, check against password hash here
		  // Follow https://nextjs.org/learn/dashboard-app/adding-authentication#adding-the-sign-in-functionality
          if (customer != null) {
			return customer; // !! This is where I was blocked. When a mock JSON object gets returned instead of "customer", the auth approves.
			// And printing customer object with JSON.stringify returns non-null object.. But yet, auth thinks null was returned.
		  }
        }
        return null;
      },
    }),
  ],
});