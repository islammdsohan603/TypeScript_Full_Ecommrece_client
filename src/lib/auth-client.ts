import { createAuthClient } from 'better-auth/react';

// 🌟 নিশ্চিত করুন এখানে 'export const' লেখা আছে যেন অন্য ফাইল ইম্পোর্ট করতে পারে
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000', // This MUST point to the Next.js frontend URL
});

// useSession ও এক্সপোর্ট করে রাখা ভালো
export const { useSession } = authClient;
