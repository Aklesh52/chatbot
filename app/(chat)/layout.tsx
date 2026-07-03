import { AppSidebar } from "@/components/chat/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full">
        {/* If you want a toggle button to show/hide the sidebar */}
        <SidebarTrigger /> 
        {children}
      </main>
    </SidebarProvider>
  );
}
