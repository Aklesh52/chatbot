"use client";

import { useState } from "react";
import { useArtifactSelector } from "@/hooks/use-artifact";
import { useActiveChat } from "@/hooks/use-active-chat"; 
import type { Attachment, ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Artifact } from "./artifact";
import { Messages } from "./messages";

interface ChatShellProps {
  id: string;
  initialMessages: any[];
}

export function ChatShell({ id, initialMessages }: ChatShellProps) {
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(null);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const { 
    chatId, 
    messages, 
    setMessages, 
    addToolApprovalResponse, 
    status, 
    votes, 
    isLoading, 
    isReadonly 
  } = useActiveChat();

  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);

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
          onEditMessage={setEditingMessage}
          regenerate={async () => {}} 
          isArtifactVisible={isArtifactVisible}
          selectedModelId={""} 
        />
      </div>
      
      {isArtifactVisible && (
        <Artifact 
          chatId={chatId || id}
          input={input}
          setInput={setInput}
          addToolApprovalResponse={addToolApprovalResponse}
          status={status}
          attachments={attachments}
          setAttachments={setAttachments}
          stop={async () => {}}
          // Added selectedModelId as the error required it
          selectedModelId={""} 
        />
      )}
    </div>
  );
}
