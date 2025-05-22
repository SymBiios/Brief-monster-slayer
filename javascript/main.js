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
let healCount = 0;

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
  monsterHealthText.textContent = Math.max(0, monsterHealth - humanAttack);
  monsterAlive();
  specialEnable(attackCount);
});

specialBtn.addEventListener("click", function (event) {
  let specialAttack = Math.floor(Math.random() * 20) + 15;
  let monsterHealth = monsterHealthText.textContent;
  monsterHealthText.textContent = Math.max(0, monsterHealth - specialAttack);
  specialBtn.disabled = true;
  attackCount = 0;
  monsterAlive();
});

healBtn.addEventListener("click", function (event) {
  monsterAlive();
  healCount++;
  let playerHealth = parseInt(playerHealthText.textContent);
  playerHealth += 50;
  playerHealthText.textContent = playerHealth;
  monsterAlive();
  if (healCount >= 3) {
    healBtn.disabled = true;
  }
});

abandonBtn.addEventListener("click", resetParty);

function specialEnable(attackCount) {
  if (attackCount == 2) {
    specialBtn.disabled = false;
  }
}

function resetParty() {
  playerHealthText.textContent = 200;
  monsterHealthText.textContent = 200;
  attackCount = 0;
  healCount = 0;
  specialBtn.disabled = true;
  startSection.classList.remove("hidden");
  startBtn.classList.remove("hidden");
  battleSection.classList.add("hidden");
  healBtn.disabled = false;
}

function monsterAttack() {
  let monsterAttack = Math.floor(Math.random() * 10) + 10;
  let playerHealth = playerHealthText.textContent;
  playerHealthText.textContent = Math.max(0, playerHealth - monsterAttack);
}
function playerAlive() {
  if (parseInt(playerHealthText.textContent) <= 0) {
    alert("You Lose!");
    resetParty();
  }
}
function monsterAlive() {
  if (parseInt(monsterHealthText.textContent) <= 0) {
    alert("You Win!!");
    resetParty();
  } else {
    monsterAttack();
    playerAlive();
  }
}
