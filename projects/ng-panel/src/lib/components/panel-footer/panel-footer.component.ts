import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'lib-panel-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer footer-center p-4 bg-base-200 text-base-content border-t border-base-300">
      <div>
        <p>{{ year }} © {{ panelService.config().title || 'Admin Panel' }} - All rights reserved</p>
      </div>
    </footer>
  `
})
export class PanelFooterComponent {
  protected panelService = inject(PanelService);
  protected year = new Date().getFullYear();
}
