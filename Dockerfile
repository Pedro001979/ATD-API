# Imagem oficial do Node.js
FROM node:22-alpine

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm ci

# Copia todo o projeto
COPY . .

# Comando que será executado ao iniciar o container
CMD ["npm", "test"]