const form = document.querySelector('#calculatorForm');
const $ = id => document.getElementById(id);
const ids = ['pistonDiameter','rodDiameter','pressure','backPressure','efficiency','cylinderCount','safetyFactor','targetForce','forceUnit','stroke','speed','resultForceUnit'];
const defaults = { pistonDiameter:'100', rodDiameter:'50', diameterUnit:'mm', pressure:'160', backPressure:'0', pressureUnit:'bar', efficiency:'90', cylinderCount:'1', safetyFactor:'1.5', targetForce:'', forceUnit:'kN', stroke:'', strokeUnit:'mm', speed:'', speedUnit:'mm/s', resultForceUnit:'kN' };
const fmt = (value, digits = 2) => new Intl.NumberFormat('tr-TR', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);
const lengthFactor = { mm:1, in:25.4 };
const speedFactor = { 'mm/s':1, 'mm/dk':1/60, 'in/s':25.4, 'in/dk':25.4/60 };
const forceFactor = { N:1, kN:1000, kgf:9.80665, lbf:4.4482216152605 };
const force = valueN => { const unit = $('resultForceUnit').value; return `${fmt(valueN / forceFactor[unit])} ${unit}`; };
const converted = (value, fromFactor, toFactor) => value === '' ? '' : String(Number((Number(value) * fromFactor / toFactor).toPrecision(10)));

function rawInputs() {
  const diameterScale = lengthFactor[$('diameterUnit').value];
  const strokeScale = lengthFactor[$('strokeUnit').value];
  const velocityScale = speedFactor[$('speedUnit').value];
  return { pistonDiameterMm: $('pistonDiameter').value === '' ? '' : Number($('pistonDiameter').value) * diameterScale,
    rodDiameterMm: $('rodDiameter').value === '' ? '' : Number($('rodDiameter').value) * diameterScale,
    pressure: $('pressure').value, backPressure: $('backPressure').value,
    pressureUnit: $('pressureUnit').value, efficiencyPercent: $('efficiency').value, cylinderCount: $('cylinderCount').value,
    safetyFactor: $('safetyFactor').value, targetForce: $('targetForce').value, forceUnit: $('forceUnit').value,
    strokeMm: $('stroke').value === '' ? '' : Number($('stroke').value) * strokeScale,
    speedMmS: $('speed').value === '' ? '' : Number($('speed').value) * velocityScale };
}

function showErrors(errors) {
  const map = { pistonDiameter:'pistonDiameter', rodDiameter:'rodDiameter', pressure:'pressure', backPressure:'backPressure', efficiency:'efficiency', cylinderCount:'cylinderCount', safetyFactor:'safetyFactor', targetForce:'targetForce', stroke:'stroke', speed:'speed' };
  Object.entries(map).forEach(([key, id]) => { $(`${id}Error`).textContent = errors[key] || ''; $(id).classList.toggle('invalid', Boolean(errors[key])); });
  $('formError').hidden = Object.keys(errors).length === 0;
  $('formError').textContent = Object.keys(errors).length ? 'Sonuçları görmek için işaretli alanları düzeltin.' : '';
}

function clearResults() {
  ['pushSafe','pushTheoretical','pushAdjusted','pushSafeSingle','pistonArea','pullSafe','pullTheoretical','pullAdjusted','pullSafeSingle','annularArea'].forEach(id => $(id).textContent = '—');
  $('targetPanel').hidden = true;
  $('motionPanel').hidden = true;
  $('resultStatus').textContent = 'Hesaplanamadı.';
}

function render() {
  const checked = validateInputs(rawInputs());
  showErrors(checked.errors);
  if (!checked.valid) { clearResults(); return; }
  const r = calculateHydraulics(rawInputs());
  $('pushSafe').textContent = force(r.push.safeTotalN); $('pushTheoretical').textContent = force(r.push.theoreticalTotalN);
  $('pushAdjusted').textContent = force(r.push.adjustedTotalN); $('pushSafeSingle').textContent = force(r.push.safeSingleN); $('pistonArea').textContent = `${fmt(r.pistonAreaMm2)} mm²`;
  $('pullSafe').textContent = force(r.pull.safeTotalN); $('pullTheoretical').textContent = force(r.pull.theoreticalTotalN);
  $('pullAdjusted').textContent = force(r.pull.adjustedTotalN); $('pullSafeSingle').textContent = force(r.pull.safeSingleN); $('annularArea').textContent = `${fmt(r.annularAreaMm2)} mm²`;
  $('targetPanel').hidden = !r.target;
  if (r.target) {
    const diameterUnit = $('diameterUnit').value;
    $('requiredDiameter').textContent = `${fmt(r.target.requiredDiameterMm / lengthFactor[diameterUnit])} ${diameterUnit}`;
    const adequate = r.target.marginN >= 0;
    $('targetAssessment').className = adequate ? 'assessment assessment--ok' : 'assessment assessment--bad';
    const limitNote = r.target.rodLimited ? ' Minimum değer mil çapıyla sınırlıdır.' : '';
    $('targetAssessment').textContent = (adequate ? `Seçilen piston hedefi karşılıyor. Emniyetli marj: ${force(r.target.marginN)}.` : `Seçilen piston hedefin ${force(Math.abs(r.target.marginN))} altında kalıyor.`) + limitNote;
  }
  $('motionPanel').hidden = !r.motion;
  if (r.motion) {
    $('capVolume').textContent = r.motion.capVolumeL === null ? 'Strok girilmedi' : `${fmt(r.motion.capVolumeL, 3)} L`;
    $('rodVolume').textContent = r.motion.rodVolumeL === null ? 'Strok girilmedi' : `${fmt(r.motion.rodVolumeL, 3)} L`;
    $('pushFlow').textContent = r.motion.pushFlowLMin === null ? 'Hız girilmedi' : `${fmt(r.motion.pushFlowLMin, 2)} L/dk`;
    $('pullFlow').textContent = r.motion.pullFlowLMin === null ? 'Hız girilmedi' : `${fmt(r.motion.pullFlowLMin, 2)} L/dk`;
    $('strokeTime').textContent = r.motion.strokeTimeS === null ? 'Strok ve hız gerekli' : `${fmt(r.motion.strokeTimeS, 2)} s`;
  }
  $('resultStatus').textContent = `${fmt(r.pressureMPa, 3)} MPa ile hesaplandı · motor v${ENGINE_VERSION}`;
  $('calculatedAt').textContent = new Date().toLocaleString('tr-TR');
  window.currentResult = r;
}

