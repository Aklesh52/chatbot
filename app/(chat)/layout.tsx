import { ActiveChatProvider } from "@/hooks/use-active-chat";
import { DataStreamProvider } from "@/components/chat/data-stream-provider";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DataStreamProvider>
      <ActiveChatProvider>
        {children}
      </ActiveChatProvider>
    </DataStreamProvider>
  );
}
