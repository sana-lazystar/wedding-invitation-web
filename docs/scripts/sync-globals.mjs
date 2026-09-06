#!/usr/bin/env node
/**
 * 조립본 docs/artifacts/index.html의 <style> 구간을 Next.js의 src/app/globals.css로 옮깁니다(WIW-4).
 * 조립본이 정본이고 globals.css는 파생물입니다. 조립본 CSS를 고친 뒤 이 스크립트를 돌립니다.
 * 글꼴 토큰만 바꿉니다. 조립본은 Google Fonts 이름, Next.js는 next/font가 만든 CSS 변수(src/app/layout.tsx).
 * 글꼴 확인 패널(.fontbar) CSS는 옮기지 않고, -webkit-backdrop-filter · -webkit-mask-image 중복 선언은 걷어냅니다(처리기가 접두사를 붙입니다). 의존성 0.
 *
 * 사용: node docs/scripts/sync-globals.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = 'docs/artifacts/index.html';
const OUT = 'src/app/globals.css';
const FONT_MAP = [
  ["--font-name: 'Gowun Batang', 'Apple SD Gothic Neo', serif;", "--font-name: var(--font-gowun-batang), 'Apple SD Gothic Neo', serif;"],
  ["--font-body: 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;", "--font-body: var(--font-noto-sans-kr), 'Apple SD Gothic Neo', sans-serif;"],
  ["--font-ui: 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;", "--font-ui: var(--font-noto-sans-kr), 'Apple SD Gothic Neo', sans-serif;"],
  ["--font-latin: 'Cormorant Garamond', Georgia, serif;", "--font-latin: var(--font-cormorant), Georgia, serif;"],
  ["--font-script: 'Dancing Script', 'Snell Roundhand', cursive;", "--font-script: var(--font-dancing-script), 'Snell Roundhand', cursive;"],
];

const html = readFileSync(SRC, 'utf8');
const start = '    * { box-sizing: border-box; }\n';
const end = '\n    /* 글꼴 확인 패널.';
const i = html.indexOf(start);
const j = html.indexOf(end);
if (i < 0 || j < 0 || j < i) { console.error('✗ 조립본에서 CSS 구간을 찾지 못했습니다'); process.exit(1); }
let css = html.slice(i + start.length, j).split('\n').map((l) => l.replace(/^    /, '')).join('\n');
for (const [from, to] of FONT_MAP) {
  if (css.split(from).length !== 2) { console.error(`✗ 글꼴 토큰이 1회가 아닙니다: ${from.slice(0, 40)}`); process.exit(1); }
  css = css.replace(from, to);
}
// 접두사 중복 제거. Tailwind의 CSS 처리기(Lightning CSS)가 -webkit- 중복을 만나면 표준 선언을 떨어뜨리므로 표준만 남기고 접두사는 처리기에 맡깁니다
css = css.replace(/\s*-webkit-backdrop-filter:[^;]*;/g, '').replace(/\s*-webkit-mask-image:[^;]*;/g, '');
const header = '@import "tailwindcss";\n\n/* WIW-4 임시 적용. docs/artifacts/index.html의 CSS를 옮긴 것입니다(docs/scripts/sync-globals.mjs). 글꼴 확인 패널은 옮기지 않았습니다. */\n';
writeFileSync(OUT, header + css.trimEnd() + '\n');
console.log(`✓ ${OUT} ← ${SRC} (${(css.length / 1024).toFixed(0)}KB)`);
