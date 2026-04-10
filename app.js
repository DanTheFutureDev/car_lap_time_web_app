const STORAGE_KEY = "nurburgring-lap-quest-v2";

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

const carDatabaseSeed = structuredClone(carDatabase);

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

const tireCompounds = [
  {
    id: "street",
    label: "Street",
    gripMultiplier: 0.94,
    warmupLaps: 3,
    thermalWindowLow: 40,
    thermalWindowHigh: 70
  },
  {
    id: "sport",
    label: "Sport",
    gripMultiplier: 1.0,
    warmupLaps: 2,
    thermalWindowLow: 55,
    thermalWindowHigh: 85
  },
  {
    id: "semi-slick",
    label: "Semi-slick",
    gripMultiplier: 1.045,
    warmupLaps: 2,
    thermalWindowLow: 65,
    thermalWindowHigh: 95
  },
  {
    id: "slick",
    label: "Slick",
    gripMultiplier: 1.08,
    warmupLaps: 1,
    thermalWindowLow: 75,
    thermalWindowHigh: 110
  },
  {
    id: "wet",
    label: "Wet",
    gripMultiplier: 0.985,
    warmupLaps: 1,
    thermalWindowLow: 20,
    thermalWindowHigh: 60
  },
  {
    id: "all-weather",
    label: "All-Weather",
    gripMultiplier: 0.97,
    warmupLaps: 2,
    thermalWindowLow: 30,
    thermalWindowHigh: 75
  },
  {
    id: "track-day-200tw",
    label: "Track-Day 200TW",
    gripMultiplier: 1.025,
    warmupLaps: 2,
    thermalWindowLow: 58,
    thermalWindowHigh: 88
  }
];

const buildArchetypes = [
  {
    id: "balanced",
    label: "Balanced",
    description: "All-round progression with mixed pace + consistency bonuses.",
    skillWeights: { telemetry: 1, tuning: 1, racecraft: 1 },
    physicsBias: 0
  },
  {
    id: "time-attack",
    label: "Time Attack",
    description: "Prioritizes one-lap pace and aggressive setup tuning.",
    skillWeights: { telemetry: 1.2, tuning: 1.3, racecraft: 0.9 },
    physicsBias: -1.8
  },
  {
    id: "endurance",
    label: "Endurance",
    description: "Stable lap consistency with stronger tire/fuel management.",
    skillWeights: { telemetry: 1.1, tuning: 0.9, racecraft: 1.35 },
    physicsBias: 0.8
  },
  {
    id: "rain-master",
    label: "Rain Master",
    description: "Excels when grip and weather conditions are suboptimal.",
    skillWeights: { telemetry: 1.2, tuning: 0.95, racecraft: 1.15 },
    physicsBias: -0.5
  }
];

const perkCatalog = [
  {
    id: "telemetry-suite",
    name: "Telemetry Suite",
    description: "Higher data quality improves consistency corrections.",
    cost: 140,
    unlockLevel: 2,
    effectSec: -1.4
  },
  {
    id: "trail-brake-mastery",
    name: "Trail Brake Mastery",
    description: "Sharper corner entry in technical sections.",
    cost: 180,
    unlockLevel: 4,
    effectSec: -1.7
  },
  {
    id: "adaptive-dampers",
    name: "Adaptive Dampers",
    description: "Reduces bumps/curb penalties through rough sectors.",
    cost: 210,
    unlockLevel: 5,
    effectSec: -1.6
  },
  {
    id: "aero-map-pack",
    name: "Aero Map Pack",
    description: "Improves high-speed balance confidence.",
    cost: 250,
    unlockLevel: 6,
    effectSec: -1.9
  }
];

const partCatalog = [
  {
    id: "pads-fluid-kit",
    name: "Pads + Fluid Kit",
    category: "Brakes",
    cost: 120,
    effect: { brake: 3, weight: 0, aero: 0 }
  },
  {
    id: "coilover-kit",
    name: "Coilover Kit",
    category: "Chassis",
    cost: 220,
    effect: { brake: 1, weight: -18, aero: 0 }
  },
  {
    id: "front-aero-pack",
    name: "Front Aero Pack",
    category: "Aero",
    cost: 240,
    effect: { brake: 0, weight: 4, aero: 5 }
  },
  {
    id: "ecu-stage-1",
    name: "ECU Stage 1",
    category: "Power",
    cost: 260,
    effect: { hp: 25, weight: 0, aero: 0 }
  },
  {
    id: "carbon-hood",
    name: "Carbon Hood",
    category: "Weight",
    cost: 190,
    effect: { hp: 0, weight: -10, aero: 0 }
  }
];

const crewCatalog = [
  {
    id: "lead-engineer",
    name: "Lead Engineer",
    description: "Improves setup confidence +2.",
    cost: 160,
    effectSec: -0.9
  },
  {
    id: "tire-specialist",
    name: "Tire Specialist",
    description: "Reduces warmup and tire-deg losses.",
    cost: 180,
    effectSec: -1.2
  },
  {
    id: "strategy-chief",
    name: "Strategy Chief",
    description: "Better fuel and traffic handling.",
    cost: 210,
    effectSec: -1.1
  }
];

const questCatalog = [
  {
    id: "q-break-730",
    label: "Break 07:30 in Sport Auto mode",
    check: (ctx) => ctx.modeId === "sport-auto" && ctx.predictedSec < 450,
    rewardXp: 95,
    rewardCredits: 140
  },
  {
    id: "q-industry-elite",
    label: "Break 07:20 in Industry Pool mode",
    check: (ctx) => ctx.modeId === "industry-pool" && ctx.predictedSec < 440,
    rewardXp: 120,
    rewardCredits: 180
  },
  {
    id: "q-endurance-finish",
    label: "Run 3 practice laps in Endurance Stint",
    check: (ctx) =>
      ctx.modeId === "endurance-stint" &&
      (ctx.practiceRunsByMode["endurance-stint"] ?? 0) >= 3,
    rewardXp: 90,
    rewardCredits: 160
  }
];

