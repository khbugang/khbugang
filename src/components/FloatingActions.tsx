import React from 'react';
import { CalendarCheck, BookOpen, Phone } from 'lucide-react';
import { CLINIC_LINKS } from '../data/clinicData';

export const FloatingActions: React.FC = () => {
  return (
    <>
      {/* Desktop: Compact right-gutter quick rail (fits inside 1440px outer margin without covering content) */}
      <aside
        aria-label="빠른 예약 및 문의"
        className="fixed bottom-6 right-3 xl:right-5 z-30 hidden md:flex flex-col w-[116px] bg-white border border-[#D6CEBE] rounded shadow-md overflow-hidden divide-y divide-[#EFECE6]"
      >
        <a
          href={CLINIC_LINKS.naverBooking}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 px-2 bg-[#1E2638] hover:bg-[#A36A36] text-white text-[12.5px] font-medium transition-colors duration-150 whitespace-nowrap"
        >
          <CalendarCheck className="w-4 h-4 text-[#E6C79C] shrink-0" aria-hidden="true" />
          <span>네이버 예약</span>
        </a>

        <a
          href={CLINIC_LINKS.naverBlog}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 px-2 bg-white hover:bg-[#F9F7F4] text-[#1E2638] text-[12.5px] font-medium transition-colors duration-150 whitespace-nowrap"
        >
          <BookOpen className="w-4 h-4 text-[#A36A36] shrink-0" aria-hidden="true" />
          <span>공식 블로그</span>
        </a>

        <a
          href={CLINIC_LINKS.phoneHref}
          aria-label={`전화 문의 ${CLINIC_LINKS.phoneDisplay}`}
          className="flex flex-col items-center justify-center gap-0.5 py-3 px-2 bg-[#A36A36] hover:bg-[#8B572A] text-white transition-colors duration-150 whitespace-nowrap"
        >
          <Phone className="w-4 h-4 shrink-0 mb-0.5" aria-hidden="true" />
          <span className="text-[12px] font-medium">전화 문의</span>
          <span className="text-[11px] font-normal text-white/90 tabular-nums">
            {CLINIC_LINKS.phoneDisplay}
          </span>
        </a>
      </aside>

      {/* Mobile: Compact 56px bottom bar (keeps total sticky height <= 15% of mobile viewport) */}
      <nav
        aria-label="모바일 빠른 예약 및 문의"
        className="fixed bottom-0 inset-x-0 z-30 md:hidden h-14 bg-[#1E2638] text-white border-t border-white/15 grid grid-cols-3 divide-x divide-white/15"
      >
        <a
          href={CLINIC_LINKS.naverBooking}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 text-[13px] font-medium bg-[#A36A36] text-white active:bg-[#8B572A] whitespace-nowrap"
        >
          <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>네이버 예약</span>
        </a>

        <a
          href={CLINIC_LINKS.naverBlog}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-white active:bg-white/10 whitespace-nowrap"
        >
          <BookOpen className="w-4 h-4 text-[#E6C79C] shrink-0" aria-hidden="true" />
          <span>공식 블로그</span>
        </a>

        <a
          href={CLINIC_LINKS.phoneHref}
          className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-white active:bg-white/10 whitespace-nowrap"
        >
          <Phone className="w-4 h-4 text-[#E6C79C] shrink-0" aria-hidden="true" />
          <span>전화 문의</span>
        </a>
      </nav>
    </>
  );
};
