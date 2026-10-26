---
description: git 커밋 생성
argument-hint: [커밋 메시지]
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git commit:*)
model: claude-haiku-5-5
---
커밋 메시지: $ARGUMENTS
현재 변경사항을 분석하고 커밋을 생성해주세요.
커밋 메시지에는 변경 성격에 맞는 접두어를 붙여주세요. (예: feat:, fix:, chore:, docs:, refactor:)