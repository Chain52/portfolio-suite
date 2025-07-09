export default {
  HOST_SITE: process.env.HOST_SITE || 'http://localhost:3000',
  GAME_PORT: process.env.GAME_PORT ? parseInt(process.env.GAME_PORT, 10) : 3001
};
