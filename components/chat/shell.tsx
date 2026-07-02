"use client";

import { useState } from "react";
import { useArtifactSelector } from "@/hooks/use-artifact";
import { useArtifact } from "@/hooks/use-artifact";
import type { Attachment, ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Artifact } from "./artifact";
import { Messages } from "./messages";

// 1. Define required properties
interface ChatShellProps {
  id: string;
  initialMessages: any[];
}

export function ChatShell({ id, initialMessages }: ChatShellProps) {
  // IMPORTANT: Ensure all variables used below are available from your hook.
  // If you get a "not defined" error, add the missing variable to the destructuring below.
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  
  // Assuming these are the variables from your hook that the Messages component needs
  const { 
 // Replace the line with this:
const { chatId, messages, setMessages, addToolApprovalResponse, status, votes, isLoading, isReadonly } = useActiveChat();

  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);
  const { setArtifact } = useArtifact();

  return (
    <div className="flex h-dvh w-full flex-row overflow-hidden">
      <div className={cn("flex min-w-0 flex-col bg-sidebar transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]", isArtifactVisible ? "w-[40%]" : "w-full")}>
        
        <Messages 
          chatId={chatId || id}
          messages={messages || initialMessages}
          setMessages={setMessages}
          addToolApprovalResponse={addToolApprovalResponse}
          status={status}
          votes={votes}
          isLoading={isLoading}
          isReadonly={isReadonly}
          editingMessage={editingMessage}
          setEditingMessage={setEditingMessage}
          attachments={attachments}
          setAttachments={setAttachments}
        />
        
      </div>
      {isArtifactVisible && <Artifact />}
    </div>
  );
}
