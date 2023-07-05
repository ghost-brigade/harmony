FROM docker.io/nginx:stable-alpine
COPY apps/client/nginx.conf /etc/nginx/nginx.conf
COPY dist/apps/client/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
