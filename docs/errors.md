# 에러 도감

> 바이브 코딩 30일 동안 만난 에러 기록
> 새 에러를 만나면 아래 형식으로 계속 추가한다

---

## 읽는 법 — 콜론 앞부터 본다

에러 메시지에서 **가장 먼저 볼 곳은 콜론 앞에 붙은 이름**이다. 거기 적힌 게 "누가 실패했는지"고, 그것만 알아도 어디를 고쳐야 할지 절반은 정해진다.

| 앞에 붙은 이름 | 누가 실패했나 | 대개의 원인 |
|---|---|---|
| `sh:` / `zsh:` | 셸 | 실행할 프로그램이 없음 (설치 안 됨, 경로 문제) |
| `npm ERR!` | npm | 패키지를 못 받거나 스크립트가 없음 |
| `error:` | git | 요청은 이해했는데 거부함 |
| `fatal:` | git | 아예 진행 불가 |
| 브라우저 빨간 화면 | Next.js | 내 코드 문제 |

## 디버깅의 첫 질문

**"뭐가 틀렸지?"가 아니라 "뭐가 없지?"**

Day 1에 만난 에러 9개 중 코드가 틀려서 난 건 하나뿐이었다. 나머지는 전부 **있어야 할 게 없었던** 경우다. 파일이 없거나, 설치가 안 됐거나, 커밋이 없거나, 권한이 없거나.

## 에러 두 종류

**빌드 / 파싱 에러** — 코드를 *읽다가* 막힘. 문법 문제. 화면 전체가 안 뜬다.
**런타임 에러** — 코드는 읽혔는데 *실행 중* 기대한 게 없음. 로직이나 데이터 문제.

---

# Day 1 — 2026-07-27

## 빠른 검색용

| 에러 | 누가 | 진짜 원인 |
|---|---|---|
| `sh: next: command not found` | 셸 | `npm install` 안 함 |
| `mkdir ~/.config/gh: permission denied` | gh | 폴더 주인이 root |
| `pathspec ... did not match any file(s)` | git | 경로에 `src/`가 빠짐 |
| `dquote>` | 셸 | 따옴표를 안 닫음 |
| Vim 화면에 갇힘 | git | `-m` 없이 commit |
| `src refspec main does not match any` | git | 커밋이 하나도 없음 |
| `unknown switch 'm'` | git | `-m`은 commit 전용 옵션 |
| `default export is not a React Component` | Next.js | 파일 내용을 비움 |
| `GET / 404` | Next.js | `app/page.js`가 없음 |

---

## 1. `sh: next: command not found`

```
> hello-nextjs@0.1.0 dev
> next dev

sh: next: command not found
```

**원인** — 새 프로젝트에서 `npm install`을 안 돌렸다. `node_modules`가 없으니 `next` 실행 파일도 없다.

**해결** — `npm install`

**배운 것** — `npm install`의 "처음 한 번"은 컴퓨터당이 아니라 **프로젝트당**이다. 그리고 콜론 앞이 `npm:`이 아니라 `sh:`였다는 게 단서였다. npm은 `dev`를 `next dev`로 푸는 것까지 자기 일을 다 했고, 그 뒤 셸이 프로그램을 못 찾은 것.

**진단 방법** — 되는 프로젝트와 안 되는 프로젝트에서 각각 `ls`를 쳐서 비교했다. `node_modules`와 `package-lock.json`이 없었다.

---

## 2. `mkdir /Users/.../.config/gh: permission denied`

```
✓ Authentication complete.
mkdir /Users/hanminhui/.config/gh: permission denied
```

**원인** — `~/.config` 폴더가 root 소유라 내 계정이 안에 뭘 만들 수 없었다. 인증은 성공했는데 결과를 저장하지 못해 실패.

**해결** — `sudo chown -R $(whoami):staff ~/.config` 후 `gh auth login` 재시도

**배운 것** — 맥은 파일마다 주인이 있다. `sudo`는 관리자 권한, `chown`은 change owner. 비밀번호를 칠 때 화면에 아무것도 안 나타나는 건 정상이다.

---

## 3. `pathspec 'app/page.tsx' did not match any file(s) known to git`

