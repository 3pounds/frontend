# Usa una imagen base de Node.js
FROM node:18-alpine

# Instala `serve`, una herramienta ligera para servir archivos estáticos
RUN npm install -g serve

# Establece el directorio de trabajo
WORKDIR /app

# Copia el contenido del HTML a la carpeta /app
COPY . .

# Expone el puerto que usará `serve`
EXPOSE 8080

# Comando para servir los archivos estáticos
CMD ["serve", "-s", ".", "-l", "8080"]