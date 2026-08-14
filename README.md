# 마포 수호대 미니게임

초등학생 참가자가 원하는 캐릭터와 임무를 설명하고, GitHub Copilot과 함께 게임을 바꾸고 확인하는 부스 체험용 미니게임입니다.

- HTML, CSS, JavaScript만 사용해 별도 설치나 빌드 없이 실행
- 캐릭터, 색깔, 능력, 장소를 간단한 설정으로 변경
- 의도적으로 점수 오류를 넣은 AI 탐정 미션 제공
- 키보드 조작과 동작 줄이기 설정 지원

## 빠른 시작

### 필요한 프로그램

- Git
- Visual Studio Code
- Chrome 또는 Edge
- VS Code의 **GitHub Copilot** 확장
- 주최 측에서 준비한 GitHub 계정과 Copilot 사용 권한

> [!NOTE]
> 게임 실행에는 Copilot이 필요하지 않습니다. 자연어로 게임을 수정하고 제안된 코드를 검토하는 체험 단계에서만 사용합니다.

### 저장소 받기

터미널에서 다음 명령을 실행합니다.

```bash
git clone https://github.com/krmunio/mapo-guard-game.git
cd mapo-guard-game
code .
```

이미 저장소가 있다면 행사 전에 최신 내용을 받습니다.

```bash
cd <mapo-guard-game 저장소 경로>
git pull
code .
```

> [!CAUTION]
> `git pull`이 로컬 변경 때문에 실패하면 참가자 파일을 임의로 삭제하지 말고 행사 책임자에게 확인합니다.

### Copilot 준비 확인

1. VS Code의 Extensions 화면에서 `GitHub Copilot`을 설치합니다.
2. VS Code 상태 표시줄 또는 계정 메뉴에서 주최 측 GitHub 계정으로 로그인합니다.
3. Copilot Chat을 열고 `안녕하세요`를 입력해 응답을 확인합니다.
4. [`apps/script.js`](apps/script.js)를 엽니다.
5. Copilot Chat에 다음 프롬프트를 입력합니다.

```text
현재 script.js의 gameConfig에 설정된 캐릭터, 색깔, 능력, 장소만 알려줘.
코드는 수정하지 마.
```

Copilot이 현재 설정을 설명하면 준비가 완료된 것입니다. 참가자에게 개인 GitHub 계정을 만들거나 로그인하게 하지 않습니다.

## 게임 실행

저장소 루트에서 다음 명령을 실행합니다.

```bash
xdg-open apps/index.html
```

또는 VS Code 탐색기에서 [`apps/index.html`](apps/index.html)을 파일 탐색기에 표시한 뒤 Chrome이나 Edge로 엽니다.

실행 후 다음을 확인합니다.

1. 캐릭터를 마우스로 클릭하거나 키보드로 선택할 수 있습니다.
2. 목표물을 하나 해결할 때마다 10점이 올라갑니다.
3. 50점에서 임무 성공 메시지가 나타납니다.
4. **다시 시작**을 누르면 점수와 목표물이 초기화됩니다.

게임은 인터넷 연결 없이도 실행됩니다.

## 참가자와 게임 바꾸기

[`apps/script.js`](apps/script.js) 맨 위의 `gameConfig`를 수정하면 주요 설정을 바꿀 수 있습니다.

```js
const gameConfig = {
  character: "공룡",
  characterEmoji: "🦖",
  characterColor: "분홍",
  ability: "나무 심기",
  location: "마법의 숲",
  missionText: "마법의 숲에 나무를 심자!",
  targetEmoji: "🕳️",
  replacementEmoji: "🌳",
  scorePerTarget: 10,
  winningScore: 50,
  targetCount: 5,
};
```

| 항목 | 사용할 수 있는 값 |
| --- | --- |
| 캐릭터 | `고양이`, `공룡`, `토끼`, `로봇` |
| 색깔 | `파랑`, `분홍`, `초록`, `무지개` |
| 능력 | `별 모으기`, `쓰레기 치우기`, `나무 심기` |
| 장소 | `한강공원`, `도서관`, `우주`, `마법의 숲` |

능력을 바꿀 때 `targetEmoji`와 `replacementEmoji`도 함께 바꾸면 임무가 자연스럽습니다. 예를 들어 별 모으기는 `⭐`와 `✨`, 나무 심기는 `🕳️`와 `🌳`를 사용합니다.

Copilot 요청 예시:

```text
script.js의 gameConfig에서 주인공을 분홍색 토끼로 바꿔줘.
장소는 우주, 능력은 별 모으기로 바꾸고 어울리는 이모지도 설정해줘.
다른 게임 로직은 바꾸지 마.
```

변경 후 브라우저를 새로 고치고 캐릭터, 장소, 임무, 점수가 요청과 일치하는지 참가자와 함께 확인합니다.

## 8~10분 운영 순서

1. **1분:** 캐릭터, 색깔, 능력, 장소 카드를 고릅니다.
2. **2분:** 선택 내용을 한두 문장으로 만들어 Copilot에 요청합니다.
3. **2분:** 브라우저에서 실행하고 색깔, 행동, 점수를 확인합니다.
4. **2분:** 문구나 효과 한 가지를 더 개선합니다.
5. **2분:** 탐정 미션에서 점수 오류를 찾고 수정합니다.
6. **1분:** AI가 만든 결과도 사람이 확인해야 한다는 점을 정리합니다.

## 준비된 버전

| 버전 | 경로 | 용도 |
| --- | --- | --- |
| 체험 작업본 | [`apps/`](apps/) | 참가자가 Copilot으로 직접 수정하는 버전 |
| 초기화 원본 | [`apps/examples/completed/`](apps/examples/completed/) | 한강공원의 초록 로봇으로 시작하는 완성 버전 |
| AI 탐정 미션 | [`apps/examples/debug-mission/`](apps/examples/debug-mission/) | 점수가 10점 대신 1점씩 오르는 오류 찾기 |

탐정 미션은 [`apps/examples/debug-mission/index.html`](apps/examples/debug-mission/index.html)을 열고 다음 프롬프트로 진행합니다.

```text
점수가 10점씩 올라가야 하는데 1점씩 올라가고 있어.
원인을 초등학생도 이해할 수 있게 설명하고 고쳐줘.
```

## 다음 참가자를 위해 초기화

저장소 루트에서 다음 명령을 실행합니다.

```bash
cp apps/examples/completed/{index.html,style.css,script.js} apps/
```

이 명령은 [`apps/examples/completed/`](apps/examples/completed/)의 `index.html`, `style.css`, `script.js`를 [`apps/`](apps/)에 복사해 한강공원의 초록 로봇 버전으로 되돌립니다.

> [!WARNING]
> 초기화하면 참가자가 수정한 세 파일을 덮어씁니다. 보관할 변경 사항이 있다면 먼저 별도로 저장하세요.

## 프로젝트 구조

```text
mapo-guard-game/
├─ README.md
└─ apps/
   ├─ index.html
   ├─ style.css
   ├─ script.js
   └─ examples/
      ├─ completed/
      └─ debug-mission/
```

## 운영 시 확인할 점

- Copilot이 제안한 변경 사항을 적용하기 전에 참가자와 함께 검토합니다.
- 실명, 학교명, 연락처, 사진, 주소를 프롬프트에 입력하지 않습니다.
- 점수가 10점씩 올라가는지, 선택한 색과 임무가 맞는지 사람이 확인합니다.
- 결과가 다르면 무엇이 이상한지 구체적으로 설명해 다시 요청합니다.
