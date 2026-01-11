// ================== ДОСТУП ==================
const CORRECT_LOGIN = "chosenone";
const CORRECT_PASS  = "kabachok2026";

// ================== НАСТРОЙКИ ИГРЫ ==================
const MAX_ROUNDS = 100;
let round = Number(localStorage.getItem("round") || 0);

// обычный кабачок (SVG, стабильно)
const KABACHOK_IMG =
  "https://cdn.jsdelivr.net/npm/twemoji@14.0.2/assets/svg/1f952.svg";

// ================== 50 ПРЕДМЕТОВ ==================
// формат: [текст, код_emoji]
const items = [
  ["банку кабачковой икры","1fad9"],
  ["тапок Аллы","1f97e"],
  ["тухлый кабачок","1f9eb"],
  ["повестку в армию","1f4dc"],
  ["один носок","1f9e6"],
  ["чек без возврата","1f9fe"],
  ["ключ неизвестно от чего","1f511"],
  ["пустую коробку","1f4e6"],
  ["старый телефон","1f4f1"],
  ["подозрительную флешку","1f4be"],

  ["порванный пакет","1f9f3"],
  ["сломанный зонт","2602"],
  ["карандаш без грифеля","270f"],
  ["пустую кружку","2615"],
  ["грязную тарелку","1f37d"],
  ["пульт без батареек","1f4fa"],
  ["чужую зарядку","1f50c"],
  ["обрывок инструкции","1f4c4"],
  ["старый будильник","23f0"],
  ["одну перчатку","1f9e4"],

  ["пакет с пакетами","1f45c"],
  ["сломанные наушники","1f3a7"],
  ["пластиковую вилку","1f374"],
  ["мятую салфетку","1f9fb"],
  ["чек трёхлетней давности","1f9fe"],
  ["бесполезный купон","1f3f7"],
  ["сломанный USB-кабель","1f9ef"],
  ["старый пропуск","1f4db"],
  ["пыльный брелок","1f511"],
  ["пустой кошелёк","1f45b"],

  ["ненужную бумажку","1f4c3"],
  ["странный болт","1f529"],
  ["крышку без банки","1fad9"],
  ["пластиковую карту","1f4b3"],
  ["старый CD-диск","1f4bf"],
  ["непонятную кнопку","1f518"],
  ["потерянную мелочь","1fa99"],
  ["чужой билет","1f3ab"],
  ["лист без текста","1f4c4"],
  ["пакетик с воздухом","1f4e6"],

  ["сломанный замок","1f512"],
  ["чужую ручку","1f58a"],
  ["пустую флешку","1f4be"],
  ["старый календарь","1f4c5"],
  ["ржавый гвоздь","1f528"]
];

// ================== ЗАЩИТА ОТ ПОКАЗА ДО ЛОГИНА ==================
window.onload = () => {
  if (typeof modal !== "undefined") {
    modal.classList.add("hidden");
  }
};

// ================== ЛОГИКА ==================

function auth() {
  if (
    loginInput.value === CORRECT_LOGIN &&
    passInput.value === CORRECT_PASS
  ) {
    login.classList.add("hidden");
    game.classList.remove("hidden");
    buildField();
    updateUI();
  } else {
    error.innerText = "❌ Доступ отклонён. Кабачки против.";
  }
}

function buildField() {
  field.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    const img = document.createElement("img");
    img.src = KABACHOK_IMG;
    img.className = "kabachok";
    img.onclick = pick;
    field.appendChild(img);
  }
}

function pick() {
  if (round >= MAX_ROUNDS) return;

  round++;
  localStorage.setItem("round", round);
  updateUI();

  // финал после 100
  if (round >= MAX_ROUNDS) {
    showModal(
      "❌ За 100 раундов ты не нашёл золотой кабачок.\nАлла не примет тебя в друзья.",
      KABACHOK_IMG
    );
    return;
  }

  const item = items[Math.floor(Math.random() * items.length)];
  showModal(
    "Ты не нашёл золотой кабачок,\nно ты нашёл " + item[0] + ".",
    `https://cdn.jsdelivr.net/npm/twemoji@14.0.2/assets/svg/${item[1]}.svg`
  );
}

function updateUI() {
  roundText.innerText = `Раунд: ${round} / ${MAX_ROUNDS}`;
}

function showModal(text, img) {
  modal.classList.remove("hidden");
  modalText.innerText = text;
  modalImg.src = img;
}

function closeModal() {
  modal.classList.add("hidden");
}
