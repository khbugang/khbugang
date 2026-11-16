import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/clinicData';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faq" className="scroll-mt-14 lg:scroll-mt-[72px] bg-white py-16 lg:py-24 border-b border-[#E6E1D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <p className="text-[13px] font-medium text-[#A36A36] tracking-[0.06em] mb-2.5">
            04 · 자주 묻는 질문
          </p>
          <h2 className="font-serif text-[28px] sm:text-[34px] font-semibold text-[#1E2638] tracking-[-0.02em] leading-[1.35]">
            내원 전 자주 확인하시는 안내사항
          </h2>
        </div>

        <div className="border-t border-[#DED8CE] divide-y divide-[#DED8CE]">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = Boolean(openIds[item.id]);
            const panelId = `${item.id}-panel`;
            const btnId = `${item.id}-button`;

            return (
              <article key={item.id} className="py-1">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full py-5 text-left flex items-start justify-between gap-4 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A36A36]"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-serif text-[16px] font-semibold text-[#A36A36] tabular-nums shrink-0">
                        Q{idx + 1}.
                      </span>
                      <span className="text-[16px] sm:text-[17px] font-semibold text-[#1E2638] group-hover:text-[#A36A36] transition-colors duration-150 leading-[1.5]">
                        {item.question}
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#555555] shrink-0 mt-0.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#A36A36]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  hidden={!isOpen}
                  className="pb-6 pl-8 sm:pl-10 pr-4"
                >
                  <p className="text-[15.5px] text-[#444444] leading-[1.8]">
                    {item.answer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
