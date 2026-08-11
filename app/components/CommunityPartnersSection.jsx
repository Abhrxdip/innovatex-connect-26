'use client';

import React, { useState, useEffect, useRef } from 'react';

// Partner details are fetched live through the server proxy, which uses the
// Cloudflare Worker URL in app/api/partners/route.ts. An environment variable
// can override the proxy for staging or local testing.
const DEFAULT_WORKER_URL =
  process.env.NEXT_PUBLIC_PARTNERS_WORKER_URL ||
  process.env.NEXT_PUBLIC_PARTNERS_API_URL ||
  '/api/partners';

function publicDriveImage(driveId) {
  return `https://lh3.googleusercontent.com/d/${encodeURIComponent(driveId)}=s400`;
}

// Fallback dataset mapped with exact community drive IDs and logos
const FALLBACK_PARTNERS = [
  {
    id: '1',
    name: 'MetaMorph 2.0',
    role: 'Lead Organizer',
    size: '100–500 Members',
    logo: publicDriveImage('16BURFBAsFbcGmScwV3tcJuS0rq3-Nb_T'),
    driveId: '16BURFBAsFbcGmScwV3tcJuS0rq3-Nb_T',
    website: 'https://www.metamorph.cloud/'
  },
  {
    id: '2',
    name: 'CalTech Circle',
    role: 'Lead Organizer',
    size: '500–1000 Members',
    logo: publicDriveImage('1AM8TGPIlJOvIBxIu6oku9243s4_nu9bl'),
    driveId: '1AM8TGPIlJOvIBxIu6oku9243s4_nu9bl',
    website: 'https://mmkolkata-next.vercel.app/'
  },
  {
    id: '3',
    name: 'Flutter Kolkata',
    role: 'Lead Organizer',
    size: '1000–5000 Members',
    logo: publicDriveImage('1QEYsnIJykaXJk57_FQbRATz6JrLWcP1k'),
    driveId: '1QEYsnIJykaXJk57_FQbRATz6JrLWcP1k',
    website: 'https://www.linkedin.com/company/flutter-kolkata/'
  },
  {
    id: '4',
    name: 'Oracle Kolkata',
    role: 'Community Manager',
    size: '100–500 Members',
    logo: publicDriveImage('1t-d2Z5c4FJIHeKAJAPCs-MwyZD5_XIw_'),
    driveId: '1t-d2Z5c4FJIHeKAJAPCs-MwyZD5_XIw_',
    website: 'https://www.linkedin.com/company/oracle-kolkata-community/'
  },
  {
    id: '5',
    name: 'Yatri Cloud Community',
    role: 'Volunteer',
    size: '5,000+ Members',
    logo: publicDriveImage('1rZ6WZkmV3-h6pNthlOVhqjXbwma6YB5v'),
    driveId: '1rZ6WZkmV3-h6pNthlOVhqjXbwma6YB5v',
    website: 'https://www.linkedin.com/company/yatricloud/'
  },
  {
    id: '6',
    name: 'Anonymous Legion',
    role: 'Team Lead',
    size: '500–1000 Members',
    logo: publicDriveImage('11rFmTN_JrE0A0-KLL6Rpbr4akdhOBIsb'),
    driveId: '11rFmTN_JrE0A0-KLL6Rpbr4akdhOBIsb',
    website: 'https://www.linkedin.com/company/anonymous-legion'
  },
  {
    id: '7',
    name: 'Byte Brigade',
    role: 'Member',
    size: '500–1000 Members',
    logo: publicDriveImage('1OHSRBWRh2j8HOoLlkppEu83h6kQhO5LB'),
    driveId: '1OHSRBWRh2j8HOoLlkppEu83h6kQhO5LB',
    website: 'https://bytebrigade.vercel.app/'
  },
  {
    id: '8',
    name: 'React Kolkata',
    role: 'Maintainer',
    size: '100–500 Members',
    logo: publicDriveImage('1s8E2eF_2jL0A747JHdkaHBYvfhldi3Nb'),
    driveId: '1s8E2eF_2jL0A747JHdkaHBYvfhldi3Nb',
    website: 'https://reactkolkata.com'
  },
  {
    id: '9',
    name: 'The Code Bird',
    role: 'Faculty Advisor',
    size: '500–1000 Members',
    logo: publicDriveImage('1FVMQem_MI1dG5Kyj0mUTUtA7I5p-7Fyn'),
    driveId: '1FVMQem_MI1dG5Kyj0mUTUtA7I5p-7Fyn',
    website: 'https://www.thecodebird.in/'
  },
  {
    id: '10',
    name: 'WiTalk',
    role: 'Founder & CEO',
    size: '5,000+ Members',
    logo: publicDriveImage('1gG257wC1xEECP6vhYwhEebi5hFfkPMGZ'),
    driveId: '1gG257wC1xEECP6vhYwhEebi5hFfkPMGZ',
    website: 'https://www.linkedin.com/company/witalk'
  },
  {
    id: '11',
    name: 'DEVs Dungeon',
    role: 'Founder',
    size: '5,000+ Members',
    logo: publicDriveImage('1QIRTsDmc0RoWxmEWU89NTu8lalMTGGgA'),
    driveId: '1QIRTsDmc0RoWxmEWU89NTu8lalMTGGgA',
    website: 'https://linkedin.com/company/devs-dungeon'
  },
  {
    id: '12',
    name: 'CodeRushX',
    role: 'Founder',
    size: '100–500 Members',
    logo: publicDriveImage('1wU2spW9FCLoAMt6JO7Rixc4YNv9nsvla'),
    driveId: '1wU2spW9FCLoAMt6JO7Rixc4YNv9nsvla',
    website: 'https://coderushx.vercel.app/'
  },
  {
    id: '13',
    name: 'Crypto Mania',
    role: 'Admin',
    size: 'Under 100 Members',
    logo: '',
    website: 'https://instagram.com/cryptomania'
  },
  {
    id: '14',
    name: "IEI Students' Chapter ECE, Academy of Technology",
    role: 'Co-Convenor',
    size: '100–500 Members',
    logo: publicDriveImage('1IcRxI-Sb-7Uv01U_GRfb75ST0kethnxl'),
    driveId: '1IcRxI-Sb-7Uv01U_GRfb75ST0kethnxl',
    website: 'https://www.linkedin.com/company/sceceaot/'
  },
  {
    id: '15',
    name: '2TechY',
    role: 'Community Owner',
    size: '100–500 Members',
    logo: publicDriveImage('1HtMdX_x3aluwtZEpq4orGacLYKi4Vkbe'),
    driveId: '1HtMdX_x3aluwtZEpq4orGacLYKi4Vkbe',
    website: 'https://www.linkedin.com/in/shivanshu-shukla-183771380/'
  }
];

