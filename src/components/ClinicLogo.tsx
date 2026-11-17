import React from 'react';

interface ClinicLogoProps {
  variant?: 'header' | 'footer';
  showEnglish?: boolean;
}

/**
 * Symmetrical Y-shaped botanical sprout/leaf SVG symbol paired with
 * Kyunghee Bugang Korean Medicine Clinic serif wordmark.
 */
export const ClinicLogo: React.FC<ClinicLogoProps> = ({
  variant = 'header',
  showEnglish = false,
}) => {
  const isLight = variant === 'footer';

  return (
    <span className="inline-flex items-center gap-2.5 shrink-0">
      <img
        src={
          isLight
            ? '/images/logo-footer.jpg'
            : '/images/logo-header.jpg'
        }
        alt="경희부강한의원 로고"
        width={isLight ? 130 : 128}
        height={isLight ? 129 : 124}
        decoding="async"
        className={
          isLight
            ? 'block w-9 h-9 object-contain rounded-sm shrink-0'
            : 'block w-8 h-8 object-contain shrink-0'
        }
      />

      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-[18px] sm:text-[19px] font-semibold tracking-[-0.02em] whitespace-nowrap ${
            isLight ? 'text-white' : 'text-[#1E2638]'
          }`}
        >
          경희부강한의원
        </span>
        {showEnglish && (
          <span
            className={`mt-1 text-[10px] tracking-[0.08em] uppercase font-sans whitespace-nowrap ${
              isLight ? 'text-[#D6CEBE]' : 'text-[#555555]'
            }`}
          >
            Kyunghee Bugang Korean Medicine Clinic
          </span>
        )}
      </span>
    </span>
  );
};
