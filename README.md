# SDM Mühendislik Hesap Araçları

SDM Mühendislik Hesap Araçları; mühendislik ekiplerinin ön boyutlandırma, teknik değerlendirme ve hesap raporlama çalışmalarını daha hızlı ve düzenli gerçekleştirebilmesi için hazırlanmış web tabanlı bir ürün ailesidir.

Uygulama Türkçe ve İngilizce kullanılabilir. Sunucu, veritabanı veya kurulum gerektirmez; standart bir internet tarayıcısı üzerinden çalışır.

## Ürün Tanıtımı

### Ana Sayfa ve Modül Seçimi

https://github.com/user-attachments/assets/f4e3e3f0-c2a4-46c0-9291-185995103ec4

### Hidrolik Silindir Hesabı

https://github.com/user-attachments/assets/6e898b59-a5ac-4bb8-8965-2e1ba3580463

### Cıvata Ön Yük ve Tork Hesabı

https://github.com/user-attachments/assets/81493616-8a58-4581-98df-8cbb74611cc8

## Ürünün Amacı

Ürün, mühendislik projelerinde sık kullanılan hesapları tek bir kurumsal arayüz altında toplar. Kullanıcılar gerekli teknik değerleri girerek sonuçları anında görüntüleyebilir, farklı ölçü birimleri arasında geçiş yapabilir ve hesap sonuçlarını raporlayabilir.

Başlıca kullanım alanları:

- Konsept tasarım
- Ön boyutlandırma
- Teknik teklif hazırlığı
- Alternatif sistem karşılaştırması
- Test düzeneği planlaması
- Mühendislik kontrolü ve dokümantasyonu

## Hesaplama Modülleri

### Hidrolik Silindir Hesabı

Hidrolik silindirlerin kuvvet, çap, hareket ve yağ ihtiyacı hesaplarını gerçekleştiren ön boyutlandırma aracıdır.

Hesaplanan başlıca değerler:

- Piston tarafı teorik ve emniyetli itme kuvveti
- Mil tarafı teorik ve emniyetli çekme kuvveti
- Karşı basınç etkisi
- Verim ve emniyet katsayısı etkisi
- Birden fazla silindirin toplam kuvveti
- Hedef kuvvet için gerekli piston çapı
- Piston ve mil tarafı yağ hacmi
- İtme ve çekme yönü için gerekli debi
- Tahmini strok süresi

Araç; bar, MPa, psi, milimetre, inç, Newton, kilonewton, kilogram-kuvvet ve pound-kuvvet gibi farklı ölçü birimlerini destekler.

### Cıvata Ön Yük ve Tork Hesabı

Cıvatalı bağlantılarda hedef ön yük ile gerekli sıkma torku arasındaki ilişkiyi değerlendiren hesaplama aracıdır.

Hesaplanan başlıca değerler:

- Cıvata çekme gerilme alanı
- Kanıt yükü
- Hedef ön yük
- Gerekli sıkma torku
- Toplam sıkma kuvveti
- Hedef çekme gerilmesi
- Kanıt dayanımı kullanım oranı
- Uygulanan torktan tahmini ön yük
- Tork katsayısı değişiminin sonuçlara etkisi

Çekme gerilme alanı kullanıcı tarafından girilebilir veya nominal çap ve diş adımı kullanılarak yaklaşık olarak hesaplanabilir.

## Ürün Özellikleri

- Türkçe ve İngilizce kullanıcı arayüzü
- Araçlar arasında kolay geçiş
- SDM kurumsal tasarım dili
- Anlık ve otomatik hesaplama
- Değiştirilebilir ölçü birimleri
- Proje ve hesap numarası alanları
- Hesabı hazırlayan kişi bilgisi
- CSV formatında sonuç çıktısı
- Yazdırılabilir ve PDF olarak kaydedilebilir rapor
- Masaüstü, tablet ve mobil cihazlarla uyumlu arayüz
- Sunucu bağlantısı gerektirmeyen çalışma yapısı
- Kullanıcı verilerini harici bir sisteme göndermeyen yerel hesaplama

