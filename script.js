const stepsOn = [
  "Ligar Mesa de Som",
  "Ligar Régua de Energia",
  "Ligar Amplificadores",
  "Ligar Computador",
  "Ligar Receptor Sem Fio",
  "Colocar pilhas nos microfones",
];

const stepsOff = [
  "Desligar Computador",
  "Desligar Amplificadores",
  "Desligar Régua de Energia",
  "Desligar Mesa de Som",
  "Desligar Receptor Sem Fio",
  "Colocar as Pilhas para Recarregar",
];

const iconsOn = ["tune","electrical_services","equalizer","computer","mic","battery_full_alt"];
const iconsOff = ["desktop_windows","equalizer","electrical_services","tune","mic","battery_0_bar"];

let currentOnStep = 0, currentOffStep = 0;
let isAnimating = false, isPaused = false, interval;

function showStep(step, iconClass, containerId, isOff = false) {
  const container = document.getElementById(containerId);
  const li = document.createElement("li");
  li.className = "step fade-in";
  li.innerHTML = `${step} <span class="material-symbols-outlined icon">${iconClass}</span>`;
  container.appendChild(li);

  const icon = li.querySelector(".icon");
  if (isOff) {
    icon.style.color = "#f28b82";  // vermelho pastel
  } else {
    setTimeout(() => icon.style.color = "#6fbf73", 200); // verde pastel
  }
}

function showAttentionText() {
  const alert = document.getElementById("attentionText");
  alert.style.display = "block";
  setTimeout(() => alert.classList.add("show"), 50);
}

function resetAnimation() {
  currentOnStep = currentOffStep = 0;
  document.getElementById("onStepsContainer").innerHTML = "";
  document.getElementById("offStepsContainer").innerHTML = "";
  const alert = document.getElementById("attentionText");
  alert.classList.remove("show");
  alert.style.display = "none";
}

function startAnimation() {
  isAnimating = true;
  isPaused = false;

  interval = setInterval(() => {
    if (isPaused) return;

    if (currentOnStep < stepsOn.length) {
      showStep(stepsOn[currentOnStep], iconsOn[currentOnStep], "onStepsContainer", false);
      currentOnStep++;
    } else if (currentOffStep < stepsOff.length) {
      showStep(stepsOff[currentOffStep], iconsOff[currentOffStep], "offStepsContainer", true);
      currentOffStep++;
    } else {
      clearInterval(interval);
      showAttentionText();
      setTimeout(() => {
        resetAnimation();
        startAnimation();
      }, 5000);
    }
  }, 2000);
}

function toggleAnimation() {
  if (!isAnimating) {
    startAnimation();
    isPaused = false;
    document.getElementById("toggleAnimation").innerHTML =
      '<span class="material-symbols-outlined align-middle">pause_circle</span> Pausar';
  } else {
    isPaused = !isPaused;
    document.getElementById("toggleAnimation").innerHTML =
      isPaused
        ? '<span class="material-symbols-outlined align-middle">play_circle</span> Continuar'
        : '<span class="material-symbols-outlined align-middle">pause_circle</span> Pausar';
  }
}

window.onload = startAnimation;
document.getElementById("toggleAnimation").addEventListener("click", toggleAnimation);