**원인** — 파일이 `app/page.tsx`가 아니라 `src/app/page.tsx`에 있었다. 프로젝트가 `src/` 폴더 옵션으로 생성됨.

**해결** — `git restore src/app/page.tsx` (또는 `git restore .`)

**배운 것** — `pathspec`은 "경로 지정"이라는 뜻. 명령어가 틀린 게 아니라 **대상이 틀린** 경우다. 그리고 `git status` 출력에 정확한 경로가 이미 적혀 있었다. 경로 오타는 Tab 자동완성으로 피할 수 있다.

**에러 두 종류 구분** — `The most similar command is...`는 명령어 이름 자체가 틀린 것. `pathspec ... did not match`는 명령어는 맞고 대상이 틀린 것.

---

## 4. `dquote>`

```
git commit -m "일부러 망가뜨림'
dquote> 
```

**원인** — 큰따옴표로 열고 작은따옴표로 닫았다. 셸이 큰따옴표가 닫히기를 계속 기다리는 중.

**해결** — `Control + C`로 탈출 후 다시 입력

**배운 것** — 줄 앞에 `%` 프롬프트가 아닌 게 떠 있으면 뭔가 대기 중이라는 신호다.

| 보이는 것 | 의미 |
|---|---|
| `dquote>` | 큰따옴표가 안 닫힘 |
| `quote>` | 작은따옴표가 안 닫힘 |
| `>` | 명령이 아직 안 끝남 |
| 프롬프트 없음 | 뭔가 실행 중 (개발 서버 등) |

전부 `Control + C`로 나온다. 터미널의 만능 탈출키.

---

## 5. Vim 화면에 갇힘

```
# Please enter the commit message for your changes...
~
~
Type  :qa  and press <Enter> to exit Vim
```

**원인** — `git commit`을 `-m` 없이 쳤다. 메시지를 받으려고 기본 편집기(Vim)가 열린 것.

**해결**
- 메시지 쓰고 커밋 완료: `i` → 입력 → `Esc` → `:wq`
- 그냥 취소: `:q!`

**배운 것** — Vim은 모드가 나뉘어 있다. 처음 들어가면 **명령 모드**라 타이핑이 안 먹는다. `i`(insert)로 입력 모드, `Esc`로 명령 모드. `:w`는 write(저장), `:q`는 quit(나가기), `!`는 강제.

**예방** — 항상 `git commit -m "메시지"`를 쓰거나, 기본 편집기를 VS Code로 바꾼다: `git config --global core.editor "code --wait"`

**주의** — `:qa`로 나가면 메시지가 비어서 **커밋이 취소된다.** 화면에 `an empty message aborts the commit`이라고 적혀 있다. Vim이 알려준 `:qa`는 "나가는 법"이지 "커밋하는 법"이 아니었다.

---

## 6. `error: src refspec main does not match any`

```
git push -u origin main
error: src refspec main does not match any
error: failed to push some refs to '...'
```

**원인** — 커밋이 하나도 없어서 `main` 브랜치 자체가 없었다. (5번에서 Vim을 `:qa`로 나가면서 커밋이 취소됨)

**해결** — `git commit -m "메시지"` 먼저, 그다음 push

**배운 것** — `ref`는 reference, **커밋을 가리키는 이름표**다. 브랜치는 실체가 아니라 "이 커밋을 가리키는 포스트잇"일 뿐. `refspec`은 `src:dst` 형태로 "어떤 이름표를 어디로 보낼지"를 적은 규격이고, `git push origin main`은 `main:main`의 줄임이다.

**핵심 개념** — **브랜치는 커밋이 하나라도 있어야 태어난다.** 포스트잇은 붙일 곳이 있어야 존재한다. `git status`에 `No commits yet`이 보이면 이 상황이다.

---

## 7. `error: unknown switch 'm'`

