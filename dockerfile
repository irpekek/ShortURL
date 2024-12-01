FROM denoland/deno:2.1.2

WORKDIR /usr/src/app

COPY --chown=deno:deno . .

RUN deno cache --reload --lock=deno.lock main.ts

USER deno

EXPOSE 5000

CMD [ "deno", "run", "-A", "--cached-only", "main.ts" ]
