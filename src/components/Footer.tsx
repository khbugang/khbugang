import React from 'react';
import { CLINIC_INFO, CLINIC_LINKS, DOCTOR_PROFILE } from '../data/clinicData';
import { ClinicLogo } from './ClinicLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E2638] text-[#D6CEBE] pt-12 pb-20 md:pb-12 border-t border-[#2E384F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/15">
          <div>
            <ClinicLogo variant="footer" showEnglish />
            <p className="mt-3 text-[13.5px] text-[#C5BDAD]">
              {CLINIC_INFO.slogan} — 기초부터 탄탄한 한약 처방으로 진료합니다.
            </p>
          </div>

          <nav aria-label="푸터 바로가기" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]">
            <a href="#hero" className="hover:text-white transition-colors">
              한의원 소개
            </a>
            <a href="#doctor" className="hover:text-white transition-colors">
              대표원장 약력
            </a>
            <a href="#treatments" className="hover:text-white transition-colors">
              진료과목
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              자주 묻는 질문
            </a>
            <a href="#location" className="hover:text-white transition-colors">
              진료시간·오시는 길
            </a>
            <a
              href={CLINIC_LINKS.naverBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6C79C] hover:text-white font-medium transition-colors"
            >
              네이버 예약
            </a>
          </nav>
        </div>

        <div className="pt-7 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[13.5px] leading-relaxed text-[#C5BDAD]">
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 tabular-nums">
            <span className="font-medium text-white">{CLINIC_INFO.nameKo}</span>
            <span aria-hidden="true" className="text-white/30">|</span>
            <span>대표원장 {DOCTOR_PROFILE.name}</span>
            <span aria-hidden="true" className="text-white/30">|</span>
            <span>서울특별시 영등포구 신길로 145, 1층</span>
            <span aria-hidden="true" className="text-white/30">|</span>
            <a href={CLINIC_LINKS.phoneHref} className="hover:text-white transition-colors">
              TEL {CLINIC_LINKS.phoneDisplay}
            </a>
            <span aria-hidden="true" className="text-white/30">|</span>
            <span>FAX {CLINIC_LINKS.faxDisplay}</span>
            <span aria-hidden="true" className="text-white/30">|</span>
            <a
              href={CLINIC_LINKS.naverBlog}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6C79C] hover:text-white underline underline-offset-4 decoration-white/25 transition-colors"
            >
              공식 블로그
            </a>
          </p>

          <p className="text-[12.5px] text-white/55 shrink-0">
            © {new Date().getFullYear()} {CLINIC_INFO.nameKo}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
