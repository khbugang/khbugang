import test from 'node:test';
import assert from 'node:assert/strict';
import { getClinicStatusAt } from './clinicHours';
import {
  CLINIC_INFO,
  CLINIC_LINKS,
  CLINIC_SCHEDULE_ROWS,
  DOCTOR_PROFILE,
  FAQ_ITEMS,
  TREATMENT_CLINICS,
} from '../data/clinicData';

// Helper to construct a Date from KST wall-clock string
function kst(isoWithoutTz: string): Date {
  return new Date(`${isoWithoutTz}+09:00`);
}

test('Monday morning regular consultation & cutoffs', () => {
  const openMorning = getClinicStatusAt(kst('2026-11-16T10:00:00')); // Mon
  assert.equal(openMorning.isOpen, true);
  assert.equal(openMorning.label, '오전 진료 중');
  assert.equal(openMorning.dayNameKo, '월요일');

  const morningCutoff = getClinicStatusAt(kst('2026-11-16T12:25:00'));
  assert.equal(morningCutoff.label, '오전 접수 마감');

  const lunch = getClinicStatusAt(kst('2026-11-16T13:30:00'));
  assert.equal(lunch.isOpen, false);
  assert.equal(lunch.label, '점심 휴게시간');

  const afternoonOpen = getClinicStatusAt(kst('2026-11-16T15:00:00'));
  assert.equal(afternoonOpen.isOpen, true);
  assert.equal(afternoonOpen.label, '오후 진료 중');

  const closed = getClinicStatusAt(kst('2026-11-16T19:00:00'));
  assert.equal(closed.isOpen, false);
  assert.equal(closed.label, '진료 종료');
});

test('Tuesday & Friday lecture morning off and night clinic 14:00-21:00', () => {
  const tueMorning = getClinicStatusAt(kst('2026-11-17T10:30:00')); // Tue
  assert.equal(tueMorning.isOpen, false);
  assert.equal(tueMorning.label, '오전 휴진 · 14:00 개원');

  const friNight = getClinicStatusAt(kst('2026-11-20T19:30:00')); // Fri
  assert.equal(friNight.isOpen, true);
  assert.equal(friNight.label, '야간 진료 중');

  const friCutoff = getClinicStatusAt(kst('2026-11-20T20:30:00'));
  assert.equal(friCutoff.label, '야간 접수 마감');
});

test('Wednesday & Sunday regular closed days', () => {
  const wed = getClinicStatusAt(kst('2026-11-18T11:00:00')); // Wed
  assert.equal(wed.isOpen, false);
  assert.equal(wed.label, '정기 휴진');

  const sun = getClinicStatusAt(kst('2026-11-22T15:00:00')); // Sun
  assert.equal(sun.isOpen, false);
  assert.equal(sun.label, '정기 휴진');
});

test('Saturday hours close at 17:00 with 16:10 cutoff', () => {
  const satOpen = getClinicStatusAt(kst('2026-11-21T15:30:00')); // Sat
  assert.equal(satOpen.isOpen, true);
  assert.equal(satOpen.label, '오후 진료 중');

  const satCutoff = getClinicStatusAt(kst('2026-11-21T16:20:00'));
  assert.equal(satCutoff.label, '오후 접수 마감');

  const satClosed = getClinicStatusAt(kst('2026-11-21T17:05:00'));
  assert.equal(satClosed.isOpen, false);
  assert.equal(satClosed.label, '진료 종료');
});

test('Clinic data completeness check', () => {
  assert.equal(CLINIC_INFO.nameKo, '경희부강한의원');
  assert.equal(CLINIC_LINKS.phoneDisplay, '02-842-8889');
  assert.equal(DOCTOR_PROFILE.credentials.length, 7);
  assert.equal(TREATMENT_CLINICS.length, 5);
  assert.equal(FAQ_ITEMS.length, 4);
  assert.equal(CLINIC_SCHEDULE_ROWS.length, 4);
});
