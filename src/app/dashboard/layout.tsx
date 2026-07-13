import DashboardSiderbar from '@/components/dashboard/DashboardSiderbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-[#0f0906] via-[#1a0f0c] to-[#0f0906] min-h-screen py-6 md:py-10 flex items-center justify-center">
      {/* মোবাইলের জন্য relative ক্লাস অ্যাড করা হয়েছে যেন fixed বাটনটি এর সাপেক্ষে বা স্ক্রিনের সাপেক্ষে ঠিক থাকে */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)] w-11/12 max-w-7xl mx-auto rounded-2xl overflow-hidden border border-orange-900/20 shadow-2xl shadow-black/60 bg-[#110a07]/40 backdrop-blur-md relative">
        {/* ফিক্সড সাইডবার ও মোবাইল মেনু বাটন */}
        <DashboardSiderbar />

        {/* pt-16 (Padding Top) দেওয়া হয়েছে যাতে মোবাইলের ফিক্সড মেনু বাটনটি ভেতরের কন্টেন্টকে ঢেকে না ফেলে */}
        <div className="flex-1 bg-[#110a07]/80 p-6 pt-16 lg:pt-10 md:p-10 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