const sectorDefs = [
  { id: "hatzenbach", name: "Hatzenbach", weight: 0.13, type: "technical" },
  { id: "flugplatz", name: "Flugplatz", weight: 0.1, type: "highspeed" },
  { id: "adenauer", name: "Adenauer Forst", weight: 0.11, type: "technical" },
  { id: "bergwerk", name: "Bergwerk", weight: 0.12, type: "traction" },
  { id: "karussell", name: "Karussell", weight: 0.12, type: "mechanical" },
  { id: "hohe-acht", name: "Hohe Acht", weight: 0.1, type: "elevation" },
  { id: "brunnchen", name: "Brunnchen", weight: 0.12, type: "rhythm" },
  { id: "dottinger", name: "Dottinger Hohe", weight: 0.2, type: "power" }
];

const drivetrainTraction = { RWD: 0.95, AWD: 1.0, FWD: 0.91 };

const defaultState = {
  selectedCarId: carDatabase[0].id,
  selectedTrackModeId: "sport-auto",
  selectedTireCompoundId: "sport",
  selectedBuildArchetypeId: "balanced",
  selectedCompareCarId: carDatabase[1].id,
  compareOptions: {
    mode: "full-lap",
    baseline: "selected-session"
  },
  player: {
    level: 1,
    xp: 0,
    xpToNext: 120,
    className: "Novice Scout",
    skillPoints: 0,
    credits: 300,
    skills: { telemetry: 0, tuning: 0, racecraft: 0 }
  },
  modifiers: {
    driverConfidence: 78,
    weatherGrip: 88,
    tireLife: 84,
    fuelLoad: 38
  },
  ambient: {
    airTemp: 18,
    trackTemp: 28,
    humidity: 45,
    windSpeed: 12
  },
  assumptions: {
    tractionUtilization: 90,
    aeroEfficiency: 100,
    resistanceLoad: 100,
    calibrationBias: 0
  },
  progression: {
    purchasedPerks: [],
    installedParts: [],
    hiredCrew: [],
    completedQuests: [],
    practiceRunsByMode: {}
  },
  profiles: {},
  eventLog: [],
  lapHistoryOverrides: {},
  prediction: null
};

const state = structuredClone(defaultState);

const dom = {
  carSelect: document.getElementById("carSelect"),
  trackModeSelect: document.getElementById("trackModeSelect"),
  tireCompoundSelect: document.getElementById("tireCompoundSelect"),
  buildArchetypeSelect: document.getElementById("buildArchetypeSelect"),
  compareCarSelect: document.getElementById("compareCarSelect"),
  compareModeSelect: document.getElementById("compareModeSelect"),
  compareBaselineSelect: document.getElementById("compareBaselineSelect"),
  trackModeDescription: document.getElementById("trackModeDescription"),
  warmupInfo: document.getElementById("warmupInfo"),
  buildArchetypeDescription: document.getElementById("buildArchetypeDescription"),
  specGrid: document.getElementById("specGrid"),
  driverConfidence: document.getElementById("driverConfidence"),
  weatherGrip: document.getElementById("weatherGrip"),
  tireLife: document.getElementById("tireLife"),
  fuelLoad: document.getElementById("fuelLoad"),
  airTemp: document.getElementById("airTemp"),
  trackTemp: document.getElementById("trackTemp"),
  humidity: document.getElementById("humidity"),
  windSpeed: document.getElementById("windSpeed"),
  tractionUtilization: document.getElementById("tractionUtilization"),
  aeroEfficiency: document.getElementById("aeroEfficiency"),
  resistanceLoad: document.getElementById("resistanceLoad"),
  calibrationBias: document.getElementById("calibrationBias"),
  driverConfidenceValue: document.getElementById("driverConfidenceValue"),
  weatherGripValue: document.getElementById("weatherGripValue"),
  tireLifeValue: document.getElementById("tireLifeValue"),
  fuelLoadValue: document.getElementById("fuelLoadValue"),
  airTempValue: document.getElementById("airTempValue"),
  trackTempValue: document.getElementById("trackTempValue"),
  humidityValue: document.getElementById("humidityValue"),
  windSpeedValue: document.getElementById("windSpeedValue"),
  tractionUtilizationValue: document.getElementById("tractionUtilizationValue"),
  aeroEfficiencyValue: document.getElementById("aeroEfficiencyValue"),
  resistanceLoadValue: document.getElementById("resistanceLoadValue"),
  calibrationBiasValue: document.getElementById("calibrationBiasValue"),
  predictBtn: document.getElementById("predictBtn"),
  practiceBtn: document.getElementById("practiceBtn"),
  runCompareBtn: document.getElementById("runCompareBtn"),
  swapCompareBtn: document.getElementById("swapCompareBtn"),
  resetSaveBtn: document.getElementById("resetSaveBtn"),
  saveProfileBtn: document.getElementById("saveProfileBtn"),
  loadProfileBtn: document.getElementById("loadProfileBtn"),
  deleteProfileBtn: document.getElementById("deleteProfileBtn"),
  exportSaveBtn: document.getElementById("exportSaveBtn"),
  importSaveBtn: document.getElementById("importSaveBtn"),
  saveStatus: document.getElementById("saveStatus"),
  playerLevel: document.getElementById("playerLevel"),
  playerXp: document.getElementById("playerXp"),
  playerClass: document.getElementById("playerClass"),
  playerCredits: document.getElementById("playerCredits"),
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
  questList: document.getElementById("questList"),
  perkTree: document.getElementById("perkTree"),
  partsTree: document.getElementById("partsTree"),
  crewTree: document.getElementById("crewTree"),
  sectorTableBody: document.getElementById("sectorTableBody"),
  eventLogList: document.getElementById("eventLogList"),
  profileNameInput: document.getElementById("profileNameInput"),
  profileSelect: document.getElementById("profileSelect"),
  savePayloadArea: document.getElementById("savePayloadArea"),
  comparisonResult: document.getElementById("comparisonResult"),
  lapTrendChart: document.getElementById("lapTrendChart"),
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
  if (!candidate || typeof candidate !== "object") return sanitized;
  mergeState(sanitized, candidate);
  if (!carDatabase.some((car) => car.id === sanitized.selectedCarId)) {
    sanitized.selectedCarId = defaultState.selectedCarId;
  }
  if (!carDatabase.some((car) => car.id === sanitized.selectedCompareCarId)) {
    sanitized.selectedCompareCarId = defaultState.selectedCompareCarId;
  }
  if (!trackModes.some((mode) => mode.id === sanitized.selectedTrackModeId)) {
    sanitized.selectedTrackModeId = defaultState.selectedTrackModeId;
  }
  if (!tireCompounds.some((t) => t.id === sanitized.selectedTireCompoundId)) {
    sanitized.selectedTireCompoundId = defaultState.selectedTireCompoundId;
  }
  if (!buildArchetypes.some((b) => b.id === sanitized.selectedBuildArchetypeId)) {
    sanitized.selectedBuildArchetypeId = defaultState.selectedBuildArchetypeId;
  }
  const validCompareModes = ["full-lap", "sectors", "power-weight", "consistency"];
  if (!validCompareModes.includes(sanitized.compareOptions.mode)) {
    sanitized.compareOptions.mode = defaultState.compareOptions.mode;
  }
  const validBaselines = ["selected-session", "ideal-ambient", "rain-session"];
  if (!validBaselines.includes(sanitized.compareOptions.baseline)) {
    sanitized.compareOptions.baseline = defaultState.compareOptions.baseline;
  }
  if (sanitized.selectedCompareCarId === sanitized.selectedCarId) {
    const alternative = carDatabase.find((car) => car.id !== sanitized.selectedCarId);
    if (alternative) sanitized.selectedCompareCarId = alternative.id;
  }
  return sanitized;
}

