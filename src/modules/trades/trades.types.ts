export type CurrencyType = 'gold' | 'gems';

export interface TradeItem {
  itemId: string;
  quantity: number;
}

export interface TradeCurrency {
  currency: CurrencyType;
  amount: number;
}

export interface TradeAssets {
  items?: TradeItem[];
  currencies?: TradeCurrency[];
}

export type TradeStatus =
  | 'open'
  | 'locked'
  | 'completed'
  | 'cancelled';

export interface TradeOffer {
  id: string;
  createdBy: string; // playerId
  offer: TradeAssets;
  request: TradeAssets;
  status: TradeStatus;
  createdAt: number;
  expiresAt?: number;
}