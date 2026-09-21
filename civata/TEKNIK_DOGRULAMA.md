# Cıvata Ön Yük ve Tork - Teknik Doğrulama

Sürüm: 1.0.0  
Hazırlayan: Süeda § Mehmet Akşit

Referans senaryo: M12×1,75, çekme alanı 84,27 mm², kanıt dayanımı 600 MPa, hedef oran %75, K = 0,20.

| Sonuç | Doğrulanan değer |
|---|---:|
| Kanıt yükü | 50,562 kN |
| Hedef ön yük | 37,9215 kN |
| Gerekli tork | 91,0116 N·m |
| Hedef çekme gerilmesi | 450 MPa |
| Kanıt yükü kullanımı | %75 |

Yazılım temel ve geçersiz sınır testlerinden geçirilmiş; ayrıca 100 farklı çap, adım, dayanım, oran, K ve adet kombinasyonu bağımsız formüllerle karşılaştırılmıştır. Otomatik alan, mm/in dönüşümü ve uygulanan torktan ters ön yük hesabı gerçek tarayıcıda doğrulanmış; konsol hatası görülmemiştir.

Bu doğrulama, tanımlanmış basitleştirilmiş modelin yazılım tarafından doğru uygulandığını gösterir. Tork katsayısı K’nın gerçek bağlantı ve yağlama koşulları için deneysel veya onaylı kaynaktan belirlenmesi gerekir. Sonuç tek başına üretim, yorulma veya iş güvenliği onayı değildir.
