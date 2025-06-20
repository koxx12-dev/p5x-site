import type { Setter } from "solid-js";

export function SearchBar(props: { setValue: Setter<string> }) {
  return (
    <input
      class="h-12 w-full rounded-lg border-2 border-black bg-red-700 p-2 font-semibold text-white outline-hidden dark:border-red-600 dark:bg-black/60"
      on:input={(e) => props.setValue(e.currentTarget.value)}
      placeholder="Search here..."
    />
  );
}