```
git push -m "no 404 error"
error: unknown switch `m'
```

**원인** — `-m`은 `commit` 전용 옵션이다. `push`에는 없다.

**해결** — `git push` (옵션 없이)

**배운 것** — commit은 **새 기록을 만드는 일**이라 설명이 필요하고, push는 **이미 만들어진 기록을 옮기는 일**이라 설명이 필요 없다. 편지를 쓰는 것과 우체통에 넣는 것의 차이.

`-m` 같은 걸 **옵션 / 플래그 / 스위치**라고 부른다. 한 글자는 하이픈 하나(`-m`), 단어는 두 개(`--message`). 둘은 같은 뜻이다. **명령어마다 받는 옵션이 다르다.**

**찾는 법** — `git push --help` (나올 때는 `q`)

---

## 8. `The default export is not a React Component in "/page"`

`Runtime Error` 배지가 붙어 있었다.

**원인** — `page.js` 내용을 통째로 지워서 `export default`가 사라졌다.

**해결** — `git restore .`

**배운 것** — Next.js는 `page.js`를 열어서 "대표로 내보낸 화면"을 찾는다. 없으면 그릴 게 없다. **파일 하나 = 화면 하나 = `export default` 하나.**

**에러 종류 구분** — 등호를 지웠을 땐 코드를 *읽다가* 막힌 **빌드 에러**, 이번엔 코드는 읽혔는데 *실행할 때* 내놓을 게 없는 **런타임 에러**.

---

## 9. `GET / 404`

```
GET / 404 in 925ms
```

**원인** — `app/hello/page.js`는 있는데 `app/page.js`가 없었다. 루트 주소가 존재하지 않았던 것.

**해결** — `app/page.js` 생성

**배운 것** — App Router의 규칙은 두 개다.

1. `app/` 아래의 **폴더 경로가 곧 주소**가 된다
2. 그 폴더 안에 **`page.js`가 있어야** 화면이 생긴다

폴더가 있다고 주소가 생기는 게 아니다. `page.js`라는 이름이 "이 폴더의 대표 화면"이라는 표시고, 어느 주소가 될지는 **어느 폴더에 들어있느냐**가 정한다. 그래서 `page.js`가 프로젝트에 여러 개 있는 게 정상이다.

```
app/page.js              →  /
app/hello/page.js        →  /hello
app/jobs/[id]/page.js    →  /jobs/123
```

**응답 번호** — `200`은 찾았다, `404`는 그런 거 없다. 서버 로그에서 이 숫자만 봐도 절반은 진단된다.

---

## 번외 — 에러는 아니지만 헤맨 것

**터미널이 멈춘 것처럼 보임** — 개발 서버가 그 창을 쓰고 있어서 명령을 못 받는 상태. 프롬프트(`%`)가 안 보이면 뭔가 실행 중이라는 뜻. `Control + C`로 끄거나 `Cmd + T`로 새 탭을 연다. **탭 두 개를 쓰는 게 기본** — 하나는 서버용, 하나는 명령어용.

**push했는데 반영이 안 됨** — VS Code 왼쪽 아래 상태바에 `1↑`가 떠 있었다. 안 올라간 커밋이 1개 있다는 표시. `0↓`는 받아올 게 없다는 뜻.

**Vercel 주소에 `-rose`가 붙음** — `hello-nextjs` 이름을 누가 이미 쓰고 있어서 랜덤 단어를 붙여 구분한 것. Settings에서 프로젝트 이름을 바꾸면 주소도 바뀐다.

---

## 오늘의 결론

도구들은 계속 답을 알려주고 있었다. 하루에 다섯 번이었다.

1. `git status`가 다음에 칠 명령어를 괄호 안에 적어줌
2. GitHub 저장소 페이지가 push 명령어를 그대로 띄워줌
3. Vim이 화면 아래에 탈출법을 적어둠
4. VS Code 상태바가 `1↑`로 안 올라간 커밋을 표시
5. `git push`가 자기가 받는 옵션 목록을 통째로 출력

**명령어를 외울 필요가 없는 이유가 이것이다. 읽을 줄만 알면 된다.**

다만 도구가 주는 힌트도 맥락을 봐야 한다. Vim이 알려준 `:qa`는 "나가는 법"이었지 "커밋하는 법"이 아니었고, 그것 때문에 6번 에러가 났다.

---

# 추가하는 법

새 에러를 만나면 아래 형식으로 붙인다. **해결한 직후에 적어야 한다.** 나중에 기억으로 쓰려고 하면 다 날아간다.

```markdown
## N. `에러 문장`

**원인** —

**해결** —

**배운 것** —
```

빠른 검색용 표에도 한 줄 추가할 것.
