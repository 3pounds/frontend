# Usa la imagen oficial de Apache (httpd)
FROM httpd:2.4

# Copia los archivos HTML al directorio donde Apache sirve contenido
COPY ./public-html/ /usr/local/apache2/htdocs/

# Copia un archivo de configuración personalizado para exponer ambos puertos
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf

# Expone los puertos 80 y 8080
EXPOSE 80 8080