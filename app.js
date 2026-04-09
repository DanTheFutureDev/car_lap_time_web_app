const STORAGE_KEY = "nurburgring-lap-quest-v1";

const carDatabase = [
  {
    id: "911_gt3",
    name: "Porsche 911 GT3 (992)",
    horsepower: 502,
    curbWeightKg: 1435,
    drivetrain: "RWD",
    aeroScore: 86,
    brakeScore: 90,
    lapHistorySec: [441.2, 442.8, 444.1, 443.6, 445.4]
  },
  {
    id: "m3_comp",
    name: "BMW M3 Competition xDrive",
    horsepower: 503,
    curbWeightKg: 1730,
    drivetrain: "AWD",
    aeroScore: 72,
    brakeScore: 78,
    lapHistorySec: [463.8, 465.1, 467.4, 466.2, 468.9]
  },
  {
    id: "civic_type_r",
    name: "Honda Civic Type R FL5",
    horsepower: 315,
    curbWeightKg: 1429,
    drivetrain: "FWD",
    aeroScore: 67,
    brakeScore: 80,
    lapHistorySec: [469.5, 471.2, 470.1, 472.7, 473.4]
  },
  {
    id: "amg_gt_r",
    name: "Mercedes-AMG GT R",
    horsepower: 577,
    curbWeightKg: 1630,
    drivetrain: "RWD",
    aeroScore: 83,
    brakeScore: 84,
    lapHistorySec: [442.9, 444.7, 445.5, 446.8, 448.2]
  },
  {
    id: "supra_mk5",
    name: "Toyota GR Supra 3.0",
    horsepower: 382,
    curbWeightKg: 1540,
    drivetrain: "RWD",
    aeroScore: 63,
    brakeScore: 70,
    lapHistorySec: [479.1, 480.6, 482.5, 481.4, 483.0]
  },
  {
    id: "nismo_gt_r",
    name: "Nissan GT-R NISMO",
    horsepower: 600,
    curbWeightKg: 1720,
    drivetrain: "AWD",
    aeroScore: 88,
    brakeScore: 89,
    lapHistorySec: [438.4, 439.6, 440.8, 441.9, 442.5]
  },
  {
    id: "mustang_gtd",
    name: "Ford Mustang GTD",
    horsepower: 800,
    curbWeightKg: 1780,
    drivetrain: "RWD",
    aeroScore: 92,
    brakeScore: 91,
    lapHistorySec: [412.0, 413.8, 414.6, 415.1, 416.3]
  }
];

const defaultState = {
  selectedCarId: carDatabase[0].id,
  selectedTrackModeId: "sport-auto",
  player: {
    level: 1,
    xp: 0,
    xpToNext: 120,
    className: "Novice Scout",
    skillPoints: 0,
    skills: {
      telemetry: 0,
      tuning: 0,
      racecraft: 0
    }
  },
  modifiers: {
    driverConfidence: 78,
    weatherGrip: 88,
    tireLife: 84,
    fuelLoad: 38
  },
  assumptions: {
    tractionUtilization: 90,
    aeroEfficiency: 100,
    resistanceLoad: 100,
    calibrationBias: 0
  },
  lapHistoryOverrides: {},
  prediction: null
};

const state = structuredClone(defaultState);

const trackModes = [
  {
    id: "tourist",
    label: "Touristenfahrten",
    description: "Open-session traffic assumptions with moderate caution factors.",
    modeDeltaSec: 7.2,
    effectiveLengthKm: 20.6,
    trafficFactor: 1.03
  },
  {
    id: "sport-auto",
    label: "Sport Auto Timing",
    description: "Magazine-style benchmark timing reference mode.",
    modeDeltaSec: 0,
    effectiveLengthKm: 20.6,
    trafficFactor: 1.0
  },
  {
    id: "industry-pool",
    label: "Industry Pool",
    description: "Professional manufacturer sessions with cleaner windows.",
    modeDeltaSec: -3.8,
    effectiveLengthKm: 20.6,
    trafficFactor: 0.99
  },
  {
    id: "endurance-stint",
    label: "Endurance Stint",
    description: "Conservative pace across sustained runs and thermal limits.",
    modeDeltaSec: 10.5,
    effectiveLengthKm: 24.4,
    trafficFactor: 1.02
  }
];

