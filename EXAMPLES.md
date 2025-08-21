# Exemples Complets - ng-panel

Cette documentation contient des exemples complets et détaillés pour utiliser ng-panel dans différents contextes.

## Table des Matières

1. [Exemples de Base](#exemples-de-base)
2. [Modèles Avancés](#modèles-avancés)
3. [Formulaires Complexes](#formulaires-complexes)
4. [Tableaux Personnalisés](#tableaux-personnalisés)
5. [Gestion des Thèmes](#gestion-des-thèmes)
6. [Services et API](#services-et-api)
7. [Validation Personnalisée](#validation-personnalisée)
8. [Composants Personnalisés](#composants-personnalisés)
9. [Patterns d'Architecture](#patterns-darchitecture)

## Exemples de Base

### Configuration Simple avec Menu Hiérarchique

```typescript
// app.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { PanelLayoutComponent, PanelService } from '@enokdev/ng-panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PanelLayoutComponent],
  template: `<lib-panel-layout/>`
})
export class AppComponent implements OnInit {
  private panelService = inject(PanelService);

  ngOnInit() {
    this.panelService.setConfig({
      title: 'E-Commerce Admin',
      logo: '/assets/logo.svg',
      profileConfig: {
        avatar: '/assets/user-avatar.jpg',
        username: 'John Admin',
        actions: [
          {
            label: 'Mon Profil',
            icon: 'person',
            route: '/profile'
          },
          {
            label: 'Préférences',
            icon: 'tune',
            route: '/preferences'
          },
          { type: 'divider' }, // Séparateur
          {
            label: 'Aide',
            icon: 'help',
            action: () => window.open('/help', '_blank')
          },
          {
            label: 'Déconnexion',
            icon: 'logout',
            action: () => this.logout()
          }
        ]
      },
      menu: [
        {
          label: 'Tableau de Bord',
          icon: 'dashboard',
          route: '/dashboard',
          badge: '3' // Badge avec notification
        },
        {
          label: 'E-Commerce',
          icon: 'store',
          children: [
            {
              label: 'Produits',
              icon: 'inventory',
              route: '/products',
              badge: 'NEW'
            },
            {
              label: 'Catégories',
              icon: 'category',
              route: '/categories'
            },
            {
              label: 'Commandes',
              icon: 'shopping_cart',
              route: '/orders',
              badge: '12'
            },
            {
              label: 'Clients',
              icon: 'people',
              route: '/customers'
            }
          ]
        },
        {
          label: 'Marketing',
          icon: 'campaign',
          children: [
            {
              label: 'Promotions',
              icon: 'local_offer',
              route: '/promotions'
            },
            {
              label: 'Newsletter',
              icon: 'email',
              route: '/newsletter'
            },
            {
              label: 'SEO',
              icon: 'search',
              route: '/seo'
            }
          ]
        },
        {
          label: 'Analytiques',
          icon: 'analytics',
          children: [
            {
              label: 'Ventes',
              icon: 'trending_up',
              route: '/analytics/sales'
            },
            {
              label: 'Trafic',
              icon: 'traffic',
              route: '/analytics/traffic'
            },
            {
              label: 'Conversion',
              icon: 'conversion_path',
              route: '/analytics/conversion'
            }
          ]
        },
        { type: 'divider', label: 'Administration' },
        {
          label: 'Utilisateurs',
          icon: 'admin_panel_settings',
          route: '/admin/users'
        },
        {
          label: 'Paramètres',
          icon: 'settings',
          route: '/admin/settings'
        }
      ]
    });
  }

  private logout() {
    // Logique de déconnexion
    console.log('Déconnexion...');
  }
}
```

## Modèles Avancés

### Modèle Produit Complet

```typescript
// services/product.service.ts
import { Injectable, inject } from '@angular/core';
import { PanelService } from '@enokdev/ng-panel';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private panelService = inject(PanelService);

  registerProductModel() {
    this.panelService.registerModel('product', {
      name: 'product',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nom du produit',
          required: true,
          validators: [
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        },
        {
          name: 'sku',
          type: 'text',
          label: 'SKU',
          required: true,
          placeholder: 'Ex: PROD-001',
          validators: [
            Validators.pattern(/^[A-Z0-9-]+$/)
          ]
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: false,
          rows: 4
        },
        {
          name: 'category',
          type: 'select',
          label: 'Catégorie',
          required: true,
          options: [
            { label: 'Électronique', value: 'electronics' },
            { label: 'Vêtements', value: 'clothing' },
            { label: 'Maison & Jardin', value: 'home-garden' },
            { label: 'Sports & Loisirs', value: 'sports' },
            { label: 'Livres', value: 'books' }
          ]
        },
        {
          name: 'price',
          type: 'number',
          label: 'Prix (€)',
          required: true,
          min: 0,
          step: 0.01,
          validators: [
            Validators.min(0.01)
          ]
        },
        {
          name: 'comparePrice',
          type: 'number',
          label: 'Prix barré (€)',
          required: false,
          min: 0,
          step: 0.01
        },
        {
          name: 'cost',
          type: 'number',
          label: 'Coût (€)',
          required: false,
          min: 0,
          step: 0.01
        },
        {
          name: 'weight',
          type: 'number',
          label: 'Poids (kg)',
          required: false,
          min: 0,
          step: 0.01
        },
        {
          name: 'dimensions',
          type: 'group',
          label: 'Dimensions (cm)',
          fields: [
            {
              name: 'length',
              type: 'number',
              label: 'Longueur',
              min: 0
            },
            {
              name: 'width',
              type: 'number',
              label: 'Largeur',
              min: 0
            },
            {
              name: 'height',
              type: 'number',
              label: 'Hauteur',
              min: 0
            }
          ]
        },
        {
          name: 'inventory',
          type: 'group',
          label: 'Inventaire',
          fields: [
            {
              name: 'trackQuantity',
              type: 'boolean',
              label: 'Suivre la quantité'
            },
            {
              name: 'quantity',
              type: 'number',
              label: 'Quantité en stock',
              min: 0,
              dependsOn: 'trackQuantity'
            },
            {
              name: 'lowStockThreshold',
              type: 'number',
              label: 'Seuil stock bas',
              min: 0,
              dependsOn: 'trackQuantity'
            }
          ]
        },
        {
          name: 'seo',
          type: 'group',
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Titre Meta',
              maxLength: 60
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Description Meta',
              maxLength: 160,
              rows: 3
            },
            {
              name: 'slug',
              type: 'text',
              label: 'URL Slug',
              validators: [
                Validators.pattern(/^[a-z0-9-]+$/)
              ]
            }
          ]
        },
        {
          name: 'tags',
          type: 'multiselect',
          label: 'Tags',
          options: [
            { label: 'Nouveau', value: 'new' },
            { label: 'Populaire', value: 'popular' },
            { label: 'Promotion', value: 'sale' },
            { label: 'Limité', value: 'limited' },
            { label: 'Exclusif', value: 'exclusive' }
          ]
        },
        {
          name: 'images',
          type: 'file',
          label: 'Images',
          multiple: true,
          accept: 'image/*',
          maxFiles: 10
        },
        {
          name: 'status',
          type: 'select',
          label: 'Statut',
          required: true,
          options: [
            { label: 'Brouillon', value: 'draft' },
            { label: 'Actif', value: 'active' },
            { label: 'Archivé', value: 'archived' }
          ]
        },
        {
          name: 'publishedAt',
          type: 'datetime-local',
          label: 'Date de publication',
          required: false
        }
      ],
      actions: [
        {
          name: 'view',
          label: 'Voir',
          type: 'secondary',
          icon: 'visibility',
          handler: (item) => this.viewProduct(item)
        },
        {
          name: 'edit',
          label: 'Modifier',
          type: 'primary',
          icon: 'edit',
          handler: (item) => this.editProduct(item)
        },
        {
          name: 'duplicate',
          label: 'Dupliquer',
          type: 'secondary',
          icon: 'content_copy',
          handler: (item) => this.duplicateProduct(item)
        },
        {
          name: 'archive',
          label: 'Archiver',
          type: 'warning',
          icon: 'archive',
          condition: (item) => item.status !== 'archived',
          handler: (item) => this.archiveProduct(item)
        },
        {
          name: 'delete',
          label: 'Supprimer',
          type: 'danger',
          icon: 'delete',
          confirmMessage: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
          handler: (item) => this.deleteProduct(item)
        }
      ],
      list: {
        pageSize: 25,
        sortable: true,
        defaultSort: { field: 'name', direction: 'asc' },
        columns: [
          { name: 'name', label: 'Nom', sortable: true },
          { name: 'sku', label: 'SKU', sortable: true },
          { name: 'category', label: 'Catégorie', sortable: true },
          { name: 'price', label: 'Prix', sortable: true, type: 'currency' },
          { name: 'status', label: 'Statut', type: 'badge' }
        ],
        filters: [
          {
            name: 'category',
            type: 'select',
            label: 'Catégorie',
            options: [
              { label: 'Électronique', value: 'electronics' },
              { label: 'Vêtements', value: 'clothing' },
              { label: 'Maison & Jardin', value: 'home-garden' }
            ]
          },
          {
            name: 'status',
            type: 'select',
            label: 'Statut',
            options: [
              { label: 'Brouillon', value: 'draft' },
              { label: 'Actif', value: 'active' },
              { label: 'Archivé', value: 'archived' }
            ]
          },
          {
            name: 'priceRange',
            type: 'range',
            label: 'Gamme de prix',
            min: 0,
            max: 1000
          }
        ]
      },
      form: {
        layout: 'vertical',
        submitLabel: 'Enregistrer le produit',
        cancelLabel: 'Annuler',
        sections: [
          {
            title: 'Informations générales',
            fields: ['name', 'sku', 'description', 'category']
          },
          {
            title: 'Prix et coûts',
            fields: ['price', 'comparePrice', 'cost']
          },
          {
            title: 'Expédition',
            fields: ['weight', 'dimensions']
          },
          {
            title: 'Inventaire',
            fields: ['inventory']
          },
          {
            title: 'SEO et métadonnées',
            fields: ['seo', 'tags']
          },
          {
            title: 'Médias',
            fields: ['images']
          },
          {
            title: 'Visibilité',
            fields: ['status', 'publishedAt']
          }
        ]
      }
    });
  }

  private viewProduct(product: any) {
    // Logique pour voir le produit
  }

  private editProduct(product: any) {
    // Logique pour modifier le produit
  }

  private duplicateProduct(product: any) {
    // Logique pour dupliquer le produit
  }

  private archiveProduct(product: any) {
    // Logique pour archiver le produit
  }

  private deleteProduct(product: any) {
    // Logique pour supprimer le produit
  }
}
```

## Formulaires Complexes

### Formulaire avec Validation Conditionnelle

```typescript
// components/advanced-form.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DynamicFormComponent, ToastService } from '@enokdev/ng-panel';

@Component({
  selector: 'app-advanced-form',
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Formulaire Avancé avec Validation</h2>
        
        <lib-dynamic-form
          modelName="advancedUser"
          [initialData]="initialData"
          (onSubmit)="handleSubmit($event)"
          (onCancel)="handleCancel()"
          [customValidators]="customValidators"
        />
      </div>
    </div>
  `
})
export class AdvancedFormComponent {
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);

  initialData = {
    accountType: 'personal'
  };

  // Validateurs personnalisés
  customValidators = {
    phoneNumber: this.phoneValidator,
    passwordConfirm: this.passwordConfirmValidator,
    companyName: this.companyNameValidator
  };

  ngOnInit() {
    // Enregistrer le modèle avec validation conditionnelle
    this.registerAdvancedModel();
  }

  private registerAdvancedModel() {
    // Le modèle serait enregistré via PanelService avec des champs conditionnels
  }

  private phoneValidator(control: AbstractControl) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (control.value && !phoneRegex.test(control.value)) {
      return { invalidPhone: true };
    }
    return null;
  }

  private passwordConfirmValidator(control: AbstractControl) {
    const form = control.parent;
    if (form) {
      const password = form.get('password')?.value;
      const confirmPassword = control.value;
      if (password && confirmPassword && password !== confirmPassword) {
        return { passwordMismatch: true };
      }
    }
    return null;
  }

  private companyNameValidator(control: AbstractControl) {
    const form = control.parent;
    if (form) {
      const accountType = form.get('accountType')?.value;
      if (accountType === 'business' && !control.value) {
        return { companyNameRequired: true };
      }
    }
    return null;
  }

  handleSubmit(data: any) {
    this.toastService.success('Succès', 'Formulaire soumis avec succès');
    console.log('Données soumises:', data);
  }

  handleCancel() {
    this.toastService.info('Info', 'Formulaire annulé');
  }
}
```

## Tableaux Personnalisés

### Tableau avec Actions Conditionnelles et Formatage

```typescript
// components/advanced-table.component.ts
import { Component, inject, signal, computed } from '@angular/core';
import { DynamicTableComponent, ToastService, PanelService } from '@enokdev/ng-panel';

@Component({
  selector: 'app-advanced-table',
  standalone: true,
  imports: [DynamicTableComponent],
  template: `
    <div class="space-y-6">
      <!-- Contrôles du tableau -->
      <div class="flex justify-between items-center">
        <div class="flex space-x-4">
          <div class="form-control">
            <input 
              type="text" 
              placeholder="Rechercher..."
              class="input input-bordered"
              [(ngModel)]="searchTerm"
              (input)="filterData()" />
          </div>
          <div class="form-control">
            <select 
              class="select select-bordered"
              [(ngModel)]="statusFilter"
              (change)="filterData()">
              <option value="">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="pending">En attente</option>
              <option value="suspended">Suspendu</option>
            </select>
          </div>
        </div>
        
        <div class="flex space-x-2">
          <button class="btn btn-outline" (click)="exportData()">
            <i class="material-icons text-sm">download</i>
            Exporter
          </button>
          <button class="btn btn-primary" (click)="addNew()">
            <i class="material-icons text-sm">add</i>
            Nouveau
          </button>
        </div>
      </div>

      <!-- Tableau personnalisé -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input 
                        type="checkbox" 
                        class="checkbox"
                        [checked]="allSelected()"
                        (change)="toggleAllSelection()" />
                    </label>
                  </th>
                  <th>Utilisateur</th>
                  <th>Contact</th>
                  <th>Statut</th>
                  <th>Dernière activité</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (user of filteredUsers(); track user.id) {
                  <tr [class.bg-base-200]="selectedUsers().includes(user.id)">
                    <td>
                      <label>
                        <input 
                          type="checkbox" 
                          class="checkbox"
                          [checked]="selectedUsers().includes(user.id)"
                          (change)="toggleUserSelection(user.id)" />
                      </label>
                    </td>
                    <td>
                      <div class="flex items-center space-x-3">
                        <div class="avatar">
                          <div class="mask mask-squircle w-12 h-12">
                            <img [src]="user.avatar" [alt]="user.name" />
                          </div>
                        </div>
                        <div>
                          <div class="font-bold">{{ user.name }}</div>
                          <div class="text-sm opacity-50">{{ user.role }}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{{ user.email }}</div>
                      <div class="text-sm opacity-50">{{ user.phone }}</div>
                    </td>
                    <td>
                      <div class="badge" [ngClass]="getStatusClass(user.status)">
                        {{ getStatusLabel(user.status) }}
                      </div>
                    </td>
                    <td>
                      <div>{{ formatDate(user.lastActivity) }}</div>
                      <div class="text-sm opacity-50">{{ formatTimeAgo(user.lastActivity) }}</div>
                    </td>
                    <td>
                      <div class="flex space-x-2">
                        <button 
                          class="btn btn-ghost btn-xs"
                          (click)="viewUser(user)">
                          <i class="material-icons text-sm">visibility</i>
                        </button>
                        <button 
                          class="btn btn-ghost btn-xs"
                          (click)="editUser(user)">
                          <i class="material-icons text-sm">edit</i>
                        </button>
                        @if (user.status !== 'suspended') {
                          <button 
                            class="btn btn-ghost btn-xs text-warning"
                            (click)="suspendUser(user)">
                            <i class="material-icons text-sm">block</i>
                          </button>
                        } @else {
                          <button 
                            class="btn btn-ghost btn-xs text-success"
                            (click)="activateUser(user)">
                            <i class="material-icons text-sm">check_circle</i>
                          </button>
                        }
                        <button 
                          class="btn btn-ghost btn-xs text-error"
                          (click)="deleteUser(user)">
                          <i class="material-icons text-sm">delete</i>
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          
          <!-- Pagination personnalisée -->
          <div class="flex justify-between items-center mt-4">
            <div class="text-sm">
              Affichage {{ currentPageStart() }} à {{ currentPageEnd() }} 
              sur {{ totalUsers() }} utilisateurs
            </div>
            <div class="join">
              <button 
                class="join-item btn btn-sm"
                [disabled]="currentPage() === 1"
                (click)="previousPage()">
                Précédent
              </button>
              @for (page of pageNumbers(); track page) {
                <button 
                  class="join-item btn btn-sm"
                  [class.btn-active]="page === currentPage()"
                  (click)="goToPage(page)">
                  {{ page }}
                </button>
              }
              <button 
                class="join-item btn btn-sm"
                [disabled]="currentPage() === totalPages()"
                (click)="nextPage()">
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions groupées -->
      @if (selectedUsers().length > 0) {
        <div class="alert alert-info">
          <div class="flex justify-between items-center w-full">
            <span>{{ selectedUsers().length }} utilisateur(s) sélectionné(s)</span>
            <div class="space-x-2">
              <button class="btn btn-sm btn-outline" (click)="bulkActivate()">
                Activer
              </button>
              <button class="btn btn-sm btn-outline btn-warning" (click)="bulkSuspend()">
                Suspendre
              </button>
              <button class="btn btn-sm btn-outline btn-error" (click)="bulkDelete()">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class AdvancedTableComponent {
  private toastService = inject(ToastService);

  // État du tableau
  searchTerm = '';
  statusFilter = '';
  currentPage = signal(1);
  pageSize = signal(10);
  selectedUsers = signal<number[]>([]);

  // Données simulées
  users = signal([
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean@example.com',
      phone: '+33 1 23 45 67 89',
      role: 'Admin',
      status: 'active',
      avatar: 'https://via.placeholder.com/40',
      lastActivity: '2024-01-15T10:30:00Z'
    },
    // ... plus d'utilisateurs
  ]);

  // Données calculées
  filteredUsers = computed(() => {
    let result = this.users();

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }

    if (this.statusFilter) {
      result = result.filter(user => user.status === this.statusFilter);
    }

    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return result.slice(start, end);
  });

  totalUsers = computed(() => this.users().length);
  totalPages = computed(() => Math.ceil(this.totalUsers() / this.pageSize()));
  currentPageStart = computed(() => (this.currentPage() - 1) * this.pageSize() + 1);
  currentPageEnd = computed(() => Math.min(this.currentPage() * this.pageSize(), this.totalUsers()));
  allSelected = computed(() => 
    this.filteredUsers().length > 0 && 
    this.filteredUsers().every(user => this.selectedUsers().includes(user.id))
  );

  pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages = [];
    
    for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
      pages.push(i);
    }
    
    return pages;
  });

  filterData() {
    this.currentPage.set(1);
  }

  toggleAllSelection() {
    if (this.allSelected()) {
      this.selectedUsers.set([]);
    } else {
      this.selectedUsers.set(this.filteredUsers().map(user => user.id));
    }
  }

  toggleUserSelection(userId: number) {
    const selected = this.selectedUsers();
    if (selected.includes(userId)) {
      this.selectedUsers.set(selected.filter(id => id !== userId));
    } else {
      this.selectedUsers.set([...selected, userId]);
    }
  }

  goToPage(page: number) {
    this.currentPage.set(page);
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
    }
  }

  getStatusClass(status: string): string {
    const classes = {
      'active': 'badge-success',
      'pending': 'badge-warning',
      'suspended': 'badge-error'
    };
    return classes[status as keyof typeof classes] || 'badge-ghost';
  }

  getStatusLabel(status: string): string {
    const labels = {
      'active': 'Actif',
      'pending': 'En attente',
      'suspended': 'Suspendu'
    };
    return labels[status as keyof typeof labels] || status;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR');
  }

  formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Aujourd\'hui';
    if (days === 1) return 'Hier';
    return `Il y a ${days} jours`;
  }

  viewUser(user: any) {
    this.toastService.info('Info', `Affichage de ${user.name}`);
  }

  editUser(user: any) {
    this.toastService.info('Info', `Modification de ${user.name}`);
  }

  suspendUser(user: any) {
    this.toastService.warning('Attention', `${user.name} a été suspendu`);
  }

  activateUser(user: any) {
    this.toastService.success('Succès', `${user.name} a été activé`);
  }

  deleteUser(user: any) {
    this.toastService.error('Suppression', `${user.name} a été supprimé`);
  }

  addNew() {
    this.toastService.info('Info', 'Ajout d\'un nouvel utilisateur');
  }

  exportData() {
    this.toastService.info('Export', 'Export des données en cours...');
  }

  bulkActivate() {
    this.toastService.success('Succès', `${this.selectedUsers().length} utilisateurs activés`);
    this.selectedUsers.set([]);
  }

  bulkSuspend() {
    this.toastService.warning('Attention', `${this.selectedUsers().length} utilisateurs suspendus`);
    this.selectedUsers.set([]);
  }

  bulkDelete() {
    this.toastService.error('Suppression', `${this.selectedUsers().length} utilisateurs supprimés`);
    this.selectedUsers.set([]);
  }
}
```

## Gestion des Thèmes

### Service de Thème Personnalisé

```typescript
// services/theme.service.ts
import { Injectable, signal, effect } from '@angular/core';

export interface CustomTheme {
  name: string;
  label: string;
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  base100: string;
  info: string;
  success: string;
  warning: string;
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = signal<string>('light');
  
  readonly availableThemes = [
    { name: 'light', label: 'Clair', icon: 'light_mode' },
    { name: 'dark', label: 'Sombre', icon: 'dark_mode' },
    { name: 'cupcake', label: 'Cupcake', icon: 'cake' },
    { name: 'bumblebee', label: 'Abeille', icon: 'eco' },
    { name: 'emerald', label: 'Émeraude', icon: 'diamond' },
    { name: 'corporate', label: 'Entreprise', icon: 'business' },
    { name: 'synthwave', label: 'Synthwave', icon: 'graphic_eq' },
    { name: 'retro', label: 'Rétro', icon: 'radio' },
    { name: 'cyberpunk', label: 'Cyberpunk', icon: 'computer' },
    { name: 'valentine', label: 'Saint-Valentin', icon: 'favorite' },
    { name: 'halloween', label: 'Halloween', icon: 'sentiment_very_dissatisfied' },
    { name: 'garden', label: 'Jardin', icon: 'local_florist' },
    { name: 'forest', label: 'Forêt', icon: 'forest' },
    { name: 'aqua', label: 'Aqua', icon: 'water' },
    { name: 'lofi', label: 'Lo-Fi', icon: 'headphones' },
    { name: 'pastel', label: 'Pastel', icon: 'palette' },
    { name: 'fantasy', label: 'Fantaisie', icon: 'auto_awesome' },
    { name: 'wireframe', label: 'Wireframe', icon: 'grid_on' },
    { name: 'black', label: 'Noir', icon: 'contrast' },
    { name: 'luxury', label: 'Luxe', icon: 'diamond' },
    { name: 'dracula', label: 'Dracula', icon: 'nights_stay' }
  ];

  readonly customThemes: CustomTheme[] = [
    {
      name: 'brand',
      label: 'Thème de Marque',
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#F59E0B',
      neutral: '#374151',
      base100: '#FFFFFF',
      info: '#06B6D4',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    }
  ];

  constructor() {
    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('ng-panel-theme');
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    }

    // Appliquer le thème au changement
    effect(() => {
      this.applyTheme(this.currentTheme());
    });
  }

  getCurrentTheme(): string {
    return this.currentTheme();
  }

  setTheme(themeName: string) {
    this.currentTheme.set(themeName);
    localStorage.setItem('ng-panel-theme', themeName);
  }

  private applyTheme(themeName: string) {
    document.documentElement.setAttribute('data-theme', themeName);
    
    // Appliquer un thème personnalisé si nécessaire
    const customTheme = this.customThemes.find(theme => theme.name === themeName);
    if (customTheme) {
      this.applyCustomTheme(customTheme);
    }
  }

  private applyCustomTheme(theme: CustomTheme) {
    const root = document.documentElement;
    root.style.setProperty('--p', this.hexToHsl(theme.primary));
    root.style.setProperty('--s', this.hexToHsl(theme.secondary));
    root.style.setProperty('--a', this.hexToHsl(theme.accent));
    root.style.setProperty('--n', this.hexToHsl(theme.neutral));
    root.style.setProperty('--b1', this.hexToHsl(theme.base100));
    root.style.setProperty('--in', this.hexToHsl(theme.info));
    root.style.setProperty('--su', this.hexToHsl(theme.success));
    root.style.setProperty('--wa', this.hexToHsl(theme.warning));
    root.style.setProperty('--er', this.hexToHsl(theme.error));
  }

  private hexToHsl(hex: string): string {
    // Convertir hex en HSL pour DaisyUI
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  }

  isDarkTheme(): boolean {
    const darkThemes = ['dark', 'synthwave', 'halloween', 'forest', 'black', 'luxury', 'dracula'];
    return darkThemes.includes(this.currentTheme());
  }

  getThemeColors(themeName: string): any {
    // Retourner les couleurs pour un thème donné
    const customTheme = this.customThemes.find(theme => theme.name === themeName);
    if (customTheme) {
      return customTheme;
    }
    
    // Retourner les couleurs par défaut pour les thèmes DaisyUI
    return null;
  }
}
```

### Composant Sélecteur de Thème

```typescript
// components/theme-selector.component.ts
import { Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  template: `
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost">
        <i class="material-icons">palette</i>
        Thème
      </div>
      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80 max-h-96 overflow-y-auto">
        <li class="menu-title">
          <span>Thèmes Disponibles</span>
        </li>
        @for (theme of themeService.availableThemes; track theme.name) {
          <li>
            <a 
              class="flex justify-between"
              [class.active]="themeService.getCurrentTheme() === theme.name"
              (click)="selectTheme(theme.name)">
              <div class="flex items-center space-x-3">
                <i class="material-icons text-sm">{{ theme.icon }}</i>
                <span>{{ theme.label }}</span>
              </div>
              @if (themeService.getCurrentTheme() === theme.name) {
                <i class="material-icons text-sm text-primary">check</i>
              }
            </a>
          </li>
        }
        
        @if (themeService.customThemes.length > 0) {
          <li class="menu-title">
            <span>Thèmes Personnalisés</span>
          </li>
          @for (theme of themeService.customThemes; track theme.name) {
            <li>
              <a 
                class="flex justify-between"
                [class.active]="themeService.getCurrentTheme() === theme.name"
                (click)="selectTheme(theme.name)">
                <div class="flex items-center space-x-3">
                  <div 
                    class="w-4 h-4 rounded-full border"
                    [style.background-color]="theme.primary">
                  </div>
                  <span>{{ theme.label }}</span>
                </div>
                @if (themeService.getCurrentTheme() === theme.name) {
                  <i class="material-icons text-sm text-primary">check</i>
                }
              </a>
            </li>
          }
        }
        
        <div class="divider"></div>
        <li>
          <a (click)="openThemeCustomizer()">
            <i class="material-icons text-sm">tune</i>
            Personnaliser les thèmes
          </a>
        </li>
      </ul>
    </div>
  `
})
export class ThemeSelectorComponent {
  themeService = inject(ThemeService);

  selectTheme(themeName: string) {
    this.themeService.setTheme(themeName);
  }

  openThemeCustomizer() {
    // Ouvrir le personnalisateur de thème
    console.log('Ouvrir le personnalisateur de thème');
  }
}
```

## Services et API

### Service de Données avec Cache

```typescript
// services/data.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ToastService } from '@enokdev/ng-panel';

export interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private toastService = inject(ToastService);

  private readonly baseUrl = '/api';
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly cacheTimeout = 5 * 60 * 1000; // 5 minutes

  // États de chargement
  private loadingStates = new Map<string, BehaviorSubject<boolean>>();

  getUsers(params: QueryParams = {}): Observable<ApiResponse<any[]>> {
    return this.getData<any[]>('users', params);
  }

  getUser(id: number): Observable<any> {
    return this.getData<any>(`users/${id}`);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, userData)
      .pipe(
        tap(() => {
          this.invalidateCache('users');
          this.toastService.success('Succès', 'Utilisateur créé avec succès');
        }),
        catchError(error => {
          this.toastService.error('Erreur', 'Erreur lors de la création de l\'utilisateur');
          throw error;
        })
      );
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/${id}`, userData)
      .pipe(
        tap(() => {
          this.invalidateCache('users');
          this.invalidateCache(`users/${id}`);
          this.toastService.success('Succès', 'Utilisateur modifié avec succès');
        }),
        catchError(error => {
          this.toastService.error('Erreur', 'Erreur lors de la modification de l\'utilisateur');
          throw error;
        })
      );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/${id}`)
      .pipe(
        tap(() => {
          this.invalidateCache('users');
          this.invalidateCache(`users/${id}`);
          this.toastService.success('Succès', 'Utilisateur supprimé avec succès');
        }),
        catchError(error => {
          this.toastService.error('Erreur', 'Erreur lors de la suppression de l\'utilisateur');
          throw error;
        })
      );
  }

  private getData<T>(endpoint: string, params: QueryParams = {}): Observable<T> {
    const cacheKey = this.buildCacheKey(endpoint, params);
    
    // Vérifier le cache
    const cached = this.getFromCache<T>(cacheKey);
    if (cached) {
      return of(cached);
    }

    // Gérer l'état de chargement
    this.setLoading(endpoint, true);

    const queryString = this.buildQueryString(params);
    const url = `${this.baseUrl}/${endpoint}${queryString}`;

    return this.http.get<T>(url)
      .pipe(
        tap(data => {
          this.setCache(cacheKey, data);
          this.setLoading(endpoint, false);
        }),
        catchError(error => {
          this.setLoading(endpoint, false);
          this.toastService.error('Erreur', 'Erreur lors du chargement des données');
          throw error;
        })
      );
  }

  private buildCacheKey(endpoint: string, params: QueryParams): string {
    return `${endpoint}_${JSON.stringify(params)}`;
  }

  private buildQueryString(params: QueryParams): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          searchParams.append(key, JSON.stringify(value));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  private invalidateCache(pattern: string): void {
    const keysToDelete = Array.from(this.cache.keys())
      .filter(key => key.includes(pattern));
    
    keysToDelete.forEach(key => this.cache.delete(key));
  }

  private setLoading(endpoint: string, loading: boolean): void {
    if (!this.loadingStates.has(endpoint)) {
      this.loadingStates.set(endpoint, new BehaviorSubject<boolean>(false));
    }
    this.loadingStates.get(endpoint)!.next(loading);
  }

  isLoading(endpoint: string): Observable<boolean> {
    if (!this.loadingStates.has(endpoint)) {
      this.loadingStates.set(endpoint, new BehaviorSubject<boolean>(false));
    }
    return this.loadingStates.get(endpoint)!.asObservable();
  }

  clearCache(): void {
    this.cache.clear();
  }
}
```

### Intercepteur pour l'Authentification

```typescript
// interceptors/auth.interceptor.ts
import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '@enokdev/ng-panel';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private toastService = inject(ToastService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ajouter le token d'authentification
    const token = localStorage.getItem('auth_token');
    let authReq = req;

    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expiré ou invalide
          this.handleUnauthorized();
        } else if (error.status === 403) {
          // Accès interdit
          this.toastService.error('Erreur', 'Accès interdit');
        } else if (error.status >= 500) {
          // Erreur serveur
          this.toastService.error('Erreur', 'Erreur serveur. Veuillez réessayer plus tard.');
        }

        return throwError(() => error);
      })
    );
  }

  private handleUnauthorized(): void {
    localStorage.removeItem('auth_token');
    this.toastService.warning('Session expirée', 'Veuillez vous reconnecter');
    this.router.navigate(['/login']);
  }
}
```

Cette documentation fournit des exemples complets et détaillés pour utiliser ng-panel dans divers contextes. Chaque exemple peut être adapté selon vos besoins spécifiques.