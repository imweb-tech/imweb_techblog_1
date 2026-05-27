import { useMounted, useTheme } from "@/lib/useTheme"

// 라이트/다크 전환 버튼. 다크일 때 해, 라이트일 때 달 아이콘을 보여줍니다.
export default function ThemeToggle() {
  const [theme, toggle] = useTheme()
  const mounted = useMounted()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      title={isDark ? "라이트 모드" : "다크 모드"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-700 hover:text-ink-900 hover:bg-surface transition-colors"
    >
      {/* 마운트 전에는 아이콘을 숨겨 hydration mismatch 를 피함 */}
      <span className={mounted ? "" : "opacity-0"}>
        {isDark ? (
          // sun
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        ) : (
          // moon
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
    </button>
  )
}
