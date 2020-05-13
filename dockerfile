FROM nginx:1.17

MAINTAINER Theethawat

LABEL "version"="1.0.0"

RUN apt-get update && apt-get install -y \
    nano
    
COPY src /usr/share/nginx/html

EXPOSE 80