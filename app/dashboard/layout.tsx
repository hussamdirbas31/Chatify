import Sidebar from '@/components/sideBar/SideBar';
import MobileNav from '@/components/sideBar/MobileNav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row w-screen h-screen bg-background overflow-hidden ">
      <aside className="hidden md:flex flex-shrink-0 h-full
        bg-surface/90 backdrop-blur-lg
        border-r border-zinc-800 
        transition-all duration-300
        overflow-y-auto">
        <div className=" h-full">
          <Sidebar />
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full
        bg-surface/20 backdrop-blur-sm
        md:border-l  border-zinc-800/50
        overflow-y-auto">
        <div className="flex-1 w-full max-w-7xl mx-auto  ">
          {children}
        </div>
      </main>

      <nav className="fixed md:hidden bottom-0 left-0 right-0
        bg-surface/95 backdrop-blur-lg
        border-t border-zinc-800/70
        shadow-lg shadow-secondary/5
        z-50
        safe-pb">
        <MobileNav />
      </nav>
    </div>
  );
}