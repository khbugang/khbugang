import React, { useState } from 'react';
import { CalendarCheck, BookOpen, Phone } from 'lucide-react';
import { CLINIC_INFO, CLINIC_LINKS } from '../data/clinicData';

export const HeroSection: React.FC = () => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section
      id="hero"
      className="scroll-mt-14 lg:scroll-mt-[72px] bg-[#F9F7F4] border-b border-[#E6E1D8]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Slogan, H1, Description, CTAs */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-[#555555] tracking-tight mb-5">
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <span className="font-medium text-[#1E2638]">서울 영등포구 신길동</span>
                <span aria-hidden="true" className="text-[#9D7E52]">·</span>
                <span>7호선 신풍역 4번 출구</span>
              </span>
              <span aria-hidden="true" className="hidden sm:inline text-[#9D7E52]">·</span>
              <span className="whitespace-nowrap">{CLINIC_INFO.nameEn}</span>
            </div>

            <p className="font-serif text-[17px] sm:text-[19px] font-medium text-[#A36A36] tracking-[-0.01em] mb-3.5">
              “{CLINIC_INFO.slogan}”
            </p>

            <h1 className="font-serif text-[28px] sm:text-[36px] lg:text-[40px] font-semibold text-[#1E2638] leading-[1.34] tracking-[-0.02em] [text-wrap:balance] mb-5">
              {CLINIC_INFO.heroHeadline}
            </h1>

            <p className="text-[15.5px] sm:text-[16.5px] text-[#444444] leading-[1.78] max-w-xl mb-8">
              {CLINIC_INFO.heroDescription}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-stretch sm:items-center gap-2.5">
              <a
                href={CLINIC_LINKS.naverBooking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-[14px] font-medium text-white bg-[#1E2638] hover:bg-[#A36A36] rounded transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A36A36]"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>네이버 예약 바로가기</span>
              </a>

              <a
                href={CLINIC_LINKS.naverBlog}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-[14px] font-medium text-[#1E2638] bg-white hover:bg-[#F2EFE9] border border-[#1E2638]/25 rounded transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A36A36]"
              >
                <BookOpen className="w-4 h-4 text-[#A36A36] shrink-0" aria-hidden="true" />
                <span>공식 블로그 보기</span>
              </a>

              <a
                href={CLINIC_LINKS.phoneHref}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-[14px] font-medium text-[#A36A36] bg-white hover:bg-[#F2EFE9] border border-[#A36A36]/45 rounded transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[46px] tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A36A36]"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>전화 상담 {CLINIC_LINKS.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clinic Storefront Visual */}
          <div className="lg:col-span-6 flex flex-col">
            <figure className="relative w-full aspect-[2.65/1] rounded overflow-hidden border border-[#DED8CE] bg-[#A36A36]">
              {!imgFailed ? (
                <img
                  src="/images/clinic-exterior.jpg"
                  alt="경희부강한의원 외관 및 주요 진료 안내 전경"
                  width={914}
                  height={477}
                  fetchPriority="high"
                  decoding="async"
                  onError={() => setImgFailed(true)}
                  className="block w-full h-full object-cover object-center scale-[1.02]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#F9F7F4] to-[#E9E3D7]">
                  <p className="font-serif text-lg font-medium text-[#1E2638]">
                    {CLINIC_INFO.nameKo}
                  </p>
                  <p className="mt-1 text-xs text-[#555555]">
                    {CLINIC_INFO.nameEn}
                  </p>
                </div>
              )}
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
