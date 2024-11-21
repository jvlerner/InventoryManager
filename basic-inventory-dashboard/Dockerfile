# Usar uma imagem base com Node.js
FROM node:22-bullseye AS builder

WORKDIR /app

COPY . .
RUN npm ci
RUN npm run build

FROM node:22-bullseye

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOST=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app
COPY --from=builder /app .

USER root
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "start"]