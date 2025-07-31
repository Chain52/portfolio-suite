import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Transform } from 'node:stream';

import express from 'express';

import type { ViteDevServer } from 'vite';
import type {
  PipeableStream,
  RenderToPipeableStreamOptions
} from 'react-dom/server';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.VITE_PORT || 3000;
const base = process.env.VITE_BASE_URL || '/';
const ABORT_DELAY = 10000;

// Cached production assets
const templateHtml = isProduction
  ? await readFile('./dist/client/index.html', 'utf-8')
  : '';

// Create http server
const app = express();
const workspace = process.cwd();

app.use(express.static(path.join(workspace, 'public')));
app.use('/static', express.static(path.join(workspace, 'dist', 'static')));

// Add Vite or respective production middlewares
let vite: ViteDevServer;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    let render: (
      _url: string,
      options?: RenderToPipeableStreamOptions
    ) => PipeableStream;
    if (!isProduction) {
      // Always read fresh template in development
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      // @ts-expect-error dist will exist in Prod env
      render = (await import('./dist/server/entry-server.js')).render;
    }

    let didError = false;

    const { pipe, abort } = render(url, {
      onShellError() {
        res.status(500);
        res.set({ 'Content-Type': 'text/html' });
        res.send('<h1>Something went wrong</h1>');
      },
      onShellReady() {
        res.status(didError ? 500 : 200);
        res.set({ 'Content-Type': 'text/html' });

        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            res.write(chunk, encoding);
            callback();
          }
        });

        pipe(transformStream);
      },
      onError(error) {
        didError = true;
        console.error('🔥 render error:', error);
      }
    });

    setTimeout(() => {
      abort();
    }, ABORT_DELAY);
  } catch (e) {
    const err = e as Error;
    vite?.ssrFixStacktrace(err);
    console.log(err.stack);
    res.status(500).end(err.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

// import express from 'express';
// import { readFile } from 'node:fs/promises';
// import type { ViteDevServer } from 'vite';

// const isProd = process.env.VITE_NODE_ENV === 'production';
// const PORT = Number(process.env.VITE_PORT) || 3000;
// const BASE_URL = process.env.VITE_BASE_URL || '/';
// const HOST = process.env.VITE_HOST_NAME || 'http://localhost';

// const templateHtml = isProd
//   ? await readFile('./dist/client/index.html', 'utf-8')
//   : '';

// const app = express();

// let vite: ViteDevServer | undefined;
// if (!isProd) {
//   const { createServer } = await import('vite');
//   vite = await createServer({
//     server: { middlewareMode: true },
//     appType: 'custom',
//     base: BASE_URL
//   });
//   app.use(vite.middlewares);
// } else {
//   const compression = (await import('compression')).default;
//   const sirv = (await import('sirv')).default;
//   app.use(compression());
//   app.use(BASE_URL, sirv('./dist/client', { extensions: [] }));
// }

// app.use('*all', async (req, res) => {
//   try {
//     const url = req.originalUrl.replace(BASE_URL, '');

//     let template: string;
//     let render: (url: string) => Promise<{ html: string; head: string }>;

//     if (!isProd && vite) {
//       template = await readFile('./index.html', 'utf-8');
//       template = await vite.transformIndexHtml(url, template);
//       render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
//     } else {
//       template = templateHtml;
//       // @ts-expect-error dist will exist in Prod env
//       render = (await import('./dist/server/entry-server.js')).render;
//     }

//     const rendered = await render(url);

//     const html = template
//       .replace(`<!--app-head-->`, rendered.head ?? '')
//       .replace(`<!--app-html-->`, rendered.html ?? '');

//     res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
//   } catch (e) {
//     const err = e as Error;
//     vite?.ssrFixStacktrace(err);
//     console.log(err.stack);
//     res.status(500).end(err.stack);
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server started at ${HOST}:${PORT}`);
// });
