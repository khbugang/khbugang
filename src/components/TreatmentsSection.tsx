import React, { useState } from 'react';
import { TREATMENT_CLINICS } from '../data/clinicData';

export const TreatmentsSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('all');
  const [herbImgFailed, setHerbImgFailed] = useState(false);

  const visibleClinics =
    selectedId === 'all'
      ? TREATMENT_CLINICS
      : TREATMENT_CLINICS.filter((c) => c.id === selectedId);

  return (
    <section id="treatments" className="scroll-mt-14 lg:scroll-mt-[72px] bg-[#F9F7F4] py-16 lg:py-24 border-b border-[#E6E1D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Intro with Editorial Apothecary Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          <div className="lg:col-span-7">
            <p className="text-[13px] font-medium text-[#A36A36] tracking-[0.06em] mb-2.5">
              03 · 주요 진료과목
            </p>
            <h2 className="font-serif text-[28px] sm:text-[34px] font-semibold text-[#1E2638] tracking-[-0.02em] leading-[1.35] [text-wrap:balance] mb-4">
              생리학적 진단과 본초학에 근거한 다섯 가지 전문 클리닉
            </h2>
            <p className="text-[15.5px] text-[#444444] leading-[1.75] max-w-2xl">
              증상의 일시적 완화에만 머무르지 않고, 환자의 생리적 균형과 악화·호전 요인을 세밀히 살핍니다. 간단한 침치료부터 개개인의 변증에 맞춘 정교한 한약 처방까지 상태에 맞게 진료합니다.
            </p>
          </div>

          <div className="lg:col-span-5">
            <figure className="rounded overflow-hidden border border-[#DED8CE] bg-white">
              <div className="aspect-[4/3] w-full overflow-hidden">
                {!herbImgFailed ? (
                  <img
                    src="/src/assets/images/herbal_apothecary_detail_1794831626802.jpg"
                    alt="정선된 한약재와 맞춤 한약 처방 이미지"
                    referrerPolicy="no-referrer"
                    onError={() => setHerbImgFailed(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-6 bg-[#EDE8DF] text-[#1E2638] font-serif">
                    한약제제학 · 임상본초학 기반 맞춤 처방
                  </div>
                )}
              </div>
              <figcaption className="px-4 py-2.5 text-[12.5px] text-[#555555] border-t border-[#EFECE6]">
                <span className="font-serif font-medium text-[#1E2638] mr-2">治病 必求於本</span>
                <span>병을 치료함에 반드시 그 근본을 구하라.</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Interactive Clinic Filter Bar */}
        <div
          role="tablist"
          aria-label="진료과목 선택"
          className="flex flex-wrap items-center gap-2 pb-6 mb-8 border-b border-[#DED8CE]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedId === 'all'}
            onClick={() => setSelectedId('all')}
            className={`px-4 py-2.5 text-[14px] font-medium rounded border transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-2 focus-visible:outline-[#A36A36] ${
              selectedId === 'all'
                ? 'bg-[#1E2638] text-white border-[#1E2638]'
                : 'bg-white text-[#333333] border-[#DED8CE] hover:border-[#A36A36] hover:text-[#1E2638]'
            }`}
          >
            전체 과목 보기
          </button>

          {TREATMENT_CLINICS.map((clinic) => {
            const isSelected = selectedId === clinic.id;
            return (
              <button
                key={clinic.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedId(clinic.id)}
                className={`px-4 py-2.5 text-[14px] font-medium rounded border transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-2 focus-visible:outline-[#A36A36] ${
                  isSelected
                    ? 'bg-[#1E2638] text-white border-[#1E2638]'
                    : 'bg-white text-[#333333] border-[#DED8CE] hover:border-[#A36A36] hover:text-[#1E2638]'
                }`}
              >
                <span className={`mr-1.5 tabular-nums ${isSelected ? 'text-[#D6CEBE]' : 'text-[#9D7E52]'}`}>
                  {clinic.number}
                </span>
                {clinic.shortTitle}
              </button>
            );
          })}
        </div>

        {/* Clinic Dossier Articles */}
        <div className="space-y-6">
          {visibleClinics.map((clinic) => (
            <article
              key={clinic.id}
              id={`clinic-${clinic.id}`}
              className="bg-white border border-[#E2DCD2] rounded p-6 sm:p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                {/* Left: Title & Doctor's Clinical Philosophy */}
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-2 text-[13px] font-medium text-[#A36A36] mb-2 tabular-nums">
                    <span>클리닉 {clinic.number}</span>
                    <span aria-hidden="true" className="text-[#9D7E52]">·</span>
                    <span className="text-[#555555]">{clinic.subtitle}</span>
                  </div>

                  <h3 className="font-serif text-[22px] sm:text-[25px] font-semibold text-[#1E2638] tracking-[-0.015em] mb-4">
                    {clinic.title}
                  </h3>

                  <p className="text-[15.5px] text-[#333333] leading-[1.8]">
                    {clinic.guidance}
                  </p>
                </div>

                {/* Right: Symptoms List */}
                <div className="lg:col-span-6 lg:pl-8 lg:border-l lg:border-[#EFECE6]">
                  <h4 className="text-[13.5px] font-semibold text-[#1E2638] mb-3.5">
                    주요 진료 증상
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-2.5 gap-x-6">
                    {clinic.symptoms.map((symptom) => (
                      <li
                        key={symptom}
                        className="flex items-start gap-2.5 text-[14.5px] text-[#444444] leading-[1.55]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[8px] w-1.5 h-1.5 rounded-xs bg-[#A36A36] shrink-0"
                        />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
