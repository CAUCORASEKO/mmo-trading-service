export type LockAssetType = 'item' | 'currency';

export interface AssetLock {
  id: string;
  ownerId: string;
  assetType: LockAssetType;
  assetId: string;
  tradeId: string;
  expiresAt: number;
}