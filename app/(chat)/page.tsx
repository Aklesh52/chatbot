// app/(chat)/page.tsx

import { generateId } from "@/lib/utils";

// Accepting searchParams forces the page to be dynamic
export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const id = generateId();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      {/* ... your code */}
    </div>
  );
}
