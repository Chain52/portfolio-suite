import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tailwindcss()],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    server: {
      host: env.VITE_HOST,
      port: Number(env.VITE_PORT)
    },
    resolve: {
      alias: {
        '@sudoku-frontend': path.resolve(__dirname, 'src'),
        '@portfolio/ui': path.resolve(__dirname, '../../../../lib/ui/src')
      }
    }
  };
});
