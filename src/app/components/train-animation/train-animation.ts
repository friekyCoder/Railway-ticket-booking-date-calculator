import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-train-animation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="track" role="img" aria-label="Animated Vande Bharat train with a passenger boarding">
      <div class="scene">
        <svg class="train" viewBox="0 0 200 70" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="body" x1="0" x2="1">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="60%" stop-color="#F1F5F9"/>
              <stop offset="100%" stop-color="#E2E8F0"/>
            </linearGradient>
            <linearGradient id="stripe" x1="0" x2="1">
              <stop offset="0%" stop-color="#FF6B35"/>
              <stop offset="100%" stop-color="#0B3D91"/>
            </linearGradient>
          </defs>
          <path d="M5 45 Q5 25 25 22 L170 22 Q195 22 197 42 L197 52 L5 52 Z"
                fill="url(#body)" stroke="#0B3D91" stroke-width="1.5"/>
          <path d="M5 45 Q2 35 12 30 L20 30 L20 52 L5 52 Z" fill="#0B3D91"/>
          <rect x="20" y="42" width="177" height="4" fill="url(#stripe)"/>
          <rect x="30" y="30" width="18" height="9" rx="2" fill="#0B3D91" opacity="0.85"/>
          <rect x="55" y="30" width="18" height="9" rx="2" fill="#0B3D91" opacity="0.85"/>
          <rect x="80" y="30" width="18" height="9" rx="2" fill="#0B3D91" opacity="0.85"/>
          <rect x="105" y="30" width="18" height="9" rx="2" fill="#0B3D91" opacity="0.85"/>
          <rect x="130" y="30" width="18" height="9" rx="2" fill="#0B3D91" opacity="0.85"/>
          <circle cx="45" cy="55" r="4" fill="#1E293B"/>
          <circle cx="90" cy="55" r="4" fill="#1E293B"/>
          <circle cx="140" cy="55" r="4" fill="#1E293B"/>
          <circle cx="180" cy="55" r="4" fill="#1E293B"/>
        </svg>

        <div class="passenger" aria-hidden="true">
          <svg viewBox="0 0 20 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="7" r="5" fill="#0B3D91"/>
            <rect x="6" y="13" width="8" height="14" rx="2" fill="#FF6B35"/>
            <rect x="7" y="27" width="3" height="10" fill="#0B3D91"/>
            <rect x="10" y="27" width="3" height="10" fill="#0B3D91"/>
          </svg>
        </div>
      </div>
      <div class="rail"></div>
    </div>
  `,
  styles: [`
    .track { width: 100%; height: 120px; position: relative; overflow: hidden; margin: 16px 0; }
    .scene { position: relative; width: 100%; height: 100px; }
    .train {
      position: absolute; width: 200px; height: 70px; bottom: 8px;
      animation: chug 9s linear infinite;
      filter: drop-shadow(0 4px 8px rgba(11,61,145,.25));
    }
    .passenger {
      position: absolute; width: 20px; height: 40px; bottom: 12px;
      animation: board 9s linear infinite;
    }
    .rail {
      position: absolute; bottom: 6px; left: 0; right: 0; height: 4px;
      background: repeating-linear-gradient(90deg, #94A3B8 0 12px, transparent 12px 20px);
      border-radius: 2px;
    }
    @keyframes chug {
      0%   { left: -220px; }
      30%  { left: 20%; }
      35%  { left: 22%; }
      70%  { left: 70%; }
      100% { left: 110%; }
    }
    @keyframes board {
      0%, 20% { left: 5%;  opacity: 1; transform: translateY(0); }
      28%     { left: 22%; transform: translateY(-4px); }
      33%     { left: 26%; transform: translateY(-10px); opacity: 1; }
      36%     { opacity: 0; }
      100%    { left: 26%; opacity: 0; }
    }
  `],
})
export class TrainAnimationComponent {}