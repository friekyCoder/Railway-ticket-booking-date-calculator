/**
 * Indian festival & peak-season data.
 *
 * Two types of entries:
 *  1. FIXED  — same Gregorian date every year (e.g. Republic Day: Jan 26)
 *  2. ANNUAL — shifts each year (lunar calendar festivals). We maintain
 *              a small lookup per year. Extend as new years are announced.
 */

export interface FestivalEntry {
  name: string;
  /** Human-friendly reason shown to the user */
  reason: string;
  /** Severity: 'high' = expect massive rush, 'medium' = moderate rush */
  severity: 'high' | 'medium';
  /** Optional tip shown to the user */
  tip?: string;
}

/**
 * FIXED-DATE events — same day every year.
 * `from` and `to` are MM-DD strings. If from === to, it's a single day.
 * Multi-day ranges cover the surrounding travel rush.
 */
export const FIXED_EVENTS: Array<{ from: string; to: string } & FestivalEntry> = [
  {
    from: '01-01', to: '01-03',
    name: 'New Year',
    reason: 'New Year travel & return rush',
    severity: 'high',
    tip: 'Return journeys fill up fast on Jan 1–3.',
  },
  {
    from: '01-24', to: '01-27',
    name: 'Republic Day',
    reason: 'Republic Day long weekend',
    severity: 'medium',
    tip: 'Consider traveling a day before or after the long weekend.',
  },
  {
    from: '08-14', to: '08-16',
    name: 'Independence Day',
    reason: 'Independence Day weekend',
    severity: 'medium',
  },
  {
    from: '10-01', to: '10-03',
    name: 'Gandhi Jayanti',
    reason: 'Gandhi Jayanti weekend',
    severity: 'medium',
  },
  {
    from: '12-22', to: '12-31',
    name: 'Christmas & Year-End',
    reason: 'Christmas and year-end holiday rush',
    severity: 'high',
    tip: 'Year-end trains are among the busiest — book the moment booking opens.',
  },
];

/**
 * SEASON windows — recurring travel seasons in India.
 * These do NOT shift year to year (they follow the school/holiday calendar).
 */
export const SEASONS: Array<{ from: string; to: string } & FestivalEntry> = [
  {
    from: '04-15', to: '06-15',
    name: 'Summer Vacation',
    reason: 'School summer vacation travel season',
    severity: 'high',
    tip: 'Hill-station routes (Shimla, Ooty, Darjeeling) sell out weeks in advance.',
  },
  {
    from: '12-15', to: '01-15',
    name: 'Winter Holidays',
    reason: 'Winter holiday travel season',
    severity: 'medium',
  },
];

/**
 * LUNAR / SHIFTING festivals — dates differ every year.
 * Maintain a lookup per year. Only the days that cause rail rush are listed.
 * (Source: published government holiday calendars.)
 *
 * Extend this as new years are announced — the logic auto-picks the right year.
 */
export const ANNUAL_FESTIVALS: Record<number, Array<{
  date: string;        // YYYY-MM-DD
  span?: number;       // number of days of rush (default 1)
} & FestivalEntry>> = {
  2025: [
    { date: '2025-03-13', span: 3, name: 'Holi', reason: 'Holi festival rush', severity: 'high', tip: 'Holi week sees heavy demand on all routes.' },
    { date: '2025-03-30', span: 2, name: 'Eid-ul-Fitr', reason: 'Eid travel rush', severity: 'high' },
    { date: '2025-08-09', span: 2, name: 'Raksha Bandhan', reason: 'Raksha Bandhan travel rush', severity: 'medium' },
    { date: '2025-08-16', span: 2, name: 'Janmashtami', reason: 'Janmashtami rush', severity: 'medium' },
    { date: '2025-09-28', span: 10, name: 'Durga Puja / Navratri', reason: 'Durga Puja & Navratri travel rush', severity: 'high', tip: 'Kolkata-bound trains fill up weeks in advance.' },
    { date: '2025-10-18', span: 6, name: 'Diwali', reason: 'Diwali festival rush', severity: 'high', tip: 'The single busiest travel window of the year. Book the second booking opens.' },
    { date: '2025-11-05', span: 2, name: 'Chhath Puja', reason: 'Chhath Puja rush (Bihar/UP bound trains)', severity: 'high', tip: 'Bihar & Eastern UP routes are extremely busy during Chhath.' },
    { date: '2025-11-15', span: 2, name: 'Guru Nanak Jayanti', reason: 'Guru Nanak Jayanti rush', severity: 'medium' },
  ],
  2026: [
    { date: '2026-03-03', span: 3, name: 'Holi', reason: 'Holi festival rush', severity: 'high', tip: 'Holi week sees heavy demand on all routes.' },
    { date: '2026-03-20', span: 2, name: 'Eid-ul-Fitr', reason: 'Eid travel rush', severity: 'high' },
    { date: '2026-08-28', span: 2, name: 'Raksha Bandhan', reason: 'Raksha Bandhan travel rush', severity: 'medium' },
    { date: '2026-09-04', span: 2, name: 'Janmashtami', reason: 'Janmashtami rush', severity: 'medium' },
    { date: '2026-10-17', span: 10, name: 'Durga Puja / Navratri', reason: 'Durga Puja & Navratri travel rush', severity: 'high', tip: 'Kolkata-bound trains fill up weeks in advance.' },
    { date: '2026-11-06', span: 6, name: 'Diwali', reason: 'Diwali festival rush', severity: 'high', tip: 'The single busiest travel window of the year.' },
    { date: '2026-11-15', span: 2, name: 'Chhath Puja', reason: 'Chhath Puja rush (Bihar/UP bound trains)', severity: 'high' },
  ],
  // Add 2027, 2028, ... as government calendars are published
};