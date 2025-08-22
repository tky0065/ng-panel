import { Component } from '@angular/core';
import {
  DynamicStatsComponent,
  StatItem
} from '../../../../../ng-panel/src/lib/components/stat-card/stat-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DynamicStatsComponent],
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
      <lib-dynamic-stats [data]="statsData"/>
    </div>
  `
})
export class DashboardComponent {
  statsData: StatItem[] = [
    {
      title: 'Utilisateurs',
      value: 150, // ✅ number value
      color: 'bg-violet-600',
      icon: 'people',
      change: { // ✅ Now supported - shows trend
        value: 12,
        type: 'increase'
      }
    },
    {
      title: 'Chiffre d\'affaires',
      value: '€45.6K', // ✅ string value now supported
      color: 'bg-pink-500',
      icon: 'attach_money',
      change: { // ✅ Now supported - shows trend
        value: 8,
        type: 'increase'
      }
    },
    {
      title: 'Ventes',
      value: 45678, // ✅ number value
      color: 'bg-teal-500',
      icon: 'shopping_cart',
      change: { // ✅ Now supported - shows trend
        value: -3,
        type: 'decrease'
      }
    }
  ];
}
