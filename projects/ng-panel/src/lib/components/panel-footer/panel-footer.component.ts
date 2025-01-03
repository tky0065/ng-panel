import { Component, computed, inject } from '@angular/core';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'lib-panel-footer',
  standalone: true,
  template: `
    <footer class="footer footer-center p-4 bg-base-200 text-base-content mb-0">
      <div>
        <p>{{ currentYear() }} © {{ config()?.title || 'Admin Panel' }} - All rights reserved</p>
      </div>
    </footer>
  `
})
export class PanelFooterComponent {
  private panelService = inject(PanelService);

  config = this.panelService.config;
  currentYear = computed(() => new Date().getFullYear());
}
