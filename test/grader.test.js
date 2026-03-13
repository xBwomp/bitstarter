const test = require('node:test');
const assert = require('node:assert/strict');

const { checkHtmlFile } = require('../grader');

test('grader validates required selectors from checks.json', () => {
  const result = checkHtmlFile('index.html', 'checks.json');
  assert.equal(result.h1, true);
  assert.equal(result['.navbar'], true);
  assert.equal(result['.faq'], true);
  assert.equal(result['.progress'], true);
});
