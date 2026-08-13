'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const PARTNERS = [
  {
    "name": "Elixpo",
    "website": "https://elixpo.com",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786477196/Elixpo.png"
  },
  {
    "name": "IEI STUDENTS'CHAPTER CSE",
    "website": "https://www.sccseaot.in/",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786634380/white_text_Blue-favicon.png"
  },
  {
    "name": "Anibotix Community",
    "website": "https://anibotixrobotics.com/",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786477193/anibotix-high-resolution-color-logo_1.png"
  },
  {
    "name": "MetaMorph 2.0",
    "website": "https://www.metamorph.cloud/",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786477193/WhatsApp_Image_2026-08-12_at_1.05.46_AM.jpg"
  },
  {
    "name": "CalTech Circle",
    "website": "https://mmkolkata-next.vercel.app/",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786477192/IMG-20260806-WA0007.jpg.jpg"
  },
  {
    "name": "Flutter Kolkata",
    "website": "https://www.linkedin.com/company/flutter-kolkata/",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786477193/flutter_kolkata_name_logo.jpg"
  },
  {
    "name": "Oracle Kolkata community",
    "website": "https://www.linkedin.com/company/oracle-kolkata-community/",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786633927/copy_of_whatsapp_image_2026-08-12_at_11204_am.jpg"
  },
  {
    "name": "Yatri Cloud Community",
    "website": "https://www.linkedin.com/company/yatricloud/",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786477193/WhatsApp_Image_2026-08-12_at_1.05.46_AM_1.jpg"
  },
  {
    "name": "Anonymous Legion",
    "website": "https://www.linkedin.com/company/anonymous-legion",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786477195/Anonymous_Legion.Logo.png"
  },
  {
    "name": "Byte Brigade",
    "website": "https://bytebrigade.vercel.app/",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786477198/PHOTO-2025-09-20-15-26-01-Photoroom.png"
  },
  {
    "name": "IEI Students' Chapter ECE, Academy of Technology",
    "website": "https://www.linkedin.com/company/sceceaot/",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786477195/e53f7078-b15a-4f58-9037-8c205f05439b.jpg"
  },
  {
    "name": "React Kolkata",
    "website": "https://reactkolkata.com",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786477216/React_Kolkata_Social_Profile.png"
  },
  {
    "name": "The Code Bird",
    "website": "https://www.thecodebird.in/",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786477202/The_Code_Bird_Logo.jpg"
  },
  {
    "name": "WiTalk",
    "website": "https://play.google.com/store/apps/details?id=com.witalk",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786477197/logo_1.png"
  },
  {
    "name": "DEVs Dungeon",
    "website": "https://linkedin.com/company/devs-dungeon",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786477197/bg_black_small.png"
  },
  {
    "name": "2TechY",
    "website": "https://www.linkedin.com/in/shivanshu-shukla-183771380/",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786636466/Screenshot_2026-08-02_181123-Photoroom_1.png"
  },
  {
    "name": "CodeRushX",
    "website": "https://coderushx.vercel.app/",
    "logo": "https://res.cloudinary.com/dpv7vfhdo/image/upload/v1786477203/CodeRush_X_Logo.png"
  }
]

export default function CommunityPartnersSection() {

  const leftPartners = PARTNERS.filter((_, index) => index % 2 === 0);
  const rightPartners = PARTNERS.filter((_, index) => index % 2 === 1);
  const loopedLeftPartners = [...leftPartners, ...leftPartners];
  const loopedRightPartners = [...rightPartners, ...rightPartners];

  const renderPartnerCard = (partner, index, lane) => (
    <Link
      key={`${lane}-${partner.id || 'partner'}-${index}`}
      aria-hidden={index >= (lane === 'left' ? leftPartners.length : rightPartners.length) ? 'true' : undefined}
      href={partner.website || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="partner-card group flex min-h-[11rem] flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-900/80 p-4 text-center transition-all duration-300 hover:scale-[1.03] hover:border-orange-500/50 hover:shadow-[0_8px_24px_rgba(249,115,22,0.15)]"
    >
      <div className="mb-3 flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-800/40 p-2 transition-all duration-300 group-hover:bg-gray-800/70 group-hover:shadow-[0_0_16px_rgba(249,115,22,0.1)]">
        <Image
          src={partner.logo || undefined}
          alt={partner.name}
          width={300}
          height={200}
          className="max-h-full max-w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="w-full truncate whitespace-nowrap text-ellipsis text-center text-xs font-medium text-white transition-colors group-hover:text-orange-400" title={partner.name}>
        {partner.name}
      </h3>
    </Link>
  );

  return (
    <section className="relative z-10 w-full py-16 sm:py-20 md:py-24">
      <style jsx global>{`
        .partner-scroll-wrapper {
          overflow: hidden;
        }

        .partner-scroll-wrapper:hover .scroll-content,
        .partner-scroll-wrapper:focus-within .scroll-content {
          animation-play-state: paused;
        }

        .partner-column {
          position: relative;
          overflow: hidden;
          min-height: 100%;
        }

        .scroll-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: 38s;
          will-change: transform;
        }

        .scroll-content--up {
          animation-name: scroll-up;
        }

        .scroll-content--down {
          animation-name: scroll-down;
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scroll-down {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .partner-scroll-wrapper::-webkit-scrollbar,
        .partner-column::-webkit-scrollbar,
        .scroll-content::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-12 md:px-12">
        <div className="max-w-md">
          <h2 className="font-blackhan text-4xl tracking-tight text-white uppercase sm:text-5xl leading-[0.95] select-none">
            COMMUNITY<br />
            <span className="text-orange-500">PARTNERS</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base font-medium leading-relaxed text-slate-400">
            Fueling the digital frontier through collaboration. Meet the visionary communities building the future alongside InnovateX Connect 2026.
          </p>
        </div>

        <div className="w-full max-w-[520px] mx-auto md:mx-0 md:translate-x-4 lg:translate-x-8">
          {(
            <div className="partner-scroll-wrapper grid max-h-[480px] grid-cols-2 gap-4 overflow-hidden">
              <div className="partner-column rounded-[28px] bg-transparent">
                <div className="scroll-content scroll-content--up">
                  {loopedLeftPartners.map((partner, index) => renderPartnerCard(partner, index, 'left'))}
                </div>
              </div>

              <div className="partner-column rounded-[28px] bg-transparent">
                <div className="scroll-content scroll-content--down">
                  {loopedRightPartners.map((partner, index) => renderPartnerCard(partner, index, 'right'))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { CommunityPartnersSection as CommunityPartners };
