# Node.js LTS sürümü (Alpine tabanlı hafif imaj)
FROM node:20-alpine

# Uygulama çalışma dizinini ayarla
WORKDIR /usr/src/app

# Bağımlılık manifestolarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Kaynak kodları çalışma dizinine kopyala
COPY . .

# Uygulama portu
EXPOSE 5000

# Varsayılan ortam değişkenleri
ENV NODE_ENV=development
ENV PORT=5000

# Uygulamayı başlat
CMD ["npm", "start"]
