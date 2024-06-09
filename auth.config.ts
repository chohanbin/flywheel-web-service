import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/', // Unauthenticated users are redirected to '/'
  },
    callbacks: {
        // 'authorized' verifies if the request is authorized to access a page
        //   via Next.js Middleware (middleware.ts)
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                return (isLoggedIn) ? true : false
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    // 'providers' lists different login options.
    // See all options at https://authjs.dev/getting-started#authentication-methods
    providers: [],
} satisfies NextAuthConfig;