# Imagen base
FROM node:22-alpine

# Directorio de trabajo
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Exponer puerto de la API
EXPOSE 3001

# Arrancar la aplicación
CMD ["node", "./bin/www"]