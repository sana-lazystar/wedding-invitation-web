#!/usr/bin/env node
/**
 * 조립본(docs/artifacts/*.html)을 Artifact 발행용 사본으로 바꿉니다(디자인 결정 4).
 * Artifact 샌드박스는 외부 이미지 로딩을 막으므로, HTML이 상대 경로로 참조하는 로컬 이미지를
 * 웹 크기(기본 최대 1080px)로 줄여 data URI로 인라인합니다. 문서 껍데기(<html><head><body>)는
 * 벗기고 <title>·<link>·<style>·본문·<script>만 남깁니다. Artifact 도구가 껍데기를 다시 씌웁니다.
 *
 * 사용: node docs/scripts/inline-artifact.mjs <입력.html> <출력.html> [--max-width 1080] [--title "제목"]
 * 축소는 macOS 내장 sips를 씁니다(작은 이미지는 키우지 않음). 없으면 원본 크기 그대로 인라인합니다.
 * --title을 주면 출력의 <title>을 바꿉니다(갤러리에서 사이트 제목과 구분하려 할 때). 의존성 0.
 */
import { readFileSync, writeFileSync, mkdtempSync, existsSync, statSync } from 'node:fs';
import { dirname, resolve, extname, basename, join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const positional = [];
for (let i = 0; i < args.length; i += 1) { if (args[i].startsWith('--')) { i += 1; continue; } positional.push(args[i]); }
const [input, output] = positional;
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const MAX_W = Number(opt('--max-width') || 1080);
const TITLE = opt('--title');
if (!input || !output) { console.error('사용: node docs/scripts/inline-artifact.mjs <입력.html> <출력.html> [--max-width 1080]'); process.exit(1); }

const base = dirname(resolve(input));
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml' };
let sips = true;
try { execFileSync('sips', ['--version'], { stdio: 'ignore' }); } catch { sips = false; }
const work = mkdtempSync(join(tmpdir(), 'inline-artifact-'));
const cache = new Map();

function inline(rel) {
  if (cache.has(rel)) return cache.get(rel);
  const abs = resolve(base, rel);
  const ext = extname(abs).toLowerCase();
  if (!MIME[ext] || !existsSync(abs)) return null;
  let src = abs;
  if (sips && ext !== '.svg') {
    let w = 0, h = 0;
    try {
      const info = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', abs], { encoding: 'utf8' });
      w = Number((info.match(/pixelWidth:\s*(\d+)/) || [])[1]); h = Number((info.match(/pixelHeight:\s*(\d+)/) || [])[1]);
    } catch { /* 크기를 못 읽으면 원본 사용 */ }
    if (Math.max(w, h) > MAX_W) {
      const out = join(work, basename(abs));
      try { execFileSync('sips', ['-Z', String(MAX_W), abs, '--out', out], { stdio: 'ignore' }); src = out; } catch { src = abs; }
    }
  }
  const uri = `data:${MIME[ext]};base64,${readFileSync(src).toString('base64')}`;
  cache.set(rel, uri);
  console.error(`  ${rel} → ${(statSync(src).size / 1024).toFixed(0)}KB`);
  return uri;
}

let html = readFileSync(input, 'utf8');
const isLocal = (p) => !/^(https?:|data:|\/\/|#)/i.test(p);
html = html.replace(/(src|href)=(["'])([^"']+)\2/g, (m, attr, q, p) => {
  if (!isLocal(p)) return m;
  const uri = inline(p);
  return uri ? `${attr}=${q}${uri}${q}` : m;
});
html = html.replace(/url\((["']?)([^"')]+)\1\)/g, (m, q, p) => {
  if (!isLocal(p)) return m;
  const uri = inline(p);
  return uri ? `url(${q}${uri}${q})` : m;
});

// 껍데기 벗기기
const head = (html.match(/<head[^>]*>([\s\S]*?)<\/head>/i) || [, ''])[1];
const body = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || [, html])[1];
const keep = [];
for (const re of [/<title>[\s\S]*?<\/title>/gi, /<link\b[^>]*>/gi, /<style\b[\s\S]*?<\/style>/gi]) {
  for (const m of head.match(re) || []) keep.push(m);
}
let result = keep.join('\n') + '\n' + body.trim() + '\n';
if (TITLE) result = result.replace(/<title>[\s\S]*?<\/title>/i, `<title>${TITLE}</title>`);
writeFileSync(output, result);
console.error(`✓ ${output} (${(result.length / 1024).toFixed(0)}KB, 이미지 ${cache.size}개 인라인)`);
