# SDM Cıvata Ön Yük ve Tork Hesabı

Tamamen çevrimdışı çalışan bağımsız mühendislik pilotudur. `index.html` dosyasına çift tıklayarak açılır; ERP, cihaz, firma ağı veya sunucu erişimi istemez.

## Hesaplar

- Yaklaşık ISO metrik çekme gerilme alanı: `At = π/4 × (d - 0,9382p)²`
- Kanıt yükü: `Fp = Sp × At`
- Hedef ön yük: `Fön = β × Fp`
- Gerekli tork: `T = K × Fön × d`
- Uygulanan torktan tahmini ön yük: `F = T / (K × d)`
- Çoklu cıvata toplam sıkma kuvveti
- K için ±%20 tork hassasiyet aralığı

## Önemli sınır

Basitleştirilmiş `T = KFd` modeli kullanılır. K değeri yağlama, kaplama, diş ve başaltı sürtünmesine bağlıdır. Bağlantı rijitliği, dış yük paylaşımı, yorulma, gevşeme, gömülme ve sıcaklık dahil değildir. Üretim öncesi SDM mühendisi standart, alan, dayanım, hedef oran ve K değerini onaylamalıdır.

## Test

`npm test` komutu temel, sınır ve 100 parametrik senaryoyu doğrular.
