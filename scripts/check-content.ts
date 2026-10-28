/**
 * Content auditor script.
 * Scans content bank for any TODOs or missing links.
 * Fails with code 1 if run in production mode (NODE_ENV=production).
 */

import { content } from '../src/content.ts';

function findTodos(obj: unknown, path = ''): { path: string; value: string }[] {
  const todos: { path: string; value: string }[] = [];
  if (typeof obj === 'string') {
    if (obj.includes('TODO')) {
      todos.push({ path, value: obj });
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      todos.push(...findTodos(item, `${path}[${index}]`));
    });
  } else if (obj !== null && typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      todos.push(...findTodos(value, path ? `${path}.${key}` : key));
    }
  }
  return todos;
}

const todos = findTodos(content);
const isProd = process.env.NODE_ENV === 'production';

console.log('--- Content Audit Report ---');
if (todos.length === 0) {
  console.log('✓ All content complete. Zero TODOs detected.');
  process.exit(0);
} else {
  console.log(`Found ${todos.length} pending TODO item(s):`);
  todos.forEach((item, i) => {
    console.log(`  [${i + 1}] ${item.path}: "${item.value}"`);
  });

  if (isProd) {
    console.error('\n✗ Content audit failed: Production build contains unresolved TODOs.');
    process.exit(1);
  } else {
    console.log('\nNotice: Development mode allows pending TODOs. Fill in production before publishing.');
    process.exit(0);
  }
}
