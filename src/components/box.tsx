import { mergeProps, type JSX } from "solid-js";
import { cn } from "../utils";

export type BoxColorScheme = "default" | "velvet" | "tartarus";

export function Box(props: {
  children: JSX.Element;
  class?: string;
  colorScheme?: BoxColorScheme;
}) {
  const realProps = mergeProps(
    { variant: "default", colorScheme: "default" },
    props
  );

  return (
    <div
      class={cn(
        "flex gap-2 rounded-lg border-2",
        realProps.colorScheme === "default" &&
          "border-black bg-red-700 dark:border-red-600 dark:bg-black/60",
        realProps.colorScheme === "velvet" &&
          "border-black bg-blue-700 dark:border-blue-600 dark:bg-black/60",
        realProps.colorScheme === "tartarus" &&
          "border-black bg-green-700 dark:border-green-600 dark:bg-black/60",
        realProps.class
      )}
    >
      {props.children}
    </div>
  );
}
