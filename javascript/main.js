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
let player100 = document.querySelector(".player .character-image").src;
let monster100 = document.querySelector(".monster .character-image").src;

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
  updateHealth();
  monsterAlive();
  specialEnable(attackCount);
  let message = `The monster has taken ${humanAttack} damages`;
  addToList(message, "damage-dealt");
});

specialBtn.addEventListener("click", function (event) {
  let specialAttack = Math.floor(Math.random() * 20) + 15;
  let monsterHealth = monsterHealthText.textContent;
  monsterHealthText.textContent = Math.max(0, monsterHealth - specialAttack);
  specialBtn.disabled = true;
  attackCount = 0;
  updateHealth();
  let message = `The monster has taken ${specialAttack} damages`;
  addToList(message, "damage-dealt");
  monsterAlive();
});

healBtn.addEventListener("click", function (event) {
  monsterAlive();
  healCount++;
  let playerHealth = parseInt(playerHealthText.textContent);
  let oldHealth = playerHealth;
  playerHealth = Math.min(200, playerHealth + 50);
  playerHealthText.textContent = playerHealth;
  let actualHeal = playerHealth - oldHealth;
  let message = `You have healed ${actualHeal} damages`;
  addToList(message, "healing");
  updateHealth();
  monsterAlive();
  if (healCount >= 3) {
    healBtn.disabled = true;
  }
});

abandonBtn.addEventListener("click", function (event) {
  let message = "You have given up";
  addToList(message, "neutral");
  resetParty();
});

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
  actionsList.innerHTML = "";
  document.getElementById("playerHealth").style.width = "100%";
  document.getElementById("monsterHealth").style.width = "100%";
  document.querySelector(".monster .character-image").src = monster100;
  document.querySelector(".player .character-image").src = player100;
}

function monsterAttack() {
  let monsterAttack = Math.floor(Math.random() * 10) + 10;
  let playerHealth = playerHealthText.textContent;
  playerHealthText.textContent = Math.max(0, playerHealth - monsterAttack);
  let message = `The monster has inflicted ${monsterAttack} damages`;
  updateHealth();
  addToList(message, "damage-taken");
}
function playerAlive() {
  if (parseInt(playerHealthText.textContent) <= 0) {
    alert("You Lose!");
    resetParty();
  }
}
function monsterAlive() {
  if (parseInt(monsterHealthText.textContent) <= 0) {
    resetParty();
    alert("You Win!!");
  } else {
    monsterAttack();
    playerAlive();
  }
}

function addToList(message, className = "") {
  const actionsList = document.getElementById("actionsList");
  const listItem = document.createElement("li");
  listItem.textContent = message;
  if (className) {
    listItem.classList.add(className);
  }
  actionsList.insertBefore(listItem, actionsList.firstChild);
}

function updateHealth() {
  let playerPercentage = (parseInt(playerHealthText.textContent) / 200) * 100;
  let monsterPercentage = (parseInt(monsterHealthText.textContent) / 200) * 100;

  document.getElementById("playerHealth").style.width = playerPercentage + "%";
  document.getElementById("monsterHealth").style.width =
    monsterPercentage + "%";
  if (monsterPercentage <= 50) {
    document.querySelector(".monster .character-image").src =
      "images/monster-hurt-reverse.png";
  }
  if (playerPercentage <= 50) {
    document.querySelector(".player .character-image").src =
      "images/heros-hurt.jpeg";
  } else {
    document.querySelector(".player .character-image").src = player100;
  }
}
