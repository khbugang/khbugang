import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRODUCTION_SITE_ORIGIN,
  buildLlmsTxt,
  buildRobotsTxt,
  buildSitemapXml,
  buildStructuredDataGraph,
  normalizeOrigin,
} from './clinicSeo.ts';

test('normalizeOrigin defaults cleanly to https://khbugang.com', () => {
  assert.equal(normalizeOrigin('https://khbugang.com/'), PRODUCTION_SITE_ORIGIN);
  assert.equal(normalizeOrigin('MY_APP_URL'), PRODUCTION_SITE_ORIGIN);
  assert.equal(normalizeOrigin(''), PRODUCTION_SITE_ORIGIN);
});

test('buildStructuredDataGraph emits MedicalClinic/LocalBusiness/Organization, Physician/Person, BreadcrumbList, WebSite, WebPage, and FAQPage', () => {
  const graph = buildStructuredDataGraph();
  const types = graph['@graph'].map((node) => node['@type']);
  assert.deepEqual(types, [
    'WebSite',
    'WebPage',
    'BreadcrumbList',
    ['MedicalClinic', 'LocalBusiness', 'Organization'],
    ['Physician', 'Person'],
    'FAQPage',
  ]);

  const clinic = graph['@graph'].find(
    (n) => Array.isArray(n['@type']) && n['@type'].includes('MedicalClinic')
  ) as Record<string, unknown>;
  assert.equal(clinic.name, '경희부강한의원');
  assert.equal(clinic.url, 'https://khbugang.com/');
  assert.equal(clinic.telephone, '+82-2-842-8889');

  const physician = graph['@graph'].find(
    (n) => Array.isArray(n['@type']) && n['@type'].includes('Physician')
  ) as Record<string, unknown>;
  assert.equal(physician.name, '이현일');
  assert.ok(Array.isArray(physician.hasCredential) && physician.hasCredential.length >= 6);

  const faq = graph['@graph'].find((n) => n['@type'] === 'FAQPage') as {
    mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
  };
  assert.equal(faq.mainEntity.length, 4);
  assert.equal(faq.mainEntity[0].name, '맞춤 한약 처방은 어떤 과정으로 진행되나요?');
  assert.match(faq.mainEntity[3].acceptedAnswer.text, /롯데 하이마트 신길점/);
});

test('buildRobotsTxt allows OAI-SearchBot and search engines while blocking GPTBot with absolute Sitemap URL', () => {
  const robots = buildRobotsTxt();
  for (const agent of ['*', 'Googlebot', 'Yeti', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot']) {
    assert.ok(robots.includes(`User-agent: ${agent}\nAllow: /`), `Missing Allow for ${agent}`);
  }
  assert.ok(robots.includes('User-agent: GPTBot\nDisallow: /'));
  assert.ok(robots.includes('Sitemap: https://khbugang.com/sitemap.xml'));
});

test('buildSitemapXml outputs valid XML with https://khbugang.com URLs', () => {
  const xml = buildSitemapXml(undefined, '2026-11-16');
  assert.ok(xml.includes('<loc>https://khbugang.com/</loc>'));
  assert.ok(xml.includes('<loc>https://khbugang.com/llms.txt</loc>'));
  assert.ok(xml.includes('<lastmod>2026-11-16</lastmod>'));
});

test('buildLlmsTxt summarizes khbugang.com, doctor credentials, clinics, schedule, and location', () => {
  const llms = buildLlmsTxt();
  assert.ok(llms.includes('# 경희부강한의원'));
  assert.ok(llms.includes('https://khbugang.com/'));
  assert.ok(llms.includes('이현일 대표원장'));
  assert.ok(llms.includes('통증 치료 클리닉'));
  assert.ok(llms.includes('롯데 하이마트 신길점'));
  assert.ok(llms.includes('화요일 · 금요일: 14:00 - 21:00'));
});
