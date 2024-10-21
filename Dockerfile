# Usa una imagen base de nginx
FROM nginx:alpine

# Copia tu archivo HTML a la ubicación estándar de Nginx
COPY index.html /usr/share/nginx/html/

# Expone el puerto 80 para que el contenedor sirva el sitio web
EXPOSE 80

# Comando por defecto que ejecuta Nginx
CMD ["nginx", "-g", "daemon off;"]