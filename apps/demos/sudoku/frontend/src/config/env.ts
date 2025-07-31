export const isProd = import.meta.env.VITE_NODE_ENV === 'production';
export const PORT = Number(import.meta.env.VITE_PORT) || 3000;
export const BASE_URL = import.meta.env.VITE_BASE_URL || '/';
export const HOST = import.meta.env.VITE_HOST_NAME || 'localhost';

export const SUDOKU_API_URL =
  import.meta.env.SUDOKU_API_URL || `http://${HOST}:${PORT}/api`;
