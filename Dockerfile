FROM registry-pull.viamedis.fr/viamedis/nginx-for-app:stable

COPY dist/ /usr/share/nginx/html/
COPY public_template/ /usr/share/nginx/html_template/
CMD envsubst < /usr/share/nginx/html_template/modules.js > /usr/share/nginx/html/modules.js && nginx
