import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },

    async signIn({ user, account, profile }) {
      // console.log(user);
      try {
        const getUser = await getGuest(user.email);
        console.log(getUser);

        if (!getUser)
          await createGuest({ fullName: user.name, email: user.email });

        return true;
        // const create = await createGuest([user]);
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session.user.email);

      session.user.guestId = guest.at(0).id;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  session,
  signOut,
} = NextAuth(authConfig);
