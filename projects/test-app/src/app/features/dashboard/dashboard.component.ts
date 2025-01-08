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
      value: 150,
      color: 'bg-violet-600',
      icon: 'people'
    },
    {
      title: 'Produits',
      value: 1234,
      color: 'bg-pink-500',
      icon: 'inventory_2'
    },
    {
      title: 'Ventes',
      value: 45678,
      color: 'bg-teal-500',
      icon: 'shopping_cart'
    }
  ];
}
