# SDM Mühendislik Hesap Araçları

SDM Research & Engineering için hazırlanmış, Türkçe ve İngilizce kullanılabilen tarayıcı tabanlı ön hesap araçlarıdır. Sunucu, veritabanı veya kurulum gerektirmez.

https://github.com/user-attachments/assets/f4e3e3f0-c2a4-46c0-9291-185995103ec4

https://github.com/user-attachments/assets/6e898b59-a5ac-4bb8-8965-2e1ba3580463

https://github.com/user-attachments/assets/81493616-8a58-4581-98df-8cbb74611cc8




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
