# 🎓 Alumni Tracking System (Mezun Takip Sistemi)

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github&logoColor=white)](https://github.com/zhevadpal-dev/Alumni)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Alumni Tracking System**, üniversite ve eğitim kurumlarının mezunlarıyla olan bağlarını güçlendirmek, kariyer gelişimlerini izlemek ve mezunlar arasındaki iletişimi desteklemek amacıyla geliştirilen modern bir mezun takip ve yönetim platformudur.

Backend tarafında **Node.js**, veritabanı olarak ilişkisel veri yönetiminde güçlü ve güvenilir olan **PostgreSQL**, ortam bağımsız ve kolay dağıtım için **Docker** ve kaynak kod yönetimi için **GitHub** kullanılmaktadır.

---

## 🚀 Özellikler (Key Features)

- **👤 Mezun Profili Yönetimi:** Mezunların iletişim bilgileri, eğitim geçmişi, mezuniyet yılı ve güncel iş/pozisyon bilgileri.
- **💼 Kariyer ve İş İlanları:** Mezunlar ve kurumlar arasında staj/iş ilanı paylaşımı ve başvuru takibi.
- **📅 Etkinlik Yönetimi:** Mezunlar buluşması, seminerler, paneller ve katılım durumları.
- **🤝 Mezun Ağı & Mentorluk:** Mezunların birbiriyle iletişime geçebileceği, mentor-öğrenci/mezun eşleşmeleri yapabileceği ağ yapısı.
- **📊 Raporlama ve İstatistikler:** Mezunların sektör dağılımı, istihdam oranları ve bölgesel analizler.
- **🔐 Kimlik Doğrulama & Yetkilendirme:** JWT tabanlı güvenli oturum yönetimi ve rol bazlı erişim kontrolü (Öğrenci, Mezun, Yönetici).

---

## 🛠️ Teknoloji Yığını (Tech Stack)

| Alan | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Backend** | [Node.js](https://nodejs.org/) (Express / Fastify) | Hızlı, ölçeklenebilir ve asenkron RESTful API servisi |
| **Veritabanı** | [PostgreSQL](https://www.postgresql.org/) | Güvenilir ilişkisel veritabanı yönetimi |
| **Konteynerizasyon** | [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) | Ortamlar arası tutarlı geliştirme ve dağıtım |
| **Versiyon Kontrol** | [Git](https://git-scm.com/) & [GitHub](https://github.com/) | Kaynak kod kontrolü, issue takibi ve iş birliği |
| **Kimlik Doğrulama** | JWT (JSON Web Tokens) & bcrypt | Güvenli parola saklama ve token tabanlı oturum |

---

## 📁 Örnek Proje Mimarisi (Project Structure)

```text
Alumni/
├── src/
│   ├── config/          # Veritabanı ve ortam değişkenleri konfigürasyonu
│   ├── controllers/     # İstek yönlendiricileri ve iş mantığı kontrolü
│   ├── models/          # PostgreSQL modelleri / tabloları
│   ├── routes/          # RESTful API rotaları (auth, alumni, jobs, events)
│   ├── middlewares/     # Kimlik doğrulama, validasyon ve hata yakalama katmanları
│   ├── services/        # Veritabanı sorguları ve yardımcı servisler
│   └── app.js           # Uygulama başlangıç noktası
├── migrations/          # Veritabanı şema ve göç dosyaları (SQL / Knex / Prisma vb.)
├── Dockerfile           # Backend Node.js imajı için yapılandırma
├── docker-compose.yml   # Node.js uygulaması ve PostgreSQL veritabanı servisi
├── .env.example         # Örnek çevre değişkenleri
├── .gitignore           # Git tarafından takip edilmeyecek dosyalar
├── package.json         # Node.js bağımlılıkları ve scriptleri
└── README.md            # Proje dokümantasyonu
```

---

## ⚡ Kurulum ve Başlangıç (Getting Started)

### Ön Koşullar (Prerequisites)
- [Node.js](https://nodejs.org/) (v18 veya üzeri)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

---

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/zhevadpal-dev/Alumni.git
cd Alumni
```

---

### 2. Çevre Değişkenlerini Ayarlayın

Kök dizinde bir `.env` dosyası oluşturun:

```env
PORT=5000
NODE_ENV=development

# PostgreSQL Yapılandırması
DB_HOST=postgres
DB_PORT=5432
DB_NAME=alumni_db
DB_USER=alumni_user
DB_PASSWORD=alumni_secret_password

# JWT Yapılandırması
JWT_SECRET=super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
```

---

### 3. Docker ile Tek Komutla Çalıştırma (Önerilen) 🐳

PostgreSQL ve Node.js backend'i konteynerler halinde başlatmak için:

```bash
# Servisleri arka planda derle ve başlat
docker compose up -d --build

# Konteyner loglarını izlemek için
docker compose logs -f
```

Servisler ayağa kalktığında API `http://localhost:5000` üzerinden hizmet vermeye başlayacaktır.

---

### 4. Lokal Geliştirme (Local Development)

PostgreSQL'i yerel makinenizde veya sadece veritabanı konteyneri olarak çalıştırıp backend'i yerel çalıştırmak isterseniz:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirici modunda başlatın
npm run dev
```

---

## 📡 Temel API Uç Noktaları (Endpoints Preview)

### Temel Sunucu ve Laboratuvar Rotaları (Basic Lab Routes)
- `GET /` - API için `"ok"` yanıtı, tarayıcı veya ana sayfa için geçici metin (`"temporary one main page"`)
- `GET /home` veya `GET /main` - Geçici ana sayfa (`"temporary one main page"`)
- `GET /about` - Geçici hakkında sayfası (`"temp. about page"`)
- `GET /hello` - Selamlama (`"Hello, World!"`)
- `GET /hello/:name` - İsimli selamlama (Örn: `/hello/emre` -> `"Hello, Emre!"`)
- `GET /sum/:number1/:number2` - İki sayının toplamı (Örn: `/sum/10/20` -> `30`)
- `GET /api/health` - Sistem sağlık kontrolü JSON yanıtı

### Gelecek Mezun Yönetimi Rotaları (Alumni System Preview)
- `POST /api/auth/register` - Yeni mezun/kullanıcı kaydı
- `POST /api/auth/login` - Giriş yapma ve JWT token alma
- `GET /api/alumni` - Mezun listesini filtreleme ve arama
- `GET /api/alumni/:id` - Belirli bir mezunun profil detayları
- `PUT /api/alumni/:id` - Profil bilgilerini güncelleme
- `GET /api/jobs` - Aktif iş ve staj ilanları
- `POST /api/jobs` - Yeni iş ilanı paylaşma

---

## 🔒 Güvenlik & En İyi Uygulamalar

- Parolalar **bcrypt** ile hash'lenerek saklanır.
- Hassas veriler `.env` dosyalarında tutulur ve `.gitignore` ile depoya eklenmesi engellenir.
- SQL enjeksiyonlarına karşı parametrik sorgular veya modern ORM/Query Builder araçları kullanılır.
- CORS ve Helmet ile HTTP başlıkları güvence altına alınır.

---

## 🤝 Katkıda Bulunma (Contributing)

1. Bu depoyu Fork edin (`Fork` butonuna tıklayın).
2. Yeni bir özellik dalı oluşturun:
   ```bash
   git checkout -b feature/yeni-ozellik
   ```
3. Değişikliklerinizi commit edin:
   ```bash
   git commit -m "feat: Yeni mezun arama filtresi eklendi"
   ```
4. Dalınıza push yapın:
   ```bash
   git push origin feature/yeni-ozellik
   ```
5. GitHub üzerinden bir **Pull Request** açın.

---

## 📄 Lisans

Bu proje [MIT](LICENSE) lisansı ile lisanslanmıştır.