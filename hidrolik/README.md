# SDM Hidrolik Hesaplama Pilotu

PDF'deki seçenekler arasından ilk pilot olarak **hidrolik piston–basınç–kuvvet hesabı** seçildi. Teknik yapılabilirliği ve uzaktan geliştirilebilirliği yüksek; mevcut kaynak kod, cihaz SDK'sı, ERP API'si veya şirket ağına erişim gerektirmiyor. Buna karşılık formülleri üretimde kullanma onayı SDM makine mühendisindedir.

## Firma bağlamına göre değerlendirme

SDM'nin resmi sitesine göre firma; turbomakine ve piston motoru sistemlerinde tasarım, analiz, test ve geliştirme yapıyor. Yetkinlikleri arasında özel test düzeneği tasarımı/imalatı, enstrümantasyon, yapısal CAE, CFD ve sızdırmazlık teknolojileri bulunuyor. Bu nedenle araç, özellikle **özel test düzenekleri ve endüstriyel ekipmanlarda hidrolik aktüatör için ilk boyutlandırma ve izlenebilir hesap kaydı** amacıyla konumlandırıldı.

Bu uyarlamada doğruluk adına şu sınırlar korundu:

- Resmi sitede belirtilen kompresör veya buhar sistemi basınçları hidrolik tasarım limiti kabul edilmedi.
- Firmanın logosu veya tescilli görseli kopyalanmadı; sade bir mühendislik arayüzü hazırlandı.
- CFD/CAE, dayanım, burkulma ve komponent seçimi sonuçları bu temel kuvvet hesabından türetilmedi.
- SDM uzmanının formül, katsayı ve referans sonuç onayı üretime geçiş koşulu olarak bırakıldı.

İncelenen resmi sayfalar:

