# Shapes QA Framework

Automated end-to-end testing framework for [Shapes](https://shapes.inc) using Playwright and TypeScript. This repository provides reusable Page Object Models, test suites, and utilities to validate core application workflows such as exploration, search, and authentication.

---

## 🚀 Features

- **Playwright & TypeScript**: Fast, reliable, typed E2E automation
- **Page Object Model (POM)**: Encapsulated pages under `pages/`
- **Test Suites**: Separate specs under `tests/` for Explore and Login flows
- **Dynamic Data**: Parameterized search tests via array of terms
- **Authentication Validation**: Both UI-based (menu) and token-based (cookies/localStorage)
- **Resilient Selectors**: CSS prefix- and substring-matching to handle hashed class names

---

## 📋 Prerequisites

- [Node.js (v16+)](https://nodejs.org)
- [npm](https://npmjs.com) or [yarn](https://yarnpkg.com)
- [Playwright CLI](https://playwright.dev)
- Shapes application available at `baseUrl` (default in config)

---

## 🔧 Installation

```bash
# Clone the repo
git clone https://github.com/niranjankumar7/shapes-qa-framework.git
cd shapes-qa-framework

# Install dependencies
npm install
# or
yarn install

# Install Playwright browsers
npx playwright install
```

---

## ⚙️ Configuration

- Copy `.env.example` to `.env` and update:

  - `BASE_URL` — your application URL (e.g. `https://shapes.inc`)
  - `AUTH_EMAIL` / `AUTH_PASSWORD` — credentials for login tests

- Playwright config settings are in `playwright.config.ts`.

---

## 📂 Project Structure

```
├── pages/
│   ├── explorePage.ts   # POM for Explore workflows
│   └── loginPage.ts     # POM for Login workflows
│
├── tests/
│   ├── explorePage.spec.ts  # Explore & search tests
│   └── loginTest.spec.ts    # Authentication tests
│
├── playwright.config.ts  # Playwright settings
├── tsconfig.json         # TypeScript configuration
└── package.json          # npm scripts & dependencies
```

---

## 🧪 Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific suite
npx playwright test tests/explorePage.spec.ts
npx playwright test tests/loginTest.spec.ts

# Show detailed report
npx playwright show-report
```

---

## 🔍 Debugging

- Use `await page.pause()` in your test to launch Playwright Inspector
- Increase timeouts in POM methods if elements load slowly
- Review screenshots & videos under `test-results/` on failures

---

## 👍 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/xyz`)
3. Commit your changes (`git commit -m "feat: ..."`)
4. Push to branch (`git push origin feature/xyz`)
5. Open a Pull Request

---

## 📜 License

[MIT](LICENSE) © Niranjan Kumar
