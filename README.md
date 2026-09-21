# SDM Mühendislik Hesap Araçları

SDM Research & Engineering için hazırlanmış, Türkçe ve İngilizce kullanılabilen tarayıcı tabanlı ön hesap araçlarıdır. Sunucu, veritabanı veya kurulum gerektirmez.

## Modüller

- Hidrolik silindir hesabı
- Cıvata ön yük ve sıkma torku hesabı

Seçilen dil tarayıcıda saklanır ve modüller arasında korunur. Her iki modül de birim dönüşümü, CSV çıktısı ve yazdırılabilir/PDF rapor desteği içerir.

## GitHub Pages yayını

1. Bu klasörün **içindeki tüm dosya ve klasörleri** `SuedaMehmetAksit/EngineeringTools` deposunun ana dizinine yükleyin.
3. Depoda **Settings → Pages** bölümünü açın.
4. **Build and deployment** altında kaynak olarak **Deploy from a branch** seçin.
5. Branch olarak `main`, klasör olarak `/ (root)` seçip kaydedin.
6. GitHub birkaç dakika içinde `https://suedamehmetaksit.github.io/EngineeringTools/` adresini üretir.

Bağlantılar göreli yollarla tanımlandığı için site proje deposu altında da doğru çalışır.

Yerel önizleme için ana klasördeki `index.html` dosyasını açın. Modül bağlantıları doğrudan ilgili `index.html` dosyasına gider; klasör listesi açılmaz.

## Yapı

- `index.html`: Profesyonel uygulama kataloğu ve araç seçimi
- `hidrolik/`: Hidrolik silindir hesaplama
- `civata/`: Cıvata ön yük ve tork hesaplama
- `assets/`: Ortak SDM logosu
- `i18n.js`, `i18n-extra.js`, `lang.css`: Türkçe/İngilizce dil altyapısı

## Yayın öncesi not

Logo ve firma adının herkese açık kullanım yetkisini doğrulayın. Uygulamalar ön hesap aracıdır; mühendislik onayı uyarıları korunmalıdır.
