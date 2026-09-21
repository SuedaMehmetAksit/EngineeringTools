# SDM Hidrolik Hesaplama - Teknik Doğrulama Kaydı

Sürüm: 1.2.0  
Doğrulama tarihi: 21 Eylül 2026  
Hazırlayan: Süeda § Mehmet Akşit

## Kullanılan temel ilişkiler

- Piston alanı: `Ap = πD² / 4`
- Mil tarafı net alan: `Ar = π(D² - d²) / 4`
- İtme teorik kuvveti: `Fpush = Ps × Ap - Pr × Ar`
- Çekme teorik kuvveti: `Fpull = Ps × Ar - Pr × Ap`
- Düzeltilmiş toplam kuvvet: `Fadj = Ftheoretical × η × n`
- Emniyetli toplam kuvvet: `Fsafe = Fadj / S`
- Yağ hacmi: `V = A × L`
- Debi: `Q = A × v`
- Strok süresi: `t = L / v`

`MPa × mm² = N`, `1 bar = 0,1 MPa`, `1 psi = 0,006894757293168 MPa` kullanılmıştır.

## Referans kontrol

Varsayılan değerler: D = 100 mm, d = 50 mm, Ps = 160 bar, Pr = 0 bar, η = %90, n = 1, S = 1,5.

| Sonuç | Beklenen |
|---|---:|
| Piston alanı | 7.853,9816 mm² |
| Mil tarafı net alan | 5.890,4862 mm² |
| Teorik itme | 125,6637 kN |
| Emniyetli itme | 75,3982 kN |
| Teorik çekme | 94,2478 kN |
| Emniyetli çekme | 56,5487 kN |

500 mm strok ve 50 mm/s hız için:

| Sonuç | Beklenen |
|---|---:|
| Piston tarafı hacim | 3,9270 L |
| Mil tarafı hacim | 2,9452 L |
| İtme debisi | 23,5619 L/dk |
| Çekme debisi | 17,6715 L/dk |
| Strok süresi | 10,0000 s |

## Uygulanan kontroller

- Normal değer, sıfır, negatif ve fiziksel olarak geçersiz girişler
- `0 ≤ d < D`, `0 ≤ Pr < Ps`, `0 < η ≤ 100`, `S ≥ 1`
- Bar, MPa, psi ve kuvvet dönüşümleri
- Çoklu silindir ve emniyet katsayısı etkisi
- Karşı basınç altında iki yönlü net kuvvet
- Hedef kuvvetten piston çapının ters hesabı
- Gerekli çap için mil çapı alt sınırı
- Hacim, debi ve strok süresi
- 100 farklı geometri/basınç/katsayı kombinasyonunun bağımsız formül karşılaştırması
- Tarayıcıda birim değiştirme, hata gösterimi, rapor görünümü ve konsol hatası kontrolü

Tüm otomatik ve etkileşimli kontroller başarılıdır.

## Mühendislik kapsam sınırı

Bu doğrulama yazılımın tanımlanmış formülleri doğru uyguladığını gösterir. Silindir malzeme dayanımı, mil burkulması, yataklama, conta sürtünmesi, tolerans, sıcaklık, basınç darbesi, dinamik yük, valf/hat kaybı, pompa seçimi ve komponent katalog uygunluğu kapsam dışıdır. Üretim veya iş güvenliği kararı öncesinde SDM konu uzmanı tarafından tasarım girdileri ve kabul değerleri onaylanmalıdır.