/**
 * Extract Google Drive file/folder ID from URL
 */
function getGoogleDriveId(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  const match =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/\/folders\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/id=([a-zA-Z0-9_-]+)/);


  return match && match[1] ? match[1] : null;
}

function isGoogleDriveFolderUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return /\/folders\/|\/drive\/folders\//.test(url);
}

function isGoogleDriveFileUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  return /\/file\/d\/[A-Za-z0-9_-]+/.test(trimmed) || /(?:id=)[A-Za-z0-9_-]+/.test(trimmed) || /lh3\.googleusercontent\.com\/d\/[A-Za-z0-9_-]+/.test(trimmed);
}

function isUrl(value) {
  return typeof value === 'string' && /^https?:\/\//i.test(value.trim());
}

function isDirectImageUrl(url) {
  if (!isUrl(url)) return false;
  const trimmed = url.trim();
  if (isGoogleDriveFolderUrl(trimmed)) return false;

  if (isGoogleDriveFileUrl(trimmed)) {
    return true;
  }

  const normalized = trimmed.split(/[?#]/)[0].toLowerCase();
  return /\.(png|jpe?g|gif|webp|avif|svg|ico|bmp)(?:$|\?)/i.test(normalized);
}

function getGoogleDriveImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (isGoogleDriveFolderUrl(trimmed)) return '';

  const driveId = getGoogleDriveId(trimmed);
  // Public Drive images can be used directly in an <img>. This avoids relying
  // on the local proxy, which may be unavailable in some deployments.
  return driveId ? publicDriveImage(driveId) : '';
}

function normalizePartnerName(name) {
  return typeof name === 'string'
    ? name.trim().toLowerCase().replace(/\s+/g, ' ')
    : '';
}

function findFallbackPartner(rawLogo, name) {
  const normalizedName = normalizePartnerName(name);
  const driveId = getGoogleDriveId(rawLogo);

  return FALLBACK_PARTNERS.find((partner) => {
    if (partner.driveId && driveId && partner.driveId === driveId) return true;
    return normalizePartnerName(partner.name) === normalizedName;
  });
}

function resolvePartnerLogo(rawLogo, name) {
  const trimmed = rawLogo && typeof rawLogo === 'string' ? rawLogo.trim() : '';
  const isDriveFolder = isGoogleDriveFolderUrl(trimmed);
  const driveImageUrl = getGoogleDriveImageUrl(trimmed);
  if (driveImageUrl) return driveImageUrl;

  if (isDirectImageUrl(trimmed) && !isDriveFolder) {
    return trimmed;
  }

  const fallbackPartner = findFallbackPartner(rawLogo, name);
  if (fallbackPartner && fallbackPartner.logo) {
    return fallbackPartner.logo;
  }

  return '';
}

/**
 * Parse a complete CSV document.  Partner form responses can contain commas,
 * quotes, and line breaks inside a cell, so splitting on newlines would drop
 * or corrupt otherwise valid partner rows.
 */
function parseCSVRows(text) {
  const rows = [];
  let row = [];
  let value = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') {
        value += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(value.trim());
      value = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && text[i + 1] === '\n') i += 1;
      row.push(value.trim());
      if (row.some((cell) => cell)) rows.push(row);
      row = [];
      value = '';
    } else {
      value += char;
    }
  }

  row.push(value.trim());
  if (row.some((cell) => cell)) rows.push(row);
  return rows;
}

