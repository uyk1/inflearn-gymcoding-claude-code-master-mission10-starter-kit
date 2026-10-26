---
description: 타입 체크, lint, build를 순서대로 실행하고 결과 요약
allowed-tools: Bash(npx tsc:*), Bash(npm run:*)
model: claude-haiku-5-5
---
프로젝트의 검증 루틴을 순서대로 실행해주세요.

1. 타입 체크: `npx tsc --noEmit`
2. lint: `npm run lint`
3. build: `npm run build`

규칙:
- 앞 단계가 실패해도 나머지 단계를 계속 실행해서 전체 상태를 한 번에 파악합니다.
- 각 단계의 성공/실패 여부를 표로 요약합니다.
- 실패한 단계는 에러 메시지에서 원인이 되는 파일과 줄 번호를 찾아 함께 정리합니다.
- 수정은 하지 않고 결과와 원인 분석만 보고합니다. 수정이 필요하면 따로 요청받은 뒤 진행합니다.