function downloadCsv() {
  if (!window.currentResult) return;
  const r = window.currentResult, x = rawInputs();
  const rows = [['Alan','Değer','Birim'],['Proje',$('projectName').value,''],['Hesap no',$('calculationNo').value,''],['Hazırlayan',$('preparedBy').value,''],['Piston çapı',$('pistonDiameter').value,$('diameterUnit').value],['Mil çapı',$('rodDiameter').value,$('diameterUnit').value],['Besleme basıncı',x.pressure,x.pressureUnit],['Karşı basınç',x.backPressure,x.pressureUnit],['Verim',x.efficiencyPercent,'%'],['Silindir adedi',x.cylinderCount,'adet'],['Emniyet katsayısı',x.safetyFactor,''],['İtme teorik toplam',r.push.theoreticalTotalN,'N'],['İtme düzeltilmiş toplam',r.push.adjustedTotalN,'N'],['İtme emniyetli toplam',r.push.safeTotalN,'N'],['Çekme teorik toplam',r.pull.theoreticalTotalN,'N'],['Çekme düzeltilmiş toplam',r.pull.adjustedTotalN,'N'],['Çekme emniyetli toplam',r.pull.safeTotalN,'N']];
  if (r.target) rows.push(['Gerekli minimum piston çapı',r.target.requiredDiameterMm,'mm']);
  if (r.motion) rows.push(['Piston tarafı hacmi',r.motion.capVolumeL ?? '','L'],['Mil tarafı hacmi',r.motion.rodVolumeL ?? '','L'],['İtme debisi',r.motion.pushFlowLMin ?? '','L/dk'],['Çekme debisi',r.motion.pullFlowLMin ?? '','L/dk'],['Strok süresi',r.motion.strokeTimeS ?? '','s']);
  const csv = '\uFEFF' + rows.map(row => row.map(cell => `"${String(cell).replaceAll('"','""')}"`).join(';')).join('\n');
  const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8'})); link.download = `hidrolik-hesap-${new Date().toISOString().slice(0,10)}.csv`; link.click(); URL.revokeObjectURL(link.href);
}

ids.forEach(id => $(id).addEventListener('input', render));
$('pressureUnit').addEventListener('change', () => { $('backPressureUnit').textContent = $('pressureUnit').value; render(); });
let previousDiameterUnit = $('diameterUnit').value, previousStrokeUnit = $('strokeUnit').value, previousSpeedUnit = $('speedUnit').value;
$('diameterUnit').addEventListener('change', () => { const next = $('diameterUnit').value; $('pistonDiameter').value = converted($('pistonDiameter').value,lengthFactor[previousDiameterUnit],lengthFactor[next]); $('rodDiameter').value = converted($('rodDiameter').value,lengthFactor[previousDiameterUnit],lengthFactor[next]); $('rodDiameterUnit').textContent = next; previousDiameterUnit = next; render(); });
$('strokeUnit').addEventListener('change', () => { const next = $('strokeUnit').value; $('stroke').value = converted($('stroke').value,lengthFactor[previousStrokeUnit],lengthFactor[next]); previousStrokeUnit = next; render(); });
$('speedUnit').addEventListener('change', () => { const next = $('speedUnit').value; $('speed').value = converted($('speed').value,speedFactor[previousSpeedUnit],speedFactor[next]); previousSpeedUnit = next; render(); });
$('resetButton').addEventListener('click', () => { Object.entries(defaults).forEach(([id,value]) => $(id).value = value); previousDiameterUnit='mm'; previousStrokeUnit='mm'; previousSpeedUnit='mm/s'; $('rodDiameterUnit').textContent='mm'; $('backPressureUnit').textContent='bar'; render(); });
$('csvButton').addEventListener('click', downloadCsv);
$('printButton').addEventListener('click', () => window.print());
form.addEventListener('submit', event => event.preventDefault());
render();
