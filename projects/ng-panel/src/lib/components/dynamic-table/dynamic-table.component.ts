import {Component, Input, inject, signal, computed, input} from '@angular/core';

import { PanelService } from '../../services/panel.service';


@Component({
  selector: 'lib-dynamic-table',
  standalone: true,
  imports: [],
  template: `
    <div class="overflow-x-auto" [class.hidden]="!model()">
      <table class="table w-full">
        <thead>
          <tr>
            @if (model()) {
              @for (field of model()?.fields; track field) {
                <th>
                  {{ field.label }}
                </th>
              }
              @if (model()?.actions?.length) {
                <th>Actions</th>
              }
            }
          </tr>
        </thead>
        <tbody>
          @if (model()) {
            @for (item of datas(); track trackById($index, item)) {
              <tr>
                @for (field of model()?.fields; track field) {
                  <td>
                    {{ item[field.name] }}
                  </td>
                }
                @if (model()?.actions?.length) {
                  <td>
                    @for (action of model()?.actions; track action) {
                      <button
                        class="btn btn-{{ action.type }} btn-sm mr-2"
                        (click)="action.handler?.(item)">
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
          }
        </tbody>
      </table>
    </div>
    `
})
export class DynamicTableComponent {
  readonly modelName = input.required<string>();

  @Input({ required: true }) set data(value: any[]) {
    this.dataSignal.set(value);
  }

  private panelService = inject(PanelService);
  private dataSignal = signal<any[]>([]);

  datas = this.dataSignal.asReadonly();
  model = computed(() => this.panelService.getModel(this.modelName()));

  trackById(index: number, item: any): any {
    return item.id || index;
  }
}
