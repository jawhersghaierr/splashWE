FROM registry-pull.viamedis.fr/nginx:alpine

COPY dist/ /usr/share/nginx/html/

COPY nginx/nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /etc/nginx/logs

CMD /bin/sh -c "exec nginx"