FROM registry-pull.viamedis.fr/nginx:alpine

RUN mkdir -p /etc/nginx/logs

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY dist/ /usr/share/nginx/html/
COPY public_template/ /usr/share/nginx/html_template/

CMD envsubst < /usr/share/nginx/html_template/modules.js > /usr/share/nginx/html/modules.js && nginx
