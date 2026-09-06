#!/usr/bin/env node
// 진행 보드 — docs/dashboard/{stories,epics,tasks,bugfixes}/·archive/·adr/의 frontmatter를
// story → epic → task → adr 트리로 렌더한다. 읽기 전용(아무것도 쓰지 않는다).
// docs/dashboard/state.json의 activeWorks(진행 중 파일명 목록)는 헤더에 보여주고,
// frontmatter의 in-progress 집합과 어긋나면 경고한다. (medistream-chat-hub에서 계승, 2026-09-06)
//
// 사용:
//   node docs/ontology/tools/board.mjs            한 번 렌더
//   node docs/ontology/tools/board.mjs --watch    2초마다 재렌더 (별도 터미널 창용)
//   옵션: --interval N(초) · --all(backlog story까지 펼침) · --no-color
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..'); // 레포 루트
const DASH = path.join(ROOT, 'docs', 'dashboard');
const STATE = path.join(DASH, 'state.json');
const PREFIX = 'WIW';
const TITLE = '결혼 청첩장 — 진행 보드';

const argv = process.argv.slice(2);
const WATCH = argv.includes('--watch') || argv.includes('-w');
const ALL = argv.includes('--all');
const NOCOLOR = argv.includes('--no-color') || !process.stdout.isTTY;
const ivIdx = argv.indexOf('--interval');
const INTERVAL = ivIdx >= 0 ? Math.max(1, Number(argv[ivIdx + 1]) || 2) : 2;

const paintWith = (code) => (s) => (NOCOLOR ? String(s) : `\x1b[${code}m${s}\x1b[0m`);
const C = {
  dim: paintWith(2),
  bold: paintWith(1),
  green: paintWith(32),
  yellow: paintWith(33),
  red: paintWith(31),
  cyan: paintWith(36),
};

const GLYPH = {
  completed: ['✓', C.green],
  'in-progress': ['▶', C.yellow],
  todo: ['·', C.dim],
  backlog: ['◦', C.dim],
  dropped: ['✗', C.dim],
  failed: ['✗', C.red],
};
const glyph = (status) => {
  const [ch, paint] = GLYPH[status] ?? ['?', C.red];
  return paint(ch);
};

const idNum = (id) => Number((String(id).match(new RegExp(`${PREFIX}-(\\d+)`)) || [])[1] || 0);
const adrNum = (id) => Number((String(id).match(/ADR-(\d+)/) || [])[1] || 0);

