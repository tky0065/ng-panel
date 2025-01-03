import { Component, Input, computed, inject } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { MenuItem } from '../../models/panel-config.model';

@Component({
  selector: 'lib-panel-sidebar',
  standalone: true,
  template: `
    <aside class="drawer-side bg-base-200 w-64 min-h-screen">
      <div class="p-4">
        <ul class="menu menu-vertical space-y-2">
          @for (item of menu; track item.label) {
            @if (!item.children) {
              <li>
                <a
                  [routerLink]="item.route"
                  routerLinkActive="active"
                  class="flex items-center gap-2 "
                >
                  @if (item.icon) {
                    <i class="material-icons">{{ item.icon }}</i>
                  }
                  {{ item.label }} "User"
                </a>
              </li>
            } @else {
              <li>
                <details [open]="isParentActive(item)">
                  <summary class="flex items-center gap-2">
                    @if (item.icon) {
                      <i class="material-icons">{{ item.icon }}</i>
                    }
                    {{ item.label }}
                  </summary>
                  <ul>
                    @for (child of item.children; track child.label) {
                      <li>
                        <a
                          [routerLink]="child.route"
                          routerLinkActive="active"
                          class="flex items-center gap-2"
                        >
                          @if (child.icon) {
                            <i class="material-icons">{{ child.icon }}</i>
                          }
                          {{ child.label }}
                        </a>
                      </li>
                    }
                  </ul>
                </details>
              </li>
            }
          }
        </ul>
      </div>
    </aside>
  `,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  styles: [`
    .active {
      @apply bg-primary text-primary-content;
    }

    .drawer-side {
      @apply border-r border-base-300;
    }
  `]
})
export class PanelSidebarComponent {
  @Input() menu: MenuItem[] = [];
  private router = inject(Router);

  isParentActive(item: MenuItem): boolean {
    if (!item.children) return false;
    return item.children.some(child =>
      this.router.isActive(child.route || '', {
        paths: 'exact',
        queryParams: 'exact',
        fragment: 'ignored',
        matrixParams: 'ignored'
      })
    );
  }
}
