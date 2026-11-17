import React from 'react';
import { MapPin, Train, Car, Phone, Mail, BookOpen, ExternalLink } from 'lucide-react';
import { CLINIC_INFO, CLINIC_LINKS, CLINIC_SCHEDULE_ROWS } from '../data/clinicData';

export const LocationHoursSection: React.FC = () => {
  return (
    <section id="location" className="scroll-mt-14 lg:scroll-mt-[72px] bg-[#F9F7F4] py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-[13px] font-medium text-[#A36A36] tracking-[0.06em] mb-2.5">
            05 · 진료시간 안내 및 오시는 길
          </p>
          <h2 className="font-serif text-[28px] sm:text-[34px] font-semibold text-[#1E2638] tracking-[-0.02em] leading-[1.35]">
            진료시간 및 내원 안내
          </h2>
        </div>

        {/* Hours Table */}
        <div className="bg-white border border-[#E2DCD2] rounded overflow-hidden mb-10">
          <div className="px-6 py-4 bg-[#1E2638] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-serif text-[18px] font-medium">
              경희부강한의원 진료시간표
            </h3>
            <p className="text-[13px] text-[#D6CEBE]">
              화·금 야간진료 운영 · 접수마감 시간을 확인해 주세요
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#E6E1D8] bg-[#FAF9F6] text-[13px] font-semibold text-[#555555]">
                  <th scope="col" className="py-3.5 px-6">요일 구분</th>
                  <th scope="col" className="py-3.5 px-6">진료 시간</th>
                  <th scope="col" className="py-3.5 px-6">휴게 시간</th>
                  <th scope="col" className="py-3.5 px-6">접수 마감</th>
                  <th scope="col" className="py-3.5 px-6">비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6] text-[14.5px]">
                {CLINIC_SCHEDULE_ROWS.map((row) => (
                  <tr
                    key={row.days}
                    className={row.isClosed ? 'bg-[#FAF8F4]' : 'bg-white'}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-semibold text-[#1E2638] whitespace-nowrap"
                    >
                      <span>{row.days}</span>
                      {row.badge && (
                        <span className="ml-2 text-[12px] font-semibold text-[#A36A36]">
                          [{row.badge}]
                        </span>
                      )}
                    </th>
                    <td
                      className={`py-4 px-6 tabular-nums font-medium whitespace-nowrap ${
                        row.isClosed ? 'text-[#8B572A]' : 'text-[#222222]'
                      }`}
                    >
                      {row.hours}
                    </td>
                    <td className="py-4 px-6 tabular-nums text-[#555555] whitespace-nowrap">
                      {row.breakTime}
                    </td>
                    <td className="py-4 px-6 tabular-nums font-medium text-[#222222] whitespace-nowrap">
                      {row.cutoff}
                    </td>
                    <td className="py-4 px-6 text-[13.5px] text-[#555555]">
                      {row.note ?? '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Location Details & Walking Route Schematic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Structured Address, Transit, Parking & Contact DL */}
          <div className="lg:col-span-7 bg-white border border-[#E2DCD2] rounded p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-[20px] font-semibold text-[#1E2638] mb-6">
                오시는 길 및 연락처
              </h3>

              <dl className="divide-y divide-[#EFECE6] border-t border-b border-[#EFECE6]">
                <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4">
                  <dt className="sm:col-span-3 flex items-center gap-2 text-[14px] font-semibold text-[#1E2638]">
                    <MapPin className="w-4 h-4 text-[#A36A36] shrink-0" aria-hidden="true" />
                    <span>도로명 주소</span>
                  </dt>
                  <dd className="sm:col-span-9 text-[15px] text-[#222222] font-medium">
                    {CLINIC_INFO.addressRoad}
                  </dd>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4">
                  <dt className="sm:col-span-3 flex items-center gap-2 text-[14px] font-semibold text-[#1E2638]">
                    <Train className="w-4 h-4 text-[#A36A36] shrink-0" aria-hidden="true" />
                    <span>지하철 안내</span>
                  </dt>
                  <dd className="sm:col-span-9 text-[14.5px] text-[#444444] leading-[1.75]">
                    {CLINIC_INFO.subwayGuide}
                  </dd>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4">
                  <dt className="sm:col-span-3 flex items-center gap-2 text-[14px] font-semibold text-[#1E2638]">
                    <Car className="w-4 h-4 text-[#A36A36] shrink-0" aria-hidden="true" />
                    <span>주차 안내</span>
                  </dt>
                  <dd className="sm:col-span-9 text-[14.5px] text-[#444444] leading-[1.7] tabular-nums">
                    {CLINIC_INFO.parkingGuide}
                  </dd>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4">
                  <dt className="sm:col-span-3 flex items-center gap-2 text-[14px] font-semibold text-[#1E2638]">
                    <Phone className="w-4 h-4 text-[#A36A36] shrink-0" aria-hidden="true" />
                    <span>대표전화·팩스</span>
                  </dt>
                  <dd className="sm:col-span-9 text-[14.5px] text-[#222222] tabular-nums flex flex-wrap items-center gap-x-3 gap-y-1">
                    <a
                      href={CLINIC_LINKS.phoneHref}
                      className="font-semibold text-[#1E2638] hover:text-[#A36A36] underline underline-offset-4 decoration-[#D6CEBE]"
                    >
                      TEL {CLINIC_LINKS.phoneDisplay}
                    </a>
                    <span aria-hidden="true" className="text-[#9D7E52]">|</span>
                    <span className="text-[#555555]">FAX {CLINIC_LINKS.faxDisplay}</span>
                  </dd>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4">
                  <dt className="sm:col-span-3 flex items-center gap-2 text-[14px] font-semibold text-[#1E2638]">
                    <Mail className="w-4 h-4 text-[#A36A36] shrink-0" aria-hidden="true" />
                    <span>이메일·블로그</span>
                  </dt>
                  <dd className="sm:col-span-9 text-[14.5px] text-[#444444] flex flex-wrap items-center gap-x-3 gap-y-1">
                    <a
                      href={CLINIC_LINKS.emailHref}
                      className="hover:text-[#A36A36] underline underline-offset-4 decoration-[#D6CEBE]"
                    >
                      {CLINIC_LINKS.email}
                    </a>
                    <span aria-hidden="true" className="text-[#9D7E52]">|</span>
                    <a
                      href={CLINIC_LINKS.naverBlog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-[#1E2638] hover:text-[#A36A36]"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#A36A36]" aria-hidden="true" />
                      <span>공식 블로그 바로가기</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Map Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={CLINIC_LINKS.naverMap}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-[14.5px] font-medium text-white bg-[#1E2638] hover:bg-[#A36A36] rounded transition-colors duration-150 whitespace-nowrap min-h-[46px]"
              >
                <span>네이버 지도 길찾기</span>
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
              <a
                href={CLINIC_LINKS.kakaoMap}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-[14.5px] font-medium text-[#1E2638] bg-[#F9F7F4] hover:bg-[#EFECE6] border border-[#D6CEBE] rounded transition-colors duration-150 whitespace-nowrap min-h-[46px]"
              >
                <span>카카오맵 길찾기</span>
                <ExternalLink className="w-4 h-4 shrink-0 text-[#A36A36]" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right: Doctor's Treatment Photo & Greeting Card */}
          <div className="lg:col-span-5 bg-white border border-[#E2DCD2] rounded p-6 sm:p-7 flex flex-col justify-between">
            <div>
              {/* Top Editorial Header: Portrait + Title */}
              <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-5 pb-5 border-b border-[#EFECE6]">
                <figure className="w-40 sm:w-[164px] aspect-[2/3] rounded overflow-hidden border border-[#E6E1D8] bg-[#F9F7F4] shrink-0">
                  <img
                    src="/images/doctor-treatment.jpg"
                    alt="환자를 정성껏 진료 중인 경희부강한의원 이현일 대표원장"
                    width={900}
                    height={1350}
                    decoding="async"
                    className="block w-full h-full object-cover object-top"
                  />
                </figure>

                <div className="flex flex-col justify-center text-center sm:text-left">
                  <p className="text-[12.5px] font-medium text-[#A36A36] tracking-[0.04em] mb-1.5">
                    대표원장 인사말
                  </p>
                  <h3 className="font-serif text-[18px] sm:text-[19px] font-semibold text-[#1E2638] leading-[1.45] [text-wrap:balance]">
                    환자 한분마다 공들여 진료에 임하고자 합니다.
                  </h3>
                  <div
                    aria-hidden="true"
                    className="w-8 h-[2px] bg-[#A36A36]/70 my-3.5 mx-auto sm:mx-0"
                  />
                  <p className="text-[13px] text-[#555555] leading-relaxed">
                    경희부강한의원 대표원장
                    <br />
                    한의학박사 이현일
                  </p>
                </div>
              </div>

              {/* Greeting Letter Body */}
              <div className="pt-5 space-y-3 text-[13.5px] sm:text-[14px] text-[#333333] leading-[1.78]">
                <p>
                  저희 한의원을 찾아주신 모든 환자분들의 쾌유를 기원합니다.
                  <br />
                  환자분의 쾌유로 환자분 가정에 더 밝은 빛이 깃들기를 기원합니다.
                  <br />
                  환자분이 건강을 회복하시는 모습을 곁에서 본 저희 직원들이 보람을 느끼기를 기원합니다.
                </p>
                <p>
                  저와 우리 의료진들이 타인에게 도움이 되는 존재라는 자긍심과 사명감을 굳건히 하여
                  또 다른 환자분께도 긍정의 에너지를 전달할 수 있는 존재가 되기를 기원합니다.
                </p>
                <p>
                  이러한 긍정의 도미노를 매일 반복하는 것은 저에게 매우 복된 일이기 때문에
                  매일 아침마다 새로 태어난 기분으로 환자 한분마다 공들여 진료에 임하고자 합니다.
                </p>
              </div>
            </div>

            <p className="mt-5 pt-4 border-t border-[#EFECE6] text-right font-serif text-[14.5px] font-medium text-[#1E2638]">
              &lt;원장 한의학박사 이현일 배상&gt;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
