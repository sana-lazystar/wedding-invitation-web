#!/usr/bin/env node
/**
 * 작업 문서 문체 게이트 (medistream-chat-hub에서 계승, 2026-09-06)
 *
 * 대상: docs/dashboard/{stories,epics,tasks,bugfixes,adr,templates}/*.md
 *   - archive/·discussions/ 는 비대상 (규칙 이전 문서·로그)
 * 검사: 본문(frontmatter 제외, H1 제목 줄 제외)에
 *   ① em-dash(—) 0건 ② 볼드(**) 0건
 * 근거: docs/WRITER.md §AI 티 제거 — 대시·볼드 남발은 기계 티의 첫 신호라
 *   작업 문서에서는 0으로 강제한다. 제목 줄의 ID 구분자(# MCH-N — 제목)만 예외.
 * 한계: 명사 나열·ID 사슬 같은 서술 품질은 기계로 못 잡는다 —
 *   WRITER §검증 8항(소리 내어 읽기 포함)은 작성자 몫으로 남는다.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..'); // 레포 루트
const DIRS = ['stories', 'epics', 'tasks', 'bugfixes', 'adr', 'templates'];

const errors = [];
let scanned = 0;

for (const dir of DIRS) {
  const abs = join(ROOT, 'docs', 'dashboard', dir);
  if (!existsSync(abs)) continue;
  for (const name of readdirSync(abs).filter((n) => n.endsWith('.md'))) {
    if (dir === 'templates' && name === 'discussion.md') continue; // 논의록은 비대상

    scanned++;
    const rel = `docs/dashboard/${dir}/${name}`;
    const lines = readFileSync(join(abs, name), 'utf8').split('\n');

    // frontmatter 제거
    let i = 0;
    if (lines[0] === '---') {
      i = 1;
      while (i < lines.length && lines[i] !== '---') i++;
      i++;
    }

    for (; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('# ')) continue; // H1 — ID 구분자 예외
      const dashes = (line.match(/—/g) || []).length;
      const bolds = (line.match(/\*\*/g) || []).length;
      if (dashes) errors.push(`${rel}:${i + 1} — em-dash ${dashes}건: ${line.trim().slice(0, 60)}`);
      if (bolds) errors.push(`${rel}:${i + 1} — 볼드 ${bolds / 2}쌍: ${line.trim().slice(0, 60)}`);
    }
  }
}

if (errors.length) {
  console.error(`✗ 작업 문서 문체 게이트 실패 — ${errors.length}건 (스캔 ${scanned}파일)`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('본문의 대시는 문장으로 풀고, 볼드는 지우세요 (docs/WRITER.md §AI 티 제거 · docs/dashboard/README §git 규약).');
  process.exit(1);
}
console.log(`✓ 작업 문서 문체 게이트 통과 — 스캔 ${scanned}파일, 본문 대시·볼드 0`);
