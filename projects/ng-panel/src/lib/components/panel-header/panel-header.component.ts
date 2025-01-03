import { Component, Input, inject } from '@angular/core';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'lib-panel-header',
  standalone: true,
  template: `
    <header class="navbar bg-base-200 px-4 shadow-lg">
      <div class="flex-1">
        @if (logo) {
          <img [src]="logo" alt="Logo" class="h-8 w-auto mr-2">
        }
        <h1 class="text-xl font-bold">{{ title }}</h1>
      </div>

      <div class="flex-none gap-4">
        <!-- Bouton thème -->
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          </label>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><button (click)="setTheme('light')">Light</button></li>
            <li><button (click)="setTheme('dark')">Dark</button></li>
            <li><button (click)="setTheme('cupcake')">Cupcake</button></li>
          </ul>
        </div>

        <!-- Profile dropdown -->
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src="/api/placeholder/40/40" alt="profile" />
            </div>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Profile</a></li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
  `
})
export class PanelHeaderComponent {
  @Input() title = '';
  @Input() logo?: string;

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
