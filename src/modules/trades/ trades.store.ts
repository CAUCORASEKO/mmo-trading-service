// src/modules/trades/trades.store.ts

import type { TradeOffer } from './trades.types.js';

const trades = new Map<string, TradeOffer>();

export function setTrade(trade: TradeOffer) {
  trades.set(trade.id, trade);
}

export function getTradeById(id: string): TradeOffer | undefined {
  return trades.get(id);
}

export function listTrades(): TradeOffer[] {
  return Array.from(trades.values());
}