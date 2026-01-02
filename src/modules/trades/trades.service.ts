// src/modules/trades/trades.service.ts


import { randomUUID } from 'crypto';
import type { TradeOffer, TradeAssets } from './trades.types.js';
import { setTrade, getTradeById } from './ trades.store.js';
import { acquireLock, releaseLocksByTrade } from '../locks/locks.service.js';

export function createTrade(
  createdBy: string,
  offer: TradeAssets,
  request: TradeAssets
): TradeOffer {
  const trade: TradeOffer = {
    id: randomUUID(),
    createdBy,
    offer,
    request,
    status: 'open',
    createdAt: Date.now()
  };

  offer.items?.forEach(i =>
    acquireLock(createdBy, 'item', i.itemId, trade.id)
  );

  offer.currencies?.forEach(c =>
    acquireLock(createdBy, 'currency', c.currency, trade.id)
  );

  setTrade(trade);
  return trade;
}

export function completeTrade(
  tradeId: string,
  acceptedBy: string
): TradeOffer {
  const trade = getTradeById(tradeId);

  if (!trade || trade.status !== 'open') {
    throw new Error('Trade not open');
  }

  trade.status = 'completed';
  (trade as any).acceptedBy = acceptedBy;

  releaseLocksByTrade(trade.id);
  return trade;
}