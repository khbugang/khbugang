export interface ClinicStatus {
  isOpen: boolean;
  label: string;
  detail: string;
  dayNameKo: string;
}

const DAY_NAMES_KO = ['일', '월', '화', '수', '목', '금', '토'] as const;

function toKstParts(date: Date): { dayOfWeek: number; minutesSinceMidnight: number } {
  // Always compute in Asia/Seoul (UTC+9, no DST) regardless of browser timezone
  const utcMs = date.getTime() + date.getTimezoneOffset() * 60_000;
  const kstDate = new Date(utcMs + 9 * 60 * 60_000);
  return {
    dayOfWeek: kstDate.getDay(),
    minutesSinceMidnight: kstDate.getHours() * 60 + kstDate.getMinutes(),
  };
}

function hm(hour: number, minute: number): number {
  return hour * 60 + minute;
}

/**
 * Evaluates clinic operating status in Asia/Seoul (KST) based on official hours:
 * - Mon(1), Thu(4): 09:30 - 18:30 (Break 13:00 - 14:00, Cutoff 12:10 / 17:40)
 * - Tue(2), Fri(5): 14:00 - 21:00 [Night Clinic] (Morning off for university lectures, Cutoff 20:10)
 * - Sat(6): 09:30 - 17:00 (Break 13:00 - 14:00, Cutoff 12:10 / 16:10)
 * - Wed(3), Sun(0): Regular Closed Day
 */
export function getClinicStatusAt(date: Date = new Date()): ClinicStatus {
  const { dayOfWeek, minutesSinceMidnight } = toKstParts(date);
  const dayNameKo = `${DAY_NAMES_KO[dayOfWeek]}요일`;

  // Wednesday (3) or Sunday (0)
  if (dayOfWeek === 3 || dayOfWeek === 0) {
    return {
      isOpen: false,
      label: '정기 휴진',
      detail: '매주 수요일·일요일은 정기 휴진일입니다.',
      dayNameKo,
    };
  }

  // Tuesday (2) or Friday (5): 14:00 - 21:00 (Cutoff 20:10)
  if (dayOfWeek === 2 || dayOfWeek === 5) {
    if (minutesSinceMidnight < hm(14, 0)) {
      return {
        isOpen: false,
        label: '오전 휴진 · 14:00 개원',
        detail: '대학 출강으로 오후 2시부터 21시까지 야간 진료합니다.',
        dayNameKo,
      };
    }
    if (minutesSinceMidnight <= hm(20, 10)) {
      return {
        isOpen: true,
        label: '야간 진료 중',
        detail: '21:00까지 진료 (접수마감 20:10)',
        dayNameKo,
      };
    }
    if (minutesSinceMidnight < hm(21, 0)) {
      return {
        isOpen: true,
        label: '야간 접수 마감',
        detail: '당일 접수(20:10)가 마감되었으며 21:00까지 진료합니다.',
        dayNameKo,
      };
    }
    return {
      isOpen: false,
      label: '진료 종료',
      detail: '오늘 진료가 마감되었습니다. 네이버 예약으로 다음 일정을 잡으실 수 있습니다.',
      dayNameKo,
    };
  }

  // Monday (1), Thursday (4): 09:30 - 18:30 (Break 13:00-14:00, Cutoff 12:10 / 17:40)
  // Saturday (6): 09:30 - 17:00 (Break 13:00-14:00, Cutoff 12:10 / 16:10)
  const isSat = dayOfWeek === 6;
  const afternoonCutoff = isSat ? hm(16, 10) : hm(17, 40);
  const closeTime = isSat ? hm(17, 0) : hm(18, 30);
  const closeStr = isSat ? '17:00' : '18:30';
  const afternoonCutoffStr = isSat ? '16:10' : '17:40';

  if (minutesSinceMidnight < hm(9, 30)) {
    return {
      isOpen: false,
      label: '09:30 진료 시작',
      detail: `오늘 진료시간 09:30 - ${closeStr} (휴게 13:00 - 14:00)`,
      dayNameKo,
    };
  }

  if (minutesSinceMidnight <= hm(12, 10)) {
    return {
      isOpen: true,
      label: '오전 진료 중',
      detail: '오전 접수마감 12:10 · 휴게시간 13:00 - 14:00',
      dayNameKo,
    };
  }

  if (minutesSinceMidnight < hm(13, 0)) {
    return {
      isOpen: true,
      label: '오전 접수 마감',
      detail: '14:00부터 오후 진료를 시작합니다.',
      dayNameKo,
    };
  }

  if (minutesSinceMidnight < hm(14, 0)) {
    return {
      isOpen: false,
      label: '점심 휴게시간',
      detail: `14:00 진료 재개 (오후 접수마감 ${afternoonCutoffStr})`,
      dayNameKo,
    };
  }

  if (minutesSinceMidnight <= afternoonCutoff) {
    return {
      isOpen: true,
      label: '오후 진료 중',
      detail: `${closeStr}까지 진료 (접수마감 ${afternoonCutoffStr})`,
      dayNameKo,
    };
  }

  if (minutesSinceMidnight < closeTime) {
    return {
      isOpen: true,
      label: '오후 접수 마감',
      detail: `당일 접수(${afternoonCutoffStr})가 마감되었으며 ${closeStr}까지 진료합니다.`,
      dayNameKo,
    };
  }

  return {
    isOpen: false,
    label: '진료 종료',
    detail: '오늘 진료가 마감되었습니다. 네이버 예약으로 다음 일정을 잡으실 수 있습니다.',
    dayNameKo,
  };
}
