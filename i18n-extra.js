(function () {
  const isEnglish = localStorage.getItem('sdm-lang') === 'en';
  if (!isEnglish) return;

  const exact = {
    'Mühendislik hesap araçları': 'Engineering calculation tools',
    'Pilot uygulama': 'Pilot application',
    'İsteğe bağlı': 'Optional',
    'adet': 'pcs',
    'Girdiler değiştikçe sonuçlar otomatik güncellenir.': 'Results update automatically as inputs change.',
    'Hesaplanamadı.': 'Calculation unavailable.',
    'Sonuçları görmek için işaretli alanları düzeltin.': 'Correct the highlighted fields to view the results.',
    'İşaretli alanları düzeltin.': 'Correct the highlighted fields.',
    'Strok girilmedi': 'Stroke not entered',
    'Hız girilmedi': 'Speed not entered',
    'Strok ve hız gerekli': 'Stroke and speed required',
    'Basınç MPa ve alan mm² olduğunda kuvvet N çıkar. Emniyet katsayısı, verim ve silindir adedi sonuçlara ayrı ayrı uygulanır.': 'When pressure is in MPa and area is in mm², force is obtained in N. Safety factor, efficiency and cylinder count are applied separately.',
    'Konsept tasarım ve özel test düzeneği ön boyutlandırmasıdır. CFD/CAE, komponent seçimi veya test düzeneği validasyonunun yerine geçmez.': 'Intended for concept design and preliminary sizing of custom test rigs. It does not replace CFD/CAE, component selection or test-rig validation.',
    'Dinamik yük, basınç darbeleri, tolerans, sıcaklık ve burkulma kapsam dışıdır. Üretim öncesi SDM konu uzmanı onayı gerekir.': 'Dynamic loads, pressure spikes, tolerances, temperature and buckling are outside the scope. SDM subject-matter approval is required before production.',
    'Tork katsayısı': 'Nut factor',
    'K; yağlama, kaplama, diş ve başaltı sürtünmesine bağlıdır. Gerçek değeri doğrulanmadan üretim kararı verilmemelidir.': 'K depends on lubrication, coating, thread friction and under-head friction. It must be verified before a production decision is made.',
    'Otomatik alan formülü ISO metrik 60° diş yaklaşımıdır. Onaylı standart/katalog alanı varsa elle girilen değer kullanılmalıdır.': 'The automatic area formula uses the ISO metric 60° thread approximation. Use the approved standard or catalogue value when available.',
    'Bağlantı rijitliği, dış yük paylaşımı, yorulma, gevşeme, gömülme, sıcaklık ve sıkma yöntemi belirsizliği dahil değildir.': 'Joint stiffness, external load distribution, fatigue, loosening, embedment, temperature and tightening-method uncertainty are not included.',
    'Piston çapı 0’dan büyük olmalıdır.': 'Piston diameter must be greater than 0.',
    'Mil çapı 0 veya daha büyük olmalıdır.': 'Rod diameter must be 0 or greater.',
    'Mil çapı piston çapından küçük olmalıdır.': 'Rod diameter must be smaller than piston diameter.',
    'Basınç 0’dan büyük olmalıdır.': 'Pressure must be greater than 0.',
    'Karşı basınç 0 veya daha büyük olmalıdır.': 'Back pressure must be 0 or greater.',
    'Karşı basınç besleme basıncından küçük olmalıdır.': 'Back pressure must be lower than supply pressure.',
    'Verim %0’dan büyük, %100 veya daha küçük olmalıdır.': 'Efficiency must be greater than 0% and at most 100%.',
    'Silindir adedi en az 1 olan tam sayı olmalıdır.': 'Cylinder count must be an integer of at least 1.',
    'Emniyet katsayısı en az 1 olmalıdır.': 'Safety factor must be at least 1.',
    'Hedef kuvvet boş ya da 0’dan büyük olmalıdır.': 'Target force must be blank or greater than 0.',
    'Strok boş ya da 0’dan büyük olmalıdır.': 'Stroke must be blank or greater than 0.',
    'Hız boş ya da 0’dan büyük olmalıdır.': 'Speed must be blank or greater than 0.',
    'Çap 0’dan büyük olmalıdır.': 'Diameter must be greater than 0.',
    'Diş adımı 0’dan büyük olmalıdır.': 'Thread pitch must be greater than 0.',
    'Diş adımı nominal çaptan küçük olmalıdır.': 'Thread pitch must be smaller than nominal diameter.',
    'Çekme alanı 0’dan büyük olmalıdır.': 'Tensile area must be greater than 0.',
    'Kanıt dayanımı 0’dan büyük olmalıdır.': 'Proof strength must be greater than 0.',
    'Ön yük oranı %0–100 aralığında olmalıdır.': 'Preload ratio must be between 0% and 100%.',
    'Tork katsayısı 0–1 aralığında olmalıdır.': 'Nut factor must be between 0 and 1.',
    'Cıvata adedi pozitif tam sayı olmalıdır.': 'Bolt count must be a positive integer.',
    'Uygulanan tork boş ya da pozitif olmalıdır.': 'Applied torque must be blank or positive.'
  };

  const attributes = {
    'Araçlar arası geçiş': 'Tool navigation', 'SDM Research & Engineering web sitesi': 'SDM Research & Engineering website',
    'Hesap kaydı': 'Calculation record', 'Çap birimi': 'Diameter unit', 'Basınç birimi': 'Pressure unit',
    'Kuvvet birimi': 'Force unit', 'Strok birimi': 'Stroke unit', 'Hız birimi': 'Speed unit',
    'Sonuç kuvvet birimi': 'Result force unit', 'Alan yöntemi': 'Area method', 'Dayanım birimi': 'Strength unit',
    'Tork birimi': 'Torque unit'
  };

  function translateText(text) {
    const trimmed = text.trim();
    if (exact[trimmed]) return text.replace(trimmed, exact[trimmed]);
    if (trimmed.includes(' ile hesaplandı · motor v')) return text.replace(' ile hesaplandı · motor v', ' calculated · engine v');
    if (/^K = .* varsayımıyla hesaplandı · motor v/.test(trimmed)) return text.replace(' varsayımıyla hesaplandı · motor v', ' assumption · engine v');
    if (trimmed.includes('Hesap motoru sürümü')) return text.replace('Hesap motoru sürümü', 'Calculation engine version');
    if (trimmed.startsWith('Seçilen piston hedefi karşılıyor. Emniyetli marj:')) return text.replace('Seçilen piston hedefi karşılıyor. Emniyetli marj:', 'Selected piston meets the target. Safety margin:');
    if (trimmed.startsWith('Seçilen piston hedefin') && trimmed.endsWith('altında kalıyor.')) return text.replace('Seçilen piston hedefin', 'Selected piston is').replace('altında kalıyor.', 'below the target.');
    return text;
  }

  function apply(root) {
    const scope = root.nodeType === 1 ? root : document.body;
    scope.querySelectorAll('*').forEach(function (el) {
      if (['SCRIPT', 'STYLE', 'CODE'].includes(el.tagName)) return;
      el.childNodes.forEach(function (node) {
        if (node.nodeType === 3 && node.nodeValue.trim()) {
          const translated = translateText(node.nodeValue);
          if (translated !== node.nodeValue) node.nodeValue = translated;
        }
      });
      ['aria-label', 'title'].forEach(function (name) {
        const value = el.getAttribute(name);
        if (value && attributes[value]) el.setAttribute(name, attributes[value]);
      });
    });
    const path = location.pathname;
    document.title = path.includes('/hidrolik/') ? 'SDM | Hydraulic Cylinder Calculation' : path.includes('/civata/') ? 'SDM | Bolt Preload and Torque' : 'SDM | Engineering Calculation Tools';
  }

  apply(document.body);
  new MutationObserver(function () { apply(document.body); }).observe(document.body, { childList: true, subtree: true, characterData: true });
})();