Seçilen dil tarayıcıda saklanır ve hesaplama modülleri arasında korunur.

## Canlı Uygulama

Ürüne aşağıdaki bağlantı üzerinden erişilebilir:

**https://suedamehmetaksit.github.io/EngineeringTools/**

Ana sayfadan kullanılmak istenen hesaplama modülü seçilir. Girdi değerleri değiştirildiğinde sonuçlar otomatik olarak güncellenir. Üst menüde bulunan `TR / EN` seçeneğiyle uygulama dili değiştirilebilir.

## Teknik Yapı

Uygulama tamamen tarayıcı tarafında çalışan statik bir web ürünüdür.

- HTML
- CSS
- JavaScript
- Harici veritabanı gerektirmez
- Kullanıcı hesabı gerektirmez
- Kurulum gerektirmez
- GitHub Pages üzerinden yayınlanabilir
- İnternet bağlantısı olmadan yerel olarak çalıştırılabilir

Hesaplama motorları kullanıcı arayüzünden ayrı tutulmuştur. Bu yapı formüllerin test edilmesini, doğrulanmasını ve ürüne yeni hesaplama modülleri eklenmesini kolaylaştırır.

## Proje Yapısı

- `index.html`: Uygulama kataloğu ve modül seçimi
- `hidrolik/`: Hidrolik silindir hesaplama modülü
- `civata/`: Cıvata ön yük ve tork hesaplama modülü
- `assets/`: Ortak SDM marka varlıkları
- `i18n.js`: Temel Türkçe ve İngilizce çeviri altyapısı
- `i18n-extra.js`: Teknik ve dinamik metin çevirileri
- `lang.css`: Dil seçimi arayüzü

## Teknik Doğrulama

Her iki hesaplama motoru için temel hesaplar, sınır değerleri ve parametrik senaryolar içeren otomatik testler hazırlanmıştır.

- Hidrolik hesap motoru: temel, sınır ve 100 parametrik senaryo
- Cıvata hesap motoru: temel, sınır ve 100 parametrik senaryo
- Türkçe ve İngilizce arayüz kontrolleri
- Modüller arası bağlantı kontrolleri
- Dinamik sonuç ve doğrulama mesajı kontrolleri

## Mühendislik Sorumluluğu

Bu uygulamada sunulan sonuçlar ön boyutlandırma ve teknik değerlendirme amacı taşır.

Sonuçlar; detaylı mühendislik analizi, doğrulanmış üretici verisi, standart uygunluk kontrolü, sonlu elemanlar analizi, test, sertifikasyon veya yetkili mühendis onayının yerine geçmez.

Dinamik yükler, yorulma, toleranslar, sıcaklık etkileri, malzeme değişkenlikleri, basınç darbeleri, burkulma, bağlantı rijitliği ve üretim koşulları proje özelinde ayrıca değerlendirilmelidir.

Üretim, satın alma veya emniyet açısından kritik bir karar verilmeden önce girdiler, kullanılan yöntemler ve hesap sonuçları yetkili mühendis tarafından doğrulanmalıdır.

## Marka ve Kullanım Notu

SDM Research & Engineering logosunun, firma adının ve diğer kurumsal unsurların herkese açık kullanım ve yayın izinleri doğrulanmalıdır. Mühendislik sorumluluğu ve ön hesap uyarıları ürünün yayımlanan sürümlerinde korunmalıdır.

## Hazırlayanlar

**Süeda § Mehmet Akşit**

SDM Research & Engineering için mühendislik hesaplama ve dijital teknik araç geliştirme çalışmasıdır.

## Sürüm

**Sürüm 1.1.0**

Bu sürümde hidrolik silindir hesabı, cıvata ön yük ve tork hesabı, Türkçe–İngilizce dil desteği, birim dönüşümleri, CSV çıktısı ve yazdırılabilir raporlama özellikleri bulunmaktadır.
