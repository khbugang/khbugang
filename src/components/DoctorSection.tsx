import React, { useState } from 'react';
import { DOCTOR_PROFILE } from '../data/clinicData';
import { handleClinicImageError } from '../utils/imageFallbackHandler';

export const DoctorSection: React.FC = () => {
  const [portraitFailed, setPortraitFailed] = useState(false);

  return (
    <section id="doctor" className="scroll-mt-14 lg:scroll-mt-[72px] bg-white py-16 lg:py-24 border-b border-[#E6E1D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <p className="text-[13px] font-medium text-[#A36A36] tracking-[0.06em] mb-2.5">
            02 · 대표원장 소개
          </p>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="font-serif text-[28px] sm:text-[34px] font-semibold text-[#1E2638] tracking-[-0.02em]">
              {`${DOCTOR_PROFILE.name} 원장`}
            </h2>
            <span className="text-[16px] font-medium text-[#555555]">
              {`(${DOCTOR_PROFILE.degree})`}
            </span>
          </div>
        </div>

        {/* Two-column Editorial Layout: Portrait + Core Message & Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5">
            <figure className="rounded overflow-hidden border border-[#E6E1D8] bg-[#F9F7F4]">
              <div className="aspect-[3/4] w-full overflow-hidden">
                {!portraitFailed ? (
                  <img
                    src="/images/doctor-profile.jpg"
                    alt="경희부강한의원 이현일 대표원장 한의학박사 프로필 사진"
                    width={664}
                    height={623}
                    decoding="async"
                    onError={(e) => handleClinicImageError(e, () => setPortraitFailed(true))}
                    className="block w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F9F7F4]">
                    <p className="font-serif text-xl font-semibold text-[#1E2638]">
                      이현일 원장
                    </p>
                    <p className="text-sm text-[#555555] mt-1">
                      경희대학교 한의학박사
                    </p>
                  </div>
                )}
              </div>
              <figcaption className="px-5 py-4 bg-[#1E2638] text-white">
                <p className="font-serif text-[16px] font-medium">
                  이현일 대표원장 <span className="text-[#D6CEBE] text-[13px] font-sans font-normal ml-1">한의학박사</span>
                </p>
                <p className="text-[13px] text-[#D6CEBE] mt-1 leading-relaxed">
                  경희대학교 한의과대학 · 이화여자대학교 약학대학 겸임교수
                </p>
              </figcaption>
            </figure>
          </div>

          {/* Right Column: Core Message + Academic & Clinical Timeline */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="py-6 border-y border-[#E6E1D8] mb-8">
              <p className="font-serif text-[18px] sm:text-[20px] text-[#1E2638] leading-[1.78] tracking-[-0.01em] max-w-2xl">
                {`“${DOCTOR_PROFILE.coreMessage}”`}
              </p>
            </div>

            <div>
              <h3 className="text-[15px] font-semibold text-[#1E2638] mb-4">
                주요 약력 및 학술 활동
              </h3>

              <ul className="divide-y divide-[#EFECE6] border-t border-b border-[#EFECE6]">
                {DOCTOR_PROFILE.credentials.map((cred, index) => (
                  <li
                    key={`${cred.role}-${index}`}
                    className="py-3.5 sm:py-4 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline"
                  >
                    {cred.period ? (
                      <span
                        className={`sm:col-span-4 text-[13px] tabular-nums ${
                          cred.isCurrent
                            ? 'font-semibold text-[#A36A36]'
                            : 'font-medium text-[#777777]'
                        }`}
                      >
                        {cred.period}
                      </span>
                    ) : (
                      <span aria-hidden="true" className="hidden sm:block sm:col-span-4" />
                    )}
                    <div className="sm:col-span-8">
                      <p
                        className={`text-[15.5px] leading-snug ${
                          cred.isCurrent
                            ? 'font-semibold text-[#1E2638]'
                            : 'font-medium text-[#333333]'
                        }`}
                      >
                        {cred.role}
                      </p>
                      {cred.detail && (
                        <p className="text-[13.5px] text-[#555555] mt-1">
                          {cred.detail}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
