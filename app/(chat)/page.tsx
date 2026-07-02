// app/(chat)/page.tsx

export const dynamic = 'force-dynamic';

export default async function Page() {
  const id = crypto.randomUUID();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        {/* Your Chat Shell Component Goes Here */}
      </div>
    </div>
  );
}
