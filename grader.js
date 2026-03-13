#!/usr/bin/env node

const fs = require('node:fs');

const HTMLFILE_DEFAULT = 'index.html';
const CHECKSFILE_DEFAULT = 'checks.json';

const assertFileExists = (infile) => {
  const file = infile.toString();
  if (!fs.existsSync(file)) {
    console.error('%s does not exist. Exiting.', file);
    process.exit(1);
  }
  return file;
};

const loadChecks = (checksfile) => JSON.parse(fs.readFileSync(checksfile, 'utf-8'));

const hasClass = (html, className) => {
  const classRegex = new RegExp(`class=["'][^"']*\\b${className}\\b[^"']*["']`, 'i');
  return classRegex.test(html);
};

const hasTag = (html, tag) => {
  const tagRegex = new RegExp(`<${tag}(\\s|>)`, 'i');
  return tagRegex.test(html);
};

const checkSelector = (html, selector) => {
  if (selector.startsWith('.')) {
    return hasClass(html, selector.slice(1));
  }

  return hasTag(html, selector);
};

const checkHtmlFile = (htmlfile, checksfile) => {
  const html = fs.readFileSync(htmlfile, 'utf-8');
  const checks = loadChecks(checksfile).sort();
  const out = {};

  checks.forEach((check) => {
    out[check] = checkSelector(html, check);
  });

  return out;
};

const parseArgs = (argv) => {
  let file = HTMLFILE_DEFAULT;
  let checks = CHECKSFILE_DEFAULT;

  for (let i = 2; i < argv.length; i += 1) {
    if ((argv[i] === '-f' || argv[i] === '--file') && argv[i + 1]) {
      file = argv[i + 1];
      i += 1;
    } else if ((argv[i] === '-c' || argv[i] === '--checks') && argv[i + 1]) {
      checks = argv[i + 1];
      i += 1;
    }
  }

  return {
    file: assertFileExists(file),
    checks: assertFileExists(checks)
  };
};

if (require.main === module) {
  const options = parseArgs(process.argv);
  const checkJson = checkHtmlFile(options.file, options.checks);
  console.log(JSON.stringify(checkJson, null, 4));
} else {
  module.exports = { checkHtmlFile };
}
