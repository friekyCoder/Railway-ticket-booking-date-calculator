import { Injectable, inject } from '@angular/core';
import { FestivalService, FestivalMatch } from './festival.service';

export interface BookingResult {
  travelDate: Date;
  bookingDate: Date;
  isPeakDay: boolean;
  peakInfo?: FestivalMatch;
  suggestedAltDate?: Date;
  daysAway: number;
}

@Injectable({ providedIn: 'root' })
export class BookingDateService {
  private readonly ARP_DAYS = 60;
  private festivals = inject(FestivalService);

  calculate(travelDate: Date): BookingResult {
    const booking = new Date(travelDate);
    booking.setDate(booking.getDate() - this.ARP_DAYS);

    const peakInfo = this.festivals.lookup(travelDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysAway = Math.ceil(
      (booking.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    let suggestedAltDate: Date | undefined;
    if (peakInfo) {
      // Suggest the day AFTER the rush window ends
      const alt = new Date(peakInfo.matchedTo);
      alt.setDate(alt.getDate() + 1);
      suggestedAltDate = alt;
    }

    return {
      travelDate,
      bookingDate: booking,
      isPeakDay: !!peakInfo,
      peakInfo: peakInfo ?? undefined,
      suggestedAltDate,
      daysAway,
    };
  }
}