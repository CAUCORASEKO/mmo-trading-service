import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {
  createTradeOffer,
  getTradeById,
  listOpenTrades
} from './trades.service.js';

export async function tradesRoutes(app: FastifyInstance) {
  // 🔒 Auth hook local (garantizado)
  app.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch {
      reply.code(401).send({ error: 'Unauthorized' });
    }
  });

  // Create trade
  app.post('/trades', async (request, reply) => {
    const user = request.user as { id: string };

    const { offer, request: requestedAssets } = request.body as {
      offer: any;
      request: any;
    };

    if (!offer || !requestedAssets) {
      return reply.code(400).send({ error: 'Invalid trade payload' });
    }

    const trade = createTradeOffer(
      user.id,
      offer,
      requestedAssets
    );

    return trade;
  });

  // Get trade by id
  app.get('/trades/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const trade = getTradeById(id);
    if (!trade) {
      return reply.code(404).send({ error: 'Trade not found' });
    }

    return trade;
  });

  // List open trades
  app.get('/trades', async () => {
    return listOpenTrades();
  });
}