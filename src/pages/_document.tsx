import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        {/* FOUC 방지: 페인트 전에 저장된/시스템 테마를 <html> 에 즉시 반영 */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var e=localStorage.getItem('theme');var d=e?e==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(_){}})();",
          }}
        />
      </Head>
      <body className="bg-base text-ink-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
