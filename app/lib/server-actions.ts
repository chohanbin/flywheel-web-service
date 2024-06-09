"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const username = formData.get("username");

  try {
    //
    // The code commented below is what Learn NextJS Chapter 15 suggested (as of 2024-06-08):
    //   https://nextjs.org/learn/dashboard-app/adding-authentication#updating-the-login-form
    //   However, it is not working as expected. Once the user is authenticated,
    //   the app will load the content of '/dashboard', but the URL pathname will remain at the login page ('/').
    //
    // await signIn('credentials', formData);
    await signIn("credentials", {
      username: username,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    console.error(`authenticate error: ${JSON.stringify(error)}`);
    if (error instanceof AuthError) {
      switch (error.type) {
        //
        // Note: As of 2024-06-08, even if in /auth.ts, 'authorize' decides
        //   'Invalid credentials', the error type is 'CallbackRouteError',
        //   not 'CredentialsSignin' as expected.
        //   So even in the case of 'Invalid Credentials', the user will see 'Something went wrong' as the feedback.
        //   This is a known issue with NextJS. See more at:
        //   https://github.com/nextauthjs/next-auth/issues/6512#issuecomment-1404902257
        //   I will leave 'CredentialsSignin' here, in case it can be used again in the future.
        //   It is what Learn NextJS Chapter 15 suggested, after all: https://nextjs.org/learn/dashboard-app/adding-authentication#updating-the-login-form
        //   And it seems nicer to give the user feedback 'Invalid credentials' than 'Something went wrong',
        //   which can leave them wondering if their credentials were correct, but the app is not functioning correctly.
        //
        // case 'CredentialsSignin':
        //   return 'Invalid credentials.';
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
