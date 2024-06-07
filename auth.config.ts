import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log(`auth: ${JSON.stringify(auth)}`)
      console.log("authorized: 1")
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      console.log("authorized: 2")
      if (isOnDashboard) {
        console.log("authorized: 3")
        if (isLoggedIn) return true;
        console.log("authorized: 4")
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log("authorized: 5")
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
        console.log("authorized: 6")
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
