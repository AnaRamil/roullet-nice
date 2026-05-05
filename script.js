(function () {
  // Elementos DOM
  const quantityInput = document.getElementById("quantity");
  const minInput = document.getElementById("minVal");
  const maxInput = document.getElementById("maxVal");
  const noRepeatCheck = document.getElementById("noRepeat");
  const sortBtn = document.getElementById("sortButton");
  const sortAgainBtn = document.getElementById("sortAgainButton");
  const resetBtn = document.getElementById("resetButton");
  const formColumn = document.getElementById("formColumn");
  const resultSection = document.getElementById("resultSection");
  const resultContainer = document.getElementById("resultContainer");
  const resultOrdinalSpan = document.getElementById("resultOrdinal");
  const errorDiv = document.getElementById("errorMessage");

  let currentConfig = { quantity: 1, min: 1, max: 100, noRepeat: false };
  let drawCounter = 0;
  let lastDrawTime = 0;
  let isSorting = false;

  // Carregar config salva
  function loadSaved() {
    try {
      const saved = localStorage.getItem("numbersSorterConfig");
      if (saved) {
        const cfg = JSON.parse(saved);
        quantityInput.value = cfg.quantity ?? 1;
        minInput.value = cfg.min ?? 1;
        maxInput.value = cfg.max ?? 100;
        noRepeatCheck.checked = cfg.noRepeat ?? false;
        currentConfig = { ...cfg };
      }
    } catch (e) {
      console.warn(e);
    }
  }
  function saveConfig() {
    const config = {
      quantity: parseInt(quantityInput.value) || 1,
      min: parseInt(minInput.value) || 0,
      max: parseInt(maxInput.value) || 1,
      noRepeat: noRepeatCheck.checked,
    };
    localStorage.setItem("numbersSorterConfig", JSON.stringify(config));
    currentConfig = config;
  }

  function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.classList.add("show");
    setTimeout(() => errorDiv.classList.remove("show"), 4000);
  }

  function validateInputs() {
    let qty = parseInt(quantityInput.value);
    let min = parseInt(minInput.value);
    let max = parseInt(maxInput.value);
    if (isNaN(qty) || qty < 1)
      throw new Error("Quantidade deve ser no mínimo 1");
    if (isNaN(min) || min < 0) throw new Error("Mínimo deve ser >= 0");
    if (isNaN(max) || max <= min)
      throw new Error("Máximo deve ser maior que o mínimo");
    const interval = max - min + 1;
    if (qty > interval)
      throw new Error(`Quantidade (${qty}) excede intervalo (${interval})`);
    if (noRepeatCheck.checked && qty > interval)
      throw new Error(
        'Com "não repetir", a quantidade não pode exceder o intervalo.',
      );
    currentConfig = {
      quantity: qty,
      min,
      max,
      noRepeat: noRepeatCheck.checked,
    };
    saveConfig();
    return true;
  }

  function randomNumber(min, max) {
    const range = max - min + 1;
    const rand = crypto.getRandomValues(new Uint32Array(1))[0];
    return min + (rand % range);
  }

  function incrementDrawCounter() {
    const now = Date.now();
    if (now - lastDrawTime < 60000) {
      drawCounter++;
    } else {
      drawCounter = 1;
    }
    lastDrawTime = now;
    resultOrdinalSpan.textContent = `${drawCounter}º RESULTADO`;
  }

  async function animateDrawNumbers(numbers) {
    resultContainer.innerHTML = "";
    for (let i = 0; i < numbers.length; i++) {
      const numSpan = document.createElement("span");
      numSpan.className = "result-number";
      numSpan.textContent = numbers[i];
      resultContainer.appendChild(numSpan);
      await new Promise((r) => setTimeout(r, 280));
    }
  }

  async function performDraw() {
    const { quantity, min, max, noRepeat } = currentConfig;
    const drawn = [];
    const usedSet = new Set();
    for (let i = 0; i < quantity; i++) {
      let num;
      if (noRepeat) {
        let attempts = 0;
        do {
          num = randomNumber(min, max);
          attempts++;
          if (attempts > 1000) break;
        } while (usedSet.has(num));
        usedSet.add(num);
      } else {
        num = randomNumber(min, max);
      }
      drawn.push(num);
    }
    return drawn;
  }

  async function handleSort() {
    if (isSorting) return;
    errorDiv.classList.remove("show");
    try {
      validateInputs();
    } catch (err) {
      showError(err.message);
      return;
    }
    isSorting = true;
    sortBtn.disabled = true;
    sortBtn.style.opacity = "0.6";

    // Esconder formulário, mostrar resultado
    formColumn.classList.add("hidden");
    resultSection.classList.add("active");

    // Incrementar contador de sorteios conforme clique
    incrementDrawCounter();

    // Mostrar placeholder "sorteando"
    resultContainer.innerHTML =
      '<div class="result-placeholder">🎲 Sorteando números...</div>';

    // Pequena pausa para UX
    await new Promise((r) => setTimeout(r, 200));

    const numbers = await performDraw();
    await animateDrawNumbers(numbers);

    // Botão "Sortear Novamente" aparece
    sortAgainBtn.style.display = "inline-flex";
    sortBtn.disabled = false;
    sortBtn.style.opacity = "1";
    isSorting = false;
  }

  // "Sortear novamente" sem voltar ao formulário
  async function sortAgain() {
    if (isSorting) return;
    errorDiv.classList.remove("show");
    try {
      validateInputs(); // revalida os valores atuais dos inputs
    } catch (err) {
      showError(err.message);
      return;
    }
    isSorting = true;
    sortAgainBtn.disabled = true;
    sortAgainBtn.style.opacity = "0.6";

    incrementDrawCounter();

    resultContainer.innerHTML =
      '<div class="result-placeholder">🎲 Sorteando novamente...</div>';
    await new Promise((r) => setTimeout(r, 2000));
    const numbers = await performDraw();
    await animateDrawNumbers(numbers);

    sortAgainBtn.disabled = false;
    sortAgainBtn.style.opacity = "1";
    isSorting = false;
  }

  // Voltar ao início: resetar formulário e mostrar inputs com valores padrão
  function resetToInitial() {
    // Resetar campos para valores padrão
    quantityInput.value = "1";
    minInput.value = "1";
    maxInput.value = "100";
    noRepeatCheck.checked = false;
    currentConfig = { quantity: 1, min: 1, max: 100, noRepeat: false };
    saveConfig();

    // Mostrar formulário, esconder resultado
    formColumn.classList.remove("hidden");
    resultSection.classList.remove("active");
    // Limpar container de resultado
    resultContainer.innerHTML =
      '<div class="result-placeholder">Aguardando sorteio...</div>';
    sortAgainBtn.style.display = "none";
    // Resetar contador de sorteios
    drawCounter = 0;
    lastDrawTime = 0;
    errorDiv.classList.remove("show");
  }

  // Event listeners
  sortBtn.addEventListener("click", handleSort);
  sortAgainBtn.addEventListener("click", sortAgain);
  resetBtn.addEventListener("click", resetToInitial);

  // Validação ao digitar
  const inputs = [quantityInput, minInput, maxInput];
  inputs.forEach((inp) => {
    inp.addEventListener("change", () => {
      try {
        validateInputs();
      } catch (e) {
        /* silencioso */
      }
    });
  });

  loadSaved();
  // Inicio: botões de "sortear novamente" ficam invisíveis
  sortAgainBtn.style.display = "none";
  resultContainer.innerHTML =
    '<div class="result-placeholder">Clique em "SORTEAR" para começar</div>';
})();
