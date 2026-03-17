import { authOptions } from "./options";
import NextAuth from "next-auth/next";

const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };