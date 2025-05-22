"use strict";

const startSection = document.getElementById("startSection");
const startBtn = document.getElementById("startBtn");
const battleSection = document.getElementById("battleSection");

const monsterHealthText = document.getElementById("monsterHealthText");
const playerHealthText = document.getElementById("playerHealthText");
const attackBtn = document.getElementById("attackBtn");
const specialBtn = document.getElementById("specialBtn");
const healBtn = document.getElementById("healBtn");
const abandonBtn = document.getElementById("abandonBtn");

specialBtn.disabled = true;
let attackCount = 0;

startBtn.addEventListener("click", function (event) {
  startSection.classList.add("hidden");
  startBtn.classList.add("hidden");
  battleSection.classList.remove("hidden");
});

attackBtn.addEventListener("click", function (event) {
  if (attackCount < 2) {
    attackCount++;
  }
  let humanAttack = Math.floor(Math.random() * 10) + 2;
  let monsterHealth = monsterHealthText.textContent;
  monsterHealthText.textContent = monsterHealth - humanAttack;
  monsterAlive();
  specialEnable(attackCount);
});

function specialEnable(attackCount) {
  if (attackCount == 2) {
    specialBtn.disabled = false;
  }
}

specialBtn.addEventListener("click", function (event) {
  let specialAttack = Math.floor(Math.random() * 20) + 15;
  let monsterHealth = monsterHealthText.textContent;
  monsterHealthText.textContent = monsterHealth - specialAttack;
  specialBtn.disabled = true;
  monsterAlive();
});

healBtn.addEventListener("click", function (event) {
  monsterAlive();
  let playerHealth = parseInt(playerHealthText.textContent);
  playerHealth += 50;
  playerHealthText.textContent = playerHealth;
  monsterAlive();
});

abandonBtn.addEventListener("click", function (event) {});

function monsterAttack() {
  let monsterAttack = Math.floor(Math.random() * 10) + 10;
  let playerHealth = playerHealthText.textContent;
  playerHealthText.textContent = playerHealth - monsterAttack;
}

function monsterAlive() {
  if (monsterHealthText.content <= 0) {
  } else {
    monsterAttack();
  }
}
