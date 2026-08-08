# 2026년 8월 기도편지 웹사이트 (Vercel 배포 준비 완료)

노대영 · 신영화 (하임, 하린) 선교사 가정의 2026년 8월 기도편지 웹사이트입니다.

## 🚀 Vercel 배포 방법 (나만의 웹사이트 주소 만들기)

### 방법 1: Vercel CLI (가장 빠른 터미널 배포)
PowerShell 또는 VS Code 터미널에서 프로젝트 폴더로 이동한 후 아래 명령어를 입력하세요:

```bash
cd C:\Users\User\.gemini\antigravity\scratch\prayer-letter-2026-08
npx vercel
```

1. 명령어를 입력하면 브라우저가 열리며 Vercel 로그인(GitHub 또는 이메일)을 진행합니다.
2. 터미널의 질문에 엔터(`Enter`)를 계속 누르면 **10초 만에 나만의 전용 웹사이트 주소**(예: `https://prayer-letter-2026-08.vercel.app`)가 생성됩니다.

---

### 방법 2: Vercel 대시보드 + GitHub 연동 (추천)
1. [GitHub.com](https://github.com)에서 새로운 레포지토리(예: `prayer-letter-2026`)를 만듭니다.
2. 본 프로젝트 폴더의 코드와 이미지들을 커밋 & 푸시합니다:
   ```bash
   git init
   git add .
   git commit -m "2026년 8월 기도편지 최초 배포"
   git remote add origin https://github.com/사용자이름/prayer-letter-2026.git
   git push -u origin main
   ```
3. [Vercel.com](https://vercel.com)에 로그인 후 **"Add New..." -> "Project"** 클릭 후 해당 깃허브 저장소를 선택하고 **Deploy**를 누르면 자동으로 고유 주소가 생성됩니다.

---

## 🎨 커스텀 도메인 연결 (나만의 개별 도메인이 있는 경우)
Vercel 대시보드의 **Settings -> Domains** 메뉴에서 보유하고 계신 개인 도메인(예: `www.ourprayerletter.com`)을 등록하면 1분 만에 연결됩니다.
