import DashboardSiderbar from '@/components/dashboard/DashboardSiderbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-linear-to-br from-[#0f0906] via-[#1a0f0c] to-[#0f0906] min-h-screen py-6 md:py-10">
      <div className="flex min-h-[calc(100vh-5rem)] w-11/12 max-w-7xl mx-auto rounded-2xl overflow-hidden border border-orange-900/20 shadow-2xl shadow-black/40">
        <DashboardSiderbar />
        <div className="flex-1 bg-[#110a07]/80 p-4 md:p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
