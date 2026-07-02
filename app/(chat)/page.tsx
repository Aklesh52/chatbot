"use client";

import { ChatShell } from "@/components/chat/shell";

export default function Page() {
  // Client components can safely generate random IDs because they run in the browser
  const id = crypto.randomUUID();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        {/* You likely have a ChatShell here to render the chat */}
        <ChatShell id={id} initialMessages={[]} />
      </div>
    </div>
  );
}
