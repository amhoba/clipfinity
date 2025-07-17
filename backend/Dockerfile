FROM node:22-slim AS dev

USER root
RUN apt update -y && apt install netcat-openbsd curl iputils-ping procps -y

USER root
RUN mkdir /assets && chown node:node /assets

USER root
RUN npm install -g pnpm @nestjs/cli

USER node
RUN echo 'alias l="ls -lh"\nalias ll="ls -alF"' >> ~/.bashrc

USER node
WORKDIR /assets
EXPOSE 3000
CMD ["bash", "-li", "entrypoint.sh"]

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000/health || exit 1

#
#
#
#
#

FROM dev AS prod

USER node
ADD --chown=node:node assets/ .
RUN pnpm i
RUN pnpm build