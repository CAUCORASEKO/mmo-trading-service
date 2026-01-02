import { randomUUID } from 'crypto';
import { TradeOffer, TradeAssets } from './trades.types.js';

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