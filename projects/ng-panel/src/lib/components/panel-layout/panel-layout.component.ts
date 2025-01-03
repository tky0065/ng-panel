
import { Component, inject } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { RouterOutlet } from '@angular/router';
import { PanelHeaderComponent } from '../panel-header/panel-header.component';
import { PanelSidebarComponent } from '../panel-sidebar/panel-sidebar.component';
import { PanelFooterComponent } from '../panel-footer/panel-footer.component';

@Component({
  selector: 'lib-panel-layout',
  standalone: true,
  template: `
    @if (panelService.config(); as config) {
      <div class="flex flex-col h-screen overflow-hidden bg-base-100">
        <!-- Header fixe en haut -->
        <lib-panel-header
          [title]="config.title"
          [logo]="config.logo"
          class="flex-none"
        />

        <!-- Conteneur principal avec sidebar et contenu -->
        <div class="flex flex-1 overflow-hidden">
          <!-- Sidebar fixe à gauche -->
          <lib-panel-sidebar
            [menu]="config.menu"
            class="flex-none w-64 overflow-y-auto"
          />

          <!-- Zone de contenu principale avec défilement -->
          <main class="flex-1 overflow-y-auto p-4">
            <router-outlet/>
          </main>
        </div>

        <!-- Footer fixe en bas -->
        <lib-panel-footer class="flex-none"/>
      </div>
    }
  `,
  imports: [
    RouterOutlet,
    PanelHeaderComponent,
    PanelSidebarComponent,
    PanelFooterComponent
  ],
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class PanelLayoutComponent {
  panelService = inject(PanelService);
}
