import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect, useRef, FormEvent } from "react"
import { withBasePath } from "@/lib/utils/withBasePath"
import ThemeToggle from "./ThemeToggle"

const CONFIG = require("../../../site.config")

// 상단 헤더. 얇고 가벼운 네비게이션, 스크롤 시 살짝 진해집니다.
export default function Header() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const onSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = searchRef.current?.value.trim()
    if (!q) return
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-smooth ${
        scrolled
          ? "bg-[var(--color-header-bg)] backdrop-blur-md border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center"
          aria-label={CONFIG.blog.title}
        >
          {/* 라이트=검정, 다크=흰색 로고 자동 전환 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/Logo_ImwebTech_black.svg")}
            alt={CONFIG.blog.title}
            className="h-7 w-auto dark:hidden"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/Logo_ImwebTech_white.svg")}
            alt={CONFIG.blog.title}
            className="h-7 w-auto hidden dark:block"
          />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="flex items-center gap-1 sm:gap-2">
            {CONFIG.nav.map(
              (item: { label: string; href: string; external?: boolean }) => {
                const className =
                  "rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:text-ink-900 hover:bg-surface transition-colors"
                if (item.external) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {item.label}
                    </a>
                  )
                }
                return (
                  <Link key={item.href} href={item.href} className={className}>
                    {item.label}
                  </Link>
                )
              }
            )}
          </nav>

          <form
            onSubmit={onSubmitSearch}
            role="search"
            className="hidden sm:flex relative items-center"
          >
            <svg
              className="pointer-events-none absolute left-3 text-ink-500"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref={searchRef}
              type="search"
              name="q"
              placeholder="검색"
              aria-label="검색"
              className="h-9 w-40 lg:w-48 rounded-lg bg-surface pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-500 outline-none border border-transparent transition-colors hover:bg-surface focus:bg-card focus:border-line"
            />
          </form>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
