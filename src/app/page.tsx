export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-6 text-center dark:from-zinc-900 dark:to-black">
      {/* ↓↓↓ 여기 글자만 바꾸면 내 페이지가 돼요 ↓↓↓ */}

      <p className="mb-4 text-5xl"></p>

      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
        MINNIE&apos;s First Project
      </h1>

      <p className="mt-4 max-w-md text-lg text-zinc-600 dark:text-zinc-300">
        I'm Not A Vibecoder
        난 바이브 코더는 아니다.
      </p>

      <div className="mt-8 flex gap-3">
        <a
          href="https://github.com/MINHEEHAN-MINNIE"
          className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          내 GitHub
        </a>
        <a
          href="mailto:hmh9006@gmail.com"
          className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          이메일 보내기
        </a>
      </div>

      {/* ↑↑↑ 여기까지 ↑↑↑ */}

      <footer className="mt-16 text-sm text-zinc-400">
        Made with Next.js · 2026
      </footer>
    </div>
  );
}
