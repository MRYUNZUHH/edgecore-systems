"use client";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-60">
        <main className="p-4 lg:p-6 pb-20 lg:pb-6">{children}</main>
        <MobileNav />
      </div>
    </div>
  );
}