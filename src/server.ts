import { buildApp } from './app.js';

const app = buildApp();

const PORT = 3001;

app.listen({ port: PORT }, () => {
  console.log(`Trading service running on port ${PORT}`);
});