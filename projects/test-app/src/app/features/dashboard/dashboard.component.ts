import { Component, signal } from '@angular/core';
import {DynamicTableComponent} from '../../../../../ng-panel/src/lib/components/dynamic-table/dynamic-table.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="p-4 space-y-4">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="card bg-primary text-primary-content">
          <div class="card-body">
            <h2 class="card-title">Utilisateurs</h2>
            <p class="text-3xl font-bold">{{ stats().users }}</p>
          </div>
        </div>
        <div class="card bg-secondary text-secondary-content">
          <div class="card-body">
            <h2 class="card-title">Produits</h2>
            <p class="text-3xl font-bold">{{ stats().products }}</p>
          </div>
        </div>
        <div class="card bg-accent text-accent-content">
          <div class="card-body">
            <h2 class="card-title">Ventes</h2>
            <p class="text-3xl font-bold">{{ stats().sales }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  stats = signal({
    users: 150,
    products: 1234,
    sales: 45678
  });
}
