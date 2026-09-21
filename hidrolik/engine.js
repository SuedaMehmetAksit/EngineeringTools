const ENGINE_VERSION = '1.2.0';

const PRESSURE_TO_MPA = { bar: 0.1, MPa: 1, psi: 0.006894757293168 };
const FORCE_TO_N = { N: 1, kN: 1000, kgf: 9.80665, lbf: 4.4482216152605 };

function finiteNumber(value, field) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`${field} geçerli bir sayı olmalıdır.`);
  return number;
}

function pressureToMPa(value, unit) {
  if (!(unit in PRESSURE_TO_MPA)) throw new Error('Desteklenmeyen basınç birimi.');
  return finiteNumber(value, 'Basınç') * PRESSURE_TO_MPA[unit];
}

function forceToN(value, unit) {
  if (!(unit in FORCE_TO_N)) throw new Error('Desteklenmeyen kuvvet birimi.');
  return finiteNumber(value, 'Kuvvet') * FORCE_TO_N[unit];
}

function validateInputs(raw) {
  const errors = {};
  const input = {
    pistonDiameterMm: Number(raw.pistonDiameterMm), rodDiameterMm: Number(raw.rodDiameterMm),
    pressure: Number(raw.pressure), backPressure: Number(raw.backPressure ?? 0), pressureUnit: raw.pressureUnit,
    efficiencyPercent: Number(raw.efficiencyPercent), cylinderCount: Number(raw.cylinderCount),
    safetyFactor: Number(raw.safetyFactor), targetForce: raw.targetForce === '' || raw.targetForce == null ? null : Number(raw.targetForce),
    forceUnit: raw.forceUnit,
    strokeMm: raw.strokeMm === '' || raw.strokeMm == null ? null : Number(raw.strokeMm),
    speedMmS: raw.speedMmS === '' || raw.speedMmS == null ? null : Number(raw.speedMmS)
  };
  if (!Number.isFinite(input.pistonDiameterMm) || input.pistonDiameterMm <= 0) errors.pistonDiameter = 'Piston çapı 0’dan büyük olmalıdır.';
  if (!Number.isFinite(input.rodDiameterMm) || input.rodDiameterMm < 0) errors.rodDiameter = 'Mil çapı 0 veya daha büyük olmalıdır.';
  else if (Number.isFinite(input.pistonDiameterMm) && input.rodDiameterMm >= input.pistonDiameterMm) errors.rodDiameter = 'Mil çapı piston çapından küçük olmalıdır.';
  if (!Number.isFinite(input.pressure) || input.pressure <= 0) errors.pressure = 'Basınç 0’dan büyük olmalıdır.';
  if (!Number.isFinite(input.backPressure) || input.backPressure < 0) errors.backPressure = 'Karşı basınç 0 veya daha büyük olmalıdır.';
  else if (Number.isFinite(input.pressure) && input.backPressure >= input.pressure) errors.backPressure = 'Karşı basınç besleme basıncından küçük olmalıdır.';
  if (!(input.pressureUnit in PRESSURE_TO_MPA)) errors.pressure = 'Basınç birimi geçersiz.';
  if (!Number.isFinite(input.efficiencyPercent) || input.efficiencyPercent <= 0 || input.efficiencyPercent > 100) errors.efficiency = 'Verim %0’dan büyük, %100 veya daha küçük olmalıdır.';
  if (!Number.isInteger(input.cylinderCount) || input.cylinderCount < 1) errors.cylinderCount = 'Silindir adedi en az 1 olan tam sayı olmalıdır.';
  if (!Number.isFinite(input.safetyFactor) || input.safetyFactor < 1) errors.safetyFactor = 'Emniyet katsayısı en az 1 olmalıdır.';
  if (input.targetForce !== null && (!Number.isFinite(input.targetForce) || input.targetForce <= 0)) errors.targetForce = 'Hedef kuvvet boş ya da 0’dan büyük olmalıdır.';
  if (!(input.forceUnit in FORCE_TO_N)) errors.targetForce = 'Kuvvet birimi geçersiz.';
  if (input.strokeMm !== null && (!Number.isFinite(input.strokeMm) || input.strokeMm <= 0)) errors.stroke = 'Strok boş ya da 0’dan büyük olmalıdır.';
  if (input.speedMmS !== null && (!Number.isFinite(input.speedMmS) || input.speedMmS <= 0)) errors.speed = 'Hız boş ya da 0’dan büyük olmalıdır.';
  return { valid: Object.keys(errors).length === 0, errors, input };
}

