import { Component, inject, signal } from '@angular/core';
import {DynamicTableComponent} from '../../../../../ng-panel/src/lib/components/dynamic-table/dynamic-table.component';
import {DynamicFormComponent} from '../../../../../ng-panel/src/lib/components/dynamic-form/dynamic-form.component';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DynamicTableComponent, DynamicFormComponent],
  template: `
    <div class="p-4 space-y-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Utilisateurs</h1>
        <button class="btn btn-primary" [@if]="!showForm()" (click)="toggleForm()">
          Ajouter un utilisateur
        </button>
      </div>

      @if (showForm()) {
        <lib-dynamic-form
          modelName="user"
          [initialData]="selectedUser()"
          (onSubmit)="handleSubmit($event)"
          (onCancel)="toggleForm()"
        />
      } @else {
        <lib-dynamic-table
          modelName="user"
          [data]="users()"
        />
      }
    </div>
  `
})
export class UsersComponent {
  showForm = signal(false);
  selectedUser = signal<any>(null);
  users = signal([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', role: 'user' }
  ]);

  toggleForm() {
    this.showForm.update(v => !v);
    if (!this.showForm()) {
      this.selectedUser.set(null);
    }
  }

  handleSubmit(data: any) {
    // Gérer la soumission du formulaire
    console.log('Form data:', data);
    this.toggleForm();
  }
}