/**
 * Parse partners worker CSV format:
 * Extracts Community Logo, Community Name, Role, Community Size, and Website/Social Links
 */
function parseWorkerCSV(csvText) {
  if (!csvText || typeof csvText !== 'string') return [];
  const rows = parseCSVRows(csvText.replace(/^\uFEFF/, ''));
  if (rows.length < 2) return [];

  const headers = rows[0].map((header) => header.toLowerCase().trim());

  const nameIdx = (() => {
    // First: look for the specific community name column
    const communityIdx = headers.findIndex(
      (h) => h.includes('community / organization name') || h.includes('organization name')
    );
    if (communityIdx !== -1) return communityIdx;
    // Fallback: generic 'name' column
    return headers.findIndex((h) => h === 'name');
  })();
  const roleIdx = headers.findIndex(
    (h) => h.includes('role') || h.includes('role in the community')
  );
  const sizeIdx = headers.findIndex(
    (h) => h.includes('community size') || h.includes('size')
  );
  const logoIdx = headers.findIndex(
    (h) => h.includes('google drive link to your community logo') || h.includes('logo')
  );
  const websiteIdx = headers.findIndex(
    (h) => h.includes('community website') || h.includes('website')
  );
  const linkedinIdx = headers.findIndex((h) => h.includes('linkedin'));
  const instagramIdx = headers.findIndex((h) => h.includes('instagram'));

  const items = [];
  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i];

    let name = nameIdx !== -1 ? cols[nameIdx] : '';
    if (!name) name = cols[1] || '';
    name = name.trim();

    // Ignore the CSV's placeholder/test submissions while retaining every
    // named community partner, including rows with optional fields missing.
    if (!name || ['abc', 'mhv'].includes(name.toLowerCase())) {
      continue;
    }

    const role = roleIdx !== -1 && cols[roleIdx] ? cols[roleIdx].trim() : 'Community Lead';
    const size = sizeIdx !== -1 && cols[sizeIdx] ? cols[sizeIdx].trim() : '100+ Members';

    const rawLogo = logoIdx !== -1 ? cols[logoIdx] : '';
    const logo = resolvePartnerLogo(rawLogo, name) || '';
    const driveId = getGoogleDriveId(rawLogo);

    let website =
      (websiteIdx !== -1 && cols[websiteIdx]) ||
      (linkedinIdx !== -1 && cols[linkedinIdx]) ||
      (instagramIdx !== -1 && cols[instagramIdx]) ||
      '#';

    if (website && !website.startsWith('http') && website !== '#') {
      website = `https://${website}`;
    }

    items.push({
      id: `partner-worker-${i}`,
      name,
      role,
      size,
      logo,
      rawLogo,
      driveId,
      website: website || 'https://innovatex.dev',
    });
  }

  return items;
}

