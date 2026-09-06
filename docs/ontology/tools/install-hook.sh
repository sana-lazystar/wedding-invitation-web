#!/bin/sh
# pre-commit hook 설치 스크립트입니다. .git/hooks는 버전 관리 밖이라 클론하거나 재설정할 때 1회 실행하세요.
#   sh docs/ontology/tools/install-hook.sh
# 훅이 거는 검사는 둘입니다. docs/ontology·docs/dashboard·CLAUDE.md가 스테이징되면 ID 참조 무결성을,
# docs/dashboard 작업 문서가 스테이징되면 문체 게이트를 돌립니다 (medistream-chat-hub에서 계승, 2026-09-06).
set -e
REPO_ROOT="$(git rev-parse --show-toplevel)"
HOOK="$REPO_ROOT/.git/hooks/pre-commit"
cat > "$HOOK" <<'HOOK_EOF'
#!/bin/sh
# wedding-invitation-web pre-commit (설치: sh docs/ontology/tools/install-hook.sh)
ROOT="$(git rev-parse --show-toplevel)"
STAGED="$(git diff --cached --name-only)"
# grep -E를 씁니다. macOS /usr/bin/grep(BSD)은 BRE의 \| 안에 있는 $를 앵커로 보지 않습니다.
if printf '%s\n' "$STAGED" | grep -qE '^(docs/ontology/|docs/dashboard/|CLAUDE\.md$|docs/artifacts/README\.md$)'; then
  node "$ROOT/docs/ontology/tools/check-refs.mjs" || {
    echo "ID 참조 무결성 검증 실패 — 인용한 번호가 정의처에 있는지, 다른 논의록 결정에 접두를 붙였는지 확인하세요 (docs/ontology/README §기계 검증)." >&2
    exit 1
  }
fi
if printf '%s\n' "$STAGED" | grep -qE '^docs/dashboard/(stories|epics|tasks|bugfixes|adr|templates)/'; then
  node "$ROOT/docs/ontology/tools/check-doc-style.mjs" || {
    echo "작업 문서 문체 게이트 실패 — 본문의 대시는 문장으로 풀고 볼드는 지우세요 (docs/WRITER.md · docs/dashboard/README §git 규약)." >&2
    exit 1
  }
fi
HOOK_EOF
chmod +x "$HOOK"
echo "설치됨: $HOOK"
