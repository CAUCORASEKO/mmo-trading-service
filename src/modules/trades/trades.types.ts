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
  | 'open'        // Trade visible, assets locked
  | 'locked'      // Being processed (accept in progress)
  | 'completed'   // Successfully executed
  | 'cancelled';  // Cancelled or expired

export interface TradeOffer {
  id: string;

  /** Player who created the trade */
  createdBy: string;

  /** Player who accepted the trade (when completed) */
  acceptedBy?: string;

  /** Assets offered by creator */
  offer: TradeAssets;

  /** Assets requested in return */
  request: TradeAssets;

  status: TradeStatus;

  createdAt: number;

  /** Optional expiration timestamp (for cleanup jobs) */
  expiresAt?: number;
}