export default function CommunityPartnersSection({ endpointUrl = DEFAULT_WORKER_URL }) {
  const [partners, setPartners] = useState(FALLBACK_PARTNERS);
  const [loading, setLoading] = useState(true);
  const [failedPartnerIds, setFailedPartnerIds] = useState(new Set());

  useEffect(() => {
    let isMounted = true;

    async function fetchPartners() {
      try {
        setLoading(true);

        const response = await fetch(endpointUrl, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Worker endpoint returned HTTP ${response.status}`);
        }

        const text = await response.text();
        const parsed = parseWorkerCSV(text);

        if (isMounted) {
          setPartners(parsed && parsed.length > 0 ? parsed : FALLBACK_PARTNERS);
          setLoading(false);
        }
      } catch (err) {
        console.warn('Worker endpoint fetch error, falling back to cached catalog:', err);
        if (isMounted) {
          setPartners(FALLBACK_PARTNERS);
          setLoading(false);
        }
      }
    }

    fetchPartners();
    return () => {
      isMounted = false;
    };
  }, [endpointUrl]);

  const loadedPartners = partners.filter(
    (partner) =>
      partner?.logo &&
      partner.logo.toString().trim() &&
      !failedPartnerIds.has(partner.id)
  );
  const leftPartners = loadedPartners.filter((_, index) => index % 2 === 0);
  const rightPartners = loadedPartners.filter((_, index) => index % 2 === 1);
  const loopedLeftPartners = [...leftPartners, ...leftPartners];
  const loopedRightPartners = [...rightPartners, ...rightPartners];

  const renderPartnerCard = (partner, index, lane) => (
    <a
      key={`${lane}-${partner.id || 'partner'}-${index}`}
      aria-hidden={index >= (lane === 'left' ? leftPartners.length : rightPartners.length) ? 'true' : undefined}
      href={partner.website || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="partner-card group flex min-h-[11rem] flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-900/80 p-4 text-center transition-all duration-300 hover:scale-[1.03] hover:border-orange-500/50 hover:shadow-[0_8px_24px_rgba(249,115,22,0.15)]"
    >
      <div className="mb-3 flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-800/40 p-2 transition-all duration-300 group-hover:bg-gray-800/70 group-hover:shadow-[0_0_16px_rgba(249,115,22,0.1)]">
        <img
          src={partner.logo || undefined}
          alt={partner.name}
          className="max-h-full max-w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.currentTarget;
            const currentSrc = target.src;
            const driveId = partner.driveId || getGoogleDriveId(partner.rawLogo || partner.logo);

            if (driveId && currentSrc.includes('/api/drive-image')) {
              target.src = `https://lh3.googleusercontent.com/d/${driveId}=s400`;
            } else if (driveId && currentSrc.includes('lh3.googleusercontent.com')) {
              target.src = `https://drive.google.com/thumbnail?id=${driveId}&sz=w400`;
            } else if (driveId && currentSrc.includes('drive.google.com/thumbnail')) {
              target.src = `https://drive.google.com/uc?export=view&id=${driveId}`;
            } else {
              target.onerror = null;
              setFailedPartnerIds((prev) => {
                const next = new Set(prev);
                next.add(partner.id || partner.name);
                return next;
              });
            }
          }}
        />
      </div>

      <h3 className="w-full truncate whitespace-nowrap text-ellipsis text-center text-xs font-medium text-white transition-colors group-hover:text-orange-400" title={partner.name}>
        {partner.name}
      </h3>
    </a>
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
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className="h-36 animate-pulse rounded-2xl border border-gray-800 bg-gray-900/80 p-4"
                />
              ))}
            </div>
          ) : (
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
