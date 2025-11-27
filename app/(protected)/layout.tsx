import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/actions/auth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <span className="text-lg font-semibold">PayQuick</span>
          <form action={logoutAction}>
            <Button type="submit" variant="outline" size="sm">
              Logout
            </Button>
          </form>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {children}
      </main>
    </div>
  );
}
