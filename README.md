# Web LAB-1- Hello Project

 ## Hakkinda
 Bu proje, Web Tasarimi ve Programlama dersi LAB-1 kapsaminda
 Vite + React + TypeScript kullanilarak olusturulmustur.

 ## Gelistirici
- **Ad Soyad:** [Eylem Etli]
- **Ogrenci No:** [230541302]

 ## Kullanilan Teknolojiler
- React 18
- TypeScript
- Vite

 ## Kurulum
 ```bash
 npm install
 ```

 ## Calistirma
 ```bash
 npm run dev
 ```

 ## Ekran Goruntusu
 ![Uygulama Görünümü(1)](assets/screenshot.png)
 ![Lighthouse Raporu](src/assets/Lighthouse.png)

 ## Özellikler
  -Semantik HTML5 (header, nav, main, section, footer)
  -Accessibility iyileştirmeleri
  -Skip link ile klavye navigasyonu
  -Lighthouse ile erişilebilirlik testi
  -Feature branch + çoklu commit akışı

  ## LAB-3 Notları

### Yapılanlar
- Design tokens (CSS değişkenleri) eklendi (`src/styles/tokens.css`)
- Responsive proje kartları (grid) uygulandı
- Navigasyon küçük ekranlara uyumlu hale getirildi
- İletişim formu için erişilebilir istemci tarafı doğrulama eklendi (hata mesajları + aria-invalid)
- Projeler için erişilebilir modal eklendi (buton ile açma, dışarı tıklayınca kapama, ESC ile kapama, modal açılınca focus yönetimi)

## LAB-4 Notları

- Tailwind CSS v4 kuruldu ve Vite plugin ile yapılandırıldı.
- `src/index.css` içinde `@theme` ile renk tokenları tanımlandı (primary/secondary/accent/surface/muted).
- Tekrar kullanılabilir `Button` bileşeni eklendi (`src/components/Button.tsx`) ve varyantlı kullanım yapıldı.
- Modal stilleri Tailwind utility class’larıyla düzenlendi.

### Çalıştırma
```bash
npm install
npm run dev