/** frontmatter 값 읽기. 템플릿의 `status: todo   # 설명` 꼴 주석과 따옴표는 뗀다 */
const frontmatterOf = (src) => {
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  return (k) =>
    ((m[1].match(new RegExp(`^${k}:\\s*(.*)$`, 'm')) || [])[1] ?? '')
      .replace(/\s+#.*$/, '')
      .trim()
      .replace(/^['"]|['"]$/g, '');
};

/** 디렉토리의 .md 전부를 frontmatter + H1 제목으로 읽는다 */
function readDocs(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.md')) continue;
    try {
      const src = readFileSync(path.join(dir, f), 'utf8');
      const pick = frontmatterOf(src);
      if (!pick) continue;
      const file = f.replace(/\.md$/, '');
      const h1 = src.match(/^#\s+\S+\s+[—-]\s+(.+)$/m);
      out.push({
        id: pick('id') || file,
        file,
        type: pick('type'),
        title: h1 ? h1[1].trim() : file,
        status: pick('status') || '?',
        story: pick('story') || undefined,
        epic: pick('epic') || undefined,
        parent: pick('parent') || undefined,
      });
    } catch {
      // 다른 세션이 쓰는 중일 수 있다 — 이번 렌더에서는 건너뛴다
    }
  }
  return out;
}

const WORK_DIRS = ['stories', 'epics', 'tasks', 'bugfixes'];
const readLive = () => WORK_DIRS.flatMap((d) => readDocs(path.join(DASH, d)));
const readArchived = () => WORK_DIRS.flatMap((d) => readDocs(path.join(DASH, 'archive', d)));
const readAdrs = () =>
  [...readDocs(path.join(DASH, 'adr')), ...readDocs(path.join(DASH, 'archive', 'adr'))].sort(
    (a, b) => adrNum(a.id) - adrNum(b.id),
  );

function gitInfo() {
  const opt = { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] };
  let head = '';
  let dirty = 0;
  try { head = execSync("git log -1 --format='%h %s'", opt).trim(); } catch {}
  try { dirty = execSync('git status --porcelain -- docs/dashboard', opt).split('\n').filter(Boolean).length; } catch {}
  return { head, dirty };
}

const doneOf = (list) => list.filter((w) => w.status === 'completed').length;
const ratio = (list, label) => `${label} ${doneOf(list)}/${list.length}`;

function render() {
  let state;
  try {
    state = JSON.parse(readFileSync(STATE, 'utf8'));
  } catch {
    return C.red(`state.json을 읽지 못했습니다(다른 세션이 쓰는 중일 수 있습니다) — ${INTERVAL}초 후 재시도`);
  }
  const activeWorks = Array.isArray(state.activeWorks) ? state.activeWorks : [];

  const live = readLive();
  const knownIds = new Set(live.map((w) => w.id));
  // archive에는 story 체계 밖 단독 작업도 있을 수 있다. 트리는 story 프로그램 뷰이므로
  // story 사슬에 연결되는 것만 되살린다. 진행 중 항목은 필터 대상이 아니다.
  const archivedAll = readArchived().filter((w) => !knownIds.has(w.id));
  const storyIds = new Set([...live, ...archivedAll].filter((w) => w.type === 'story').map((w) => w.id));
  const keptEpicIds = new Set(
    [...live.filter((w) => w.type === 'epic'), ...archivedAll.filter((w) => w.type === 'epic' && storyIds.has(w.story))].map((w) => w.id),
  );
  const archivedKept = archivedAll.filter((w) =>
    w.type === 'story' ? true : w.type === 'epic' ? storyIds.has(w.story) : w.type === 'task' ? keptEpicIds.has(w.epic) : false,
  );
  const works = [...live, ...archivedKept];
  const adrs = readAdrs();
  const byId = Object.fromEntries(works.map((w) => [w.id, w]));
  const stories = works.filter((w) => w.type === 'story').sort((a, b) => idNum(a.id) - idNum(b.id));
  const epics = works.filter((w) => w.type === 'epic');
  const tasks = works.filter((w) => w.type === 'task');
  const bugfixes = works.filter((w) => w.type === 'bugfix');
  const epicsOf = (sid) => epics.filter((e) => e.story === sid).sort((a, b) => idNum(a.id) - idNum(b.id));
  const tasksOf = (eid) => tasks.filter((t) => t.epic === eid).sort((a, b) => idNum(a.id) - idNum(b.id));
  const adrsOf = (tid) => adrs.filter((a) => a.parent === tid);

  const lines = [];
  const now = new Date().toTimeString().slice(0, 8);
  const { head, dirty } = gitInfo();

  let totals = `${ratio(stories, 'story')} · ${ratio(epics, 'epic')} · ${ratio(tasks, 'task')}`;
  if (bugfixes.length) totals += ` · ${ratio(bugfixes, 'bugfix')}`;
  if (adrs.length) totals += ` · ${ratio(adrs, 'adr')}`;
  lines.push(
    `${C.bold(TITLE)}  ${C.dim(`${now} 렌더 · state.json ${state.updatedAt ?? '?'} · activeWorks ${activeWorks.length}${dirty ? ` · 미커밋 ${dirty}건` : ''}`)}`,
  );
  lines.push(`${totals}  ${C.dim(head ? `HEAD ${head}` : 'git 없음')}`);

  // activeWorks ↔ frontmatter in-progress 정합 (adr은 대상 밖)
  const inProgress = new Set(live.filter((w) => w.status === 'in-progress').map((w) => w.file));
  const listed = new Set(activeWorks);
  const missing = [...inProgress].filter((f) => !listed.has(f));
  const stale = [...listed].filter((f) => !inProgress.has(f));
  if (missing.length || stale.length) {
    const parts = [];
    if (missing.length) parts.push(`in-progress인데 activeWorks에 없음: ${missing.join(', ')}`);
    if (stale.length) parts.push(`activeWorks에 있는데 in-progress 아님(또는 파일 없음): ${stale.join(', ')}`);
    lines.push(C.red(`⚠ state.json 어긋남 — ${parts.join(' · ')}`));
  }

  const activeTasks = tasks.filter((t) => t.status === 'in-progress');
  const activeEpics = epics.filter((e) => e.status === 'in-progress');
  const chain = (leaf, parentKey) => {
    const parent = byId[leaf[parentKey]];
    const grand = parent && parentKey === 'epic' ? byId[parent.story] : null;
    return [grand, parent, leaf].filter(Boolean).map((x) => `${x.id} ${x.title}`).join(' › ');
  };
  const active = activeTasks.length
    ? activeTasks.map((t) => chain(t, 'epic'))
    : activeEpics.map((e) => chain(e, 'story'));
  lines.push(C.yellow(`진행 중: ${active.length ? active.join('  |  ') : '없음'}`));
  lines.push('');

  for (const s of stories) {
    const sEpics = epicsOf(s.id);
    const sTasks = sEpics.flatMap((e) => tasksOf(e.id));
    const expand = ALL || s.status === 'in-progress';
    if (!expand) {
      lines.push(`${glyph(s.status)} ${s.id} ${s.title} ${C.dim(`(${ratio(sEpics, 'epic')} · ${ratio(sTasks, 'task')})`)}`);
      continue;
    }
    lines.push(`${glyph(s.status)} ${C.bold(`${s.id} ${s.title}`)} ${C.dim(`— ${ratio(sTasks, 'task')}`)}`);
    for (const e of sEpics) {
      const eTasks = tasksOf(e.id);
      lines.push(`  ${glyph(e.status)} ${e.id} ${e.title} ${C.dim(ratio(eTasks, 'task'))}`);
      for (const t of eTasks) {
        const tAdrs = adrsOf(t.id);
        const chips = tAdrs.length
          ? `  ${C.dim('ADR')} ${tAdrs.map((a) => glyph(a.status)).join('')}${C.dim(` ${doneOf(tAdrs)}/${tAdrs.length}`)}`
          : '';
        lines.push(`    ${glyph(t.status)} ${t.id} ${t.title}${chips}`);
      }
    }
  }

  // story 사슬 밖의 진행 중 항목 — 단독 epic·단독 task·bugfix
  const orphans = live.filter((w) => {
    if (w.type === 'story') return false;
    if (w.type === 'epic') return !storyIds.has(w.story);
    if (w.type === 'task') return !keptEpicIds.has(w.epic);
    return true; // bugfix
  });
  if (orphans.length) {
    lines.push('');
    lines.push(C.dim('story 밖 (단독 epic · 단독 task · bugfix)'));
    for (const w of orphans.sort((a, b) => idNum(a.id) - idNum(b.id))) {
      const wAdrs = w.type === 'task' || w.type === 'bugfix' ? adrsOf(w.id) : [];
      const chips = wAdrs.length
        ? `  ${C.dim('ADR')} ${wAdrs.map((a) => glyph(a.status)).join('')}${C.dim(` ${doneOf(wAdrs)}/${wAdrs.length}`)}`
        : '';
      lines.push(`  ${glyph(w.status)} ${w.id} ${w.title} ${C.dim(`[${w.type}]`)}${chips}`);
    }
  }

  if (WATCH) lines.push('', C.dim(`${INTERVAL}초마다 갱신 · 종료 Ctrl+C · backlog까지 펼치려면 --all`));
  return lines.join('\n');
}

function paint() {
  const body = render();
  if (WATCH) process.stdout.write('\x1b[2J\x1b[3J\x1b[H');
  console.log(body);
}

if (WATCH) {
  process.stdout.write('\x1b[?25l');
  const bye = () => {
    process.stdout.write('\x1b[?25h');
    process.exit(0);
  };
  process.on('SIGINT', bye);
  process.on('SIGTERM', bye);
  paint();
  setInterval(paint, INTERVAL * 1000);
} else {
  paint();
}
