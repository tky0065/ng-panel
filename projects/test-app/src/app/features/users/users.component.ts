import { Component, inject, signal } from '@angular/core';
import {DynamicTableComponent} from '../../../../../ng-panel/src/lib/components/dynamic-table/dynamic-table.component';
import {DynamicFormComponent} from '../../../../../ng-panel/src/lib/components/dynamic-form/dynamic-form.component';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DynamicTableComponent, DynamicFormComponent],
  templateUrl: './users.component.html'
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
