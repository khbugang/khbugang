import {
  CLINIC_INFO,
  CLINIC_LINKS,
  CLINIC_SCHEDULE_ROWS,
  DOCTOR_PROFILE,
  FAQ_ITEMS,
  TREATMENT_CLINICS,
} from '../data/clinicData';

export function normalizeOrigin(rawUrl?: string | null): string {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim().replace(/\/+$/, '');
  if (!trimmed || trimmed === 'MY_APP_URL') return '';
  if (!/^https?:\/\//i.test(trimmed)) return '';
  return trimmed;
}

export function buildStructuredDataGraph(rawOrigin?: string | null) {
  const origin = normalizeOrigin(rawOrigin);
  const siteUrl = origin ? `${origin}/` : `${CLINIC_LINKS.naverBlog}`;
  const anchorBase = origin || CLINIC_LINKS.naverBlog;
  const clinicId = `${anchorBase}#clinic`;
  const physicianId = `${anchorBase}#physician`;
  const websiteId = `${anchorBase}#website`;
  const webpageId = `${anchorBase}#webpage`;
  const faqId = `${anchorBase}#faq`;

  const heroImageUrl = origin
    ? `${origin}/src/assets/images/hero_clinic_interior_1794831626501.jpg`
    : '/src/assets/images/hero_clinic_interior_1794831626501.jpg';
  const logoImageUrl = origin
    ? `${origin}/assets/aistudio/______6fe39d29.JPG`
    : '/assets/aistudio/______6fe39d29.JPG';
  const doctorImageUrl = origin
    ? `${origin}/src/assets/images/doctor_portrait_editorial_1794831626396.jpg`
    : '/src/assets/images/doctor_portrait_editorial_1794831626396.jpg';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteUrl,
        name: CLINIC_INFO.nameKo,
        alternateName: CLINIC_INFO.nameEn,
        inLanguage: 'ko-KR',
        publisher: {
          '@id': clinicId,
        },
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: siteUrl,
        name: `${CLINIC_INFO.nameKo} | 신길동·신풍역 한의원 · ${DOCTOR_PROFILE.name} 원장 맞춤 한약 처방`,
        description:
          '서울 영등포구 신길동 신풍역 4번 출구 인근 경희부강한의원. 경희대 한의과대학·이화여대 약학대학 겸임교수 이현일 한의학박사의 2009년 이후 임상 경험 기반 맞춤 한약 처방 및 5대 전문 클리닉 진료.',
        inLanguage: 'ko-KR',
        isPartOf: {
          '@id': websiteId,
        },
        about: {
          '@id': clinicId,
        },
        mainEntity: {
          '@id': clinicId,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: heroImageUrl,
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#hero h1', '#doctor', '#treatments', '#faq', '#location'],
        },
      },
      {
        '@type': 'MedicalClinic',
        '@id': clinicId,
        name: CLINIC_INFO.nameKo,
        alternateName: CLINIC_INFO.nameEn,
        description:
          '서울 영등포구 신길동 신풍역 4번 출구 인근(신길로 145, 1층)에 위치한 경희부강한의원. 경희대학교 한의과대학·이화여자대학교 약학대학·이화여자대학교 임상바이오헬스대학원 겸임교수 이현일 한의학박사가 2009년부터 이어온 임상 경험을 바탕으로 맞춤 한약 처방, 통증 치료, 소화기 장애, 두드러기·피부 소양증·비염·자가면역성 질환, 보양·산후 조리약, 교통사고 후유증을 진료합니다.',
        slogan: CLINIC_INFO.slogan,
        url: siteUrl,
        image: heroImageUrl,
        logo: logoImageUrl,
        telephone: '+82-2-842-8889',
        faxNumber: '+82-2-6442-8389',
        email: CLINIC_LINKS.email,
        hasMap: CLINIC_LINKS.naverMap,
        isAcceptingNewPatients: true,
        publicAccess: true,
        sameAs: [
          CLINIC_LINKS.naverBlog,
          CLINIC_LINKS.naverMap,
          CLINIC_LINKS.naverBooking,
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: CLINIC_INFO.addressRoad,
          addressLocality: '영등포구',
          addressRegion: '서울특별시',
          postalCode: '07398',
          addressCountry: 'KR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 37.5034,
          longitude: 126.9098,
        },
        areaServed: [
          {
            '@type': 'Place',
            name: '서울특별시 영등포구 신길동',
          },
          {
            '@type': 'Place',
            name: '지하철 7호선 신풍역 인근',
          },
          {
            '@type': 'AdministrativeArea',
            name: '서울특별시 영등포구',
          },
        ],
        amenityFeature: [
          {
            '@type': 'LocationFeatureSpecification',
            name: '주차 지원 (한의원 바로 옆 롯데 하이마트 신길점 지상주차장 최초 60분 무료)',
            value: true,
          },
        ],
        medicalSpecialty: [
          'KoreanMedicine',
          'HerbalMedicine',
          'PainManagement',
          'Gastroenterology',
          'Dermatology',
          'AllergyAndImmunology',
        ],
        availableService: [
          {
            '@type': 'MedicalTherapy',
            name: '맞춤 한약 처방',
            description:
              '생리학적 변증과 한약제제학·임상본초학 원칙에 기반한 1:1 개인 맞춤 한약 처방',
          },
          ...TREATMENT_CLINICS.map((clinic) => ({
            '@type': 'MedicalTherapy',
            name: clinic.title,
            description: `${clinic.subtitle}. 주요 진료: ${clinic.symptoms.join(', ')}. ${clinic.guidance}`,
          })),
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Thursday'],
            opens: '09:30',
            closes: '18:30',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Tuesday', 'Friday'],
            opens: '14:00',
            closes: '21:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday'],
            opens: '09:30',
            closes: '17:00',
          },
        ],
        director: {
          '@id': physicianId,
        },
        medicalDirector: {
          '@id': physicianId,
        },
        employee: {
          '@id': physicianId,
        },
      },
      {
        '@type': 'Physician',
        '@id': physicianId,
        name: DOCTOR_PROFILE.name,
        honorificPrefix: DOCTOR_PROFILE.title,
        honorificSuffix: DOCTOR_PROFILE.degree,
        image: doctorImageUrl,
        jobTitle:
          '경희부강한의원 대표원장 · 경희대학교 한의과대학 겸임교수 · 이화여자대학교 약학대학 겸임교수 · 이화여자대학교 임상바이오헬스대학원 겸임교수',
        description: DOCTOR_PROFILE.coreMessage,
        alumniOf: [
          {
            '@type': 'CollegeOrUniversity',
            name: '경희대학교 한의과대학 (2009년 학사 졸업, 석사, 2017년 생리학 박사)',
          },
        ],
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'degree',
            name: '경희대학교 한의과대학 학사 (2009년 졸업)',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'degree',
            name: '경희대학교 한의과대학 석사',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'degree',
            name: '경희대학교 한의과대학 박사 (생리학 전공, 2017년 학위 취득)',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'facultyAppointment',
            name: '경희대학교 한의과대학 겸임교수 (2018년 ~ 현재, 전공필수 한의학입문·생리학 강의)',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'facultyAppointment',
            name: '이화여자대학교 약학대학 겸임교수 (2019년 ~ 현재, 한약제제학·임상본초학 강의)',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'facultyAppointment',
            name: '이화여자대학교 임상바이오헬스대학원 겸임교수 (2026년 ~ 현재, 임상한약학 강의)',
          },
        ],
        affiliation: [
          {
            '@type': 'MedicalClinic',
            name: '경희부강한의원',
          },
          {
            '@type': 'CollegeOrUniversity',
            name: '경희대학교 한의과대학',
          },
          {
            '@type': 'CollegeOrUniversity',
            name: '이화여자대학교 약학대학',
          },
          {
            '@type': 'CollegeOrUniversity',
            name: '이화여자대학교 임상바이오헬스대학원',
          },
        ],
        worksFor: {
          '@id': clinicId,
        },
        knowsAbout: [
          '한의학 생리학',
          '한약제제학',
          '임상본초학',
          '임상한약학',
          '맞춤 한약 처방',
          '통증 치료 및 척추관 협착증',
          '소화기 장애 및 기능성 소화불량',
          '두드러기·피부 소양증·알레르기 비염·자가면역성 질환',
          '보양 진료 및 산후 조리약',
          '교통사고 후유증 자동차보험 진료',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': faqId,
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function buildRobotsTxt(rawOrigin?: string | null): string {
  const origin = normalizeOrigin(rawOrigin);
  const sitemapLine = origin ? `Sitemap: ${origin}/sitemap.xml` : 'Sitemap: /sitemap.xml';

  const allowedBots = [
    'Googlebot',
    'Google-Extended',
    'Yeti',
    'Bingbot',
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'PerplexityBot',
    'Perplexity-User',
    'ClaudeBot',
    'Claude-Web',
    'anthropic-ai',
    'Applebot',
    'Applebot-Extended',
    'DuckAssistBot',
  ];

  return [
    '# 경희부강한의원 (Kyunghee Bugang Korean Medicine Clinic)',
    '# 검색엔진 및 AI 검색 크롤러 전면 허용',
    'User-agent: *',
    'Allow: /',
    '',
    ...allowedBots.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    sitemapLine,
    '',
  ].join('\n');
}

export function buildSitemapXml(
  rawOrigin?: string | null,
  lastMod: string = new Date().toISOString().slice(0, 10)
): string {
  const origin = normalizeOrigin(rawOrigin);
  const rootLoc = origin ? `${origin}/` : '/';
  const llmsLoc = origin ? `${origin}/llms.txt` : '/llms.txt';

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${rootLoc}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${llmsLoc}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
`;
}

export function buildLlmsTxt(rawOrigin?: string | null): string {
  const origin = normalizeOrigin(rawOrigin);
  const homeUrl = origin ? `${origin}/` : '/';

  const credentialLines = DOCTOR_PROFILE.credentials.map(
    (c) => `- ${c.period ? `[${c.period}] ` : ''}${c.role}${c.detail ? ` (${c.detail})` : ''}`
  );

  const clinicBlocks = TREATMENT_CLINICS.map(
    (clinic) =>
      `### ${clinic.number}. ${clinic.title}\n- 요약: ${clinic.subtitle}\n- 주요 진료 증상: ${clinic.symptoms.join(', ')}\n- 진료 안내: ${clinic.guidance}`
  );

  const scheduleLines = CLINIC_SCHEDULE_ROWS.map(
    (row) =>
      `- ${row.days}: ${row.hours}${row.badge ? ` (${row.badge})` : ''} | 휴게시간: ${row.breakTime} | 접수마감: ${row.cutoff}${row.note ? ` | 비고: ${row.note}` : ''}`
  );

  const faqLines = FAQ_ITEMS.map(
    (faq, idx) => `### Q${idx + 1}. ${faq.question}\n${faq.answer}`
  );

  return [
    `# ${CLINIC_INFO.nameKo} (${CLINIC_INFO.nameEn})`,
    '',
    `> "${CLINIC_INFO.slogan}" — ${CLINIC_INFO.heroHeadline}`,
    '',
    CLINIC_INFO.heroDescription,
    '',
    '## 기본 정보 및 오시는 길',
    `- 공식 홈페이지: ${homeUrl}`,
    `- 주소: ${CLINIC_INFO.addressRoad}`,
    `- 인근 지하철: 지하철 7호선 신풍역 4번 출구 도보 약 500m`,
    `- 도보 안내: ${CLINIC_INFO.subwayGuide}`,
    `- 주차 안내: ${CLINIC_INFO.parkingGuide}`,
    `- 대표전화: ${CLINIC_LINKS.phoneDisplay}`,
    `- 팩스: ${CLINIC_LINKS.faxDisplay}`,
    `- 이메일: ${CLINIC_LINKS.email}`,
    `- 네이버 예약: ${CLINIC_LINKS.naverBooking}`,
    `- 공식 블로그: ${CLINIC_LINKS.naverBlog}`,
    `- 네이버 지도: ${CLINIC_LINKS.naverMap}`,
    `- 카카오맵: ${CLINIC_LINKS.kakaoMap}`,
    '',
    `## 대표원장 소개 — ${DOCTOR_PROFILE.name} ${DOCTOR_PROFILE.title} (${DOCTOR_PROFILE.degree})`,
    DOCTOR_PROFILE.coreMessage,
    '',
    '### 주요 약력 및 학술 활동',
    ...credentialLines,
    '',
    '## 주요 진료과목 (5대 전문 클리닉)',
    ...clinicBlocks,
    '',
    '## 진료시간 안내',
    ...scheduleLines,
    '',
    '## 자주 묻는 질문 (FAQ)',
    ...faqLines,
    '',
  ].join('\n');
}
