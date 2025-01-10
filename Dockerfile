# Step 1: Install dependencies
FROM node:20 AS builder

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
