# Step 1: Install dependencies
FROM node:20 AS builder

# Definisci variabili di build (possono essere passate da GitHub Actions)
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG NEXT_PUBLIC_REDUX_SECRET
ARG NEXT_PUBLIC_BASE_API_URL
ARG NEXT_PUBLIC_BASE_AUDIO_STREAM
ARG NEXT_PUBLIC_BASE_VIDEO_STREAM

# Imposta le variabili di ambiente (disponibili al runtime)
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
ENV NEXT_PUBLIC_REDUX_SECRET=${NEXT_PUBLIC_REDUX_SECRET}
ENV NEXT_PUBLIC_BASE_API_URL=${NEXT_PUBLIC_BASE_API_URL}
ENV NEXT_PUBLIC_BASE_AUDIO_STREAM=${NEXT_PUBLIC_BASE_AUDIO_STREAM}
ENV NEXT_PUBLIC_BASE_VIDEO_STREAM=${NEXT_PUBLIC_BASE_VIDEO_STREAM}

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install --legacy-peer-deps

# Copia l'intero progetto nella directory di lavoro
COPY . .

# Compila l'app Next.js
RUN npm run build

# Installa solo le dipendenze di produzione
RUN npm prune --production

# Step 2: Run the application
FROM node:20-slim

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file necessari dalla fase precedente
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Espone la porta 3000
EXPOSE 3000

# Comando per avviare l'app
CMD ["npm", "start"]
