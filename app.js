const symbols = ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼"];
let deck = [];
let selected = [];
let moves = 0;

const grid = document.getElementById("grid");
const movesEl = document.getElementById("moves");
const bestEl = document.getElementById("best");

let bestScore = localStorage.getItem("bestScore");
if (bestScore) bestEl.textContent = bestScore;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  deck = shuffle([...symbols, ...symbols]).map((symbol, i) => ({
    id: i,
    symbol,
    flipped: false,
    matched: false
  }));

  selected = [];
  moves = 0;
  movesEl.textContent = moves;

  render();
}

function render() {
  grid.innerHTML = "";
  deck.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    if (card.flipped || card.matched) {
      div.classList.add("flipped");
      div.textContent = card.symbol;
    } else {
      div.textContent = "?";
    }
    div.onclick = () => flipCard(card);
    grid.appendChild(div);
  });
}

function flipCard(card) {
  if (card.flipped || card.matched || selected.length === 2) return;

  card.flipped = true;
  selected.push(card);

  if (selected.length === 2) {
    moves++;
    movesEl.textContent = moves;

    const [a, b] = selected;
    if (a.symbol === b.symbol) {
      a.matched = b.matched = true;
      selected = [];
      checkWin();
    } else {
      setTimeout(() => {
        a.flipped = b.flipped = false;
        selected = [];
        render();
      }, 800);
    }
  }

  render();
}

function checkWin() {
  if (deck.every(c => c.matched)) {
    if (!bestScore || moves < bestScore) {
      bestScore = moves;
      localStorage.setItem("bestScore", moves);
      bestEl.textContent = moves;
    }
    alert("Hai vinto in " + moves + " mosse!");
  }
}

// avvio iniziale
startGame();