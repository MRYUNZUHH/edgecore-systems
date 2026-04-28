"use client";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import MobileNav from "./MobileNav";
import RightPanel from "./RightPanel";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav onMenuClick={() => {}} />
        <main className="flex-1 overflow-y-auto bg-navy-900 p-4 pb-20 lg:pb-4">{children}</main>
        <MobileNav />
      </div>
      <RightPanel />
    </div>
  );
}