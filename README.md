<h1 align="center">
    <a href="https://github.com/pixel-agents-hq/pixel-agents/discussions">
        <img src="webview-ui/public/banner.png" alt="Pixel Agents">
    </a>
</h1>

<h2 align="center" style="padding-bottom: 20px;">
  AI 에이전트가 실제 결과물을 만드는 게임 인터페이스
</h2>

<div align="center" style="margin-top: 25px;">

[![version](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fpablodelucca%2F3cd28398fa4a2c0a636e1d51d41aee39%2Fraw%2Fversion.json)](https://github.com/pixel-agents-hq/pixel-agents/releases)
[![marketplaces](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fpablodelucca%2F3cd28398fa4a2c0a636e1d51d41aee39%2Fraw%2Finstalls.json)](https://marketplace.visualstudio.com/items?itemName=pablodelucca.pixel-agents)
[![stars](https://img.shields.io/github/stars/pixel-agents-hq/pixel-agents?logo=github&color=0183ff&style=flat)](https://github.com/pixel-agents-hq/pixel-agents/stargazers)
[![license](https://img.shields.io/github/license/pixel-agents-hq/pixel-agents?color=0183ff&style=flat)](https://github.com/pixel-agents-hq/pixel-agents/blob/main/LICENSE)
[![good first issues](https://img.shields.io/github/issues/pixel-agents-hq/pixel-agents/good%20first%20issue?color=7057ff&label=good%20first%20issues)](https://github.com/pixel-agents-hq/pixel-agents/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)

</div>

<div align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=pablodelucca.pixel-agents">🛒 VS Code 마켓플레이스</a> • <a href="https://github.com/pixel-agents-hq/pixel-agents/discussions">💬 토론</a> • <a href="https://github.com/pixel-agents-hq/pixel-agents/issues">🐛 이슈</a> • <a href="CONTRIBUTING.md">🤝 기여하기</a> • <a href="CHANGELOG.md">📋 변경 이력</a>
</div>

<br/>

Pixel Agents는 멀티 에이전트 AI 시스템을 눈으로 직접 보고 관리할 수 있는 인터페이스입니다. 각 에이전트는 픽셀 아트 오피스 안의 캐릭터로 등장합니다. 캐릭터들은 돌아다니고, 자리에 앉아서, 현재 하고 있는 일을 시각적으로 표현합니다 — 코드를 작성할 때는 타이핑하고, 파일을 검색할 때는 읽는 모션을 보이며, 사용자 확인이 필요할 때는 기다리는 상태가 됩니다.

**동일한 소스 코드에서 두 가지 방식으로 제공됩니다:**

- **VS Code 익스텐션** — [VS Code 마켓플레이스](https://marketplace.visualstudio.com/items?itemName=pablodelucca.pixel-agents)와 [Open VSX](https://open-vsx.org/extension/pablodelucca/pixel-agents)에서 `pablodelucca.pixel-agents`로 제공. 에이전트는 VS Code 터미널에서 생성되고 캐릭터는 패널 영역에 렌더링됩니다.
- **독립 실행형 CLI** — `npx pixel-agents` 명령으로 로컬 Fastify 서버를 실행하고 오피스를 브라우저 SPA로 서빙합니다. tmux 워크플로우, 원격 세션, 또는 데스크탑 VS Code 없이 사용하는 환경에 적합합니다.

내부적으로는 완전히 에이전트 및 플랫폼에 독립적인 아키텍처로 설계되어 있습니다. 타입이 정의된 `HookProvider` 인터페이스가 통합 경계를 정의하므로, 새로운 AI 도구를 추가할 때는 하위 디렉토리 하나만 추가하면 됩니다. 현재 Claude Code가 참조 구현체이며, Codex, Gemini, Cursor 등이 로드맵에 포함되어 있습니다.

![Pixel Agents 스크린샷](webview-ui/public/Screenshot.jpg)

## 주요 기능

- **에이전트마다 하나의 캐릭터** — 모든 Claude Code 터미널은 고유한 애니메이션 캐릭터를 가집니다
- **실시간 활동 추적** — 에이전트가 실제로 하는 작업(코드 작성, 파일 읽기, 명령 실행)에 따라 캐릭터가 애니메이션됩니다
- **오피스 레이아웃 에디터** — 내장 에디터로 바닥, 벽, 가구를 배치해 나만의 오피스를 디자인할 수 있습니다
- **말풍선** — 에이전트가 입력을 기다리거나 권한 확인이 필요할 때 시각적으로 표시됩니다
- **소리 알림** — 에이전트가 작업을 완료했을 때 선택적으로 알림음이 울립니다
- **서브 에이전트 시각화** — Task 도구의 서브 에이전트가 부모와 연결된 별도 캐릭터로 생성됩니다
- **레이아웃 영구 저장** — 오피스 디자인이 저장되어 VS Code 창 간에 공유됩니다
- **외부 에셋 디렉토리** — 컴퓨터 어디에서나 커스텀 또는 서드파티 가구 팩을 불러올 수 있습니다
- **다양한 캐릭터** — 6가지 다양한 캐릭터 제공. [JIK-A-4, Metro City](https://jik-a-4.itch.io/metrocity-free-topdown-character-pack)의 훌륭한 작품을 기반으로 합니다.

<p align="center">
  <img src="webview-ui/public/characters.png" alt="Pixel Agents 캐릭터" width="320" height="72" style="image-rendering: pixelated;">
</p>

## 요구 사항

- VS Code 1.105.0 이상
- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) 설치 및 설정 완료
- **플랫폼**: Windows, Linux, macOS 지원

## 시작하기

Pixel Agents를 바로 사용하려면 [VS Code 익스텐션](https://marketplace.visualstudio.com/items?itemName=pablodelucca.pixel-agents)을 다운로드하는 것이 가장 쉽습니다. 코드를 직접 다루거나 기여하고 싶다면:

### 소스에서 설치

```bash
git clone https://github.com/pixel-agents-hq/pixel-agents.git
cd pixel-agents
npm install      # npm workspaces로 root + server + webview-ui 한 번에 설치
npm run build
```

이후 VS Code에서 **F5**를 눌러 익스텐션 개발 호스트를 실행합니다.

**독립 실행형 CLI**를 로컬에서 실행하려면:

```bash
node dist/cli.js                 # 또는 배포 후 npx pixel-agents [--port 3100]
```

Fastify 서버를 시작하고 `http://localhost:3100`에서 웹뷰 SPA를 열며, (동일한 `~/.pixel-agents/` 네임스페이스 안에서) VS Code 익스텐션과 훅 및 레이아웃을 공유합니다.

### 브라우저 미리보기 & 호스팅 리포트

웹뷰의 브라우저 미리보기 버전은 VS Code 익스텐션 빌드와 별도로 Vercel용으로 빌드하고 준비할 수 있습니다.

```bash
npm run test
npm run e2e
npm run e2e -- --attach-videos-on-success
npm run vercel:prepare
```

전체 Vercel 출력을 준비하지 않고 로컬에서 통합 Allure 리포트만 보려면 `npm run test:report`를 별도로 실행하세요.

스테이징된 Vercel 출력은 `/webview/`에 독립 실행형 웹뷰를, `/reports/allure/`에 Linux Allure 리포트를 서빙하며 `e2e`, `server`, `webview` 스위트를 통합합니다. GitHub Actions 배포 잡은 `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` 시크릿이 필요합니다.

### 사용 방법

1. **Pixel Agents** 패널을 엽니다 (터미널 옆 하단 패널 영역에 표시됩니다)
2. **+ Agent**를 클릭해 새 Claude Code 터미널과 캐릭터를 생성합니다. 우클릭하면 `--dangerously-skip-permissions`로 실행하는 옵션이 있습니다 (모든 도구 승인 프롬프트를 건너뜁니다)
3. Claude와 코딩을 시작하세요 — 캐릭터가 실시간으로 반응하는 것을 확인할 수 있습니다
4. 캐릭터를 클릭해 선택한 후, 자리를 클릭해 재배치할 수 있습니다
5. **Layout**을 클릭해 오피스 에디터를 열고 공간을 커스터마이징하세요

## 레이아웃 에디터

내장 에디터로 오피스를 디자인할 수 있습니다:

- **바닥** — 전체 HSB 색상 조절 가능
- **벽** — 색상 커스터마이징이 가능한 자동 타일링 벽
- **도구** — 선택, 페인트, 지우개, 배치, 스포이드, 픽
- **실행 취소/다시 실행** — Ctrl+Z / Ctrl+Y로 50단계 지원
- **내보내기/가져오기** — 설정 모달에서 JSON 파일로 레이아웃 공유 가능

그리드는 최대 64×64 타일까지 확장 가능합니다. 현재 그리드 바깥의 점선 경계를 클릭해 확장하세요.

### 오피스 에셋

모든 오피스 에셋(가구, 바닥, 벽)은 이제 **완전 오픈소스**로 이 저장소의 `webview-ui/public/assets/`에 포함되어 있습니다. 외부 구매나 임포트 없이 바로 사용할 수 있습니다.

각 가구 항목은 `assets/furniture/` 하위 고유 폴더에 스프라이트, 회전 그룹, 상태 그룹(켜짐/꺼짐), 애니메이션 프레임을 선언하는 `manifest.json`과 함께 있습니다. 바닥 타일은 `assets/floors/`의 개별 PNG 파일이고, 벽 타일 세트는 `assets/walls/`에 있습니다. 이 모듈식 구조 덕분에 코드를 수정하지 않고도 에셋을 쉽게 추가, 제거, 수정할 수 있습니다.

새 가구를 추가하려면 `webview-ui/public/assets/furniture/`에 PNG 스프라이트와 `manifest.json`이 담긴 폴더를 만들고 다시 빌드하면 됩니다. 에셋 매니저(`scripts/asset-manager.html`)는 매니페스트를 생성하고 편집하는 비주얼 에디터를 제공합니다.

외부 디렉토리의 가구를 사용하려면 설정 → **에셋 디렉토리 추가**를 열면 됩니다. 전체 매니페스트 형식과 서드파티 에셋 팩 사용법은 [docs/external-assets.md](docs/external-assets.md)를 참고하세요.

캐릭터는 [JIK-A-4, Metro City](https://jik-a-4.itch.io/metrocity-free-topdown-character-pack)의 훌륭한 작품을 기반으로 합니다.

## 동작 원리

Pixel Agents는 두 가지 병렬 감지 경로를 가집니다:

- **훅 모드** (권장) — Claude Code의 공식 Hooks API가 이벤트(`SessionStart`, `PreToolUse`, `Notification`, `Stop` 등)를 로컬 Fastify 서버(`POST /api/hooks/:providerId`)로 POST합니다. 즉각적이고 신뢰할 수 있습니다. 서버 정보는 `~/.pixel-agents/server.json`을 통해 확인됩니다.
- **휴리스틱 모드** (폴백) — `~/.claude/projects/<project-hash>/<session-id>.jsonl`의 JSONL 트랜스크립트 파일을 폴링합니다. 훅이 설치되지 않은 경우 사용됩니다.

단일 `HookProvider.normalizeHookEvent(raw)` 함수가 각 CLI의 훅 페이로드를 정규화된 `AgentEvent`로 변환합니다. 공유 `AgentRuntime`이 `AgentEvent.kind`에 따라 디스패치하고, `AgentStateStore`를 변경하며, 브로드캐스트 레이어가 상태 이벤트를 활성 트랜스포트를 통해 타입이 정의된 `ServerMessage`로 변환합니다.

웹뷰는 캔버스 렌더링, BFS 경로탐색, 캐릭터 상태 머신(대기 → 이동 → 타이핑/읽기)을 갖춘 가벼운 게임 루프를 실행합니다. 모든 것은 정수 줌 레벨에서 픽셀 퍼펙트로 렌더링됩니다. 게임 상태는 React 외부의 명령형 `OfficeState` 클래스에 있으며, React 컴포넌트는 렌더링 시 이를 읽지만 상태를 소유하지 않습니다.

Claude Code에 대한 수정은 전혀 필요하지 않습니다 — Pixel Agents는 순수하게 관찰 전용입니다.

## 기술 스택

4개 패키지 모노레포, npm 워크스페이스:

- **`core/`** — TypeScript 전용 프로토콜 + 인터페이스(AsyncAPI 3.0 계약, `HookProvider`, `MessageTransport`, `StateAdapter`). 런타임 부수 효과 없음.
- **`server/`** — Fastify v5(HTTP + WebSocket), Vitest. `AgentRuntime`, `AgentStateStore`, `SessionRouter`, `DismissalTracker`, 파일 감시, 트랜스크립트 파싱, 프로바이더를 담당. `npx pixel-agents` CLI를 포함합니다.
- **`adapters/vscode/`** — VS Code Extension API. 데스크탑 환경을 위해 `core/` + `server/`를 합성합니다.
- **`webview-ui/`** — React 19, Vite, Canvas 2D. 트랜스포트 독립적(`PostMessageTransport`는 VS Code에서, `WebSocketTransport`는 브라우저에서 사용).

빌드: esbuild(익스텐션 + CLI + 훅 스크립트), Vite(웹뷰 SPA). 테스트: Vitest(서버 + 웹뷰 유닛), Playwright(실제 VS Code + 독립 실행형 Fastify에 대한 e2e).

## 알려진 한계

- **에이전트-터미널 동기화** — 에이전트와 Claude Code 터미널 인스턴스 간의 연결이 완전히 견고하지 않으며, 특히 터미널이 빠르게 열리고 닫히거나 세션 간에 복원될 때 동기화가 어긋날 수 있습니다.
- **휴리스틱 기반 상태 감지** — Claude Code의 JSONL 트랜스크립트 형식은 에이전트가 사용자 입력을 기다리는 시점이나 작업을 마친 시점에 대한 명확한 신호를 제공하지 않습니다. 현재 감지는 휴리스틱(유휴 타이머, turn-duration 이벤트)을 기반으로 하며 오작동이 발생할 수 있습니다.
- **Linux/macOS 팁** — 폴더 없이 VS Code를 실행하면(예: 단순 `code` 명령) 에이전트가 홈 디렉토리에서 시작됩니다. 이는 완전히 지원되지만, Claude 세션이 홈 디렉토리를 프로젝트 루트로 사용해 `~/.claude/projects/` 아래에서 추적된다는 점을 참고하세요.

## 문제 해결

에이전트가 idle 상태에서 멈추거나 생성되지 않는 경우:

1. **디버그 뷰** — Pixel Agents 패널에서 톱니바퀴 아이콘(설정)을 클릭한 후 **디버그 뷰**를 켜세요. 에이전트별 연결 진단 정보(JSONL 파일 상태, 파싱된 줄 수, 마지막 데이터 타임스탬프, 파일 경로)를 확인할 수 있습니다. "JSONL not found"가 표시되면 익스텐션이 세션 파일을 찾지 못하는 것입니다.
2. **디버그 콘솔** — 소스에서 실행 중이라면(F5로 익스텐션 개발 호스트 실행), VS Code의 **보기 > 디버그 콘솔**을 여세요. `[Pixel Agents]`를 검색하면 프로젝트 디렉토리 확인, JSONL 폴링 상태, 경로 인코딩 불일치, 인식되지 않는 JSONL 레코드 유형 등 상세 로그를 볼 수 있습니다.

## 앞으로의 방향

장기적인 비전은 AI 에이전트를 관리하는 것이 심즈를 플레이하는 것처럼 느껴지되, 결과물은 실제로 만들어지는 인터페이스입니다.

- **캐릭터로서의 에이전트** — 보고, 배정하고, 모니터링하고, 방향을 바꿀 수 있으며, 각자 눈에 보이는 역할(디자이너, 코더, 작가, 리뷰어), 스탯, 컨텍스트 사용량, 도구를 가집니다.
- **디렉토리로서의 책상** — 에이전트를 책상으로 드래그해 프로젝트나 작업 디렉토리에 배정합니다.
- **프로젝트로서의 오피스** — 벽에 칸반 보드가 있어 유휴 에이전트가 자율적으로 작업을 픽업할 수 있습니다.
- **심층 검사** — 에이전트를 클릭해 모델, 브랜치, 시스템 프롬프트, 전체 작업 이력을 확인합니다. 중단하거나, 대화하거나, 방향을 바꿀 수 있습니다.
- **토큰 체력바** — 속도 제한과 컨텍스트 창을 인게임 스탯으로 시각화합니다.
- **완전한 커스터마이징** — 나만의 캐릭터 스프라이트, 테마, 오피스 에셋을 업로드합니다. 언젠가는 픽셀 아트를 넘어 3D 또는 VR로 발전할 수도 있습니다.

이를 위해서는 아키텍처가 모든 레벨에서 모듈식이어야 합니다:

- **플랫폼 독립적**: 현재 VS Code 익스텐션이지만, 향후 Electron 앱, 웹 앱, 또는 다른 호스트 환경에서도 동작합니다.
- **에이전트 독립적**: 현재 Claude Code이지만, 조합 가능한 어댑터를 통해 Codex, OpenCode, Gemini, Cursor, Copilot 등을 지원할 수 있도록 설계되었습니다.
- **테마 독립적**: 커뮤니티가 만든 에셋, 스킨, 테마를 누구나 기여할 수 있습니다.

핵심 모듈과 어댑터 아키텍처를 활발히 개발 중입니다. 더 이야기를 나누고 싶다면 [토론 섹션](https://github.com/pixel-agents-hq/pixel-agents/discussions)을 방문해 주세요.

## 커뮤니티 & 기여

버그 신고나 기능 요청은 **[이슈](https://github.com/pixel-agents-hq/pixel-agents/issues)**를 이용하세요. 질문이나 대화는 **[토론](https://github.com/pixel-agents-hq/pixel-agents/discussions)**에서 나눠주세요.

기여 방법은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.

참여 전에 [행동 강령](CODE_OF_CONDUCT.md)을 읽어주세요.

## 프로젝트 후원

Pixel Agents가 유용하다면 개발을 지원해 주세요:

<a href="https://github.com/sponsors/pablodelucca">
  <img src="https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?logo=github" alt="GitHub Sponsors">
</a>
<a href="https://ko-fi.com/pablodelucca">
  <img src="https://img.shields.io/badge/Support-Ko--fi-ff5e5b?logo=ko-fi" alt="Ko-fi">
</a>

## 스타 이력

[![Star History Chart](https://api.star-history.com/svg?repos=pixel-agents-hq/pixel-agents&type=Date)](https://www.star-history.com/?repos=pixel-agents-hq%2Fpixel-agents&type=date&legend=bottom-right)

## 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE)를 따릅니다.
