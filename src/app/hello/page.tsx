// 이 파일의 위치(src/app/hello/page.tsx)가 곧 URL 경로(/hello)가 된다.
// 디자인은 docs/DESIGN.md(Revolut 시스템)의 토큰만 사용했다.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Helloooooow World!!",
  description: "디자인 시스템 문서 하나로 만든 페이지 — Day 2 예습",
};

/* 문서의 button-primary — 흰 알약. 어두운 캔버스에서 가장 밝은 픽셀 */
function ButtonPrimary({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-12 items-center rounded-full bg-canvas-light px-7 text-[16px] font-semibold tracking-[0.24px] text-canvas-dark transition hover:bg-faint">
      {children}
    </span>
  );
}

/* 문서의 button-outline-dark — 어두운 캔버스 위의 3순위 액션 */
function ButtonOutlineDark({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-12 items-center rounded-full border border-white px-7 text-[16px] font-semibold tracking-[0.24px] text-white transition hover:bg-white/10">
      {children}
    </span>
  );
}

/* 문서의 badge-tag */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-surface-soft px-3 py-1 text-[13px] text-ink">
      {children}
    </span>
  );
}

export default function HelloPage() {
  return (
    <div className="font-body">
      {/* ── nav-bar : 64px, 검정 ─────────────────────────── */}
      <nav className="flex h-16 items-center justify-between bg-canvas-dark px-6">
        <span className="text-[20px] font-medium tracking-[-0.2px] text-white">
          minnie
        </span>
        <div className="flex items-center gap-6">
          <a href="/" className="hidden text-[16px] tracking-[0.24px] text-white/72 transition hover:text-white sm:block">
            홈으로
          </a>
          <ButtonPrimary>Day 2 시작</ButtonPrimary>
        </div>
      </nav>

      {/* ── hero-band-dark : display-xxl, 136px → 48px ──── */}
      <header className="bg-canvas-dark px-6 py-[120px]">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-6 text-[16px] tracking-[0.24px] text-white/72">
            2026.07.27 · Day 1 완주 기념
          </p>
          <h1 className="font-display text-[48px] font-medium leading-none tracking-[-0.96px] text-white md:text-[64px] md:tracking-[-1.28px] lg:text-[80px] lg:tracking-[-1.6px] xl:text-[136px] xl:tracking-[-2.72px]">
            Helloooooow
            <br />
            World!!
          </h1>
          <p className="mt-8 max-w-[560px] text-[18px] leading-[1.56] tracking-[-0.09px] text-white/72">
            이 페이지에는 색을 고른 사람이 없습니다. 디자인 시스템 문서 한 장에
            적힌 숫자를 코드로 옮겼더니 화면이 나왔습니다. 내일 오전에 할 일이
            정확히 이겁니다.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonPrimary>docs/DESIGN.md 열어보기</ButtonPrimary>
            <ButtonOutlineDark>오늘은 그만 자기</ButtonOutlineDark>
          </div>
        </div>
      </header>

      {/* ── 흰 카탈로그 밴드 : 두 모드가 맞부딪힌다 ────────── */}
      <section className="bg-canvas-light px-6 py-[88px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-display text-[40px] font-medium leading-[1.2] tracking-[-0.4px] text-ink">
            내일 배울 것 세 가지
          </h2>
          <p className="mt-4 max-w-[560px] text-[18px] leading-[1.56] text-mute">
            오늘은 코드를 &lsquo;움직이는&rsquo; 법을 배웠고, 내일은 코드를
            &lsquo;보이게&rsquo; 하는 법을 배웁니다.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                tag: "09:30",
                title: "디자인 토큰",
                body: "색·글자·간격을 숫자로 못 박아 한 곳에 모아둔다. 그러면 화면마다 다시 고르지 않아도 저절로 통일된다. 방금 globals.css에 넣은 것이 그것.",
              },
              {
                tag: "13:00",
                title: "컴포넌트",
                body: "버튼을 한 번 만들어 전체에서 재사용한다. 이 페이지의 흰 알약 버튼도 함수 하나로 만들어 세 번 썼다. 한 곳만 고치면 전부 바뀐다.",
              },
              {
                tag: "15:30",
                title: "라우팅",
                body: "폴더가 곧 주소다. 이 화면은 src/app/hello/ 안에 있어서 /hello가 됐다. 오후에 이미 몸으로 배운 것이라 내일은 응용만 하면 된다.",
              },
            ].map((c) => (
              <article
                key={c.title}
                className="rounded-card border border-hairline-light bg-canvas-light p-8"
              >
                <Tag>{c.tag}</Tag>
                <h3 className="mt-5 font-display text-[24px] font-medium leading-[1.33] text-ink">
                  {c.title}
                </h3>
                <p className="mt-3 text-[16px] leading-[1.5] tracking-[0.24px] text-mute">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 검정 플래닝 섹션 : 코발트는 딱 한 장에만 ────────── */}
      <section className="bg-canvas-dark px-6 py-[120px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-display text-[40px] font-medium leading-[1.2] tracking-[-0.4px] text-white lg:text-[48px] lg:tracking-[-0.48px]">
            오늘 넘은 것
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-card bg-surface-elevated p-8">
              <h3 className="font-display text-[32px] font-medium leading-[1.19] tracking-[-0.32px] text-white">
                에러 10개
              </h3>
              <p className="mt-4 text-[16px] leading-[1.5] tracking-[0.24px] text-white/72">
                아홉 개는 &lsquo;뭐가 틀렸나&rsquo;가 아니라 &lsquo;뭐가
                없나&rsquo;의 문제였다. 전부 docs/errors.md에 있다.
              </p>
            </article>

            {/* plan-card-featured — 문서가 말한 유일한 코발트 자리 */}
            <article className="rounded-card bg-brand p-8">
              <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-[13px] text-white">
                오늘의 하이라이트
              </span>
              <h3 className="mt-5 font-display text-[32px] font-medium leading-[1.19] tracking-[-0.32px] text-white">
                4시간 독립 실행
              </h3>
              <p className="mt-4 text-[16px] leading-[1.5] tracking-[0.24px] text-white/85">
                가이드 없이 만들어서 배포까지. 오전 90분이 관람이었다면 오후
                4시간이 학습이었다.
              </p>
            </article>

            <article className="rounded-card bg-surface-elevated p-8">
              <h3 className="font-display text-[32px] font-medium leading-[1.19] tracking-[-0.32px] text-white">
                배포 2개
              </h3>
              <p className="mt-4 text-[16px] leading-[1.5] tracking-[0.24px] text-white/72">
                로컬과 배포판은 같은 규칙으로 동작한다. 404가 양쪽에서 똑같이
                난 게 그 증거였다.
              </p>
            </article>
          </div>

          <div className="mt-12">
            <ButtonPrimary>내일 09:00에 봐요</ButtonPrimary>
          </div>
        </div>
      </section>

      {/* ── footer ────────────────────────────────────────── */}
      <footer className="bg-canvas-dark px-6 pb-20 pt-20">
        <div className="mx-auto max-w-[1200px] border-t border-white/[0.06] pt-8">
          <p className="text-[14px] leading-[1.43] text-white/72">
            디자인 출처 · docs/DESIGN.md (Revolut 시스템 분석)
          </p>
          <p className="mt-2 text-[13px] leading-[1.4] text-stone">
            Aeonik Pro는 유료 서체라 Inter로 대체했습니다. 문서가 권장한
            방식입니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
