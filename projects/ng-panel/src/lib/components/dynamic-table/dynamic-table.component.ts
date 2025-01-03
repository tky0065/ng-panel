import { Component, Input, inject, signal, computed } from '@angular/core';
import { ModelConfig } from '../../models/panel-config.model';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'lib-dynamic-table',
  standalone: true,
  template: `
    @if (model(); as modelConfig) {
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
          <tr>
            @for (field of modelConfig.fields; track field.name) {
              <th>{{ field.label }}</th>
            }
            @if (modelConfig.actions?.length) {
              <th>Actions</th>
            }
          </tr>
          </thead>
          <tbody>
            @for (item of datas(); track item.id) {
              <tr>
                @for (field of modelConfig.fields; track field.name) {
                  <td>{{ item[field.name] }}</td>
                }
                @if (modelConfig.actions?.length) {
                  <td>
                    @for (action of modelConfig.actions; track action.name) {
                      <button
                        class="btn btn-{{ action.type }} btn-sm mr-2"
                        (click)="action.handler?.(item)"
                      >
                        @if (action.icon) {
                          <i class="{{ action.icon }}"></i>
                        }
                        {{ action.label }}
                      </button>
                    }
                  </td>
                }
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `
})
export class DynamicTableComponent {
  @Input() modelName!: string;
  @Input({ required: true }) set data(value: any[]) {
    this.dataSignal.set(value);
  }

  private panelService = inject(PanelService);
  private dataSignal = signal<any[]>([]);

  datas = this.dataSignal.asReadonly();
  model = computed(() => this.panelService.getModel(this.modelName));
}
