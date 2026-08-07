import Sidebar from "@/components/ui/sidebar";

export default function AdminsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-dvh bg-[#F7F7F7] text-[#1E1E1E] p-3">
      <Sidebar />
      <main className="flex-1 w-full pt-3">{children}</main>
    </div>
  );
}