function calculateHydraulics(raw) {
  const checked = validateInputs(raw);
  if (!checked.valid) { const error = new Error('Girdiler geçersiz.'); error.details = checked.errors; throw error; }
  const x = checked.input;
  const pressureMPa = pressureToMPa(x.pressure, x.pressureUnit);
  const backPressureMPa = pressureToMPa(x.backPressure, x.pressureUnit);
  const efficiency = x.efficiencyPercent / 100;
  const pistonAreaMm2 = Math.PI * x.pistonDiameterMm ** 2 / 4;
  const annularAreaMm2 = Math.PI * (x.pistonDiameterMm ** 2 - x.rodDiameterMm ** 2) / 4;
  const force = (drivenArea, returnArea) => {
    const theoreticalSingleN = pressureMPa * drivenArea - backPressureMPa * returnArea;
    const adjustedSingleN = theoreticalSingleN * efficiency;
    return {
      theoreticalSingleN, theoreticalTotalN: theoreticalSingleN * x.cylinderCount,
      adjustedSingleN, adjustedTotalN: adjustedSingleN * x.cylinderCount,
      safeSingleN: adjustedSingleN / x.safetyFactor,
      safeTotalN: adjustedSingleN * x.cylinderCount / x.safetyFactor
    };
  };
  let target = null;
  if (x.targetForce !== null) {
    const targetN = forceToN(x.targetForce, x.forceUnit);
    const rodAreaMm2 = Math.PI * x.rodDiameterMm ** 2 / 4;
    const calculatedAreaMm2 = (targetN * x.safetyFactor / (efficiency * x.cylinderCount) - backPressureMPa * rodAreaMm2) / (pressureMPa - backPressureMPa);
    const requiredAreaMm2 = Math.max(calculatedAreaMm2, rodAreaMm2);
    const requiredDiameterMm = Math.sqrt(4 * requiredAreaMm2 / Math.PI);
    target = { targetN, requiredAreaMm2, requiredDiameterMm, rodLimited: calculatedAreaMm2 < rodAreaMm2, marginN: force(pistonAreaMm2, annularAreaMm2).safeTotalN - targetN };
  }
  let motion = null;
  if (x.strokeMm !== null || x.speedMmS !== null) {
    const capVolumeL = x.strokeMm === null ? null : pistonAreaMm2 * x.strokeMm / 1e6;
    const rodVolumeL = x.strokeMm === null ? null : annularAreaMm2 * x.strokeMm / 1e6;
    const pushFlowLMin = x.speedMmS === null ? null : pistonAreaMm2 * x.speedMmS * 60 / 1e6;
    const pullFlowLMin = x.speedMmS === null ? null : annularAreaMm2 * x.speedMmS * 60 / 1e6;
    const strokeTimeS = x.strokeMm !== null && x.speedMmS !== null ? x.strokeMm / x.speedMmS : null;
    motion = { capVolumeL, rodVolumeL, pushFlowLMin, pullFlowLMin, strokeTimeS };
  }
  return { version: ENGINE_VERSION, pressureMPa, backPressureMPa, efficiency, pistonAreaMm2, annularAreaMm2,
    push: force(pistonAreaMm2, annularAreaMm2), pull: force(annularAreaMm2, pistonAreaMm2), target, motion };
}
