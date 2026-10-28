import test from 'node:test';
import assert from 'node:assert/strict';
import { content } from '../content.ts';

test('content bank identity matches brief requirements', () => {
  assert.equal(content.identity.name, 'Krishna');
  assert.equal(content.identity.wordmark, 'K');
  assert.equal(content.identity.name.includes('Patel'), false);
  assert.equal(content.links.email, 'kg6940749@gmail.com');
  assert.equal(content.links.hireButtonLabel, '@krishna');
  assert.equal(content.links.hireEndpoint, '/hire');
});

test('JARVIS Smartwatch is strictly marked as research only and never prototype or build', () => {
  const jarvis = content.selectedWork.find((p) => p.id === 'jarvis-smartwatch');
  assert.ok(jarvis, 'JARVIS project exists');
  assert.equal(jarvis.isResearchOnly, true);
  assert.equal(jarvis.researchBadge, 'RESEARCH ONLY');

  const textToCheck = `${jarvis.title} ${jarvis.description} ${jarvis.domain}`.toLowerCase();
  assert.equal(textToCheck.includes('prototype'), false, 'Cannot call JARVIS a prototype');
  assert.equal(textToCheck.includes('demo'), false, 'Cannot call JARVIS a demo');
});

test('services contains exactly six freelance services', () => {
  assert.equal(content.services.length, 6);
});

test('featured builds contains three builds from The ZeroShot', () => {
  assert.equal(content.featuredBuilds.length, 3);
});

test('privacy check: no raw phone number in content strings', () => {
  const contentString = JSON.stringify(content);
  // Matches potential 10+ digit phone numbers
  const phonePattern = /\b\+?\d{10,14}\b/;
  assert.equal(phonePattern.test(contentString), false, 'Phone numbers must never appear in content bank');
  assert.equal(contentString.toLowerCase().includes('farmer'), false, 'Farmer references must be removed');
});
