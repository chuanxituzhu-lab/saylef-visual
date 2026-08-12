import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { handleCreateRequest } from "./dist/src/interfaces/rest.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PUBLIC = join(__dirname, "apps/web/public");
const PORT = Number(process.env.PORT || 4173);
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

function sendJson(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body, null, 2));
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/create") {
      let body = "";
      for await (const chunk of req) body += chunk;
      const parsed = body ? JSON.parse(body) : {};
      const result = handleCreateRequest(parsed);
      return sendJson(res, "error" in result ? 400 : 200, result);
    }

    if (req.method === "GET" && req.url === "/api/health") {
      return sendJson(res, 200, { status: "ok", phase: 7, mode: "host-first", architecture: "one-core-two-domains-one-intelligence", apiProviders: "reserved" });
    }

    const requested = req.url === "/" ? "/index.html" : req.url || "/index.html";
    const safePath = normalize(requested).replace(/^([.][.][/\\])+/, "");
    const filePath = join(PUBLIC, safePath);
    if (!filePath.startsWith(PUBLIC)) return sendJson(res, 403, { error: "forbidden" });
    const data = await readFile(filePath);
    res.writeHead(200, { "content-type": contentTypes[extname(filePath)] || "application/octet-stream" });
    res.end(data);
  } catch (error) {
    if (error?.code === "ENOENT") return sendJson(res, 404, { error: "not_found" });
    sendJson(res, 500, { error: error instanceof Error ? error.message : "server_error" });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Visual Story Studio running at http://127.0.0.1:${PORT}`);
});
