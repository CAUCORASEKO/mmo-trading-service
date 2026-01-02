
// src/modules/trades/trades.routes.ts


import type { FastifyInstance } from 'fastify';
import { createTrade, completeTrade } from './trades.service.js';

export async function tradesRoutes(app: FastifyInstance) {

  app.post(
    '/trades',
    { preHandler: app.authenticate },
    async (request) => {
      const user = request.user as { id: string };
      const body = request.body as any;

      return createTrade(user.id, body.offer, body.request);
    }
  );

  app.post(
    '/trades/:id/complete',
    { preHandler: app.authenticate },
    async (request, reply) => {
      try {
        const user = request.user as { id: string };
        const { id } = request.params as { id: string };
        return completeTrade(id, user.id);
      } catch (e: any) {
        return reply.code(400).send({ error: e.message });
      }
    }
  );
}