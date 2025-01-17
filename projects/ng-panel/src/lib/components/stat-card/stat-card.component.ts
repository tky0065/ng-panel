import { Component, Input, signal } from '@angular/core';

export interface StatItem {
  title: string;
  value: number;
  color: string;
  icon?: string; // Nom de l'icône Material
  iconClass?: string; // Classes CSS additionnelles pour l'icône
}

@Component({
  selector: 'lib-dynamic-stats',
  standalone: true,
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      @for (stat of stats(); track stat.title) {
        <div [class]="'rounded-lg p-6 ' + stat.color">
          <div class="text-white">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-xl font-medium">{{ stat.title }}</h3>
                <p class="text-4xl font-bold mt-2">{{ stat.value }}</p>
              </div>
              @if (stat.icon) {
                <span class="material-icons text-4xl opacity-80" [class]="stat.iconClass">
                  {{ stat.icon }}
                </span>
              }
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class DynamicStatsComponent {
  private statsSignal = signal<StatItem[]>([]);


  @Input({ required: true })
  set data(value: StatItem[]) {
    this.statsSignal.set(value);
  }

  stats = this.statsSignal.asReadonly();
}
