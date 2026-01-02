import { randomUUID } from 'crypto';
import { TradeOffer, TradeAssets } from './trades.types.js';
import { acquireLock, releaseLocksByTrade } from '../locks/locks.service.js';

const trades = new Map<string, TradeOffer>();

export function createTradeOffer(
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

  // 🔒 Lock offered items
  offer.items?.forEach(item => {
    acquireLock(
      createdBy,
      'item',
      item.itemId,
      trade.id
    );
  });

  // 🔒 Lock offered currencies
  offer.currencies?.forEach(currency => {
    acquireLock(
      createdBy,
      'currency',
      currency.currency,
      trade.id
    );
  });

  trades.set(trade.id, trade);
  return trade;
}

export function getTradeById(id: string): TradeOffer | undefined {
  return trades.get(id);
}

export function listOpenTrades(): TradeOffer[] {
  return Array.from(trades.values()).filter(
    trade => trade.status === 'open'
  );
}