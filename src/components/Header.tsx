import React, { useState } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { CLINIC_LINKS } from '../data/clinicData';
import { ClinicLogo } from './ClinicLogo';

const NAV_ITEMS = [
  { label: '한의원 소개', href: '#hero' },
  { label: '대표원장 약력', href: '#doctor' },
  { label: '진료과목', href: '#treatments' },
  { label: '진료시간·오시는 길', href: '#location' },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E6E1D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 lg:h-[72px] flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Logo */}
        <a
          href="#hero"
          className="whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A36A36]"
          aria-label="경희부강한의원 홈으로 이동"
        >
          <ClinicLogo variant="header" />
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="주 메뉴"
          className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#333333]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#A36A36] hover:text-[#1E2638] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A36A36]"
            >
              {item.label}
            </a>
          ))}
          <a
            href={CLINIC_LINKS.naverBlog}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#A36A36] hover:text-[#1E2638] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A36A36]"
          >
            <span>공식 블로그</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#9D7E52]" aria-hidden="true" />
          </a>
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={CLINIC_LINKS.naverBooking}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3.5 sm:px-5 py-2 text-[13px] sm:text-sm font-medium text-white bg-[#1E2638] hover:bg-[#A36A36] rounded transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[38px] sm:min-h-[42px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A36A36]"
          >
            네이버 예약
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-[#1E2638] hover:bg-[#F9F7F4] rounded transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#A36A36]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="모바일 주 메뉴"
          className="lg:hidden bg-white border-t border-[#E6E1D8] px-4 py-3"
        >
          <ul className="divide-y divide-[#EFECE6]">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={handleNavClick}
                  className="flex items-center justify-between py-3.5 text-[15px] font-medium text-[#222222] hover:text-[#A36A36]"
                >
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={CLINIC_LINKS.naverBlog}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="flex items-center justify-between py-3.5 text-[15px] font-medium text-[#222222] hover:text-[#A36A36]"
              >
                <span>공식 블로그</span>
                <ExternalLink className="w-4 h-4 text-[#9D7E52]" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
