#!/usr/bin/env node
/**
 * SVG(또는 HTML)를 Chrome으로 그려 투명 배경 PNG로 뽑습니다. 빈티지 에셋(표지·속지 질감 등)을 CSS로 흉내 내지 않고 그림 파일로 만들기 위한 것입니다.
 * SVG 필터(feTurbulence 종이 결, feDisplacementMap 찢은 가장자리, 잉크 번짐)를 그대로 씁니다.
 * 원본 SVG는 docs/artifacts/assets/, 산출 PNG는 public/intro/ 같은 쓰는 자리에 둡니다.
 *
 * 사용: node docs/scripts/render-asset.mjs <입력.svg|.html> <출력.png> [배율=2]
 * playwright-core(devDependency)가 설치된 Google Chrome을 띄웁니다(브라우저를 내려받지 않습니다).
 */
import { chromium } from 'playwright-core';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const [,, input, output, scaleArg] = process.argv;
if (!input || !output) { console.error('사용: node docs/scripts/render-asset.mjs <입력.svg|.html> <출력.png> [배율=2]'); process.exit(1); }
const scale = Number(scaleArg || 2);
const abs = resolve(input);
const isSvg = abs.toLowerCase().endsWith('.svg');

const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ deviceScaleFactor: scale });
  if (isSvg) {
    const svg = readFileSync(abs, 'utf8');
    const w = Number((svg.match(/\bwidth="([\d.]+)"/) || [])[1]);
    const h = Number((svg.match(/\bheight="([\d.]+)"/) || [])[1]);
    if (!w || !h) { console.error('✗ SVG 루트에 width·height(px 숫자)가 있어야 합니다'); process.exit(1); }
    await page.setViewportSize({ width: Math.ceil(w), height: Math.ceil(h) });
    await page.setContent(`<!doctype html><html><body style="margin:0;background:transparent"><div id="a" style="width:${w}px;height:${h}px;line-height:0">${svg}</div></body></html>`);
  } else {
    await page.goto('file://' + abs);
  }
  await page.evaluate(() => document.fonts.ready);
  const target = page.locator('#a');
  if (await target.count() === 0) { console.error('✗ HTML 입력은 id="a" 요소가 찍을 범위입니다'); process.exit(1); }
  await target.screenshot({ path: output, omitBackground: true });
  console.log(`✓ ${output} ← ${input} (×${scale})`);
} finally {
  await browser.close();
}
