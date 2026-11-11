import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadEnv } from "vite";

const env = loadEnv("production", process.cwd(), "VITE_");
const apiBaseUrl = (
  env.VITE_API_URL || "https://calculatoralpha.com/backend/api"
).replace(/\/+$/, "");
const sitemapUrl = new URL(`${apiBaseUrl}/sitemap`);
sitemapUrl.searchParams.set("format", "xml");
sitemapUrl.searchParams.set("_build", Date.now().toString());

const response = await fetch(sitemapUrl, {
  headers: { "Cache-Control": "no-cache" },
});

if (!response.ok) {
  throw new Error(`Sitemap API returned HTTP ${response.status}`);
}

const sitemap = await response.text();
if (
  !/<urlset\b[^>]*>[\s\S]*<\/urlset>/i.test(sitemap) ||
  !/<loc>https?:\/\//i.test(sitemap)
) {
  throw new Error("Sitemap API returned invalid XML");
}

const outputPath = path.resolve("dist", "sitemap.xml");
await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, sitemap, "utf8");

const urlCount = (sitemap.match(/<url(?:\s|>)/gi) || []).length;
console.log(`Updated ${outputPath} with ${urlCount} database URLs`);
