// src/app.ts

// src/app.ts
import Fastify from 'fastify';
import authPlugin from './plugins/auth.plugin.js';
import { tradesRoutes } from './modules/trades/trades.routes.js';

export function buildApp() {
  const app = Fastify({ logger: true });

  // 🔐 AUTH FIRST
  app.register(authPlugin);

  // 📦 ROUTES AFTER
  app.register(tradesRoutes);

  app.get('/health', async () => ({
    status: 'ok',
    service: 'mmo-trading-service'
  }));

  return app;
}