const drivetrainTraction = {
  RWD: 0.95,
  AWD: 1.0,
  FWD: 0.91
};

const dom = {
  carSelect: document.getElementById("carSelect"),
  trackModeSelect: document.getElementById("trackModeSelect"),
  trackModeDescription: document.getElementById("trackModeDescription"),
  specGrid: document.getElementById("specGrid"),
  driverConfidence: document.getElementById("driverConfidence"),
  weatherGrip: document.getElementById("weatherGrip"),
  tireLife: document.getElementById("tireLife"),
  fuelLoad: document.getElementById("fuelLoad"),
  tractionUtilization: document.getElementById("tractionUtilization"),
  aeroEfficiency: document.getElementById("aeroEfficiency"),
  resistanceLoad: document.getElementById("resistanceLoad"),
  calibrationBias: document.getElementById("calibrationBias"),
  driverConfidenceValue: document.getElementById("driverConfidenceValue"),
  weatherGripValue: document.getElementById("weatherGripValue"),
  tireLifeValue: document.getElementById("tireLifeValue"),
  fuelLoadValue: document.getElementById("fuelLoadValue"),
  tractionUtilizationValue: document.getElementById("tractionUtilizationValue"),
  aeroEfficiencyValue: document.getElementById("aeroEfficiencyValue"),
  resistanceLoadValue: document.getElementById("resistanceLoadValue"),
  calibrationBiasValue: document.getElementById("calibrationBiasValue"),
  predictBtn: document.getElementById("predictBtn"),
  practiceBtn: document.getElementById("practiceBtn"),
  resetSaveBtn: document.getElementById("resetSaveBtn"),
  saveStatus: document.getElementById("saveStatus"),
  playerLevel: document.getElementById("playerLevel"),
  playerXp: document.getElementById("playerXp"),
  playerClass: document.getElementById("playerClass"),
  xpFill: document.getElementById("xpFill"),
  skillPoints: document.getElementById("skillPoints"),
  skillTelemetryValue: document.getElementById("skillTelemetryValue"),
  skillTuningValue: document.getElementById("skillTuningValue"),
  skillRacecraftValue: document.getElementById("skillRacecraftValue"),
  predictedLap: document.getElementById("predictedLap"),
  predictionBreakdown: document.getElementById("predictionBreakdown"),
  predictionMeta: document.getElementById("predictionMeta"),
  historyList: document.getElementById("historyList"),
  leaderboard: document.getElementById("leaderboard"),
  manualLapForm: document.getElementById("manualLapForm"),
  manualLapInput: document.getElementById("manualLapInput"),
  predictionCard: document.getElementById("predictionCard")
};

let saveStatusTimer = null;

function mergeState(target, source) {
  Object.keys(source).forEach((key) => {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === "object"
    ) {
      mergeState(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  });
}

function sanitizeState(candidate) {
  const sanitized = structuredClone(defaultState);
  if (!candidate || typeof candidate !== "object") {
    return sanitized;
  }

  mergeState(sanitized, candidate);
  if (!carDatabase.some((car) => car.id === sanitized.selectedCarId)) {
    sanitized.selectedCarId = defaultState.selectedCarId;
  }
  if (!trackModes.some((mode) => mode.id === sanitized.selectedTrackModeId)) {
    sanitized.selectedTrackModeId = defaultState.selectedTrackModeId;
  }
  return sanitized;
}

function updateSaveStatus(message, transient = true) {
  dom.saveStatus.textContent = message;
  if (saveStatusTimer) {
    clearTimeout(saveStatusTimer);
    saveStatusTimer = null;
  }
  if (transient) {
    saveStatusTimer = setTimeout(() => {
      dom.saveStatus.textContent = "Idle";
    }, 1700);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateSaveStatus("Saved");
  } catch {
    updateSaveStatus("Save failed", false);
  }
}

function applyHistoryOverrides() {
  carDatabase.forEach((car) => {
    const override = state.lapHistoryOverrides[car.id];
    if (Array.isArray(override) && override.length > 0) {
      car.lapHistorySec = override.map((v) => Number(v));
    }
  });
}

function syncHistoryOverrides() {
  carDatabase.forEach((car) => {
    state.lapHistoryOverrides[car.id] = [...car.lapHistorySec];
  });
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      updateSaveStatus("No save", true);
      return;
    }
    const parsed = JSON.parse(raw);
    const restored = sanitizeState(parsed);
    Object.keys(state).forEach((key) => {
      delete state[key];
    });
    mergeState(state, restored);
    applyHistoryOverrides();
    updateSaveStatus("Loaded", true);
  } catch {
    updateSaveStatus("Load failed", false);
  }
}

