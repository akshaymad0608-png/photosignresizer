/**
 * Vacancy listings.
 *
 * IMPORTANT — how links work here:
 * Every URL below must be a real, official portal. If a link is unknown, leave
 * the field OUT entirely rather than using "#" or a guess. The UI renders a
 * missing link as plain, non-clickable text with a "Link soon" badge, so a
 * blank field degrades honestly instead of producing a dead link.
 *
 * `portal` is the board's official homepage and is used as a safe fallback.
 * `apply` / `result` / `admitCard` should point at the specific notification
 * page when you have it — these are DIFFERENT pages and must not be shared.
 */

export type VacancyCategory = 'Central Govt' | 'State Govt' | 'Banking' | 'Railway' | 'Defence';

/** Date this list was last checked against public listings. Shown in the UI. */
export const AS_OF = '18 July 2026';

export interface Vacancy {
  id: string;
  board: string;
  post: string;
  vacancies: string;
  lastDate: string;
  qualification: string;
  category: VacancyCategory;
  state: string;
  /** Official board homepage — safe fallback when a specific page is unknown. */
  portal?: string;
  /** True when the post, count and last date were checked against public
   *  listings on AS_OF. False/absent means the entry is unverified legacy data. */
  verified?: boolean;
  links?: {
    apply?: string;
    result?: string;
    admitCard?: string;
  };
}

