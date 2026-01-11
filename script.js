// ================== ДОСТУП ==================
const CORRECT_LOGIN = "chosenone";
const CORRECT_PASS  = "kabachok2026";

// ================== НАСТРОЙКИ ИГРЫ ==================
const MAX_ROUNDS = 100;
let round = Number(localStorage.getItem("round") || 0);

// ================== 50 ПРЕДМЕТОВ (ТЕКСТ + ЭМОДЖИ) ==================
const items = [
  ["банку кабачковой икры", "🫙"],
  ["тапок Аллы", "🥿"],
  ["тухлый кабачок", "🤢"],
  ["повестку в армию", "📄"],
  ["один носок", "🧦"],
  ["чек без возврата", "🧾"],
  ["ключ неизвестно от чего", "🔑"],
  ["пустую коробку", "📦"],
  ["старый телефон", "📱"],
  ["подозрительную флешку", "💾"],

  ["порванный пакет", "🛍️"],
  ["сломанный зонт", "🌂"],
  ["карандаш без грифеля", "✏️"],
  ["пустую кружку", "☕"],
  ["грязную тарелку", "🍽️"],
  ["пульт без батареек", "📺"],
  ["чужую зарядку", "🔌"],
  ["обрывок инструкции", "📄"],
  ["старый будильник", "⏰"],
  ["одну перчатку", "🧤"],

  ["пакет с пакетами", "👜"],
  ["сломанные наушники", "🎧"],
  ["пластиковую вилку", "🍴"],
  ["мятую салфетку", "🧻"],
  ["чек трёхлетней давности", "🧾"],
  ["бесполезный купон", "🏷️"],
  ["сломанный USB-кабель", "🔌"],
  ["старый пропуск", "🪪"],
  ["пыльный брелок", "🔑"],
  ["пустой кошелёк", "👛"],

  ["ненужную бумажку", "📄"],
  ["странный болт", "🔩"],
  ["крышку без банки", "🫙"],
  ["пластиковую карту", "💳"],
  ["старый CD-диск", "💿"],
  ["непонятную кнопку", "🔘"],
  ["потерянную мелочь", "🪙"],
  ["чужой билет", "🎟️"],
  ["лист без текста", "📃"],
  ["пакетик с воздухом", "📦"],

  ["сломанный замок", "🔒"],
  ["чужую ручку", "🖊️"],
  ["пустую флешку", "💾"],
  ["старый календарь", "📅"],
  ["ржавый гвоздь", "📌"]
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
    const div = document.createElement("div");
    div.className = "kabachok";
    div.textContent = "🥒";
    div.style.fontSize = "48px";
    div.onclick = pick;
    field.appendChild(div);
  }
}

function pick() {
  if (round >= MAX_ROUNDS) return;

  round++;
  localStorage.setItem("round", round);
  updateUI();

  // финал после 100 раундов
  if (round >= MAX_ROUNDS) {
    showModal(
      "❌ За 100 раундов ты не нашёл золотой кабачок.\nАлла не примет тебя в друзья.",
      "🥒"
    );
    return;
  }

  const item = items[Math.floor(Math.random() * items.length)];
  showModal(
    "Ты не нашёл золотой кабачок,\nно ты нашёл " + item[0] + ".",
    item[1]
  );
}

function updateUI() {
  roundText.innerText = `Раунд: ${round} / ${MAX_ROUNDS}`;
}

function showModal(text, emoji) {
  modal.classList.remove("hidden");
  modalText.innerText = emoji + "\n\n" + text;
}

function closeModal() {
  modal.classList.add("hidden");
}
