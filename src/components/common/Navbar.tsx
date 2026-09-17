"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export type UserNavState =
  | "GUEST"
  | "STUDENT_UNMATCHED"
  | "STUDENT_MATCHED"
  | "TUTOR";

export interface NavLink {
  label: string;
  href: string;
}

const NAV_CONFIG: Record<UserNavState, NavLink[]> = {
  GUEST: [
    { label: "IEUMとは", href: "/#about" },
    { label: "IEUMの特徴", href: "/#features" },
    { label: "レッスンの流れ", href: "/#flow" },
  ],
  STUDENT_UNMATCHED: [
    { label: "紹介", href: "/" },
    { label: "プラン", href: "/plan" },
    { label: "マッチング", href: "/students/matching" },
  ],
  STUDENT_MATCHED: [
    { label: "紹介", href: "/" },
    { label: "プラン", href: "/plan" },
    { label: "チャット", href: "/chats" },
  ],
  TUTOR: [
    { label: "紹介", href: "/" },
    { label: "チャット", href: "/chats" },
  ],
};

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentUserState: UserNavState = "STUDENT_UNMATCHED";
  const navLinks = NAV_CONFIG[currentUserState];

  const handleNavigate = (href: string) => {
    setIsMenuOpen(false);

    if (href.startsWith("/#")) {
      const targetId = href.substring(2);
      if (pathname === "/") {
        requestAnimationFrame(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        });
        return;
      }
    }

    router.push(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0e2640] border-b border-[#0e2640] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="shrink-0 flex items-center cursor-pointer gap-1 group"
            aria-label="IEUM ホーム"
          >
            <span className="font-extrabold text-2xl tracking-tighter text-[#F5EBBC]">
              IEUM
              <span className="text-[#F5EBBC] ml-0.5 text-3xl">.</span>
            </span>
          </button>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8 mr-6 md:mr-8 lg:mr-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavigate(link.href)}
                  className={`text-sm font-bold transition-colors cursor-pointer relative py-1 ${
                    isActive
                      ? "text-[#F5EBBC]"
                      : "text-[#F5EBBC]/80 hover:text-[#F5EBBC]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5EBBC] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#F5EBBC] hover:text-white cursor-pointer"
              aria-label="メニュー切り替え"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0A1D31] border-t border-[#122E4D] px-4 py-4 space-y-3 shadow-xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleNavigate(link.href)}
                className={`block w-full text-left text-sm font-bold py-1.5 cursor-pointer ${
                  isActive
                    ? "text-[#F5EBBC] font-extrabold"
                    : "text-[#F5EBBC]/90 hover:text-[#F5EBBC]"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