- [SDM ana sayfa](https://www.sdmresearch.com/)
- [Firma profili](https://www.sdmresearch.com/Views/About-Us/Who-We-Are.html)
- [Enstrümantasyon ve test sistemleri](https://sdmresearch.com/Views/Our-Services/Instrumentation-Test-Systems/)
- [İleri tasarım](https://sdmresearch.com/Views/Our-Services/Advanced-Simulation-Technologies/Advanced-Design.html)
- [İleri simülasyon teknolojileri](https://www.sdmresearch.com/Views/Our-Services/Advanced-Simulation-Technologies/)

## Hızlı kullanım

1. `index.html` dosyasına çift tıklayın; uygulama doğrudan tarayıcıda açılır.
2. Proje, hesap numarası ve hazırlayan alanlarını doldurun.
3. Çap, besleme/karşı basınç, verim, silindir adedi ve emniyet katsayısını girin.
4. İsteğe bağlı hedef kuvvetle minimum piston çapını hesaplayın.
5. Strok ve hız girerek yağ hacmi, debi ve strok süresini görün.
6. **CSV indir** ile hesap kaydını dışa aktarın; **Rapor yazdır / PDF** ile tarayıcının yazdırma penceresinden PDF alın.

Çap ve strok `mm/in`, hız `mm/s`, `mm/dk`, `in/s`, `in/dk`; basınç `bar/MPa/psi`; kuvvet sonuçları ise `kN/N/kgf/lbf` olarak değiştirilebilir. Birim değiştirildiğinde girilmiş değer fiziksel büyüklüğü korunarak otomatik çevrilir.

## Uygulamanın aşamaları

### 1. Girdi sözleşmesi

Her hesap aynı alan adlarını ve birimleri kullanır:

| Alan | Kural |
|---|---|
| Piston çapı D | `D > 0`, mm |
| Mil çapı d | `0 ≤ d < D`, mm |
| Basınç P | `P > 0`; bar, MPa veya psi |
| Karşı basınç Pr | `0 ≤ Pr < P`; besleme ile aynı birim |
| Toplam verim η | `%0 < η ≤ %100` |
| Silindir adedi n | Pozitif tam sayı |
| Emniyet katsayısı S | `S ≥ 1` |
| Hedef kuvvet Ft | İsteğe bağlı, pozitif; kN, N, kgf veya lbf |

### 2. Merkezi birim dönüşümü

Hesap motoru basıncı MPa'ya, hedef kuvveti N'a dönüştürür. Böylece `MPa × mm² = N` boyutsal ilişkisi bütün formüllerde korunur.

### 3. Alanlar

- Piston alanı: `Ap = πD² / 4`
- Mil tarafındaki net alan: `Ar = π(D² − d²) / 4`

### 4. Kuvvetler

İtme ve çekme için ayrı ayrı şu üç seviye hesaplanır:

- Teorik toplam: `Fteorik = (P1 × A1 − P2 × A2) × n`
- Verim düzeltilmiş toplam: `Fdüzeltilmiş = P × A × η × n`
- Emniyetli toplam: `Femniyetli = Fdüzeltilmiş / S`

Tek silindir emniyetli kuvveti de ayrıca gösterilir; böylece adet etkisi görünür kalır.

### 5. Hedef kuvvetten minimum çap

Hedef kuvvet emniyetli kapasite olarak ele alınır:

`Dmin = √(4 × Ft × S / (π × P × η × n))`

Arayüz, seçilen pistonun hedefi karşılayıp karşılamadığını ve kuvvet marjını bildirir.

### 6. Hareket, hacim ve debi

- Yağ hacmi: `V = A × L`
- Gerekli debi: `Q = A × v`
- Tek yön strok süresi: `t = L / v`

Piston ve mil tarafı hacimleri/debileri ayrı raporlanır. Bunlar teorik geometrik değerlerdir; kaçak, sıkışabilirlik, hat hacmi ve valf kayıpları dahil değildir.

### 7. Doğrulama

Hatalı veya fiziksel açıdan anlamsız girişlerde sonuç üretilmez. Hata ilgili alanın altında açıklanır. Hesaplama motoru (`engine.js`) arayüzden (`app.js`) ayrıdır; böylece başka arayüzlere veya ileride bir API'ye taşınabilir.

### 8. Otomatik testler

Node.js kuruluysa:

```bash
npm test
```

Testler; bar/psi dönüşümünü, alanları, karşı basınçlı itme/çekme kuvvetini, çoklu silindiri, hedef çapı, mil çapı alt sınırını, hacim/debi hesabını ve sınır doğrulamalarını kapsar. Buna ek olarak 100 farklı parametrik senaryo doğrudan formül sonuçlarıyla karşılaştırılır.

## Paylaşım

En kolay yöntem `sdm-hidrolik-hesaplama-v1.2.0.zip` paketini e-posta veya kurumsal dosya paylaşımıyla göndermektir. Alıcı ZIP'i açıp `hidrolik-hesaplama/index.html` dosyasına çift tıklar; kurulum veya internet bağlantısı gerekmez.

Kurumsal kullanım için klasör aynı yapıyla bir statik web sunucusuna, SharePoint doküman alanına veya şirket içi web sunucusuna da konabilir. Dışarı açık yayın yapılacaksa şirket onayı, erişim kontrolü ve sürüm yönetimi eklenmelidir.

## Dosya yapısı

- `index.html`: Erişilebilir kullanıcı arayüzü ve rapor görünümü
- `styles.css`: Masaüstü, mobil ve yazdırma tasarımı
- `engine.js`: Saf hesaplama ve doğrulama motoru
- `engine.module.js`: Otomatik testlerde kullanılan modül sürümü
- `app.js`: Ekran olayları, sonuç gösterimi ve CSV dışa aktarma
- `engine.test.mjs`: Bağımsız otomatik testler
- `package.json`: Test ve çalıştırma komutları

## Üretime geçmeden önce zorunlu doğrulamalar

1. SDM konu uzmanı formülleri, katsayıları ve birim tanımlarını yazılı onaylamalıdır.
2. En az üç normal, iki sınır ve iki geçersiz girişten oluşan referans hesap seti sağlanmalıdır.
3. Karşı basınç, sürtünme kaybı, dinamik yük, basınç darbesi, tolerans ve burkulma kapsam kararları verilmelidir.
4. Çalışma basıncı ile maksimum basınç ayrımı tanımlanmalıdır.
5. Onaylı referans sonuçlar otomatik regresyon testlerine eklenmelidir.
6. Kullanıcı rolleri, kayıt saklama süresi ve rapor onay akışı belirlenmelidir.

## Kapsam sınırı

Bu sürüm bir karar destek pilotudur. Silindir/kolon burkulması, malzeme dayanımı, bağlantı elemanları, hız/debi, sıcaklık, kaçak, darbe yükü, karşı basınç ve komponent katalog seçimi yapmaz. Tek başına üretim veya iş güvenliği kararı için kullanılmamalıdır.
