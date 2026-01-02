import { randomUUID } from 'crypto';
import { AssetLock } from './locks.types.js';

const locks = new Map<string, AssetLock>();

const LOCK_TTL_MS = 5 * 60 * 1000; // 5 minutos

export function acquireLock(
  ownerId: string,
  assetType: 'item' | 'currency',
  assetId: string,
  tradeId: string
): AssetLock {
  cleanupExpiredLocks();

  const existing = Array.from(locks.values()).find(
    lock =>
      lock.assetType === assetType &&
      lock.assetId === assetId &&
      lock.expiresAt > Date.now()
  );

  if (existing) {
    throw new Error('Asset already locked');
  }

  const lock: AssetLock = {
    id: randomUUID(),
    ownerId,
    assetType,
    assetId,
    tradeId,
    expiresAt: Date.now() + LOCK_TTL_MS
  };

  locks.set(lock.id, lock);
  return lock;
}

export function releaseLocksByTrade(tradeId: string) {
  for (const [id, lock] of locks.entries()) {
    if (lock.tradeId === tradeId) {
      locks.delete(id);
    }
  }
}

function cleanupExpiredLocks() {
  const now = Date.now();
  for (const [id, lock] of locks.entries()) {
    if (lock.expiresAt <= now) {
      locks.delete(id);
    }
  }
}