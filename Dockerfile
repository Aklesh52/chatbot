FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@10.32.1 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm exec next build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "pnpm db:migrate && pnpm exec next start -H 0.0.0.0 -p 3000"]
