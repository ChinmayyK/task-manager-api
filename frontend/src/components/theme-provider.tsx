import { useEffect } from "react"
import { useThemeStore } from "@/store/themeStore"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
      
      const listener = (e: MediaQueryListEvent) => {
        root.classList.remove("light", "dark")
        root.classList.add(e.matches ? "dark" : "light")
      }
      
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      mediaQuery.addEventListener("change", listener)
      return () => mediaQuery.removeEventListener("change", listener)
    }

    root.classList.add(theme)
  }, [theme])

  return <>{children}</>
}
