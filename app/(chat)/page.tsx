import Chat from "@/components/chat/shell";
import { generateId } from 'ai';

export default function Page() {
  const id = generateId();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          K Hospitality Support
        </h1>
        <p className="text-muted-foreground">
          Welcome! How can we assist you with your hospitality and booking needs today?
        </p>
      </div>
      <Chat id={id} initialMessages={[]} />
    </div>
  );
}
