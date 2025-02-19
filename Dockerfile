FROM node:22.12.0

WORKDIR /src

# Copiar archivos y paquetes
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación (si usa TypeScript)
RUN npm run build

# Exponer el puerto (usando la variable de entorno)
EXPOSE ${PORT}

# Iniciar el backend
CMD ["npm", "run", "start"]
