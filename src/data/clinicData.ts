export const CLINIC_LINKS = {
  naverBooking: 'https://m.booking.naver.com/booking/16/bizes/1733837',
  naverBlog: 'https://blog.naver.com/kh2ut',
  naverMap: 'https://map.naver.com/p/entry/place/1792130630',
  kakaoMap: 'https://map.kakao.com/link/search/경희부강한의원',
  phoneHref: 'tel:02-842-8889',
  phoneDisplay: '02-842-8889',
  faxDisplay: '02-6442-8389',
  email: 'khbugang@gmail.com',
  emailHref: 'mailto:khbugang@gmail.com',
} as const;

export const CLINIC_INFO = {
  nameKo: '경희부강한의원',
  nameEn: 'Kyunghee Bugang Korean Medicine Clinic',
  slogan: '삶을 풍부하게, 생명력을 강인하게',
  heroHeadline:
    '간단한 침치료에서부터 심도있는 맞춤 한약 처방까지',
  heroDescription:
    '경희대학교 한의과대학과 이화여자대학교 약학대학 강단에서 생리학과 약재·처방을 가르치는 이현일 대표원장이 직접 진단하고 처방합니다.',
  addressRoad: '서울특별시 영등포구 신길로 145, 1층 (신길동 252-1)',
  subwayGuide:
    '7호선 신풍역 4번 출구로 나오셔서 뒤를 돌면 사거리가 있습니다. 길을 건너지 마시고 웨딩홀 방면으로 약 500m 올라오시면 롯데 하이마트 신길점을 지나 바로 경희부강한의원이 있습니다.',
  parkingGuide:
    '한의원 바로 옆 롯데 하이마트 신길점 지상주차장 이용 (최초 60분 무료 / 초과 시 10분당 250원)',
} as const;

export interface DoctorCredential {
  period: string;
  role: string;
  detail?: string;
  isCurrent: boolean;
}

export const DOCTOR_PROFILE = {
  name: '이현일',
  title: '대표원장',
  degree: '한의학박사',
  coreMessage:
    '한방적 관점에서 인체를 파악하는 생리학을 전공하였고, 2009년부터 이어온 17년 이상의 임상 경험을 바탕으로 정확한 진단과 환자에게 적합한 한약 처방에 대해 대학 강단에서 강의하고 있습니다.',
  credentials: [
    {
      period: '현재',
      role: '現 경희부강한의원 대표원장',
      isCurrent: true,
    },
    {
      period: '2018년 ~ 현재',
      role: '現 경희대학교 한의과대학 겸임교수',
      detail: '전공필수 한의학입문, 생리학 강의',
      isCurrent: true,
    },
    {
      period: '2019년 ~ 현재',
      role: '現 이화여자대학교 약학대학 겸임교수',
      detail: '한약제제학, 임상본초학 강의',
      isCurrent: true,
    },
    {
      period: '2026년 ~ 현재',
      role: '現 이화여자대학교 임상바이오헬스대학원 겸임교수',
      detail: '임상한약학 강의',
      isCurrent: true,
    },
    {
      period: '2017년 학위 취득',
      role: '경희대학교 한의과대학 박사',
      detail: '생리학 전공',
      isCurrent: false,
    },
    {
      period: '',
      role: '경희대학교 한의과대학 석사',
      isCurrent: false,
    },
    {
      period: '2009년 졸업',
      role: '경희대학교 한의과대학 학사',
      isCurrent: false,
    },
  ] as DoctorCredential[],
};

export interface TreatmentClinic {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  symptoms: string[];
  guidance: string;
}

