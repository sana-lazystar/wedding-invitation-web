#!/usr/bin/env node
/**
 * ID 참조 무결성 검증 (의존성 0 — Node 내장만)
 *
 * 이 레포는 코드가 없고 문서끼리 ID로 연결된다. 번호가 밀리거나 원장에서 사라져도
 * 아무도 모른다 — 이 스크립트가 그것을 시끄럽게 만든다.
 * medistream-chat-hub의 check-refs.mjs(2026-09-06 기준)를 계승했다. 이 레포는 코드와 문서가 한 레포에 있어
 * ROOT는 레포 루트, 문서는 docs/ 아래다. 동결본을 정의처로 쓰게 되면 DEFS에 그때 더한다.
 *
 * 스캔 대상 = **살아있는 정본만**: `docs/ontology/`(단 `references/`·`tools/` 제외) · `docs/dashboard/` ·
 * 레포 루트 `CLAUDE.md` · `docs/artifacts/README.md`(있으면). 확장자 `.md` `.yaml` `.yml` `.json`.
 * 동결본(`docs/ontology/references/`)은 무편집 규칙이라 스캔하지 않는다.
 *
 * 검사 1. 원장 ID 해소 — 인용된 번호가 정의처 표에 실재하는가
 *   `REQ-*`(requirements) · `D{n}`(decisions D-* 원장) · `Q{n}`·`U-{n}`(open-questions) · `R{n}`(risks)
 * 검사 2. 논의록 결정 해소 — `{접두} 결정 {n}`이 그 논의록 `## 결정` 표의 행 수 안에 드는가
 *   접두 어휘 = `docs/ontology/decisions.md` §논의록 결정 색인 (아래 NS 표와 함께 갱신)
 * 검사 3. 무접두 `결정 {n}`의 홈 네임스페이스 — `docs/dashboard/README.md` §논의:
 *   "무접두 결정 N = 문서 머리에 선언한 홈 논의록의 번호. 그 밖은 접두 필수"
 *   논의록 자신 = 자기 표. 그 밖은 머리(첫 `##` 앞)가 홈을 선언해야 하고,
 *   선언이 없으면 **모호**로 보고한다(서랍 색인 파일 `sitemap.md`·`README.md`의 선언은 상속으로 인정).
 *   완결(`status: completed`) 논의록의 본문은 이 검사에서 제외한다(append-only 규칙 아래 소급하지 않는다).
 * 검사 4. 색인 정합 — `decisions.md` 논의록 결정 색인의 "결정 수" ↔ 해당 논의록 표 실제 행 수
 *
 * 오탐 억제: 펜스 코드블록(```)·인라인 코드(`…`)·URL·`v1.2` 류 버전 문자열,
 * 그리고 범위 표기(`D1~D18`·`U-45~U-48`)의 양끝은 제외한다 — 구간 서술이지 낱개 인용이 아니다.
 *
 * 실행: `node docs/ontology/tools/check-refs.mjs` — 해소 실패·모호가 1건이라도 있으면 exit 1.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..'); // 레포 루트
const DOCS = join(ROOT, 'docs');
const REF = join(DOCS, 'ontology', 'references');

const errors = [];   // 해소 실패
const ambiguous = []; // 모호
const rel = (p) => relative(ROOT, p);
const read = (p) => readFileSync(p, 'utf8');

// ── 정의처 ────────────────────────────────────────────────
/** 표 첫 칸에서 ID를 긁는다 — `| D3 | …` · `| **U-44** | …` · `| U-14·U-15 | …`. 파일이 없으면 빈 집합 */
function ledgerIds(file, re) {
  const out = new Set();
  if (!existsSync(file)) return out;
  for (const line of read(file).split('\n')) {
    if (!line.startsWith('|')) continue;
    const cell = line.split('|')[1] ?? '';
    for (const m of cell.matchAll(re)) out.add(m[0]);
  }
  return out;
}

const DEFS = {
  'REQ-*': ledgerIds(join(DOCS, 'ontology/requirements.md'), /REQ-\d+[a-z]?/g),
  'D-*': ledgerIds(join(DOCS, 'ontology/decisions.md'), /D\d+/g),
  'Q-*': ledgerIds(join(DOCS, 'ontology/open-questions.md'), /Q\d+/g),
  'U-*': ledgerIds(join(DOCS, 'ontology/open-questions.md'), /U-\d+/g),
  'R-*': ledgerIds(join(DOCS, 'ontology/risks.md'), /R\d+/g),
};

