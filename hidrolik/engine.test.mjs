import assert from 'node:assert/strict';
import { calculateHydraulics, pressureToMPa, forceToN, validateInputs } from './engine.module.js';

const close = (actual, expected, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≠ ${expected}`);
const base = { pistonDiameterMm:100, rodDiameterMm:50, pressure:160, pressureUnit:'bar', efficiencyPercent:90, cylinderCount:1, safetyFactor:1.5, targetForce:'', forceUnit:'kN' };

close(pressureToMPa(160,'bar'),16);
close(pressureToMPa(1000,'psi'),6.894757293168);
close(forceToN(1,'kN'),1000);
close(forceToN(1,'kgf'),9.80665);
const r = calculateHydraulics(base);
close(r.pistonAreaMm2, Math.PI*2500);
close(r.annularAreaMm2, Math.PI*1875);
close(r.push.theoreticalTotalN, 16*Math.PI*2500);
close(r.push.safeTotalN, 16*Math.PI*2500*.9/1.5);
close(r.pull.safeTotalN, 16*Math.PI*1875*.9/1.5);
const doubled = calculateHydraulics({...base,cylinderCount:2});
close(doubled.push.safeTotalN, r.push.safeTotalN*2);
const target = calculateHydraulics({...base,targetForce:100});
close(target.target.requiredDiameterMm, Math.sqrt(4*(100000*1.5/(16*.9))/Math.PI));
const withBackPressure = calculateHydraulics({...base,backPressure:10});
close(withBackPressure.push.theoreticalTotalN, 16*Math.PI*2500 - 1*Math.PI*1875);
close(withBackPressure.pull.theoreticalTotalN, 16*Math.PI*1875 - 1*Math.PI*2500);
const motion = calculateHydraulics({...base,strokeMm:500,speedMmS:50});
close(motion.motion.capVolumeL, Math.PI*2500*500/1e6);
close(motion.motion.pushFlowLMin, Math.PI*2500*50*60/1e6);
close(motion.motion.strokeTimeS,10);
assert.equal(validateInputs({...base,rodDiameterMm:100}).valid,false);
assert.equal(validateInputs({...base,efficiencyPercent:101}).valid,false);
assert.equal(validateInputs({...base,cylinderCount:1.5}).valid,false);
assert.equal(validateInputs({...base,backPressure:160}).valid,false);
assert.throws(() => calculateHydraulics({...base,safetyFactor:0.9}));

// Farklı geometri, basınç ve katsayılarda bağımsız formül karşılaştırması.
for (let i=1; i<=100; i++) {
  const D = 40 + i*1.7, d = D*(0.2 + (i%5)*0.1), pressureBar = 50 + i*2;
  const backBar = i%9, eta = 70 + (i%30), count = 1 + (i%4), safety = 1 + (i%6)*0.2;
  const sample = calculateHydraulics({...base,pistonDiameterMm:D,rodDiameterMm:d,pressure:pressureBar,backPressure:backBar,efficiencyPercent:eta,cylinderCount:count,safetyFactor:safety});
  const Ap = Math.PI*D**2/4, Ar = Math.PI*(D**2-d**2)/4, p = pressureBar*.1, pb = backBar*.1;
  close(sample.push.safeTotalN, (p*Ap-pb*Ar)*(eta/100)*count/safety, 1e-6);
  close(sample.pull.safeTotalN, (p*Ar-pb*Ap)*(eta/100)*count/safety, 1e-6);
}
const tinyTarget = calculateHydraulics({...base,backPressure:10,targetForce:.01});
assert.equal(tinyTarget.target.rodLimited,true);
close(tinyTarget.target.requiredDiameterMm,50);
console.log('Temel, sınır ve 100 parametrik senaryo başarılı.');
