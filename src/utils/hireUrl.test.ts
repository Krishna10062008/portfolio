import test from 'node:test';
import assert from 'node:assert/strict';
import { generateHireRedirectUrl } from './hireUrl.ts';

test('generateHireRedirectUrl returns error when env variable is missing', () => {
  const result = generateHireRedirectUrl(undefined);
  assert.equal(result.success, false);
  assert.match(result.error || '', /not configured/);
});

test('generateHireRedirectUrl strips non-digit characters and builds valid wa.me URL', () => {
  const result = generateHireRedirectUrl('+91 (987) 654-3210');
  assert.equal(result.success, true);
  assert.equal(
    result.url,
    "https://wa.me/919876543210?text=Hi%20Krishna%2C%20I%20found%20you%20through%20your%20portfolio%20and%20I'd%20like%20to%20discuss%20a%20project."
  );
});

test('generateHireRedirectUrl supports custom message', () => {
  const result = generateHireRedirectUrl('1234567890', 'Hello from test');
  assert.equal(result.success, true);
  assert.equal(result.url, 'https://wa.me/1234567890?text=Hello%20from%20test');
});