function getSelectedCar() {
  return carDatabase.find((car) => car.id === state.selectedCarId);
}

function getCarById(id) {
  return carDatabase.find((car) => car.id === id);
}

function ensureValidCompareCar() {
  const compareExists = carDatabase.some((car) => car.id === state.selectedCompareCarId);
  if (compareExists && state.selectedCompareCarId !== state.selectedCarId) {
    return;
  }
  const alternative = carDatabase.find((car) => car.id !== state.selectedCarId);
  state.selectedCompareCarId = alternative ? alternative.id : state.selectedCarId;
}

function getSelectedTrackMode() {
  return trackModes.find((mode) => mode.id === state.selectedTrackModeId);
}

function getSelectedTire() {
  return tireCompounds.find((tire) => tire.id === state.selectedTireCompoundId);
}

function getSelectedBuild() {
  return buildArchetypes.find((build) => build.id === state.selectedBuildArchetypeId);
}

function formatLap(seconds) {
  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${sec.toFixed(3).padStart(6, "0")}`;
}

function parseLapTime(input) {
  const normalized = input.trim();
  const match = normalized.match(/^(\d{1,2}):([0-5]\d(?:\.\d{1,3})?)$/);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
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

function installedPartEffects() {
  const effects = { hp: 0, weight: 0, aero: 0, brake: 0 };
  partCatalog.forEach((part) => {
    if (!state.progression.installedParts.includes(part.id)) return;
    effects.hp += part.effect.hp ?? 0;
    effects.weight += part.effect.weight ?? 0;
    effects.aero += part.effect.aero ?? 0;
    effects.brake += part.effect.brake ?? 0;
  });
  return effects;
}

function perkEffectSec() {
  return perkCatalog
    .filter((perk) => state.progression.purchasedPerks.includes(perk.id))
    .reduce((sum, perk) => sum + perk.effectSec, 0);
}

function crewEffectSec() {
  return crewCatalog
    .filter((crew) => state.progression.hiredCrew.includes(crew.id))
    .reduce((sum, crew) => sum + crew.effectSec, 0);
}

function computePhysicsBaseline(car, mode) {
  const assumptions = state.assumptions;
  const partFx = installedPartEffects();
  const effectiveHp = car.horsepower + partFx.hp;
  const effectiveWeight = car.curbWeightKg + partFx.weight;
  const effectiveAero = car.aeroScore + partFx.aero;
  const effectiveBrake = car.brakeScore + partFx.brake;

  const weightRatio = effectiveWeight / 1500;
  const powerToWeight = effectiveHp / effectiveWeight;
  const tractionFactor =
    drivetrainTraction[car.drivetrain] * (assumptions.tractionUtilization / 100);
  const aeroFactor = (effectiveAero / 100) * (assumptions.aeroEfficiency / 100);
  const brakeFactor = effectiveBrake / 100;
  const resistanceFactor = assumptions.resistanceLoad / 100;

  const accelComponent = 352 * (weightRatio / Math.max(powerToWeight * tractionFactor, 0.12));
  const cornerComponent = 128 * (1 / Math.max(aeroFactor * 0.68 + brakeFactor * 0.32, 0.5));
  const loadAndDragPenalty = 52 * resistanceFactor;
  const modeLengthPenalty = (mode.effectiveLengthKm - 20.6) * 8.4;
  return accelComponent + cornerComponent + loadAndDragPenalty + modeLengthPenalty;
}

function computeAmbientDelta(tire) {
  const { airTemp, trackTemp, humidity, windSpeed } = state.ambient;
  const optimalAir = 16;
  const optimalTrack = (tire.thermalWindowLow + tire.thermalWindowHigh) / 2;
  const airPenalty = Math.abs(airTemp - optimalAir) * 0.06;
  const trackPenalty = Math.abs(trackTemp - optimalTrack) * 0.08;
  const humidityPenalty = Math.max(0, humidity - 65) * 0.03;
  const windPenalty = windSpeed * 0.04;
  return airPenalty + trackPenalty + humidityPenalty + windPenalty;
}

function withTemporaryOverrides(mode, fn) {
  const original = {
    ambient: { ...state.ambient },
    modifiers: { ...state.modifiers },
    tireLife: state.modifiers.tireLife
  };
  if (mode === "ideal-ambient") {
    state.ambient.airTemp = 16;
    state.ambient.trackTemp = 35;
    state.ambient.humidity = 32;
    state.ambient.windSpeed = 4;
    state.modifiers.weatherGrip = Math.max(state.modifiers.weatherGrip, 95);
    state.modifiers.tireLife = Math.max(state.modifiers.tireLife, 94);
  }
  if (mode === "rain-session") {
    state.ambient.airTemp = 12;
    state.ambient.trackTemp = 17;
    state.ambient.humidity = 88;
    state.ambient.windSpeed = 24;
    state.modifiers.weatherGrip = Math.min(state.modifiers.weatherGrip, 68);
    state.modifiers.tireLife = Math.min(state.modifiers.tireLife, 82);
  }
  try {
    return fn();
  } finally {
    state.ambient.airTemp = original.ambient.airTemp;
    state.ambient.trackTemp = original.ambient.trackTemp;
    state.ambient.humidity = original.ambient.humidity;
    state.ambient.windSpeed = original.ambient.windSpeed;
    state.modifiers.weatherGrip = original.modifiers.weatherGrip;
    state.modifiers.tireLife = original.tireLife;
  }
}

function computeTireDelta(tire) {
  const m = state.modifiers;
  const lifePenalty = (92 - m.tireLife) * 0.22;
  const warmupPenalty = Math.max(0, tire.warmupLaps - 1) * 0.9;
  const gripDelta = (1 - tire.gripMultiplier) * 22;
  return lifePenalty + warmupPenalty + gripDelta;
}

function computeConditionDelta(mode, tire) {
  const m = state.modifiers;
  const confidenceDelta = (83 - m.driverConfidence) * 0.28;
  const weatherDelta = (92 - m.weatherGrip) * 0.33;
  const fuelDelta = (m.fuelLoad - 28) * 0.085;
  const trafficDelta = (mode.trafficFactor - 1) * 95;
  return (
    confidenceDelta +
    weatherDelta +
    fuelDelta +
    trafficDelta +
    computeTireDelta(tire) +
    computeAmbientDelta(tire)
  );
}

function computeSkillDelta() {
  const archetype = getSelectedBuild();
  const { telemetry, tuning, racecraft } = state.player.skills;
  return (
    telemetry * -0.55 * archetype.skillWeights.telemetry +
    tuning * -0.6 * archetype.skillWeights.tuning +
    racecraft * -0.45 * archetype.skillWeights.racecraft
  );
}

function computeSectorBreakdown(totalSec, car) {
  const partFx = installedPartEffects();
  const tire = getSelectedTire();
  const skill = state.player.skills;
  return sectorDefs.map((sector, index) => {
    let gainLoss = 0;
    if (sector.type === "technical") gainLoss += -(skill.racecraft * 0.22 + partFx.brake * 0.06);
    if (sector.type === "power") gainLoss += -(partFx.hp * 0.015 + skill.tuning * 0.15);
    if (sector.type === "traction")
      gainLoss += -((tire.gripMultiplier - 1) * 9 + skill.racecraft * 0.11);
    if (sector.type === "highspeed") gainLoss += -(car.aeroScore / 100 - 0.7) * 1.5;
    if (sector.type === "mechanical") gainLoss += -(partFx.weight < 0 ? 0.6 : 0);
    if (sector.type === "elevation") gainLoss += car.curbWeightKg > 1650 ? 0.55 : -0.25;
    if (sector.type === "rhythm") gainLoss += -(skill.telemetry * 0.12);
    const base = totalSec * sector.weight;
    const jitter = ((index % 2 === 0 ? -1 : 1) * 0.08 * (state.modifiers.driverConfidence - 75)) / 10;
    const sec = base + gainLoss + jitter;
    return { name: sector.name, seconds: Math.max(22, sec), gainLoss };
  });
}

function computePotentialLap(car) {
  const mode = getSelectedTrackMode();
  const tire = getSelectedTire();
  const build = getSelectedBuild();
  const historyBase = weightedRecentAverage(car.lapHistorySec);
  const physicsBase = computePhysicsBaseline(car, mode);
  const conditionDelta = computeConditionDelta(mode, tire);
  const skillDelta = computeSkillDelta();
  const perkDelta = perkEffectSec();
  const crewDelta = crewEffectSec();
  const assumptionDelta = state.assumptions.calibrationBias;
  const blendedBase = historyBase * 0.56 + physicsBase * 0.44;
  const estimate =
    blendedBase +
    conditionDelta +
    skillDelta +
    mode.modeDeltaSec +
    assumptionDelta +
    build.physicsBias +
    perkDelta +
    crewDelta;
  const totalSec = Math.max(390, estimate);
  const sectors = computeSectorBreakdown(totalSec, car);
  return {
    totalSec,
    historyBase,
    physicsBase,
    blendedBase,
    conditionDelta,
    skillDelta,
    perkDelta,
    crewDelta,
    modeDelta: mode.modeDeltaSec,
    assumptionDelta,
    sectors
  };
}

function rankClass(level) {
  if (level >= 14) return "Nordschleife Archmage";
  if (level >= 10) return "Apex Knight";
  if (level >= 6) return "Track Ranger";
  if (level >= 3) return "Pit Adept";
  return "Novice Scout";
}

function addEvent(message) {
  state.eventLog.unshift(`[${new Date().toLocaleTimeString()}] ${message}`);
  state.eventLog = state.eventLog.slice(0, 35);
}

function gainXp(amount) {
  state.player.xp += amount;
  let levelUps = 0;
  while (state.player.xp >= state.player.xpToNext) {
    state.player.xp -= state.player.xpToNext;
    state.player.level += 1;
    state.player.skillPoints += 1;
    state.player.xpToNext = Math.round(state.player.xpToNext * 1.24);
    state.player.className = rankClass(state.player.level);
    levelUps += 1;
  }
  if (levelUps > 0) addEvent(`Level up x${levelUps}: now ${state.player.className}.`);
}

function spendCredits(amount) {
  if (state.player.credits < amount) return false;
  state.player.credits -= amount;
  return true;
}

function updateSaveStatus(message, transient = true) {
  dom.saveStatus.textContent = message;
  if (saveStatusTimer) clearTimeout(saveStatusTimer);
  if (transient) {
    saveStatusTimer = setTimeout(() => {
      dom.saveStatus.textContent = "Idle";
    }, 1700);
  }
}

function syncHistoryOverrides() {
  carDatabase.forEach((car) => {
    state.lapHistoryOverrides[car.id] = [...car.lapHistorySec];
  });
}

function applyHistoryOverrides() {
  carDatabase.forEach((car) => {
    const override = state.lapHistoryOverrides[car.id];
    if (Array.isArray(override) && override.length > 0) {
      car.lapHistorySec = override.map((v) => Number(v));
    }
  });
}

function saveState() {
  try {
    syncHistoryOverrides();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateSaveStatus("Saved");
  } catch {
    updateSaveStatus("Save failed", false);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      updateSaveStatus("No save");
      return;
    }
    const parsed = sanitizeState(JSON.parse(raw));
    Object.keys(state).forEach((key) => delete state[key]);
    mergeState(state, parsed);
    applyHistoryOverrides();
    updateSaveStatus("Loaded");
  } catch {
    updateSaveStatus("Load failed", false);
  }
}

function resetSave() {
  localStorage.removeItem(STORAGE_KEY);
  Object.keys(state).forEach((key) => delete state[key]);
  mergeState(state, structuredClone(defaultState));
  carDatabase.forEach((car) => {
    const base = carDatabaseSeed.find((seed) => seed.id === car.id);
    car.lapHistorySec = [...base.lapHistorySec];
  });
  addEvent("Reset save data.");
  refreshAll();
  saveState();
}

function updateSlidersReadout() {
  dom.driverConfidenceValue.textContent = `${state.modifiers.driverConfidence}%`;
  dom.weatherGripValue.textContent = `${state.modifiers.weatherGrip}%`;
  dom.tireLifeValue.textContent = `${state.modifiers.tireLife}%`;
  dom.fuelLoadValue.textContent = `${state.modifiers.fuelLoad}L`;
  dom.airTempValue.textContent = `${state.ambient.airTemp}C`;
  dom.trackTempValue.textContent = `${state.ambient.trackTemp}C`;
  dom.humidityValue.textContent = `${state.ambient.humidity}%`;
  dom.windSpeedValue.textContent = `${state.ambient.windSpeed} km/h`;
  dom.tractionUtilizationValue.textContent = `${state.assumptions.tractionUtilization}%`;
  dom.aeroEfficiencyValue.textContent = `${state.assumptions.aeroEfficiency}%`;
  dom.resistanceLoadValue.textContent = `${state.assumptions.resistanceLoad}%`;
  dom.calibrationBiasValue.textContent = `${state.assumptions.calibrationBias > 0 ? "+" : ""}${state.assumptions.calibrationBias}s`;
}

function renderSelectOptions() {
  ensureValidCompareCar();
  const compareModeOptions = [
    { id: "full-lap", label: "Mode: Full Lap Pace" },
    { id: "sectors", label: "Mode: Sector Delta Focus" },
    { id: "power-weight", label: "Mode: Power-to-Weight" },
    { id: "consistency", label: "Mode: Consistency Spread" }
  ];
  const compareBaselineOptions = [
    { id: "selected-session", label: "Baseline: Current Session" },
    { id: "ideal-ambient", label: "Baseline: Ideal Ambient" },
    { id: "rain-session", label: "Baseline: Rain Session" }
  ];
  dom.carSelect.innerHTML = carDatabase
    .map((car) => `<option value="${car.id}">${car.name}</option>`)
    .join("");
  dom.compareCarSelect.innerHTML = carDatabase
    .filter((car) => car.id !== state.selectedCarId)
    .map((car) => `<option value="${car.id}">${car.name}</option>`)
    .join("");
  dom.trackModeSelect.innerHTML = trackModes
    .map((mode) => `<option value="${mode.id}">${mode.label}</option>`)
    .join("");
  dom.tireCompoundSelect.innerHTML = tireCompounds
    .map((tire) => `<option value="${tire.id}">${tire.label}</option>`)
    .join("");
  dom.buildArchetypeSelect.innerHTML = buildArchetypes
    .map((build) => `<option value="${build.id}">${build.label}</option>`)
    .join("");
  dom.compareModeSelect.innerHTML = compareModeOptions
    .map((opt) => `<option value="${opt.id}">${opt.label}</option>`)
    .join("");
  dom.compareBaselineSelect.innerHTML = compareBaselineOptions
    .map((opt) => `<option value="${opt.id}">${opt.label}</option>`)
    .join("");
  dom.carSelect.value = state.selectedCarId;
  dom.compareCarSelect.value = state.selectedCompareCarId;
  dom.trackModeSelect.value = state.selectedTrackModeId;
  dom.tireCompoundSelect.value = state.selectedTireCompoundId;
  dom.buildArchetypeSelect.value = state.selectedBuildArchetypeId;
  dom.compareModeSelect.value = state.compareOptions.mode;
  dom.compareBaselineSelect.value = state.compareOptions.baseline;
  dom.trackModeDescription.textContent = getSelectedTrackMode().description;
  const tire = getSelectedTire();
  dom.warmupInfo.textContent = `${tire.label} warmup: ${tire.warmupLaps} lap(s), window ${tire.thermalWindowLow}-${tire.thermalWindowHigh}C`;
  dom.buildArchetypeDescription.textContent = getSelectedBuild().description;
}

function renderSpecs() {
  const car = getSelectedCar();
  const partFx = installedPartEffects();
  const hp = car.horsepower + partFx.hp;
  const weight = car.curbWeightKg + partFx.weight;
  const aero = car.aeroScore + partFx.aero;
  const brake = car.brakeScore + partFx.brake;
  const powerToWeight = ((hp / weight) * 1000).toFixed(1);
  dom.specGrid.innerHTML = `
    <div class="spec-item"><span>Horsepower</span><strong>${hp} hp</strong></div>
    <div class="spec-item"><span>Curb Weight</span><strong>${weight} kg</strong></div>
    <div class="spec-item"><span>Drivetrain</span><strong>${car.drivetrain}</strong></div>
    <div class="spec-item"><span>Aero</span><strong>${aero}/100</strong></div>
    <div class="spec-item"><span>Brakes</span><strong>${brake}/100</strong></div>
    <div class="spec-item"><span>Power-to-Weight</span><strong>${powerToWeight} hp/ton</strong></div>
  `;
}

function renderPlayer() {
  const p = state.player;
  dom.playerLevel.textContent = `Lv. ${p.level}`;
  dom.playerXp.textContent = `${p.xp} / ${p.xpToNext}`;
  dom.playerClass.textContent = p.className;
  dom.playerCredits.textContent = `${p.credits}`;
  dom.skillPoints.textContent = p.skillPoints;
  dom.skillTelemetryValue.textContent = `+${p.skills.telemetry}`;
  dom.skillTuningValue.textContent = `+${p.skills.tuning}`;
  dom.skillRacecraftValue.textContent = `+${p.skills.racecraft}`;
  dom.xpFill.style.width = `${Math.min(100, (p.xp / p.xpToNext) * 100)}%`;
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
    dom.sectorTableBody.innerHTML = "";
    return;
  }
  const p = state.prediction;
  dom.predictedLap.textContent = formatLap(p.totalSec);
  dom.predictionBreakdown.innerHTML = `
    History: <strong>${formatLap(p.historyBase)}</strong> |
    Physics: <strong>${formatLap(p.physicsBase)}</strong> |
    Blend: <strong>${formatLap(p.blendedBase)}</strong><br />
    Conditions: <strong>${p.conditionDelta.toFixed(2)}s</strong> |
    Skills: <strong>${p.skillDelta.toFixed(2)}s</strong> |
    Perks: <strong>${p.perkDelta.toFixed(2)}s</strong> |
    Crew: <strong>${p.crewDelta.toFixed(2)}s</strong>
  `;
  dom.predictionMeta.textContent = `Mode: ${getSelectedTrackMode().label} | Tire: ${getSelectedTire().label}`;
  dom.predictionCard.classList.add("active");

  dom.sectorTableBody.innerHTML = p.sectors
    .map(
      (sector) => `<tr>
        <td>${sector.name}</td>
        <td>${formatLap(sector.seconds)}</td>
        <td class="${sector.gainLoss <= 0 ? "good" : "bad"}">${sector.gainLoss.toFixed(2)}s</td>
      </tr>`
    )
    .join("");
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

function renderQuestList() {
  const ctx = {
    modeId: state.selectedTrackModeId,
    predictedSec: state.prediction ? state.prediction.totalSec : 9999,
    practiceRunsByMode: state.progression.practiceRunsByMode
  };
  dom.questList.innerHTML = questCatalog
    .map((quest) => {
      const completed = state.progression.completedQuests.includes(quest.id);
      const available = !completed && quest.check(ctx);
      return `<li class="${completed ? "done" : ""}">
        <span>${quest.label}</span>
        <small>${completed ? "Completed" : available ? "Ready to claim on next prediction/practice" : "In progress"}</small>
      </li>`;
    })
    .join("");
}

function checkAndAwardQuests() {
  const ctx = {
    modeId: state.selectedTrackModeId,
    predictedSec: state.prediction ? state.prediction.totalSec : 9999,
    practiceRunsByMode: state.progression.practiceRunsByMode
  };
  questCatalog.forEach((quest) => {
    if (state.progression.completedQuests.includes(quest.id)) return;
    if (!quest.check(ctx)) return;
    state.progression.completedQuests.push(quest.id);
    gainXp(quest.rewardXp);
    state.player.credits += quest.rewardCredits;
    addEvent(`Quest complete: ${quest.label} (+${quest.rewardXp} XP, +${quest.rewardCredits} cr).`);
  });
}

function renderStoreList(targetElement, items, type) {
  targetElement.innerHTML = items
    .map((item) => {
      const owned =
        type === "perk"
          ? state.progression.purchasedPerks.includes(item.id)
          : type === "part"
            ? state.progression.installedParts.includes(item.id)
            : state.progression.hiredCrew.includes(item.id);
      const locked = state.player.level < (item.unlockLevel ?? 1);
      const disabled = owned || locked;
      const btnLabel = owned ? "Owned" : locked ? `Lv.${item.unlockLevel}` : `Buy ${item.cost}cr`;
      return `<li>
        <div>
          <strong>${item.name}</strong>
          <small>${item.description ?? item.category}</small>
        </div>
        <button class="skill-btn buy-btn" data-type="${type}" data-id="${item.id}" ${disabled ? "disabled" : ""}>${btnLabel}</button>
      </li>`;
    })
    .join("");
}

function renderProgressionPanels() {
  renderStoreList(dom.perkTree, perkCatalog, "perk");
  renderStoreList(dom.partsTree, partCatalog, "part");
  renderStoreList(dom.crewTree, crewCatalog, "crew");
}

function renderProfiles() {
  const names = Object.keys(state.profiles).sort();
  dom.profileSelect.innerHTML = names.length
    ? names.map((name) => `<option value="${name}">${name}</option>`).join("")
    : `<option value="">(no profiles)</option>`;
}

function renderEventLog() {
  dom.eventLogList.innerHTML = state.eventLog
    .slice(0, 12)
    .map((entry) => `<li><small>${entry}</small></li>`)
    .join("");
}

function drawLapTrendChart() {
  const canvas = dom.lapTrendChart;
  const ctx = canvas.getContext("2d");
  const car = getSelectedCar();
  const points = [...car.lapHistorySec].reverse();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0a1222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (points.length < 2) return;
  const min = Math.min(...points) - 1;
  const max = Math.max(...points) + 1;
  ctx.strokeStyle = "#47c1ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  points.forEach((v, i) => {
    const x = 18 + (i * (canvas.width - 36)) / (points.length - 1);
    const y = 12 + ((max - v) * (canvas.height - 24)) / (max - min || 1);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function runComparison() {
  const currentCar = getSelectedCar();
  const compareCar = getCarById(state.selectedCompareCarId);
  if (!compareCar) return;
  const mode = state.compareOptions.mode;
  const baseline = state.compareOptions.baseline;

  const comparisonText = withTemporaryOverrides(baseline, () => {
    const currentLap = computePotentialLap(currentCar);
    const otherLap = computePotentialLap(compareCar);

    if (mode === "power-weight") {
      const currentPw = currentCar.horsepower / currentCar.curbWeightKg;
      const otherPw = compareCar.horsepower / compareCar.curbWeightKg;
      const deltaPw = (otherPw - currentPw) * 1000;
      return deltaPw >= 0
        ? `${compareCar.name} has +${deltaPw.toFixed(1)} hp/ton over ${currentCar.name} (${baseline}).`
        : `${currentCar.name} has +${Math.abs(deltaPw).toFixed(1)} hp/ton over ${compareCar.name} (${baseline}).`;
    }

    if (mode === "consistency") {
      const currentSpread = Math.max(...currentCar.lapHistorySec) - Math.min(...currentCar.lapHistorySec);
      const otherSpread = Math.max(...compareCar.lapHistorySec) - Math.min(...compareCar.lapHistorySec);
      const spreadDelta = otherSpread - currentSpread;
      return spreadDelta >= 0
        ? `${currentCar.name} is ${spreadDelta.toFixed(2)}s more consistent than ${compareCar.name} (${baseline}).`
        : `${compareCar.name} is ${Math.abs(spreadDelta).toFixed(2)}s more consistent than ${currentCar.name} (${baseline}).`;
    }

    if (mode === "sectors") {
      const gains = currentLap.sectors.map((sector, i) => ({
        name: sector.name,
        delta: otherLap.sectors[i].seconds - sector.seconds
      }));
      const best = gains.reduce((top, row) => (Math.abs(row.delta) > Math.abs(top.delta) ? row : top), gains[0]);
      const ahead = best.delta >= 0 ? currentCar.name : compareCar.name;
      return `${ahead} gains most at ${best.name} (${Math.abs(best.delta).toFixed(2)}s) in ${baseline}.`;
    }

    const delta = otherLap.totalSec - currentLap.totalSec;
    return delta >= 0
      ? `${currentCar.name} is projected ${delta.toFixed(2)}s faster than ${compareCar.name} (${baseline}).`
      : `${compareCar.name} is projected ${Math.abs(delta).toFixed(2)}s faster than ${currentCar.name} (${baseline}).`;
  });

  dom.comparisonResult.textContent = comparisonText;
}

function predict() {
  const car = getSelectedCar();
  state.prediction = computePotentialLap(car);
  renderPrediction();
  const performanceBonus = Math.max(8, Math.round((500 - state.prediction.totalSec) * 0.16));
  gainXp(14 + performanceBonus);
  state.player.credits += 26 + Math.max(0, 520 - Math.round(state.prediction.totalSec)) / 2;
  checkAndAwardQuests();
  addEvent(`Predicted ${car.name}: ${formatLap(state.prediction.totalSec)}.`);
  renderPlayer();
  renderQuestList();
  renderProgressionPanels();
  renderEventLog();
  buildLeaderboard();
  saveState();
}

function practiceLap() {
  const car = getSelectedCar();
  const randomVariance = (Math.random() - 0.48) * 3.4;
  const sim = computePotentialLap(car);
  const practiceResultSec = Math.max(395, sim.totalSec + randomVariance + 1.2);
  car.lapHistorySec.unshift(Number(practiceResultSec.toFixed(3)));
  car.lapHistorySec = car.lapHistorySec.slice(0, 10);
  const modeId = state.selectedTrackModeId;
  state.progression.practiceRunsByMode[modeId] =
    (state.progression.practiceRunsByMode[modeId] ?? 0) + 1;
  gainXp(22);
  state.player.credits += 18;
  state.prediction = null;
  checkAndAwardQuests();
  addEvent(`Practice lap: ${formatLap(practiceResultSec)} (${getSelectedTrackMode().label}).`);
  renderHistory();
  drawLapTrendChart();
  renderPrediction();
  renderPlayer();
  renderQuestList();
  renderEventLog();
  buildLeaderboard();
  saveState();
}

function handleSkillUpgrade(skillKey) {
  if (state.player.skillPoints <= 0) return;
  if (state.player.skills[skillKey] >= 6) return;
  state.player.skillPoints -= 1;
  state.player.skills[skillKey] += 1;
  addEvent(`Upgraded ${skillKey} to ${state.player.skills[skillKey]}.`);
  renderPlayer();
  renderEventLog();
  buildLeaderboard();
  saveState();
}

function purchaseItem(type, id) {
  if (type === "perk") {
    const perk = perkCatalog.find((p) => p.id === id);
    if (!perk || state.progression.purchasedPerks.includes(id)) return;
    if (state.player.level < perk.unlockLevel) return;
    if (!spendCredits(perk.cost)) return;
    state.progression.purchasedPerks.push(id);
    addEvent(`Unlocked perk: ${perk.name}.`);
  }
  if (type === "part") {
    const part = partCatalog.find((p) => p.id === id);
    if (!part || state.progression.installedParts.includes(id)) return;
    if (!spendCredits(part.cost)) return;
    state.progression.installedParts.push(id);
    addEvent(`Installed part: ${part.name}.`);
  }
  if (type === "crew") {
    const crew = crewCatalog.find((c) => c.id === id);
    if (!crew || state.progression.hiredCrew.includes(id)) return;
    if (!spendCredits(crew.cost)) return;
    state.progression.hiredCrew.push(id);
    addEvent(`Hired crew: ${crew.name}.`);
  }
  renderSpecs();
  renderPlayer();
  renderProgressionPanels();
  renderEventLog();
  buildLeaderboard();
  saveState();
}

function saveProfile() {
  const name = dom.profileNameInput.value.trim();
  if (!name) return;
  state.profiles[name] = {
    selectedCarId: state.selectedCarId,
    selectedCompareCarId: state.selectedCompareCarId,
    selectedTrackModeId: state.selectedTrackModeId,
    selectedTireCompoundId: state.selectedTireCompoundId,
    selectedBuildArchetypeId: state.selectedBuildArchetypeId,
    compareOptions: structuredClone(state.compareOptions),
    modifiers: structuredClone(state.modifiers),
    ambient: structuredClone(state.ambient),
    assumptions: structuredClone(state.assumptions)
  };
  addEvent(`Saved profile '${name}'.`);
  renderProfiles();
  renderEventLog();
  saveState();
}

function loadProfile() {
  const name = dom.profileSelect.value;
  if (!name || !state.profiles[name]) return;
  const profile = state.profiles[name];
  state.selectedCarId = profile.selectedCarId;
  state.selectedCompareCarId = profile.selectedCompareCarId ?? state.selectedCompareCarId;
  state.selectedTrackModeId = profile.selectedTrackModeId;
  state.selectedTireCompoundId = profile.selectedTireCompoundId;
  state.selectedBuildArchetypeId = profile.selectedBuildArchetypeId;
  if (profile.compareOptions) {
    state.compareOptions = structuredClone(profile.compareOptions);
  }
  state.modifiers = structuredClone(profile.modifiers);
  state.ambient = structuredClone(profile.ambient);
  state.assumptions = structuredClone(profile.assumptions);
  state.prediction = null;
  addEvent(`Loaded profile '${name}'.`);
  refreshAll();
  saveState();
}

function deleteProfile() {
  const name = dom.profileSelect.value;
  if (!name || !state.profiles[name]) return;
  delete state.profiles[name];
  addEvent(`Deleted profile '${name}'.`);
  renderProfiles();
  renderEventLog();
  saveState();
}

function exportSave() {
  dom.savePayloadArea.value = JSON.stringify(state, null, 2);
  addEvent("Exported save JSON to text area.");
  renderEventLog();
}

function importSave() {
  const raw = dom.savePayloadArea.value.trim();
  if (!raw) return;
  try {
    const imported = sanitizeState(JSON.parse(raw));
    Object.keys(state).forEach((key) => delete state[key]);
    mergeState(state, imported);
    applyHistoryOverrides();
    addEvent("Imported save JSON.");
    refreshAll();
    saveState();
  } catch {
    addEvent("Import failed (invalid JSON payload).");
    renderEventLog();
  }
}

function setControlValuesFromState() {
  dom.driverConfidence.value = String(state.modifiers.driverConfidence);
  dom.weatherGrip.value = String(state.modifiers.weatherGrip);
  dom.tireLife.value = String(state.modifiers.tireLife);
  dom.fuelLoad.value = String(state.modifiers.fuelLoad);
  dom.airTemp.value = String(state.ambient.airTemp);
  dom.trackTemp.value = String(state.ambient.trackTemp);
  dom.humidity.value = String(state.ambient.humidity);
  dom.windSpeed.value = String(state.ambient.windSpeed);
  dom.tractionUtilization.value = String(state.assumptions.tractionUtilization);
  dom.aeroEfficiency.value = String(state.assumptions.aeroEfficiency);
  dom.resistanceLoad.value = String(state.assumptions.resistanceLoad);
  dom.calibrationBias.value = String(state.assumptions.calibrationBias);
}

function refreshAll() {
  ensureValidCompareCar();
  setControlValuesFromState();
  renderSelectOptions();
  renderSpecs();
  renderHistory();
  drawLapTrendChart();
  updateSlidersReadout();
  renderPlayer();
  renderPrediction();
  renderQuestList();
  renderProgressionPanels();
  renderProfiles();
  renderEventLog();
  buildLeaderboard();
  runComparison();
}

function wireEvents() {
  dom.carSelect.addEventListener("change", (event) => {
    state.selectedCarId = event.target.value;
    ensureValidCompareCar();
    state.prediction = null;
    refreshAll();
    saveState();
  });
  dom.compareCarSelect.addEventListener("change", (event) => {
    state.selectedCompareCarId = event.target.value;
    ensureValidCompareCar();
    runComparison();
    saveState();
  });
  dom.compareModeSelect.addEventListener("change", (event) => {
    state.compareOptions.mode = event.target.value;
    runComparison();
    saveState();
  });
  dom.compareBaselineSelect.addEventListener("change", (event) => {
    state.compareOptions.baseline = event.target.value;
    runComparison();
    saveState();
  });
  dom.trackModeSelect.addEventListener("change", (event) => {
    state.selectedTrackModeId = event.target.value;
    state.prediction = null;
    refreshAll();
    saveState();
  });
  dom.tireCompoundSelect.addEventListener("change", (event) => {
    state.selectedTireCompoundId = event.target.value;
    state.prediction = null;
    refreshAll();
    saveState();
  });
  dom.buildArchetypeSelect.addEventListener("change", (event) => {
    state.selectedBuildArchetypeId = event.target.value;
    state.prediction = null;
    refreshAll();
    saveState();
  });

  [
    ["driverConfidence", dom.driverConfidence, state.modifiers],
    ["weatherGrip", dom.weatherGrip, state.modifiers],
    ["tireLife", dom.tireLife, state.modifiers],
    ["fuelLoad", dom.fuelLoad, state.modifiers],
    ["airTemp", dom.airTemp, state.ambient],
    ["trackTemp", dom.trackTemp, state.ambient],
    ["humidity", dom.humidity, state.ambient],
    ["windSpeed", dom.windSpeed, state.ambient],
    ["tractionUtilization", dom.tractionUtilization, state.assumptions],
    ["aeroEfficiency", dom.aeroEfficiency, state.assumptions],
    ["resistanceLoad", dom.resistanceLoad, state.assumptions],
    ["calibrationBias", dom.calibrationBias, state.assumptions]
  ].forEach(([key, element, target]) => {
    element.addEventListener("input", () => {
      target[key] = Number(element.value);
      updateSlidersReadout();
      buildLeaderboard();
      saveState();
    });
  });

  dom.predictBtn.addEventListener("click", predict);
  dom.practiceBtn.addEventListener("click", practiceLap);
  dom.runCompareBtn.addEventListener("click", runComparison);
  dom.swapCompareBtn.addEventListener("click", () => {
    const previousPrimary = state.selectedCarId;
    state.selectedCarId = state.selectedCompareCarId;
    state.selectedCompareCarId = previousPrimary;
    ensureValidCompareCar();
    state.prediction = null;
    refreshAll();
    saveState();
  });
  dom.resetSaveBtn.addEventListener("click", resetSave);
  dom.saveProfileBtn.addEventListener("click", saveProfile);
  dom.loadProfileBtn.addEventListener("click", loadProfile);
  dom.deleteProfileBtn.addEventListener("click", deleteProfile);
  dom.exportSaveBtn.addEventListener("click", exportSave);
  dom.importSaveBtn.addEventListener("click", importSave);

  document.querySelectorAll(".skill-btn").forEach((button) => {
    if (button.classList.contains("buy-btn")) return;
    button.addEventListener("click", () => handleSkillUpgrade(button.dataset.skill));
  });

  [dom.perkTree, dom.partsTree, dom.crewTree].forEach((container) => {
    container.addEventListener("click", (event) => {
      const target = event.target.closest(".buy-btn");
      if (!target) return;
      purchaseItem(target.dataset.type, target.dataset.id);
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
    addEvent(`Added manual lap for ${car.name}: ${formatLap(lapSec)}.`);
    refreshAll();
    saveState();
  });
}

function init() {
  loadState();
  addEvent("Session initialized.");
  refreshAll();
  wireEvents();
  runComparison();
  saveState();
}

init();
