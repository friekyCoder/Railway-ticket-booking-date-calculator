import { Injectable } from '@angular/core';
import {
  FIXED_EVENTS,
  SEASONS,
  ANNUAL_FESTIVALS,
  FestivalEntry,
} from '../data/festivals.data';

export interface FestivalMatch extends FestivalEntry {
  /** Which matched entry */
  matchedFrom: Date;
  matchedTo: Date;
}

@Injectable({ providedIn: 'root' })
export class FestivalService {
  /**
   * Returns the festival/season match for a given journey date,
   * or null if the date is a normal travel day.
   */
  lookup(journeyDate: Date): FestivalMatch | null {
    const d = this.stripTime(journeyDate);

    // 1. Check lunar/annual festivals for that specific year first
    const annual = this.checkAnnualFestivals(d);
    if (annual) return annual;

    // 2. Check fixed-date national events
    const fixed = this.checkRanged(FIXED_EVENTS, d, journeyDate.getFullYear());
    if (fixed) return fixed;

    // 3. Check seasons (may cross year boundary)
    const seasonal = this.checkRanged(SEASONS, d, journeyDate.getFullYear());
    if (seasonal) return seasonal;

    return null;
  }

  // ─────────────────────────────────────────────
  private checkAnnualFestivals(d: Date): FestivalMatch | null {
    const year = d.getFullYear();
    const list = ANNUAL_FESTIVALS[year];
    if (!list) return null;

    for (const entry of list) {
      const start = this.stripTime(new Date(entry.date + 'T00:00:00'));
      const span = entry.span ?? 1;
      const end = new Date(start);
      end.setDate(end.getDate() + span - 1);

      if (d >= start && d <= end) {
        return {
          name: entry.name,
          reason: entry.reason,
          severity: entry.severity,
          tip: entry.tip,
          matchedFrom: start,
          matchedTo: end,
        };
      }
    }
    return null;
  }

  private checkRanged(
    list: Array<{ from: string; to: string } & FestivalEntry>,
    d: Date,
    year: number
  ): FestivalMatch | null {
    for (const entry of list) {
      const { start, end } = this.rangeForYear(entry.from, entry.to, year);
      if (d >= start && d <= end) {
        return {
          name: entry.name,
          reason: entry.reason,
          severity: entry.severity,
          tip: entry.tip,
          matchedFrom: start,
          matchedTo: end,
        };
      }
      // Handle ranges that cross the year boundary (e.g. Dec 15 → Jan 15)
      if (entry.from > entry.to) {
        const crossStart = new Date(`${year - 1}-${entry.from}T00:00:00`);
        const crossEnd = new Date(`${year}-${entry.to}T23:59:59`);
        if (d >= crossStart && d <= crossEnd) {
          return {
            name: entry.name,
            reason: entry.reason,
            severity: entry.severity,
            tip: entry.tip,
            matchedFrom: crossStart,
            matchedTo: crossEnd,
          };
        }
      }
    }
    return null;
  }

  private rangeForYear(from: string, to: string, year: number) {
    const start = new Date(`${year}-${from}T00:00:00`);
    const end = new Date(`${year}-${to}T23:59:59`);
    return { start, end };
  }

  private stripTime(d: Date): Date {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }
}