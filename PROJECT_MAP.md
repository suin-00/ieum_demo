# Project Context & Map

## 1. Directory Structure (실제 프로젝트 구조 맵)

- /src
  - /actions : 서버 액션 및 비즈니스 로직 분리 (관리자, 학생, 튜터, 인증 관련 `.ts` 파일들)
    - admin/ (adminLesson.ts, adminStudent.ts, adminTutor.ts 등)
    - student/, tutor/, auth.ts
  - /app : Next.js App Router 페이지 및 레이아웃 (Server Components 기본)
    - (auth)/ : 인증 관련 페이지 그룹
    - (dashboard)/ : 대시보드 메인 레이아웃 그룹
      - students/ : 학생 페이지 및 [matchID], \_components 등
        - matching/ : 매칭 전 학생
          - \_components/ (MatchingContainer.tsx, MatchingForm.tsx, TutorFilter.tsx 등)
          - intro/, plan/
          - tutors/ : 튜터 목록 페이지 (`page.tsx`, `layout.tsx`)
      - tutors/ : 튜터 전용 페이지
      - chats/ : 채팅 기능 및 [roomId], mobile-popup 등
    - admin/ : 관리자용 페이지
  - /components : 공통 UI 컴포넌트 모음
  - /constants : 상수 파일 모음
  - /hooks : 커스텀 훅 모음
  - /lib : 외부 서비스 연동 (Supabase 등)
  - /types : 타입 정의 (`database.types.ts` 필수 참조)

## 2. Key Files & Roles (무분별한 탐색 방지용 핵심 경로)

- `src/types/database.types.ts`: Supabase 쿼리 및 CRUD 작성 시 반드시 참고해야 하는 DB 타입.
- `src/actions/`: 서버 측 데이터 mutation 및 비즈니스 로직 처리 진입점.
- `src/app/(dashboard)/matching/_components/`: 매칭 관련 UI 및 필터 로직 집결지.

## 3. Core Constraints for AI Agent

- 파일 구조나 아키텍처를 파악할 때는 이 `PROJECT_MAP.md`를 우선 참고하고, 불필요한 전체 파일 스캔을 절대 금지할 것.
- 데이터베이스 관련 작업 시 반드시 `src/types/database.types.ts`의 타입을 준수할 것.
