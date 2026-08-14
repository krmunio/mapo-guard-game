const gameConfig = {
  character: "로봇",
  characterEmoji: "🤖",
  characterColor: "초록",
  ability: "쓰레기 치우기",
  location: "한강공원",
  missionText: "마포를 깨끗하게 만들자!",
  targetEmoji: "🗑️",
  replacementEmoji: "🌼",
  scorePerTarget: 1,
  winningScore: 50,
  targetCount: 5,
};

const characterOptions = {
  고양이: { emoji: "🐱", action: "고양이" },
  공룡: { emoji: "🦖", action: "공룡" },
  토끼: { emoji: "🐰", action: "토끼" },
  로봇: { emoji: "🤖", action: "로봇" },
};

const colorOptions = {
  파랑: "color-blue",
  분홍: "color-pink",
  초록: "color-green",
  무지개: "color-rainbow",
};

const abilityOptions = {
  "별 모으기": { verb: "별을 모아요", target: "⭐", replacement: "✨" },
  "쓰레기 치우기": { verb: "쓰레기를 치워요", target: "🗑️", replacement: "🌼" },
  "나무 심기": { verb: "나무를 심어요", target: "🕳️", replacement: "🌳" },
};

const locationOptions = {
  한강공원: "location-hangang",
  도서관: "location-library",
  우주: "location-space",
  "마법의 숲": "location-forest",
};

const elements = {
  title: document.querySelector("#game-title"),
  missionText: document.querySelector("#mission-text"),
  score: document.querySelector("#score"),
  goalScore: document.querySelector("#goal-score"),
  remainingTargets: document.querySelector("#remaining-targets"),
  stage: document.querySelector("#game-stage"),
  locationName: document.querySelector("#location-name"),
  targets: document.querySelector("#targets"),
  character: document.querySelector("#character"),
  characterEmoji: document.querySelector("#character-emoji"),
  characterName: document.querySelector("#character-name"),
  actionHint: document.querySelector("#action-hint"),
  celebration: document.querySelector("#celebration"),
  gameStatus: document.querySelector("#game-status"),
  resetButton: document.querySelector("#reset-button"),
};

const gameState = {
  score: 0,
  remainingTargets: gameConfig.targetCount,
  isComplete: false,
  isActing: false,
};

function getSelectedOptions() {
  return {
    character: characterOptions[gameConfig.character] ?? characterOptions.로봇,
    colorClass: colorOptions[gameConfig.characterColor] ?? colorOptions.초록,
    ability: abilityOptions[gameConfig.ability] ?? abilityOptions["쓰레기 치우기"],
    locationClass: locationOptions[gameConfig.location] ?? locationOptions.한강공원,
  };
}

function createTarget(index) {
  const target = document.createElement("span");
  target.className = "target";
  target.dataset.targetIndex = String(index);
  target.textContent = gameConfig.targetEmoji;
  target.setAttribute("aria-hidden", "true");
  return target;
}

function initializeGame() {
  const selected = getSelectedOptions();

  gameState.score = 0;
  gameState.remainingTargets = gameConfig.targetCount;
  gameState.isComplete = false;
  gameState.isActing = false;

  elements.title.textContent = `${gameConfig.location} ${gameConfig.character} 수호대`;
  elements.missionText.textContent = gameConfig.missionText;
  elements.locationName.textContent = gameConfig.location;
  elements.goalScore.textContent = String(gameConfig.winningScore);
  elements.characterEmoji.textContent = gameConfig.characterEmoji || selected.character.emoji;
  elements.characterName.textContent = `${gameConfig.characterColor} ${gameConfig.character}`;
  elements.actionHint.textContent = `${gameConfig.character} 캐릭터를 눌러 ${selected.ability.verb}!`;
  elements.character.setAttribute(
    "aria-label",
    `${gameConfig.characterColor}색 ${gameConfig.character} 캐릭터로 ${gameConfig.ability} 수행하기`,
  );

  elements.stage.className = `game-stage ${selected.locationClass}`;
  elements.stage.setAttribute("aria-label", `${gameConfig.location} 게임 무대`);
  elements.character.className = `character ${selected.colorClass}`;
  elements.targets.replaceChildren(
    ...Array.from({ length: gameConfig.targetCount }, (_, index) => createTarget(index)),
  );
  elements.celebration.hidden = true;
  elements.gameStatus.textContent = "캐릭터를 눌러 임무를 시작하세요.";

  renderGameState();
}

function removeNextTarget() {
  const target = elements.targets.querySelector(".target:not(.is-cleared)");

  if (!target) {
    return false;
  }

  const replacement = document.createElement("span");
  replacement.className = "replacement";
  replacement.textContent = gameConfig.replacementEmoji;
  replacement.setAttribute("aria-hidden", "true");
  replacement.style.left = target.style.left || getComputedStyle(target).left;
  replacement.style.bottom = target.style.bottom || getComputedStyle(target).bottom;

  target.classList.add("is-cleared");
  elements.targets.append(replacement);
  return true;
}

function renderGameState() {
  elements.score.textContent = String(gameState.score);
  elements.remainingTargets.textContent = String(gameState.remainingTargets);
  elements.character.disabled = gameState.isComplete || gameState.remainingTargets === 0;
  elements.character.setAttribute("aria-busy", String(gameState.isActing));
}

function showCelebration() {
  gameState.isComplete = true;
  elements.celebration.hidden = false;
  elements.gameStatus.textContent = `임무 성공! ${gameConfig.winningScore}점을 달성했어요.`;
}

function finishAction() {
  elements.character.classList.remove("is-jumping");
  gameState.isActing = false;
  renderGameState();
}

function handleCharacterAction() {
  if (gameState.isComplete || gameState.isActing || gameState.remainingTargets === 0) {
    return;
  }

  gameState.isActing = true;
  elements.character.classList.add("is-jumping");

  if (!removeNextTarget()) {
    finishAction();
    return;
  }

  gameState.score += gameConfig.scorePerTarget;
  gameState.remainingTargets -= 1;

  if (gameState.score >= gameConfig.winningScore) {
    gameState.score = gameConfig.winningScore;
    showCelebration();
  } else if (gameState.remainingTargets === 0) {
    elements.gameStatus.textContent = "목표물을 모두 찾았지만 점수가 부족해요. 점수 설정을 확인해 보세요.";
  } else {
    elements.gameStatus.textContent =
      `${gameConfig.ability} 성공! ${gameConfig.scorePerTarget}점 올랐어요.`;
  }

  renderGameState();
  window.setTimeout(finishAction, 500);
}

function resetGame() {
  initializeGame();
  elements.character.focus();
}

elements.character.addEventListener("click", handleCharacterAction);
elements.resetButton.addEventListener("click", resetGame);

initializeGame();
