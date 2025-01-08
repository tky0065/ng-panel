
import { Component, inject } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { RouterOutlet } from '@angular/router';
import { PanelHeaderComponent } from '../panel-header/panel-header.component';
import { PanelSidebarComponent } from '../panel-sidebar/panel-sidebar.component';
import { PanelFooterComponent } from '../panel-footer/panel-footer.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'lib-panel-layout',
  standalone: true,

  template: `
    <div class="flex flex-col h-screen bg-base-100">
      <!-- Header fixe en haut -->
      <lib-panel-header
        [title]="panelService.config().title"
        [logo]="panelService.config().logo"
        class="flex-none h-16"
      />

      <!-- Conteneur principal avec sidebar et contenu -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Sidebar fixe à gauche -->
        <lib-panel-sidebar
          [menu]="panelService.config().menu"
          class="flex-none w-64 bg-base-200 overflow-y-auto"
        />

        <!-- Zone de contenu principale avec défilement -->
        <main class="flex-1 overflow-y-auto p-4 bg-base-100">
          <router-outlet/>
        </main>
      </div>

      <!-- Footer fixe en bas -->
      <lib-panel-footer class="flex-none h-12"/>
    </div>
  `,
  imports: [
    RouterOutlet,
    PanelHeaderComponent,
    PanelSidebarComponent,
    PanelFooterComponent,
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
