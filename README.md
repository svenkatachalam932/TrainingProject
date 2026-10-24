# Conduit Playwright UI Automation

Independent, UI-only Playwright Test project for [Conduit](https://conduit.bondaracademy.com/). It uses TypeScript, Page Object Model, custom fixtures, data-driven article tests, browser-based authentication, saved `storageState`, and the Playwright HTML report.

## Prerequisites

- Node.js 20 or later
- npm

## Install and run

```bash
npm install
npx playwright install chromium
npm test
```

The first `setup` project signs in through the Conduit UI and saves browser state to `playwright/.auth/user.json`. Copy `.env.example` to `.env` and set `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` to the credentials for your test account. The local `.env` file is gitignored. Tests continue to interact with the application only through its browser UI.

Set `BASE_URL` to run against another Conduit deployment. Never commit credentials, `.env`, generated authentication state, or test results.

## Project layout

```text
pages/                 Page Object Model classes
tests/
  fixtures/test.ts     Custom Playwright fixtures
  auth.setup.ts        UI login and storage-state setup
  home.spec.ts         Home/feed checks
  article.spec.ts      Three data-driven creates, one edit, one delete
playwright.config.ts   Projects, browser settings, HTML reporter
```

## Reports and failure artifacts

The HTML report is written to `playwright-report/` and can be opened with:

```bash
npm run report
```

The article workflow creates three data-driven articles, edits the first, and deletes the third. Assertions validate each creation, the edit, and the deletion. Screenshots and videos are captured only on failure; traces are retained on failure. These artifacts are attached to the corresponding test result in the HTML report and written under `test-results/`.

## GitHub repository and push instructions

Repository URL (replace the GitHub account with the one that owns the repository):

`https://github.com/<YOUR-GITHUB-USERNAME>/conduit-playwright-ui-automation`

1. Create an empty GitHub repository named `conduit-playwright-ui-automation` (do not initialize it with a README).
2. From this project directory, run:

```bash
git init
git add .
git commit -m "Build Conduit Playwright UI automation framework"
git branch -M main
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/conduit-playwright-ui-automation.git
git push -u origin main
```

Replace `<YOUR-GITHUB-USERNAME>` with the account that owns the repository. The repository URL should also be updated in `project-summary.docx` after the repository is created.
