// panel-sidebar.component.ts
import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../models/panel-config.model';

@Component({
  selector: 'lib-panel-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="h-full ">
      <ul class="menu menu-vertical p-4">
        @for (item of menu(); track item.label) {
          <li>
            @if (!item.children) {
              <a [routerLink]="item.route"
                 routerLinkActive="active bg-primary text-primary-content">
                @if (item.icon) {
                  <i class="material-icons">{{item.icon}}</i>
                }
                {{item.label}}
              </a>
            } @else {
              <details>
                <summary>
                  @if (item.icon) {
                    <i class="material-icons">{{item.icon}}</i>
                  }
                  {{item.label}}
                </summary>
                <ul>
                  @for (child of item.children; track child.label) {
                    <li>
                      <a [routerLink]="child.route"
                         routerLinkActive="active bg-primary text-primary-content">
                        @if (child.icon) {
                          <i class="material-icons">{{child.icon}}</i>
                        }
                        {{child.label}}
                      </a>
                    </li>
                  }
                </ul>
              </details>
            }
          </li>
        }
      </ul>
    </nav>
  `
})
export class PanelSidebarComponent {
  readonly menu = input<MenuItem[]>([]);
}
