# Bitstarter

Bitstarter is a simple crowdfunding landing page for **Teacher's Pet**, plus a CLI utility that validates HTML structure using CSS selectors.

## What changed

The project has been modernized from a legacy tutorial baseline:

- Upgraded runtime targets to modern Node/npm engine versions.
- Replaced deprecated server patterns (including `new Buffer(...)`) with a small Node HTTP server.
- Simplified `grader.js` argument parsing and selector checks so the grader runs without missing external packages.
- Moved inline CSS/JS into separate files under `assets/`.
- Refreshed page branding/content and replaced insecure `http://` asset links with `https://` where applicable.
- Added real automated tests for both web serving and HTML grading.

## Project structure

```text
.
├── assets/
│   ├── app.js
│   └── styles.css
├── checks.json
├── grader.js
├── index.html
├── package.json
├── Procfile
├── test/
│   ├── grader.test.js
│   └── web.test.js
└── web.js
```

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the app:

   ```bash
   npm start
   ```

3. Open:

   ```text
   http://localhost:5000
   ```

## Run checks

### HTML selector grader

```bash
node grader.js --file index.html --checks checks.json
```

### Automated tests

```bash
npm test
```

## Notes

- `Procfile` remains available for Heroku-style process launching.
- The server respects the `PORT` environment variable.
