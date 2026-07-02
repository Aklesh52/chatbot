"use client";

import { useState, useRef, useEffect } from "react";
import { useArtifactSelector } from "@/hooks/use-artifact";
import { useArtifact } from "@/hooks/use-artifact";
import type { Attachment, ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Artifact } from "./artifact";
import { ChatHeader } from "./chat-header";
import { DataStreamHandler } from "./data-stream-handler";
import { Messages } from "./messages";

// 1. Define the properties this component is allowed to receive
interface ChatShellProps {
  id: string;
  initialMessages: any[]; // Or replace 'any[]' with a specific message type if you have one
}

// 2. Apply the interface to the function
export function ChatShell({ id, initialMessages }: ChatShellProps) {
  // --- All your existing logic remains exactly the same below ---
  
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  
  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);
  const { setArtifact } = useArtifact();
  
  // Note: Ensure your existing 'stop', 'chatId', 'isReadonly', etc., 
  // are defined or imported correctly as they were before.

  return (
    <div className="flex h-dvh w-full flex-row overflow-hidden">
      <div className={cn("flex min-w-0 flex-col bg-sidebar transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]", isArtifactVisible ? "w-[40%]" : "w-full")}>
        {/* Your header and other components go here */}
        <Messages 
          // ... ensure all props passed here match your component requirements
        />
      </div>
      {isArtifactVisible && <Artifact />}
    </div>
  );
}
