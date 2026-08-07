import Sidebar from "@/components/ui/sidebar";

export default function AdminsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-dvh bg-[#F7F7F7] text-[#1E1E1E]">
      <div className="sticky top-0 z-30 bg-[#F7F7F7] px-3 pt-3 pb-2 border-b border-[#E8E8E8]">
        <Sidebar />
      </div>
      <main className="flex-1 w-full px-3 py-4 space-y-4">{children}</main>
    </div>
  );
}