/** 논의록 `## 결정` 표(미팅록은 `## 결정 사항 정리`)의 행 번호 집합 */
function decisionRows(file) {
  const out = new Set();
  let inTable = false;
  for (const line of read(file).split('\n')) {
    if (/^##\s/.test(line)) { inTable = /^##\s*결정/.test(line); continue; }
    if (!inTable) continue;
    const m = line.match(/^\|\s*(\d+)\s*\|/);
    if (m) out.add(Number(m[1]));
  }
  return out;
}

/** 접두 어휘 → 논의록 파일. 색인(decisions.md)이 정본이나, 파일이 실재하는지도 본다. 새 논의록마다 한 줄 추가 */
const NS = {
  '부트스트랩': 'docs/dashboard/discussions/2026-09-06--workspace-bootstrap.md',
  '스택': 'docs/dashboard/discussions/2026-09-06--tech-stack-and-infra.md',
  '디자인': 'docs/dashboard/discussions/2026-09-06--design-mockups.md',
};
const decisionCache = new Map();
function decisionsOf(relPath) {
  if (!decisionCache.has(relPath)) {
    const abs = join(ROOT, relPath);
    decisionCache.set(relPath, existsSync(abs) ? decisionRows(abs) : null);
  }
  return decisionCache.get(relPath);
}

// ── 스캔 대상 ─────────────────────────────────────────────
function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir).sort()) {
    if (e === '.git' || e === 'node_modules' || e.startsWith('.')) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) { walk(p, out); continue; }
    out.push(p);
  }
  return out;
}
const targets = [
  ...walk(join(DOCS, 'ontology')).filter((f) => !f.startsWith(REF + '/') && !f.includes(`${join('ontology', 'tools')}`)),
  ...walk(join(DOCS, 'dashboard')),
  join(ROOT, 'CLAUDE.md'),
  join(DOCS, 'artifacts', 'README.md'),
].filter((f) => /\.(md|ya?ml|json)$/.test(f) && existsSync(f));

// ── 홈 네임스페이스 (무접두 `결정 N`) ─────────────────────
/**
 * 머리(첫 `##` 앞, 최소 12줄)의 홈 선언을 읽는다. 두 형태를 인정한다:
 *  ① 논의록 경로 + "결정"        — 예: "결정 출처: `docs/dashboard/discussions/…-form-policy.md` 결정 표"
 *  ② 접두 어휘 + "결정 N~M"      — 예: "부트스트랩 결정 1~3 반영" (구간 선언 — 낱개 인용과 구분)
 * 낱개 인용("… 부트스트랩 결정 2로 …")은 선언이 아니다 — ②가 범위 표기를 요구하는 이유.
 */
