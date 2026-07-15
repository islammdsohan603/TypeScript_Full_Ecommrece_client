import { createAuthClient } from 'better-auth/react';

// 🌟 নিশ্চিত করুন এখানে 'export const' লেখা আছে যেন অন্য ফাইল ইম্পোর্ট করতে পারে
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000', // আপনার ব্যাকএন্ড এপিআই ইউআরএল
});

// useSession ও এক্সপোর্ট করে রাখা ভালো
export const { useSession } = authClient;
