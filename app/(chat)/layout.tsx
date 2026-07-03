import { AppSidebar } from "@/components/chat/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/auth"; // Make sure this path points to your auth config

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SidebarProvider>
      {/* We pass the user from the session to the sidebar */}
      <AppSidebar user={session?.user} />
      <main className="flex flex-col w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
