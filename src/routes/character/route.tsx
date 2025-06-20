import { createFileRoute, Outlet } from "@tanstack/solid-router";

export const Route = createFileRoute("/character")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      class='flex min-h-screen flex-row justify-center'
    >
      <main class="min-h-screen w-full max-w-301 border-red-600 border-r-2 border-l-2 bg-black/40 [view-transition-name:main]">
        <Outlet />
      </main>
    </div>
  );
}
