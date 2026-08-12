import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runVisualStoryAgent } from './engine.mjs';

const root = fileURLToPath(new URL('../public', import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };

const json = (response, status, payload) => {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
};

const server = createServer(async (request, response) => {
  try {
    if (request.method === 'GET' && request.url === '/api/health') {
      return json(response, 200, { ok: true, service: 'saylef-visual', version: '0.1.0' });
    }
    if (request.method === 'POST' && request.url === '/api/create') {
      let body = '';
      for await (const chunk of request) body += chunk;
      const input = body ? JSON.parse(body) : {};
      return json(response, 200, runVisualStoryAgent(input));
    }
    if (request.method === 'GET') {
      const requested = request.url === '/' ? '/index.html' : request.url.split('?')[0];
      const file = normalize(join(root, requested));
      if (!file.startsWith(root)) return json(response, 403, { error: 'forbidden' });
      const content = await readFile(file);
      response.writeHead(200, { 'content-type': mime[extname(file)] || 'application/octet-stream' });
      return response.end(content);
    }
    return json(response, 404, { error: 'not_found' });
  } catch (error) {
    return json(response, 400, { error: error.message });
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`saylef-visual listening at http://127.0.0.1:${port}`);
});
