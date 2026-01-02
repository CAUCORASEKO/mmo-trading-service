import Fastify from 'fastify';
import { tradesRoutes } from './modules/trades/trades.routes.js';

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(tradesRoutes);

  app.get('/health', async () => ({
    status: 'ok',
    service: 'mmo-trading-service'
  }));

  return app;
}