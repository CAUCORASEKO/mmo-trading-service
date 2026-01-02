import { buildApp } from './app.js';

async function start() {
  try {
    const app = buildApp();

    await app.listen({
      port: 3001,
      host: '0.0.0.0'
    });

    console.log('Trading service running on port 3001');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();