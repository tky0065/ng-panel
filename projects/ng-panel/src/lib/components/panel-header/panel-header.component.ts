import {Component, inject, signal, computed, input, ChangeDetectionStrategy} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { PanelService } from '../../services/panel.service';
import { ThemeConfig } from '../../models/panel-config.model';

@Component({
  selector: 'lib-panel-header',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="navbar w-full bg-base-200 px-4 shadow-lg">
      <!-- Logo et titre -->
      <div class="flex-1">
        @if (logo()) {
          <img [src]="logo()" alt="Logo" class="h-8 w-auto mr-2">
        }
        <h1 class="text-xl font-bold">{{ title() }}</h1>
      </div>

      <div class="flex-none gap-4">
        <!-- Sélecteur de thème -->
        @if (themes().length > 0) {
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            </label>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              @for (theme of themes(); track theme.name) {
                <li>
                  <button (click)="setTheme(theme.name)" class="flex items-center gap-2">
                    @if (theme.icon) {
                      <i class="material-icons">{{ theme.icon }}</i>
                    }
                    {{ theme.label }}
                  </button>
                </li>
              }
            </ul>
          </div>
        }

        <!-- Profile dropdown -->
        @if (profileConfig()) {
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img [src]="profileConfig()?.avatar || 'https://placehold.co/600x400/png'"
                     [alt]="profileConfig()?.username || 'profile'" />
              </div>
            </label>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              @for (action of profileConfig()?.actions || []; track action.label) {
                <li>
                  @if (action.route) {
                    <a [routerLink]="action.route" class="flex items-center gap-2">
                      @if (action.icon) {
                        <i class="material-icons">{{ action.icon }}</i>
                      }
                      {{ action.label }}
                    </a>
                  } @else {
                    <button (click)="action.action && action.action()" class="flex items-center gap-2">
                      @if (action.icon) {
                        <i class="material-icons">{{ action.icon }}</i>
                      }
                      {{ action.label }}
                    </button>
                  }
                </li>
              }
            </ul>
          </div>
        }
      </div>
    </header>
  `
})
export class PanelHeaderComponent {
  readonly title = input('');
  readonly logo = input<string>();

  private panelService = inject(PanelService);

  themes = signal<ThemeConfig[]>([
    { name: 'light', label: 'Light', icon: 'light_mode' },
    { name: 'dark', label: 'Dark', icon: 'dark_mode' },
    { name: 'cupcake', label: 'Cupcake', icon: 'cake' },
    { name: 'bumblebee', label: 'Bumblebee', icon: 'brightness_high' },
    { name: 'emerald', label: 'Emerald', icon: 'diamond' },
    { name: 'corporate', label: 'Corporate', icon: 'business' },
    { name: 'synthwave', label: 'Synthwave', icon: 'music_note' },
    { name: 'retro', label: 'Retro', icon: 'vintage' },
    { name: 'valentine', label: 'Valentine', icon: 'favorite' }
  ]);

  profileConfig = computed(() => this.panelService.config().profileConfig);

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