export const TREATMENT_CLINICS: TreatmentClinic[] = [
  {
    id: 'pain',
    number: '01',
    title: '통증 치료 클리닉',
    shortTitle: '통증 치료',
    subtitle: '급성 염좌부터 만성 척추·근골격계 통증까지 정밀 치료',
    symptoms: [
      '목 통증 및 경추 통증',
      '허리 통증 및 요추 통증',
      '어깨 결림 및 근육통',
      '손목·발목 염좌',
      '담 결림 및 근육 긴장',
      '척추관 협착증과 관련된 통증 및 팔다리 저림',
      '만성적인 근골격계 통증',
    ],
    guidance:
      '일상생활에서의 손목, 발목, 목, 허리의 염좌나 담결림의 뻐근함과 통증부터 만성적인 척추관 협착증과 저림까지 정밀하고 꼼꼼하게 치료합니다. 간단한 침치료에서 근본적 원인을 위한 한약치료까지, 환자분의 상황에 맞게 진료 가능합니다.',
  },
  {
    id: 'digestive',
    number: '02',
    title: '소화기 장애 클리닉',
    shortTitle: '소화기 장애',
    subtitle: '검사상 이상이 없어도 지속되는 위장 증상의 한의학적 해법',
    symptoms: [
      '급성 및 만성 위염',
      '위축성 위염',
      '기능성 소화불량',
      '식후 더부룩함과 복부 불편감',
      '반복되는 소화 장애',
      '검사상 특별한 이상이 발견되지 않았지만 지속되는 위장 증상',
    ],
    guidance:
      '병원 검사에서 이상이 없다는 소견을 들었으나 불편감과 통증이 계속되는 소화기 증상도 한의학적인 맞춤 치료를 도와드립니다.',
  },
  {
    id: 'skin-allergy',
    number: '03',
    title: '두드러기·피부 소양증·비염·자가면역성 질환',
    shortTitle: '피부·비염·자가면역',
    subtitle: '정확한 한의학적 변증을 통한 면역·피부 질환의 근본 진료',
    symptoms: [
      '만성 두드러기',
      '피부 가려움증 및 소양증',
      '반복되는 피부 불편감',
      '알레르기성 비염',
      '만성 비염',
      '면역 관련 질환에 동반되는 증상',
    ],
    guidance:
      '이현일 박사가 직접 환자 개개인에 맞는 정확한 한의학적 변증을 통해 근본을 치료합니다. 어떨 때 증상이 더 악화되는지, 어떨 때 내 증상이 더 호전되는지 알고 오시면 치료에 많은 도움이 됩니다.',
  },
  {
    id: 'tonifying-postpartum',
    number: '04',
    title: '보양 진료 · 산후 조리약 클리닉',
    shortTitle: '보양 · 산후 조리약',
    subtitle: '체질과 생애 주기를 세밀히 살피는 1:1 맞춤 보약 처방',
    symptoms: [
      '체력 저하 및 만성 피로에 대한 한약 상담',
      '기력 회복을 위한 보양 한약',
      '수술이나 질병 이후 회복기 한약 상담',
      '산후 조리 및 산후 보약',
      '연령과 건강 상태를 고려한 맞춤 한약',
    ],
    guidance:
      '정확한 한의학적 변증을 통해 내 몸에 부족한 조각을 찾아 한약을 처방해드립니다.',
  },
  {
    id: 'traffic-accident',
    number: '05',
    title: '교통사고 후유증 진료',
    shortTitle: '교통사고 후유증',
    subtitle: '자동차보험 적용 · 본인부담금 없는 신속하고 체계적인 회복',
    symptoms: [
      '교통사고 후 목·허리 통증',
      '사고 이후 발생한 근육통 및 관절 통증',
      '교통사고 후유증 관련 증상',
      '자동차보험 적용 한의학적 치료',
    ],
    guidance:
      '자동차 보험으로 본인부담금 없이 정확하고 신속하게 통증질환을 진료해 드립니다.',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '맞춤 한약 처방은 어떤 과정으로 진행되나요?',
    answer:
      '내원하시면 먼저 1:1 문진과 세밀한 변증을 통해 현재 증상과 체질, 악화·호전 요인을 꼼꼼히 살핍니다. 이후 2009년부터 이어온 임상 경험과 경희대 한의과대학(생리학)·이화여대 약학대학(한약제제학·임상본초학)에서 강의하는 원리를 바탕으로, 이현일 대표원장이 직접 환자분에게 알맞은 맞춤 한약을 처방합니다.',
  },
  {
    id: 'faq-2',
    question: '화요일과 금요일에는 왜 오후 2시부터 진료하나요?',
    answer:
      '대표원장의 이화여자대학교 약학대학 및 경희대학교 한의과대학 출강 일정으로 인해 화요일과 금요일은 오전 휴진 후 오후 2시부터 밤 9시까지 야간 진료를 운영하고 있습니다.',
  },
  {
    id: 'faq-3',
    question: '공휴일이나 대체공휴일에도 진료하나요?',
    answer:
      '매주 수요일·일요일 및 법정 공휴일은 정기 휴진이며, 대체공휴일은 정상 진료합니다.',
  },
  {
    id: 'faq-4',
    question: '주차는 어디에 할 수 있나요?',
    answer:
      '한의원 바로 옆 롯데 하이마트 신길점 지상주차장을 이용하실 수 있으며, 최초 60분 무료 주차가 지원됩니다. (추가 요금: 10분당 250원)',
  },
];

export interface ScheduleRow {
  days: string;
  hours: string;
  badge?: string;
  breakTime: string;
  cutoff: string;
  note?: string;
  isClosed?: boolean;
}

export const CLINIC_SCHEDULE_ROWS: ScheduleRow[] = [
  {
    days: '월요일 · 목요일',
    hours: '09:30 - 18:30',
    breakTime: '13:00 - 14:00',
    cutoff: '오전 12:10 / 오후 17:40',
  },
  {
    days: '화요일 · 금요일',
    hours: '14:00 - 21:00',
    badge: '야간진료',
    breakTime: '오전 휴진',
    cutoff: '20:10',
    note: '이화여대·경희대 출강으로 오전 휴진',
  },
  {
    days: '토요일',
    hours: '09:30 - 17:00',
    breakTime: '13:00 - 14:00',
    cutoff: '오전 12:10 / 오후 16:10',
  },
  {
    days: '수요일 · 일요일 · 공휴일',
    hours: '정기 휴무',
    breakTime: '-',
    cutoff: '-',
    note: '단, 대체공휴일은 정상진료',
    isClosed: true,
  },
];