export const VACANCIES: Vacancy[] = [
  // ---- Verified against public listings on 18 July 2026 -------------------
  {
    id: 'v-ibps-po',
    board: 'IBPS',
    post: 'Probationary Officer / MT (CRP PO/MT-XVI)',
    vacancies: '6715',
    lastDate: '21-Jul-2026',
    qualification: 'Graduate',
    category: 'Banking',
    state: 'All India',
    verified: true,
    portal: 'https://www.ibps.in/',
    links: { apply: 'https://www.ibps.in/' },
  },
  {
    id: 'v-ibps-so',
    board: 'IBPS',
    post: 'Specialist Officer Scale-I (CRP SPL-XVI)',
    vacancies: '745',
    lastDate: '21-Jul-2026',
    qualification: 'Graduate / Post Graduate',
    category: 'Banking',
    state: 'All India',
    verified: true,
    portal: 'https://www.ibps.in/',
    links: { apply: 'https://www.ibps.in/' },
  },
  {
    id: 'v-aycl-mt',
    board: 'Andrew Yule (AYCL)',
    post: 'Management Trainee (Welfare)',
    vacancies: 'Various',
    lastDate: '26-Jul-2026',
    qualification: 'Post Graduate',
    category: 'Central Govt',
    state: 'All India',
    verified: true,
    // TODO: confirm the official AYCL careers URL before linking.
  },
  {
    id: 'v-upsc-various',
    board: 'UPSC',
    post: 'Asst Soil Chemist, Prosecutor & Other Posts',
    vacancies: 'Various',
    lastDate: '31-Jul-2026',
    qualification: 'Graduate / Post Graduate',
    category: 'Central Govt',
    state: 'All India',
    verified: true,
    portal: 'https://upsc.gov.in/',
    links: { apply: 'https://upsconline.gov.in/' },
  },
  {
    id: 'v-mppsc-town-planner',
    board: 'MPPSC',
    post: 'Assistant Town Planner',
    vacancies: 'Various',
    lastDate: '31-Jul-2026',
    qualification: 'Degree / Diploma in Planning',
    category: 'State Govt',
    state: 'Madhya Pradesh',
    verified: true,
    portal: 'https://mppsc.mp.gov.in/',
  },
  {
    id: 'v-cfa-aruvankadu',
    board: 'CFA Aruvankadu',
    post: 'Trade Apprentice',
    vacancies: '47',
    lastDate: '31-Jul-2026',
    qualification: 'ITI',
    category: 'Central Govt',
    state: 'Tamil Nadu',
    verified: true,
    // TODO: confirm the Cordite Factory Aruvankadu apprenticeship URL.
  },
  {
    id: 'v-upsssc-auditor',
    board: 'UPSSSC',
    post: 'Auditor / Assistant Accountant',
    vacancies: 'Various',
    lastDate: '03-Aug-2026',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Uttar Pradesh',
    verified: true,
    portal: 'http://upsssc.gov.in/',
  },
  {
    id: 'v-army-ssc-tech',
    board: 'Indian Army',
    post: 'SSC Technical 68th Men (April 2027)',
    vacancies: 'Various',
    lastDate: '07-Aug-2026',
    qualification: 'Engineering Degree',
    category: 'Defence',
    state: 'All India',
    verified: true,
    portal: 'https://joinindianarmy.nic.in/',
    links: { apply: 'https://joinindianarmy.nic.in/' },
  },
  {
    id: 'v-ouat-assistant',
    board: 'OUAT',
    post: 'Assistant',
    vacancies: '31',
    lastDate: '12-Aug-2026',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Odisha',
    verified: true,
    portal: 'https://ouat.ac.in/',
  },
  {
    id: 'v-railway-section',
    board: 'RRB',
    post: 'Section Controller',
    vacancies: '119',
    lastDate: '14-Aug-2026',
    qualification: 'Graduate',
    category: 'Railway',
    state: 'All India',
    verified: true,
    portal: 'https://www.rrbapply.gov.in/',
    links: { apply: 'https://www.rrbapply.gov.in/' },
  },
  {
    id: 'v-rrc-cr-sports',
    board: 'RRC Central Railway',
    post: 'Sports Quota',
    vacancies: '59',
    lastDate: '14-Aug-2026',
    qualification: 'Various',
    category: 'Railway',
    state: 'Maharashtra',
    verified: true,
    portal: 'https://www.rrccr.com/',
  },
  {
    id: 'v-nfr-apprentice',
    board: 'Northeast Frontier Railway (NFR)',
    post: 'Act Apprentice',
    vacancies: '6777',
    lastDate: '19-Aug-2026',
    qualification: '10th / ITI',
    category: 'Railway',
    state: 'North East',
    verified: true,
    portal: 'https://nfr.indianrailways.gov.in/',
  },

  // ---- Legacy entries, NOT re-verified on 18 July 2026 --------------------
  // Kept because they may still be open, but treat dates as unconfirmed.
  {
    id: 'v-forest',
    board: 'Gujarat Forest Department',
    post: 'Tracker',
    vacancies: 'Various',
    lastDate: '22-Jul-2026',
    qualification: '10 Pass',
    category: 'State Govt',
    state: 'Gujarat',
    portal: 'https://ojas.gujarat.gov.in/',
    links: { apply: 'https://ojas.gujarat.gov.in/' },
  },
  {
    id: 'v-gsssb-agri',
    board: 'GSSSB',
    post: 'Agriculture Overseer',
    vacancies: '14',
    lastDate: '22-Jul-2026',
    qualification: 'B.Sc. Agriculture',
    category: 'State Govt',
    state: 'Gujarat',
    portal: 'https://ojas.gujarat.gov.in/',
    links: { apply: 'https://ojas.gujarat.gov.in/' },
  },
  {
    id: 'v-iocl',
    board: 'IndianOil',
    post: 'Apprentice',
    vacancies: '405',
    lastDate: '28-Jul-2026',
    qualification: 'ITI / Diploma / Graduate',
    category: 'Central Govt',
    state: 'All India',
    portal: 'https://iocl.com/',
  },
  {
    id: 'v-amc',
    board: 'AMC',
    post: 'Assistant Senior Clerk',
    vacancies: '250',
    lastDate: '30-Jul-2026',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Gujarat',
    portal: 'https://ahmedabadcity.gov.in/',
  },
  {
    id: 'v-pgvcl',
    board: 'PGVCL, UGVCL, MGVCL, DGVCL',
    post: 'Junior Assistant',
    vacancies: '2306',
    lastDate: '06-Aug-2026',
    qualification: '12th',
    category: 'State Govt',
    state: 'Gujarat',
    // TODO: add the DISCOM recruitment portal once confirmed.
  },

  // ---- Major recurring national exams (added 04 Aug 2026) -----------------
  // Not checked against a live listing, so `verified` is intentionally omitted
  // and counts/dates read "As per notification" — every entry links to the
  // official portal where the current notification, count and last date live.
  {
    id: 'v-ssc-cgl',
    board: 'SSC',
    post: 'Combined Graduate Level (CGL)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'Central Govt',
    state: 'All India',
    portal: 'https://ssc.gov.in/',
  },
  {
    id: 'v-ssc-chsl',
    board: 'SSC',
    post: 'Combined Higher Secondary Level (CHSL, 10+2)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '12th',
    category: 'Central Govt',
    state: 'All India',
    portal: 'https://ssc.gov.in/',
  },
  {
    id: 'v-ssc-mts',
    board: 'SSC',
    post: 'Multi Tasking Staff (MTS) & Havaldar',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '10th',
    category: 'Central Govt',
    state: 'All India',
    portal: 'https://ssc.gov.in/',
  },
  {
    id: 'v-ssc-gd',
    board: 'SSC',
    post: 'General Duty (GD) Constable — CAPF',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '10th',
    category: 'Central Govt',
    state: 'All India',
    portal: 'https://ssc.gov.in/',
  },
  {
    id: 'v-rrb-ntpc',
    board: 'RRB',
    post: 'Non-Technical Popular Categories (NTPC)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '12th / Graduate',
    category: 'Railway',
    state: 'All India',
    portal: 'https://indianrailways.gov.in/',
    links: { apply: 'https://www.rrbapply.gov.in/' },
  },
  {
    id: 'v-rrb-groupd',
    board: 'RRB',
    post: 'Group D (Level 1)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '10th / ITI',
    category: 'Railway',
    state: 'All India',
    portal: 'https://indianrailways.gov.in/',
    links: { apply: 'https://www.rrbapply.gov.in/' },
  },
  {
    id: 'v-sbi-po',
    board: 'SBI',
    post: 'Probationary Officer (PO)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'Banking',
    state: 'All India',
    portal: 'https://sbi.co.in/web/careers',
  },
  {
    id: 'v-sbi-clerk',
    board: 'SBI',
    post: 'Junior Associate (Clerk)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'Banking',
    state: 'All India',
    portal: 'https://sbi.co.in/web/careers',
  },
  {
    id: 'v-ibps-clerk',
    board: 'IBPS',
    post: 'Clerk (CRP Clerks)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'Banking',
    state: 'All India',
    portal: 'https://www.ibps.in/',
  },
  {
    id: 'v-rbi-assistant',
    board: 'RBI',
    post: 'Assistant',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'Banking',
    state: 'All India',
    portal: 'https://www.rbi.org.in/',
    links: { apply: 'https://opportunities.rbi.org.in/' },
  },
  {
    id: 'v-indiapost-gds',
    board: 'India Post',
    post: 'Gramin Dak Sevak (GDS)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '10th',
    category: 'Central Govt',
    state: 'All India',
    portal: 'https://www.indiapost.gov.in/',
    links: { apply: 'https://indiapostgdsonline.gov.in/' },
  },
  {
    id: 'v-iaf-agniveer',
    board: 'Indian Air Force',
    post: 'Agniveer Vayu',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '10+2',
    category: 'Defence',
    state: 'All India',
    portal: 'https://indianairforce.nic.in/',
    links: { apply: 'https://agnipathvayu.cdac.in/' },
  },

  // ---- State government exams (added 05 Aug 2026) --------------------------
  // Unverified against a live listing — counts/dates read "As per notification"
  // and each links to the official state board where current details live.
  {
    id: 'v-uppsc-pcs',
    board: 'UPPSC',
    post: 'Combined State / Upper Subordinate Services (PCS)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Uttar Pradesh',
    portal: 'https://uppsc.up.nic.in/',
  },
  {
    id: 'v-uppolice-constable',
    board: 'UP Police (UPPRPB)',
    post: 'Constable',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '12th',
    category: 'State Govt',
    state: 'Uttar Pradesh',
    portal: 'https://uppbpb.gov.in/',
  },
  {
    id: 'v-bpsc-cce',
    board: 'BPSC',
    post: 'Combined Competitive Exam (CCE)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Bihar',
    portal: 'https://bpsc.bih.nic.in/',
  },
  {
    id: 'v-biharpolice-constable',
    board: 'Bihar Police (CSBC)',
    post: 'Constable',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '12th',
    category: 'State Govt',
    state: 'Bihar',
    portal: 'https://csbc.bih.nic.in/',
  },
  {
    id: 'v-mppsc-sse',
    board: 'MPPSC',
    post: 'State Service Examination',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Madhya Pradesh',
    portal: 'https://mppsc.mp.gov.in/',
  },
  {
    id: 'v-mp-esb-police',
    board: 'MP Police (ESB)',
    post: 'Constable',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '12th',
    category: 'State Govt',
    state: 'Madhya Pradesh',
    portal: 'https://esb.mp.gov.in/',
  },
  {
    id: 'v-rpsc-ras',
    board: 'RPSC',
    post: 'RAS — State & Subordinate Services',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Rajasthan',
    portal: 'https://rpsc.rajasthan.gov.in/',
  },
  {
    id: 'v-mpsc-rajyaseva',
    board: 'MPSC',
    post: 'Rajyaseva (State Services)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Maharashtra',
    portal: 'https://mpsc.gov.in/',
  },
  {
    id: 'v-wbpsc-wbcs',
    board: 'WBPSC',
    post: 'WBCS (Executive)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'West Bengal',
    portal: 'https://wbpsc.gov.in/',
  },
  {
    id: 'v-tnpsc-group',
    board: 'TNPSC',
    post: 'Group I / II / IV Services',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate / 10th+',
    category: 'State Govt',
    state: 'Tamil Nadu',
    portal: 'https://www.tnpsc.gov.in/',
  },
  {
    id: 'v-kpsc-kas',
    board: 'KPSC',
    post: 'KAS — Gazetted Probationers',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Karnataka',
    portal: 'https://www.kpsc.kar.nic.in/',
  },
  {
    id: 'v-rajpolice-constable',
    board: 'Rajasthan Police',
    post: 'Constable',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '10th / 12th',
    category: 'State Govt',
    state: 'Rajasthan',
    portal: 'https://police.rajasthan.gov.in/',
  },
];

/** Resolve the best available URL for a given link kind. */
export function resolveLink(job: Vacancy, kind: 'apply' | 'result' | 'admitCard') {
  const specific = job.links?.[kind];
  if (specific) return { href: specific, exact: true };
  if (job.portal) return { href: job.portal, exact: false };
  return null;
}

/** Parse "22-Jul-2026" into a Date so deadlines can be compared. */
export function parseLastDate(value: string): Date | null {
  const m = /^(\d{2})-([A-Za-z]{3})-(\d{4})$/.exec(value.trim());
  if (!m) return null;
  const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  const month = months.indexOf(m[2].toLowerCase());
  if (month < 0) return null;
  return new Date(Number(m[3]), month, Number(m[1]));
}

/** True when the last date has already passed. */
export function isExpired(job: Vacancy, now = new Date()): boolean {
  const d = parseLastDate(job.lastDate);
  if (!d) return false;
  return d.getTime() < new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}
