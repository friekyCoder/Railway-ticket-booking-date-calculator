import { Component } from '@angular/core';
import { DateCalculatorComponent } from './components/date-calculator/date-calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DateCalculatorComponent],
  template: `
    <main class="container">
      <app-date-calculator></app-date-calculator>
    </main>

    <footer class="site-footer" role="contentinfo">
      <p>
        &copy; {{ currentYear }} 60-Day Railway Ticket Booking Date Calculator.
        All rights reserved.
      </p>
      <p class="footer-note">
        Not affiliated with Indian Railways or IRCTC.
      </p>
    </footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .container {
      flex: 1;
      max-width: 900px;
      margin: 0 auto;
      padding: 24px 16px;
      width: 100%;
    }

    .site-footer {
      text-align: center;
      padding: 24px 16px;
      margin-top: auto;
      background: rgba(11, 61, 145, 0.04);
      border-top: 1px solid rgba(11, 61, 145, 0.1);
      color: #64748B;
      font-size: 0.875rem;
      line-height: 1.6;
    }

    .site-footer p {
      margin: 0;
    }

    .footer-note {
      margin-top: 4px !important;
      font-size: 0.8rem;
      color: #94A3B8;
    }

    @media (max-width: 480px) {
      .site-footer {
        font-size: 0.8rem;
        padding: 20px 12px;
      }
      .footer-note {
        font-size: 0.75rem;
      }
    }
  `],
})
export class App {
  currentYear = new Date().getFullYear();
}