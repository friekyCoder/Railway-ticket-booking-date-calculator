import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDateService, BookingResult } from '../../services/booking-date';
import { TrainAnimationComponent } from '../train-animation/train-animation';
import { downloadICS, generateICS, googleCalendarUrl, outlookCalendarUrl } from '../../utils/ics-generator';

@Component({
  selector: 'app-date-calculator',
  standalone: true,
  imports: [CommonModule, TrainAnimationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <h1>🚄 60-Day Railway Ticket Booking Date Calculator</h1>
      <p style="text-align:center;color:#64748B;margin-top:8px;">
        Instantly find your exact IRCTC booking date — 60 days before your journey.
      </p>
    </header>

    <app-train-animation></app-train-animation>

    <section class="card" aria-labelledby="calc-heading">
      <h2 id="calc-heading" class="sr-only">Calculate your booking date</h2>

      <label for="travel-date">Select your travel (journey) date</label>
      <input
        id="travel-date"
        type="date"
        [value]="travelDate()"
        (change)="onDateChange($event)"
        [min]="minDate"
        aria-describedby="date-help"
      />
      <p id="date-help" style="font-size:.8rem;color:#64748B;margin-top:6px;">
        Booking opens 60 days before this date (excluding travel day), at 8:00 AM IST.
      </p>

      @if (result(); as r) {
      <div class="result-grid" role="region" aria-live="polite" aria-label="Booking result">
    <div class="result-box">
      <div class="label">Booking Opens On</div>
      <div class="value">{{ r.bookingDate | date:'EEE, dd MMM yyyy' }}</div>
    </div>

    <div class="result-box">
      <div class="label">Booking Time</div>
      <div class="value">08:00 AM IST</div>
    </div>

    <div class="result-box">
      <div class="label">Days Until Booking</div>
      <div class="value">{{ r.daysAway > 0 ? r.daysAway : 'Open now' }}</div>
    </div>

    <div class="result-box" style="grid-column: 1 / -1;">
      @if (r.isPeakDay && r.peakInfo; as p) {
        <span
          class="badge"
          [class.badge-peak]="p.severity === 'high'"
          [class.badge-medium]="p.severity === 'medium'">
          ⚠ {{ p.severity === 'high' ? 'High Rush' : 'Moderate Rush' }} — {{ p.name }}
        </span>
        <p style="margin-top:8px;color:#78350F;">
          {{ p.reason }}.
        </p>
        @if (p.tip) {
          <p style="margin-top:6px;color:#92400E;font-size:.9rem;">
            💡 {{ p.tip }}
          </p>
        }
        @if (r.suggestedAltDate) {
          <p style="margin-top:8px;color:#065F46;font-weight:600;">
            🗓 Tip: Traveling on
            {{ r.suggestedAltDate | date:'EEE, dd MMM yyyy' }}
            avoids this rush window.
          </p>
        }
      } @else {
        <span class="badge badge-ok">✓ Normal Travel Day</span>
        <p style="margin-top:8px;color:#065F46;">
          This date is outside major festival or seasonal rush windows.
        </p>
      }
    </div>
  </div>


        <h3 style="margin-top:28px;">Add reminder to your calendar</h3>
        <p style="color:#64748B;font-size:.9rem;">
          Each reminder includes a <strong>15-minute alarm before booking opens</strong>.
        </p>

        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:16px;">
          <a class="btn btn-google" [href]="googleUrl()" target="_blank" rel="noopener"
             aria-label="Add reminder to Google Calendar">
            📅 Google Calendar
          </a>
          <a class="btn btn-outlook" [href]="outlookUrl()" target="_blank" rel="noopener"
             aria-label="Add reminder to Outlook Calendar">
            📧 Outlook
          </a>
          <button class="btn btn-apple" (click)="downloadApple()" type="button"
                  aria-label="Download Apple Calendar reminder">
            🍎 Apple Calendar (.ics)
          </button>
        </div>
      }
    </section>

    <section class="card" aria-labelledby="info-heading">
      <h2 id="info-heading">How the 60-Day Advance Reservation Period (ARP) Works</h2>
      <p>Indian Railways allows passengers to book tickets <strong>60 days in advance</strong>, excluding the day of journey. For example, if you plan to travel on <em>15 December</em>, your booking opens on <em>16 October</em> at 8:00 AM IST.</p>
      <ul style="margin-top:12px;padding-left:20px;">
        <li>🕗 Booking opens at <strong>8:00 AM IST</strong> on the booking date.</li>
        <li>📅 The Advance Reservation Period is <strong>60 days</strong> for most trains.</li>
        <li>🏖 Peak season dates (Diwali, Holi, summer vacation) fill within minutes — set a reminder.</li>
        <li>💡 Book from the official IRCTC website or app for confirmed tickets.</li>
      </ul>
    </section>

    <div class="disclaimer" role="note">
      <strong>Disclaimer:</strong> This tool is an independent calculator and is not affiliated with Indian Railways or IRCTC.
      We are <strong>not responsible</strong> for any miscalculations, errors, time-zone differences, or changes to railway booking policies.
      Always verify the booking date and time on the official
      <a href="https://www.irctc.co.in" rel="noopener nofollow" target="_blank">IRCTC website</a> before booking.
    </div>
    
  `,
})
export class DateCalculatorComponent {
  private svc = inject(BookingDateService);

  travelDate = signal<string>('');
  result = signal<BookingResult | null>(null);

  minDate = new Date().toISOString().split('T')[0];

  onDateChange(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this.travelDate.set(val);
    if (val) {
      const d = new Date(val + 'T00:00:00');
      this.result.set(this.svc.calculate(d));
    }
  }

  private buildStart(): Date {
    const r = this.result()!;
    const d = new Date(r.bookingDate);
    d.setHours(8, 0, 0, 0);
    return d;
  }

  googleUrl = computed(() => {
    const r = this.result(); if (!r) return '';
    const start = this.buildStart();
    return googleCalendarUrl(
      `🚄 IRCTC Booking Opens — Travel on ${r.travelDate.toDateString()}`,
      'IRCTC ticket booking opens at 8:00 AM IST. Book now!',
      start
    );
  });

  outlookUrl = computed(() => {
    const r = this.result(); if (!r) return '';
    const start = this.buildStart();
    return outlookCalendarUrl(
      `IRCTC Booking Opens — Travel ${r.travelDate.toDateString()}`,
      'IRCTC booking opens at 8:00 AM IST.',
      start
    );
  });

  downloadApple() {
    const r = this.result(); if (!r) return;
    const ics = generateICS(
      `IRCTC Booking Opens — Travel ${r.travelDate.toDateString()}`,
      'IRCTC ticket booking opens at 8:00 AM IST.',
      this.buildStart(),
      15
    );
    downloadICS('irctc-booking.ics', ics);
  }
}