function resetSave() {
  localStorage.removeItem(STORAGE_KEY);
  Object.keys(state).forEach((key) => {
    delete state[key];
  });
  mergeState(state, structuredClone(defaultState));
  carDatabase.forEach((car) => {
    const original = carDatabaseSeed.find((seed) => seed.id === car.id);
    car.lapHistorySec = [...original.lapHistorySec];
  });
  updateSaveStatus("Reset complete", false);
  refreshAll();
}

function getSelectedCar() {
  return carDatabase.find((car) => car.id === state.selectedCarId);
}

function getSelectedTrackMode() {
  return trackModes.find((mode) => mode.id === state.selectedTrackModeId);
}

function formatLap(seconds) {
  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${sec.toFixed(3).padStart(6, "0")}`;
}

function parseLapTime(input) {
  const normalized = input.trim();
  const match = normalized.match(/^(\d{1,2}):([0-5]\d(?:\.\d{1,3})?)$/);
  if (!match) {
    return null;
  }
  const minutes = Number(match[1]);
  const seconds = Number(match[2]);
  return minutes * 60 + seconds;
}

function weightedRecentAverage(historySec) {
  const weights = [1.0, 0.9, 0.8, 0.7, 0.6];
  let weightedSum = 0;
  let totalWeight = 0;
  for (let i = 0; i < historySec.length; i += 1) {
    const w = weights[i] ?? 0.5;
    weightedSum += historySec[i] * w;
    totalWeight += w;
  }
  return weightedSum / totalWeight;
}

function computePhysicsBaseline(car, mode) {
  const assumptions = state.assumptions;
  const weightRatio = car.curbWeightKg / 1500;
  const powerToWeight = car.horsepower / car.curbWeightKg;
  const tractionFactor =
    drivetrainTraction[car.drivetrain] * (assumptions.tractionUtilization / 100);
  const aeroFactor = (car.aeroScore / 100) * (assumptions.aeroEfficiency / 100);
  const brakeFactor = car.brakeScore / 100;
  const resistanceFactor = assumptions.resistanceLoad / 100;

  // Segment-inspired model: acceleration, cornering, braking, and drag/load penalties.
  const accelComponent = 352 * (weightRatio / Math.max(powerToWeight * tractionFactor, 0.12));
  const cornerComponent = 128 * (1 / Math.max(aeroFactor * 0.68 + brakeFactor * 0.32, 0.5));
  const loadAndDragPenalty = 52 * resistanceFactor;
  const modeLengthPenalty = (mode.effectiveLengthKm - 20.6) * 8.4;

  return accelComponent + cornerComponent + loadAndDragPenalty + modeLengthPenalty;
}

function computeConditionDelta(mode) {
  const m = state.modifiers;
  const confidenceDelta = (83 - m.driverConfidence) * 0.28;
  const weatherDelta = (92 - m.weatherGrip) * 0.33;
  const tireDelta = (90 - m.tireLife) * 0.2;
  const fuelDelta = (m.fuelLoad - 28) * 0.085;
  const trafficDelta = (mode.trafficFactor - 1) * 95;
  return confidenceDelta + weatherDelta + tireDelta + fuelDelta + trafficDelta;
}

function computeSkillDelta() {
  const { telemetry, tuning, racecraft } = state.player.skills;
  return telemetry * -0.55 + tuning * -0.6 + racecraft * -0.45;
}

function computePotentialLap(car) {
  const mode = getSelectedTrackMode();
  const historyBase = weightedRecentAverage(car.lapHistorySec);
  const physicsBase = computePhysicsBaseline(car, mode);
  const conditionDelta = computeConditionDelta(mode);
  const skillDelta = computeSkillDelta();
  const assumptionDelta = state.assumptions.calibrationBias;
  const blendedBase = historyBase * 0.58 + physicsBase * 0.42;
  const estimate =
    blendedBase + conditionDelta + skillDelta + mode.modeDeltaSec + assumptionDelta;
  return {
    totalSec: Math.max(390, estimate),
    historyBase,
    physicsBase,
    blendedBase,
    conditionDelta,
    skillDelta,
    modeDelta: mode.modeDeltaSec,
    assumptionDelta
  };
}

function rankClass(level) {
  if (level >= 14) return "Nordschleife Archmage";
  if (level >= 10) return "Apex Knight";
  if (level >= 6) return "Track Ranger";
  if (level >= 3) return "Pit Adept";
  return "Novice Scout";
}

function gainXp(amount) {
  state.player.xp += amount;
  while (state.player.xp >= state.player.xpToNext) {
    state.player.xp -= state.player.xpToNext;
    state.player.level += 1;
    state.player.skillPoints += 1;
    state.player.xpToNext = Math.round(state.player.xpToNext * 1.24);
    state.player.className = rankClass(state.player.level);
  }
}

function updateSlidersReadout() {
  dom.driverConfidenceValue.textContent = `${state.modifiers.driverConfidence}%`;
  dom.weatherGripValue.textContent = `${state.modifiers.weatherGrip}%`;
  dom.tireLifeValue.textContent = `${state.modifiers.tireLife}%`;
  dom.fuelLoadValue.textContent = `${state.modifiers.fuelLoad}L`;
  dom.tractionUtilizationValue.textContent = `${state.assumptions.tractionUtilization}%`;
  dom.aeroEfficiencyValue.textContent = `${state.assumptions.aeroEfficiency}%`;
  dom.resistanceLoadValue.textContent = `${state.assumptions.resistanceLoad}%`;
  dom.calibrationBiasValue.textContent = `${state.assumptions.calibrationBias > 0 ? "+" : ""}${state.assumptions.calibrationBias}s`;
}

function renderCarSelect() {
  dom.carSelect.innerHTML = carDatabase
    .map((car) => `<option value="${car.id}">${car.name}</option>`)
    .join("");
  dom.carSelect.value = state.selectedCarId;
}

function renderTrackModes() {
  dom.trackModeSelect.innerHTML = trackModes
    .map((mode) => `<option value="${mode.id}">${mode.label}</option>`)
    .join("");
  dom.trackModeSelect.value = state.selectedTrackModeId;
  const selected = getSelectedTrackMode();
  dom.trackModeDescription.textContent = selected.description;
}

function renderSpecs() {
  const car = getSelectedCar();
  const powerToWeight = ((car.horsepower / car.curbWeightKg) * 1000).toFixed(1);
  dom.specGrid.innerHTML = `
    <div class="spec-item"><span>Horsepower</span><strong>${car.horsepower} hp</strong></div>
    <div class="spec-item"><span>Curb Weight</span><strong>${car.curbWeightKg} kg</strong></div>
    <div class="spec-item"><span>Drivetrain</span><strong>${car.drivetrain}</strong></div>
    <div class="spec-item"><span>Aero</span><strong>${car.aeroScore}/100</strong></div>
    <div class="spec-item"><span>Brakes</span><strong>${car.brakeScore}/100</strong></div>
    <div class="spec-item"><span>Power-to-Weight</span><strong>${powerToWeight} hp/ton</strong></div>
  `;
}

function renderPlayer() {
  const p = state.player;
  dom.playerLevel.textContent = `Lv. ${p.level}`;
  dom.playerXp.textContent = `${p.xp} / ${p.xpToNext}`;
  dom.playerClass.textContent = p.className;
  dom.skillPoints.textContent = p.skillPoints;
  dom.skillTelemetryValue.textContent = `+${p.skills.telemetry}`;
  dom.skillTuningValue.textContent = `+${p.skills.tuning}`;
  dom.skillRacecraftValue.textContent = `+${p.skills.racecraft}`;
  const fillPercent = Math.min(100, (p.xp / p.xpToNext) * 100);
  dom.xpFill.style.width = `${fillPercent}%`;
}

function renderHistory() {
  const car = getSelectedCar();
  dom.historyList.innerHTML = car.lapHistorySec
    .map((seconds) => `<li><span>${formatLap(seconds)}</span><small>${seconds.toFixed(3)} s</small></li>`)
    .join("");
}

function renderPrediction() {
  if (!state.prediction) {
    dom.predictedLap.textContent = "--:--.---";
    dom.predictionBreakdown.textContent =
      "Select a car and run a prediction to view breakdown.";
    dom.predictionMeta.textContent = "";
    dom.predictionCard.classList.remove("active");
    return;
  }

  const {
    totalSec,
    historyBase,
    physicsBase,
    blendedBase,
    conditionDelta,
    skillDelta,
    modeDelta,
    assumptionDelta
  } = state.prediction;
  const mode = getSelectedTrackMode();
  dom.predictedLap.textContent = formatLap(totalSec);
  dom.predictionBreakdown.innerHTML = `
    Baseline from lap history: <strong>${formatLap(historyBase)}</strong><br />
    Physics baseline: <strong>${formatLap(physicsBase)}</strong> |
    Blended baseline: <strong>${formatLap(blendedBase)}</strong><br />
    Conditions impact: <strong>${conditionDelta.toFixed(2)}s</strong> |
    RPG skills impact: <strong>${skillDelta.toFixed(2)}s</strong> |
    Mode delta: <strong>${modeDelta.toFixed(2)}s</strong> |
    Calibration bias: <strong>${assumptionDelta.toFixed(2)}s</strong>
  `;
  dom.predictionMeta.textContent = `Track mode: ${mode.label}`;
  dom.predictionCard.classList.add("active");
}

function buildLeaderboard() {
  const projected = carDatabase
    .map((car) => ({
      name: car.name,
      sec: computePotentialLap(car).totalSec
    }))
    .sort((a, b) => a.sec - b.sec);

  dom.leaderboard.innerHTML = projected
    .map((entry) => `<li><span>${entry.name}</span><strong>${formatLap(entry.sec)}</strong></li>`)
    .join("");
}

function predict() {
  const car = getSelectedCar();
  state.prediction = computePotentialLap(car);
  renderPrediction();

  // Rewards better projected laps and makes progression feel tied to performance.
  const performanceBonus = Math.max(8, Math.round((500 - state.prediction.totalSec) * 0.16));
  gainXp(14 + performanceBonus);
  renderPlayer();
  buildLeaderboard();
  saveState();
}

function practiceLap() {
  const car = getSelectedCar();
  const randomVariance = (Math.random() - 0.48) * 3.4;
  const sim = computePotentialLap(car);
  const practiceResultSec = Math.max(395, sim.totalSec + randomVariance + 1.2);
  car.lapHistorySec.unshift(Number(practiceResultSec.toFixed(3)));
  car.lapHistorySec = car.lapHistorySec.slice(0, 8);
  gainXp(22);
  renderHistory();
  renderPlayer();
  state.prediction = null;
  renderPrediction();
  syncHistoryOverrides();
  saveState();
}

function handleSkillUpgrade(skillKey) {
  if (state.player.skillPoints <= 0) {
    return;
  }
  if (state.player.skills[skillKey] >= 6) {
    return;
  }
  state.player.skillPoints -= 1;
  state.player.skills[skillKey] += 1;
  renderPlayer();
  buildLeaderboard();
  saveState();
}

function wireEvents() {
  dom.carSelect.addEventListener("change", (event) => {
    state.selectedCarId = event.target.value;
    state.prediction = null;
    renderSpecs();
    renderHistory();
    renderPrediction();
    saveState();
  });

  dom.trackModeSelect.addEventListener("change", (event) => {
    state.selectedTrackModeId = event.target.value;
    state.prediction = null;
    renderTrackModes();
    renderPrediction();
    buildLeaderboard();
    saveState();
  });

  [
    ["driverConfidence", dom.driverConfidence],
    ["weatherGrip", dom.weatherGrip],
    ["tireLife", dom.tireLife],
    ["fuelLoad", dom.fuelLoad]
  ].forEach(([key, element]) => {
    element.addEventListener("input", () => {
      state.modifiers[key] = Number(element.value);
      updateSlidersReadout();
      buildLeaderboard();
      saveState();
    });
  });

  [
    ["tractionUtilization", dom.tractionUtilization],
    ["aeroEfficiency", dom.aeroEfficiency],
    ["resistanceLoad", dom.resistanceLoad],
    ["calibrationBias", dom.calibrationBias]
  ].forEach(([key, element]) => {
    element.addEventListener("input", () => {
      state.assumptions[key] = Number(element.value);
      updateSlidersReadout();
      buildLeaderboard();
      saveState();
    });
  });

  dom.predictBtn.addEventListener("click", predict);
  dom.practiceBtn.addEventListener("click", practiceLap);
  dom.resetSaveBtn.addEventListener("click", resetSave);

  document.querySelectorAll(".skill-btn").forEach((button) => {
    button.addEventListener("click", () => {
      handleSkillUpgrade(button.dataset.skill);
    });
  });

  dom.manualLapForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const lapSec = parseLapTime(dom.manualLapInput.value);
    if (!lapSec) {
      dom.manualLapInput.setCustomValidity("Use format mm:ss.mmm, e.g. 07:34.125");
      dom.manualLapInput.reportValidity();
      return;
    }
    dom.manualLapInput.setCustomValidity("");
    const car = getSelectedCar();
    car.lapHistorySec.unshift(Number(lapSec.toFixed(3)));
    car.lapHistorySec = car.lapHistorySec.slice(0, 10);
    dom.manualLapInput.value = "";
    state.prediction = null;
    renderHistory();
    renderPrediction();
    buildLeaderboard();
    syncHistoryOverrides();
    saveState();
  });
}

function setControlValuesFromState() {
  dom.driverConfidence.value = String(state.modifiers.driverConfidence);
  dom.weatherGrip.value = String(state.modifiers.weatherGrip);
  dom.tireLife.value = String(state.modifiers.tireLife);
  dom.fuelLoad.value = String(state.modifiers.fuelLoad);
  dom.tractionUtilization.value = String(state.assumptions.tractionUtilization);
  dom.aeroEfficiency.value = String(state.assumptions.aeroEfficiency);
  dom.resistanceLoad.value = String(state.assumptions.resistanceLoad);
  dom.calibrationBias.value = String(state.assumptions.calibrationBias);
}

function refreshAll() {
  setControlValuesFromState();
  renderCarSelect();
  renderTrackModes();
  renderSpecs();
  renderHistory();
  updateSlidersReadout();
  renderPlayer();
  renderPrediction();
  buildLeaderboard();
}

const carDatabaseSeed = structuredClone(carDatabase);

function init() {
  loadState();
  setControlValuesFromState();
  syncHistoryOverrides();
  renderCarSelect();
  renderTrackModes();
  renderSpecs();
  renderHistory();
  updateSlidersReadout();
  renderPlayer();
  renderPrediction();
  buildLeaderboard();
  wireEvents();
}

init();
