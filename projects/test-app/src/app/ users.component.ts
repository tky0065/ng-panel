import {Component, inject, signal} from '@angular/core';
import {DynamicTableComponent} from '../../../ng-panel/src/lib/components/dynamic-table/dynamic-table.component';
import {DynamicFormComponent} from '../../../ng-panel/src/lib/components/dynamic-form/dynamic-form.component';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DynamicTableComponent, DynamicFormComponent],
  template: `
    <div class="space-y-4">
      <h1 class="text-2xl font-bold">Gestion des utilisateurs</h1>

      @if (!showForm()) {
        <button class="btn btn-primary" (click)="toggleForm()">
          Ajouter un utilisateur
        </button>

        <lib-dynamic-table
          modelName="user"
          [data]="users()"
        />
      } @else {
        <lib-dynamic-form
          modelName="user"
          [initialData]="selectedUser()"
          (onSubmit)="handleSubmit($event)"
          (onCancel)="toggleForm()"
        />
      }
    </div>
  `
})
export class UsersComponent {
  protected showForm = signal(false);
  protected selectedUser = signal<any>(null);
  protected users = signal<any[]>([]);

  toggleForm() {
    this.showForm.update(v => !v);
  }

  handleSubmit(data: any) {
    // Gérer la soumission du formulaire
    console.log('Form data:', data);
    this.toggleForm();
  }
}
