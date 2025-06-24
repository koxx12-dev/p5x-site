import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

//TODO: make the light theme actually not suck, then uncomment this and implement a toggle for it
// export function updateTheme(theme?: "light" | "dark" | "system") {
//     if (theme === "system" || theme === undefined) {
//         localStorage.removeItem("theme")
//     } else {
//         localStorage.setItem("theme", theme)
//     }

//     document.documentElement.classList.toggle(
//         "dark",
//         localStorage.theme === "dark" ||
//         (!("theme" in localStorage) &&
//             window.matchMedia("(prefers-color-scheme: dark)").matches)
//     );
// }

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}