function declaredHome(abs) {
  const lines = read(abs).split('\n');
  const cut = lines.findIndex((l) => /^##\s/.test(l));   // 머리 = 첫 `##` 앞 (없으면 12줄)
  const end = cut === -1 ? Math.min(12, lines.length) : cut;
  for (const line of lines.slice(0, end)) {
    if (!/결정/.test(line)) continue;
    const m = line.match(/dashboard\/discussions\/([\w.-]+\.md)/);
    if (m) return `docs/dashboard/discussions/${m[1]}`;
    if (PREFIX_ALT) {
      const p = line.match(new RegExp(`(${PREFIX_ALT})(?:\\s*논의)?\\s*결정\\s*\\d+\\s*~\\s*\\d+`));
      if (p) return NS[p[1]];
    }
  }
  return null;
}
const homeCache = new Map();
function homeOf(abs) {
  if (homeCache.has(abs)) return homeCache.get(abs);
  let home = null;
  const r = rel(abs);
  if (r.startsWith('docs/dashboard/discussions/')) home = /^status:\s*completed\b/m.test(read(abs)) ? 'COMPLETED' : r; // 논의록 = 자기 표 (완결본 본문은 검사 제외)
  else {
    home = declaredHome(abs);
    if (!home) {                                                      // 서랍 색인 파일의 선언을 상속
      for (const idx of ['sitemap.md', 'README.md']) {
        const cand = join(dirname(abs), idx);
        if (cand !== abs && existsSync(cand)) { home = declaredHome(cand); if (home) break; }
      }
      if (!home) {
        // 한 단계 위 서랍 색인까지 (예: ia/{표면}/… → ia/sitemap.md)
        for (const drawer of ['docs/ontology/ia', 'docs/ontology/policy', 'docs/ontology/database', 'docs/ontology/topology', 'docs/ontology/api']) {
          if (!r.startsWith(drawer + '/')) continue;
          for (const idx of ['sitemap.md', 'README.md']) {
            const cand = join(ROOT, drawer, idx);
            if (existsSync(cand)) { home = declaredHome(cand); if (home) break; }
          }
          break;
        }
      }
    }
  }
  homeCache.set(abs, home);
  return home;
}

// ── 인용 수확 ─────────────────────────────────────────────
/** 접두 어휘 = 길이 내림차순(긴 어휘가 먼저 물리도록) */
const PREFIX_ALT = Object.keys(NS).sort((a, b) => b.length - a.length).join('|');
const RE_PREFIXED_DECISION = PREFIX_ALT
  ? new RegExp(`(${PREFIX_ALT})(?:\\s*논의)?(?:\\s*정책)?\\s*결정\\s*(\\d{1,3}(?:\\s*·\\s*\\d{1,3})*)`, 'g')
  : null;
/** "…-bootstrap.md`:결정 2로 대체" — docs/dashboard/README §논의 "문서 간 대체" 표기 (파일명 필수) */
const RE_FILE_DECISION = /([\w.-]+\.md)`?\s*[:\s]\s*결정\s*(\d{1,3}(?:\s*·\s*\d{1,3})*)/g;
const RE_ANY_DECISION = /결정\s*(\d{1,3}(?:\s*·\s*\d{1,3})*)/g;
const RE_LEDGER = /(?<![A-Za-z0-9가-힣ㄱ-ㅎ_/#-])(REQ-\d+[a-z]?|U-\d+|D\d+|Q\d+|R\d+)(?![0-9A-Za-z가-힣])/g;
const LEDGER_OF = (t) =>
  t.startsWith('REQ-') ? 'REQ-*' : t.startsWith('U-') ? 'U-*'
  : t[0] === 'D' ? 'D-*' : t[0] === 'Q' ? 'Q-*' : 'R-*';

let cited = 0;
const ambiguousByFile = new Map();

for (const abs of targets) {
  const r = rel(abs);
  const lines = read(abs).split('\n');
  let fence = false;
  lines.forEach((raw, idx) => {
    const at = `${r}:${idx + 1}`;
    if (/^\s*(```|~~~)/.test(raw)) { fence = !fence; return; }
    if (fence) return;
    const nums = (s) => s.split(/[·,]/).map((x) => Number(x.trim())).filter((x) => !Number.isNaN(x));
    const blank = (s) => ' '.repeat(s.length);

    // 2-a. 파일 지정 결정 인용 — 인라인 코드 제거보다 먼저 (파일명이 백틱 안에 있다)
    const staged = raw.replace(RE_FILE_DECISION, (whole, file, list) => {
      const hit = Object.values(NS).find((f) => f.endsWith(file));
      if (!hit) return whole; // 논의록이 아닌 .md 인용 — 다음 단계가 판단
      const rows = decisionsOf(hit);
      for (const n of nums(list)) {
        cited++;
        if (rows && !rows.has(n)) errors.push(`${at} — ${file}:결정 ${n}: 표에 그 번호 없음 (${hit} — 1~${Math.max(...rows)})`);
      }
      return blank(whole);
    });

    const line = staged
      .replace(/`[^`\n]*`/g, ' ')          // 인라인 코드
      .replace(/https?:\/\/\S+/g, ' ')     // URL
      .replace(/\bv\d+(\.\d+)+/gi, ' ');   // 버전 문자열

    // 2-b. 접두 결정 인용 — 처리한 구간은 지워서 3에 중복 계상되지 않게 한다
    const rest = RE_PREFIXED_DECISION
      ? line.replace(RE_PREFIXED_DECISION, (whole, pre, list) => {
          const file = NS[pre];
          const rows = decisionsOf(file);
          for (const n of nums(list)) {
            cited++;
            if (rows === null) errors.push(`${at} — ${pre} 결정 ${n}: 논의록 파일 없음 (${file})`);
            else if (!rows.has(n)) errors.push(`${at} — ${pre} 결정 ${n}: 표에 그 번호 없음 (${file} — 1~${Math.max(...rows)})`);
          }
          return blank(whole);
        })
      : line;

    // 3. 무접두 결정 인용 — 홈 네임스페이스로 해소하거나 모호로 남긴다
    for (const m of rest.matchAll(RE_ANY_DECISION)) {
      const home = homeOf(abs);
      if (home === 'COMPLETED') continue;
      if (!home) {
        if (!ambiguousByFile.has(r)) ambiguousByFile.set(r, []);
        for (const n of nums(m[1])) ambiguousByFile.get(r).push(`${idx + 1}: 결정 ${n}`);
        continue;
      }
      const rows = decisionsOf(home);
      for (const n of nums(m[1])) {
        cited++;
        if (rows && !rows.has(n)) errors.push(`${at} — 무접두 결정 ${n}: 홈 논의록 표에 없음 (${home} — 1~${Math.max(...rows)})`);
      }
    }

    // 1. 원장 ID
    for (const m of line.matchAll(RE_LEDGER)) {
      const t = m[1];
      const ns = LEDGER_OF(t);
      // 범위 표기(`D1~D18`·`U-45~U-48`)의 양끝은 개별 인용이 아니라 구간 서술 — 건너뛴다
      if (line[m.index - 1] === '~' || line[m.index + t.length] === '~') continue;
      cited++;
      if (!DEFS[ns].has(t)) errors.push(`${at} — ${t}: ${ns} 정의처에 없음`);
    }
  });
}

for (const [file, hits] of ambiguousByFile) {
  const shown = hits.slice(0, 5).join(' · ');
  ambiguous.push(`${file} — 무접두 "결정 N" ${hits.length}건, 홈 네임스페이스 미선언 (${shown}${hits.length > 5 ? ` 외 ${hits.length - 5}건` : ''})`);
}

// ── 4. 색인 정합 ──────────────────────────────────────────
let indexRows = 0;
const decisionsFile = join(DOCS, 'ontology/decisions.md');
for (const line of existsSync(decisionsFile) ? read(decisionsFile).split('\n') : []) {
  const m = line.match(/^\|\s*(\S+)\s*결정 N\s*\|\s*`([^`]+)`\s*\|\s*(\d+)\s*\|/);
  if (!m) continue;
  indexRows++;
  const [, pre, file, count] = m;
  if (!NS[pre]) { errors.push(`decisions.md 색인 — 접두 "${pre}"가 이 스크립트 NS 표에 없음 (동기화 필요)`); continue; }
  if (NS[pre] !== file) errors.push(`decisions.md 색인 — "${pre} 결정 N"의 파일이 다름: 색인 ${file} ≠ 스크립트 ${NS[pre]}`);
  const rows = decisionsOf(file);
  if (rows === null) { errors.push(`decisions.md 색인 — 논의록 파일 없음: ${file}`); continue; }
  if (rows.size !== Number(count)) errors.push(`decisions.md 색인 — "${pre}" 결정 수 불일치: 색인 ${count} ≠ 표 실제 ${rows.size}`);
}
for (const pre of Object.keys(NS)) {
  if (!existsSync(join(ROOT, NS[pre]))) errors.push(`NS 표 — "${pre}"의 논의록 파일 없음: ${NS[pre]}`);
}

// ── 결과 ──────────────────────────────────────────────────
const defsSummary = `D-* ${DEFS['D-*'].size}·REQ ${DEFS['REQ-*'].size}·Q ${DEFS['Q-*'].size}·U ${DEFS['U-*'].size}·R ${DEFS['R-*'].size}`;
if (errors.length || ambiguous.length) {
  console.error(`✗ ID 참조 무결성 검증 실패 — 해소 실패 ${errors.length}건 · 모호 ${ambiguous.length}건`);
  for (const e of errors) console.error(`  - ${e}`);
  for (const a of ambiguous) console.error(`  ~ ${a}`);
  console.error(`  (스캔 ${targets.length}개 파일 · 인용 ${cited}건 · 정의 ${defsSummary})`);
  process.exit(1);
}
console.log(`✓ ID 참조 무결성 통과 — 인용 ${cited}건 전부 해소 (스캔 ${targets.length}개 파일, 논의록 색인 ${indexRows}행 정합, 정의처 ${defsSummary})`);
