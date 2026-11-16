import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildLlmsTxt,
  buildRobotsTxt,
  buildSitemapXml,
  buildStructuredDataGraph,
  normalizeOrigin,
} from './clinicSeo.ts';

test('normalizeOrigin handles trailing slashes and placeholders cleanly', () => {
  assert.equal(normalizeOrigin('https://example.com/'), 'https://example.com');
  assert.equal(normalizeOrigin('MY_APP_URL'), '');
  assert.equal(normalizeOrigin(''), '');
});

test('buildStructuredDataGraph emits MedicalClinic, Physician, and FAQPage aligned with clinic data', () => {
  const graph = buildStructuredDataGraph('https://khbg.example.com/');
  const types = graph['@graph'].map((node) => node['@type']);
  assert.deepEqual(types, ['WebSite', 'WebPage', 'MedicalClinic', 'Physician', 'FAQPage']);

  const clinic = graph['@graph'].find((n) => n['@type'] === 'MedicalClinic') as Record<string, unknown>;
  assert.equal(clinic.name, '경희부강한의원');
  assert.equal(clinic.url, 'https://khbg.example.com/');
  assert.equal(clinic.telephone, '+82-2-842-8889');

  const physician = graph['@graph'].find((n) => n['@type'] === 'Physician') as Record<string, unknown>;
  assert.equal(physician.name, '이현일');
  assert.ok(Array.isArray(physician.hasCredential) && physician.hasCredential.length >= 6);

  const faq = graph['@graph'].find((n) => n['@type'] === 'FAQPage') as {
    mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
  };
  assert.equal(faq.mainEntity.length, 4);
  assert.equal(faq.mainEntity[0].name, '맞춤 한약 처방은 어떤 과정으로 진행되나요?');
  assert.match(faq.mainEntity[3].acceptedAnswer.text, /롯데 하이마트 신길점/);
});

test('buildRobotsTxt allows Google, Naver Yeti, and AI crawlers with Sitemap line', () => {
  const robots = buildRobotsTxt('https://khbg.example.com');
  for (const agent of ['*', 'Googlebot', 'Yeti', 'GPTBot', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended']) {
    assert.ok(robots.includes(`User-agent: ${agent}`), `Missing User-agent: ${agent}`);
  }
  assert.ok(robots.includes('Allow: /'));
  assert.ok(robots.includes('Sitemap: https://khbg.example.com/sitemap.xml'));
});

test('buildSitemapXml outputs valid XML with root and llms.txt URLs', () => {
  const xml = buildSitemapXml('https://khbg.example.com', '2026-11-16');
  assert.ok(xml.includes('<loc>https://khbg.example.com/</loc>'));
  assert.ok(xml.includes('<loc>https://khbg.example.com/llms.txt</loc>'));
  assert.ok(xml.includes('<lastmod>2026-11-16</lastmod>'));
});

test('buildLlmsTxt summarizes doctor credentials, clinics, schedule, and location', () => {
  const llms = buildLlmsTxt('https://khbg.example.com');
  assert.ok(llms.includes('# 경희부강한의원'));
  assert.ok(llms.includes('이현일 대표원장'));
  assert.ok(llms.includes('통증 치료 클리닉'));
  assert.ok(llms.includes('롯데 하이마트 신길점'));
  assert.ok(llms.includes('화요일 · 금요일: 14:00 - 21:00'));
});
