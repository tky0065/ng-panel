# @enokdev/ng-panel

Une bibliothèque moderne et dynamique de panneau d'administration pour les applications Angular avec DaisyUI et TailwindCSS.

![ng-panel demo](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=ng-panel+Demo)

## ✨ Fonctionnalités Principales

- 🎨 **Interface moderne** avec TailwindCSS et DaisyUI
- 🔧 **Composants dynamiques** (tableaux, formulaires, statistiques)
- 🌙 **Support multi-thèmes** avec 32+ thèmes DaisyUI
- 📱 **Design responsive** pour tous les appareils
- 🚀 **Composants standalone** Angular 17+
- 📊 **Gestion d'état** avec Angular Signals
- 🎯 **TypeScript** support complet
- 🔌 **Architecture modulaire** et extensible
- 🌐 **Navigation hiérarchique** avec menus dépliables
- 🔔 **Système de notifications** intégré

## 🚀 Démarrage Rapide

### Installation

```bash
# Installer le package principal
npm install @enokdev/ng-panel

# Installer les dépendances peer requises
npm install @angular/common @angular/core @angular/forms @angular/router

# Installer TailwindCSS et DaisyUI
npm install tailwindcss@^4.1.0 @tailwindcss/postcss daisyui autoprefixer postcss
```

### Configuration Rapide

1. **Configurer TailwindCSS** (tailwind.config.js) :
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@enokdev/ng-panel/**/*.{html,ts,js,mjs}"
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: true // Active tous les thèmes DaisyUI
  }
}
```

2. **Configurer PostCSS** (postcss.config.js) :
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  }
}
```

3. **Importer les styles** (styles.css) :
```css
@import "tailwindcss";
```

2. **Configurer les styles** (src/styles.css) :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import des icônes Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
```

3. **Configuration PostCSS** (postcss.config.js) :
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

### Première Application

**app.component.ts** - Configuration de base :
```typescript
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
    // Configuration du panel
    this.panelService.setConfig({
      title: 'Mon Admin Panel',
      logo: 'https://via.placeholder.com/60x60/4F46E5/FFFFFF?text=AP',
      profileConfig: {
        avatar: 'https://via.placeholder.com/40x40/10B981/FFFFFF?text=U',
        username: 'Administrateur',
        actions: [
          {
            label: 'Mon Profil',
            icon: 'person',
            route: '/profile'
          },
          {
            label: 'Déconnexion',
            icon: 'logout',
            action: () => console.log('Déconnexion')
          }
        ]
      },
      menu: [
        {
          label: 'Tableau de Bord',
          icon: 'dashboard',
          route: '/dashboard'
        },
        {
          label: 'Gestion',
          icon: 'settings',
          children: [
            {
              label: 'Utilisateurs',
              icon: 'people',
              route: '/users'
            },
            {
              label: 'Produits',
              icon: 'inventory',
              route: '/products'
            }
          ]
        }
      ]
    });

    // Enregistrement des modèles de données
    this.registerModels();
  }

  private registerModels() {
    this.panelService.registerModel('user', {
      name: 'user',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          label: 'Prénom',
          required: true
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Nom',
          required: true
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          required: true
        },
        {
          name: 'role',
          type: 'select',
          label: 'Rôle',
          options: [
            { label: 'Administrateur', value: 'admin' },
            { label: 'Utilisateur', value: 'user' }
          ]
        }
      ],
      actions: [
        {
          name: 'edit',
          label: 'Modifier',
          type: 'primary',
          icon: 'edit'
        },
        {
          name: 'delete',
          label: 'Supprimer',
          type: 'danger',
          icon: 'delete'
        }
      ],
      list: {
        pageSize: 10,
        sortable: true
      }
    });
  }
}
```

**app.routes.ts** - Configuration du routing :
```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./features/users/users.component')
      .then(m => m.UsersComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component')
      .then(m => m.ProductsComponent)
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];
```

## 📖 Documentation Complète

- **[Guide de Démarrage](../../GETTING_STARTED.md)** - Configuration détaillée étape par étape
- **[Exemples Complets](../../EXAMPLES.md)** - Cas d'usage avancés et patterns
- **[Guide de Dépannage](../../TROUBLESHOOTING.md)** - Solutions aux problèmes courants

## 🧩 Composants Disponibles

### 1. Dynamic Table - Tableaux Dynamiques
Créez des tableaux interactifs avec tri, pagination et actions personnalisées.

```typescript
<lib-dynamic-table
  modelName="user"
  [data]="users"
/>
```

**Fonctionnalités :**
- ✅ Tri par colonnes
- ✅ Pagination automatique
- ✅ Actions sur les lignes
- ✅ Sélection multiple
- ✅ Filtrage intégré

### 2. Dynamic Form - Formulaires Dynamiques
Générez des formulaires avec validation à partir de modèles de données.

```typescript
<lib-dynamic-form
  modelName="user"
  [initialData]="userData"
  (onSubmit)="handleSubmit($event)"
  (onCancel)="handleCancel()"
/>
```

**Types de champs supportés :**
- `text`, `email`, `password`
- `number`, `date`, `datetime-local`
- `select`, `multiselect`
- `boolean` (checkbox/toggle)
- `textarea`
- `file` (upload)

### 3. Dynamic Stats - Cartes de Statistiques
Affichez vos métriques avec des cartes visuelles attrayantes.

```typescript
<lib-dynamic-stats [data]="statistiques"/>
```

```typescript
statistiques: StatItem[] = [
  {
    title: 'Utilisateurs Totaux',
    value: 1247,
    color: 'bg-blue-500',
    icon: 'people'
  },
  {
    title: 'Revenus du Mois',
    value: '€48,250',
    color: 'bg-green-500',
    icon: 'attach_money'
  }
];
```

### 4. Toast Notifications - Système de Notifications
Notifications élégantes et non-intrusives.

```typescript
import { ToastService } from '@enokdev/ng-panel';

constructor(private toastService: ToastService) {}

showNotifications() {
  this.toastService.success('Succès!', 'Opération réussie');
  this.toastService.error('Erreur!', 'Quelque chose s\'est mal passé');
  this.toastService.warning('Attention!', 'Vérifiez vos données');
  this.toastService.info('Info', 'Nouvelle information disponible');
}
```

## 📋 Exemple Complet : Gestion d'Utilisateurs

**users.component.ts** :
```typescript
import { Component, inject, signal } from '@angular/core';
import { DynamicTableComponent, DynamicFormComponent, ToastService } from '@enokdev/ng-panel';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DynamicTableComponent, DynamicFormComponent],
  template: `
    <div class="p-6 space-y-6">
      <!-- En-tête avec actions -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold">Gestion des Utilisateurs</h1>
          <p class="text-base-content/70">Gérez les comptes utilisateurs</p>
        </div>
        <div class="space-x-3">
          @if (!showForm()) {
            <button class="btn btn-outline" (click)="exportUsers()">
              <i class="material-icons text-sm">download</i>
              Exporter
            </button>
            <button class="btn btn-primary" (click)="toggleForm()">
              <i class="material-icons text-sm">add</i>
              Nouvel Utilisateur
            </button>
          }
        </div>
      </div>

      <!-- Statistiques rapides -->
      @if (!showForm()) {
        <div class="stats stats-horizontal shadow w-full">
          <div class="stat">
            <div class="stat-figure text-primary">
              <i class="material-icons text-2xl">people</i>
            </div>
            <div class="stat-title">Total</div>
            <div class="stat-value text-primary">{{ users().length }}</div>
          </div>
          <div class="stat">
            <div class="stat-figure text-success">
              <i class="material-icons text-2xl">verified</i>
            </div>
            <div class="stat-title">Actifs</div>
            <div class="stat-value text-success">{{ activeUsers() }}</div>
          </div>
        </div>
      }

      <!-- Formulaire ou tableau -->
      @if (showForm()) {
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">
              {{ selectedUser() ? 'Modifier' : 'Créer' }} un utilisateur
            </h2>
            <lib-dynamic-form
              modelName="user"
              [initialData]="selectedUser()"
              (onSubmit)="handleSubmit($event)"
              (onCancel)="toggleForm()"
            />
          </div>
        </div>
      } @else {
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <lib-dynamic-table
              modelName="user"
              [data]="users()"
            />
          </div>
        </div>
      }
    </div>
  `
})
export class UsersComponent {
  private toastService = inject(ToastService);

  showForm = signal(false);
  selectedUser = signal<any>(null);
  
  users = signal([
    { 
      id: 1, 
      firstName: 'Jean', 
      lastName: 'Dupont', 
      email: 'jean.dupont@example.com', 
      role: 'admin',
      active: true
    },
    { 
      id: 2, 
      firstName: 'Marie', 
      lastName: 'Martin', 
      email: 'marie.martin@example.com', 
      role: 'user',
      active: true
    }
  ]);

  activeUsers = computed(() => 
    this.users().filter(user => user.active).length
  );

  toggleForm() {
    this.showForm.update(v => !v);
    if (!this.showForm()) {
      this.selectedUser.set(null);
    }
  }

  handleSubmit(userData: any) {
    if (this.selectedUser()) {
      // Modifier utilisateur existant
      const users = this.users().map(user => 
        user.id === this.selectedUser().id 
          ? { ...user, ...userData }
          : user
      );
      this.users.set(users);
      this.toastService.success('Succès', 'Utilisateur modifié');
    } else {
      // Créer nouvel utilisateur
      const newUser = {
        id: Math.max(...this.users().map(u => u.id)) + 1,
        ...userData
      };
      this.users.update(users => [...users, newUser]);
      this.toastService.success('Succès', 'Utilisateur créé');
    }
    this.toggleForm();
  }

  exportUsers() {
    this.toastService.info('Export', 'Export en cours...');
    // Logique d'export
  }
}
```

## Available Components

1. **Dynamic Table**:
```typescript
<lib-dynamic-table
  modelName="user"
  [data]="users"
/>
```

2. **Dynamic Form**:
```typescript
<lib-dynamic-form
  modelName="user"
  [initialData]="userData"
  (onSubmit)="handleSubmit($event)"
  (onCancel)="handleCancel()"
/>
```

3. **Dynamic Stats**:
```typescript
<lib-dynamic-stats
  [data]="statsData"
/>
```

4. **Toast Notifications**:
```typescript
// Inject ToastService and use it
constructor(private toastService: ToastService) {}

showSuccess() {
  this.toastService.success('Success!', 'Operation completed successfully');
}

showError() {
  this.toastService.error('Error!', 'Something went wrong');
}
```

## 🎨 Gestion des Thèmes

ng-panel supporte 32+ thèmes DaisyUI prêts à l'emploi :

**Thèmes populaires :**
- `light` / `dark` - Thèmes classiques
- `cupcake` - Rose et doux
- `corporate` - Professionnel et sobre
- `synthwave` - Cyberpunk néon
- `retro` - Vintage coloré
- `cyberpunk` - Futuriste
- Et bien d'autres...

**Configuration des thèmes :**
```javascript
// tailwind.config.js
daisyui: {
  themes: [
    "light",
    "dark", 
    "cupcake",
    "corporate",
    "synthwave",
    // ... ou true pour tous les thèmes
  ]
}
```

**Changement de thème programmatique :**
```typescript
// Changer le thème
document.documentElement.setAttribute('data-theme', 'dark');

// Ou avec un service personnalisé
@Injectable()
export class ThemeService {
  setTheme(themeName: string) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
  }
}
```

**Sélecteur de thème dans l'interface :**
```typescript
@Component({
  template: `
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost">
        <i class="material-icons">palette</i>
        Thème
      </label>
      <ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
        @for (theme of themes; track theme) {
          <li>
            <a (click)="setTheme(theme.value)">{{ theme.label }}</a>
          </li>
        }
      </ul>
    </div>
  `
})
export class ThemeSelectorComponent {
  themes = [
    { value: 'light', label: 'Clair' },
    { value: 'dark', label: 'Sombre' },
    { value: 'cupcake', label: 'Cupcake' }
  ];

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
```

## 🔧 Configuration Avancée

### Modèles de Données Complexes

```typescript
this.panelService.registerModel('product', {
  name: 'product',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom du produit',
      required: true,
      validators: [Validators.minLength(3)]
    },
    {
      name: 'category',
      type: 'select',
      label: 'Catégorie',
      required: true,
      options: [
        { label: 'Électronique', value: 'electronics' },
        { label: 'Vêtements', value: 'clothing' },
        { label: 'Livres', value: 'books' }
      ]
    },
    {
      name: 'price',
      type: 'number',
      label: 'Prix (€)',
      required: true,
      min: 0,
      step: 0.01
    },
    {
      name: 'inStock',
      type: 'boolean',
      label: 'En stock'
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      rows: 4
    },
    {
      name: 'images',
      type: 'file',
      label: 'Images',
      multiple: true,
      accept: 'image/*'
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
      name: 'delete',
      label: 'Supprimer',
      type: 'danger',
      icon: 'delete',
      confirmMessage: 'Êtes-vous sûr ?',
      handler: (item) => this.deleteProduct(item)
    }
  ],
  list: {
    pageSize: 25,
    sortable: true,
    defaultSort: { field: 'name', direction: 'asc' },
    filters: [
      {
        name: 'category',
        type: 'select',
        label: 'Catégorie',
        options: [
          { label: 'Électronique', value: 'electronics' },
          { label: 'Vêtements', value: 'clothing' }
        ]
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
        fields: ['name', 'category', 'description']
      },
      {
        title: 'Prix et stock',
        fields: ['price', 'inStock']
      },
      {
        title: 'Médias',
        fields: ['images']
      }
    ]
  }
});
```

### Menu Hiérarchique Avancé

```typescript
menu: [
  {
    label: 'Tableau de Bord',
    icon: 'dashboard',
    route: '/dashboard',
    badge: '3' // Badge de notification
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
      }
    ]
  },
  {
    label: 'Clients',
    icon: 'people',
    children: [
      {
        label: 'Tous les clients',
        icon: 'people_outline',
        route: '/customers'
      },
      {
        label: 'Groupes',
        icon: 'group',
        route: '/customer-groups'
      }
    ]
  },
  { type: 'divider', label: 'Administration' }, // Séparateur
  {
    label: 'Paramètres',
    icon: 'settings',
    route: '/settings'
  }
]
```

### Validation Personnalisée

```typescript
import { AbstractControl, ValidatorFn } from '@angular/forms';

// Validateur personnalisé
export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const email = control.value;
    if (email && !email.endsWith('@company.com')) {
      return { 'customEmail': { value: control.value } };
    }
    return null;
  };
}

// Utilisation dans le modèle
{
  name: 'email',
  type: 'email',
  label: 'Email professionnel',
  required: true,
  validators: [Validators.email, customEmailValidator()]
}
```

## 📚 API Reference

### Interfaces Principales

#### PanelConfig
Configuration globale du panel d'administration.

```typescript
interface PanelConfig {
  title: string;                    // Titre affiché dans l'en-tête
  logo?: string;                    // URL du logo
  theme?: ThemeConfig;              // Configuration de thème personnalisé
  menu: MenuItem[];                 // Structure du menu de navigation
  profileConfig?: ProfileConfig;    // Configuration du profil utilisateur
}

interface MenuItem {
  label: string;                    // Libellé du menu
  icon?: string;                    // Icône Material Icons
  route?: string;                   // Route de navigation
  children?: MenuItem[];            // Sous-menus
  badge?: string;                   // Badge de notification
  type?: 'divider';                 // Type spécial pour séparateur
}

interface ProfileConfig {
  avatar?: string;                  // URL de l'avatar
  username?: string;                // Nom d'utilisateur
  actions: ProfileAction[];         // Actions du menu profil
}

interface ProfileAction {
  label: string;                    // Libellé de l'action
  icon?: string;                    // Icône Material Icons
  route?: string;                   // Route de navigation
  action?: () => void;              // Fonction à exécuter
  type?: 'divider';                 // Type spécial pour séparateur
}
```

#### ModelConfig
Configuration des modèles de données pour les formulaires et tableaux.

```typescript
interface ModelConfig {
  name: string;                     // Nom unique du modèle
  fields: FieldConfig[];            // Définition des champs
  actions?: ActionConfig[];         // Actions disponibles (modifier, supprimer, etc.)
  list?: ListConfig;                // Configuration d'affichage en liste
  form?: FormConfig;                // Configuration du formulaire
}

interface FieldConfig {
  name: string;                     // Nom du champ (propriété de l'objet)
  type: FieldType;                  // Type de champ
  label: string;                    // Libellé affiché
  required?: boolean;               // Champ obligatoire
  placeholder?: string;             // Texte d'aide
  options?: SelectOption[];         // Options pour select/multiselect
  validators?: ValidatorFn[];       // Validateurs Angular
  min?: number;                     // Valeur minimale (number)
  max?: number;                     // Valeur maximale (number)
  step?: number;                    // Pas d'incrémentation (number)
  rows?: number;                    // Nombre de lignes (textarea)
  multiple?: boolean;               // Sélection multiple (file, select)
  accept?: string;                  // Types de fichiers acceptés (file)
  maxFiles?: number;                // Nombre maximum de fichiers (file)
  dependsOn?: string;               // Champ conditionnel dépendant
}

type FieldType = 
  | 'text' | 'email' | 'password' | 'number' 
  | 'date' | 'datetime-local' | 'time'
  | 'boolean' | 'select' | 'multiselect'
  | 'textarea' | 'file' | 'group';

interface SelectOption {
  label: string;                    // Libellé affiché
  value: any;                       // Valeur de l'option
}

interface ActionConfig {
  name: string;                     // Nom unique de l'action
  label: string;                    // Libellé affiché
  type: 'primary' | 'secondary' | 'danger' | 'warning';
  icon?: string;                    // Icône Material Icons
  handler?: (item: any) => void;    // Fonction à exécuter
  condition?: (item: any) => boolean; // Condition d'affichage
  confirmMessage?: string;          // Message de confirmation
}

interface ListConfig {
  pageSize?: number;                // Taille de page (défaut: 10)
  sortable?: boolean;               // Tri activé (défaut: true)
  defaultSort?: {                   // Tri par défaut
    field: string;
    direction: 'asc' | 'desc';
  };
  columns?: ColumnConfig[];         // Configuration des colonnes
  filters?: FieldConfig[];          // Filtres disponibles
}

interface ColumnConfig {
  name: string;                     // Nom du champ
  label: string;                    // Libellé de la colonne
  sortable?: boolean;               // Colonne triable
  type?: 'text' | 'number' | 'date' | 'currency' | 'badge';
  width?: string;                   // Largeur CSS
}

interface FormConfig {
  layout?: 'horizontal' | 'vertical'; // Disposition du formulaire
  submitLabel?: string;             // Libellé du bouton de soumission
  cancelLabel?: string;             // Libellé du bouton d'annulation
  sections?: FormSection[];         // Sections du formulaire
}

interface FormSection {
  title: string;                    // Titre de la section
  fields: string[];                 // Champs de la section
  collapsible?: boolean;            // Section pliable
  collapsed?: boolean;              // État initial (plié)
}
```

#### StatItem
Configuration des cartes de statistiques.

```typescript
interface StatItem {
  title: string;                    // Titre de la statistique
  value: string | number;           // Valeur à afficher
  color: string;                    // Couleur de fond (classe CSS)
  icon?: string;                    // Icône Material Icons
  change?: {                        // Évolution (optionnel)
    value: number;
    type: 'increase' | 'decrease';
  };
  subtitle?: string;                // Sous-titre (optionnel)
}
```

### Services Principaux

#### PanelService
Service principal pour la configuration du panel.

```typescript
class PanelService {
  // Configuration globale
  setConfig(config: PanelConfig): void
  config(): Signal<PanelConfig>

  // Gestion des modèles
  registerModel(name: string, config: ModelConfig): void
  getModel(name: string): ModelConfig | undefined
  models(): Signal<Map<string, ModelConfig>>
}
```

#### ToastService
Service de gestion des notifications.

```typescript
class ToastService {
  success(title: string, message?: string, duration?: number): void
  error(title: string, message?: string, duration?: number): void
  warning(title: string, message?: string, duration?: number): void
  info(title: string, message?: string, duration?: number): void
  
  // Notification personnalisée
  show(notification: ToastNotification): void
}

interface ToastNotification {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;        // Durée en millisecondes (défaut: 5000)
  persistent?: boolean;     // Ne se ferme pas automatiquement
}
```

## ⚡ Optimisation et Bonnes Pratiques

### Performance

#### Lazy Loading
```typescript
// Routes avec lazy loading
const routes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./users/users.component')
      .then(m => m.UsersComponent)
  }
];
```

#### Change Detection
```typescript
// Utiliser OnPush pour de meilleures performances
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent { }
```

#### Signals vs Observables
```typescript
// ✅ Préférer les signals pour l'état local
users = signal<User[]>([]);
filteredUsers = computed(() => 
  this.users().filter(user => user.active)
);

// ✅ Observables pour les opérations asynchrones
data$ = this.http.get('/api/data');
```

### Architecture Recommandée

```
src/
├── app/
│   ├── core/                    # Services globaux, guards, interceptors
│   │   ├── auth/
│   │   ├── guards/
│   │   └── interceptors/
│   ├── shared/                  # Composants, pipes, directives partagés
│   │   ├── components/
│   │   ├── pipes/
│   │   └── models/
│   ├── features/                # Modules métier
│   │   ├── dashboard/
│   │   ├── users/
│   │   └── products/
│   └── layout/                  # Configuration du layout
└── assets/                      # Ressources statiques
```

### Gestion d'État

```typescript
// Service de gestion d'état avec signals
@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private usersSignal = signal<User[]>([]);
  private loadingSignal = signal(false);

  readonly users = this.usersSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();

  async loadUsers() {
    this.loadingSignal.set(true);
    try {
      const users = await this.userService.getUsers();
      this.usersSignal.set(users);
    } finally {
      this.loadingSignal.set(false);
    }
  }

  addUser(user: User) {
    this.usersSignal.update(users => [...users, user]);
  }

  updateUser(id: number, updates: Partial<User>) {
    this.usersSignal.update(users =>
      users.map(user => 
        user.id === id ? { ...user, ...updates } : user
      )
    );
  }
}
```

## 🎯 Migration et Mise à Jour

### Depuis ng-panel v0.x vers v1.x

1. **Mise à jour des imports :**
```typescript
// Avant
import { PanelModule } from '@enokdev/ng-panel';

// Après
import { PanelLayoutComponent, PanelService } from '@enokdev/ng-panel';
```

2. **Migration vers les composants standalone :**
```typescript
// Avant (NgModule)
@NgModule({
  imports: [PanelModule],
  declarations: [AppComponent]
})

// Après (Standalone)
@Component({
  standalone: true,
  imports: [PanelLayoutComponent]
})
```

3. **Migration vers les signals :**
```typescript
// Avant
users$ = new BehaviorSubject<User[]>([]);

// Après
users = signal<User[]>([]);
```

### Compatibilité des Versions

| ng-panel | Angular | Node.js | TailwindCSS | DaisyUI |
|----------|---------|---------|-------------|---------|
| 1.x      | 19.x    | 18.x    | 3.x         | 4.x     |
| 2.x      | 20.x    | 20.x    | 4.1+        | 4.x     |
| 2.1+     | 21.x    | 22.x    | 4.1+        | 4.x     |

## 🛠️ Développement et Contribution

### Configuration de l'Environnement de Développement

```bash
# Cloner le repository
git clone https://github.com/tky0065/ng-panel.git
cd ng-panel

# Installer les dépendances
npm install

# Lancer le build en mode watch
npm run build:lib:watch

# Lancer l'application de test
npm run serve:test-app
```

### Structure du Projet

```
ng-panel/
├── projects/
│   ├── ng-panel/              # Bibliothèque principale
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── models/
│   │   │   └── public-api.ts
│   │   └── README.md
│   └── test-app/              # Application de test
└── docs/                      # Documentation
```

### Guidelines de Contribution

1. **Fork** le repository
2. **Créez une branche** pour votre fonctionnalité : `git checkout -b feature/amazing-feature`
3. **Committez** vos changements : `git commit -m 'feat: add amazing feature'`
4. **Pushez** vers la branche : `git push origin feature/amazing-feature`
5. **Ouvrez une Pull Request**

### Convention de Commit

Suivez la convention [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Mise à jour de la documentation
- `style:` Changements de formatage
- `refactor:` Refactoring du code
- `test:` Ajout ou modification de tests
- `chore:` Tâches de maintenance

## 🌟 Features

## 🌟 Fonctionnalités Complètes

- ✅ **Design Responsive** avec TailwindCSS
- ✅ **32+ Thèmes DaisyUI** prêts à l'emploi
- ✅ **Génération Dynamique** de formulaires avec validation
- ✅ **Tableaux Dynamiques** avec tri, pagination et actions
- ✅ **Notifications Toast** élégantes et configurables
- ✅ **Gestion de Profil** utilisateur intégrée
- ✅ **Menu Hiérarchique** avec sous-menus et badges
- ✅ **Gestion d'Erreurs** gracieuse et user-friendly
- ✅ **Support TypeScript** complet avec types stricts
- ✅ **Composants Standalone** Angular 17+
- ✅ **Signals** pour une gestion d'état moderne
- ✅ **Lazy Loading** pour des performances optimales
- ✅ **Accessibilité** (ARIA, navigation clavier)
- ✅ **Internationalisation** prête
- ✅ **Dark/Light Mode** automatique
- ✅ **Progressive Web App** ready

## 🌐 Compatibilité Navigateurs

- ✅ **Chrome** (dernière version)
- ✅ **Firefox** (dernière version)  
- ✅ **Safari** (dernière version)
- ✅ **Edge** (dernière version)
- ✅ **Mobile Safari** (iOS 12+)
- ✅ **Chrome Mobile** (Android 8+)

## 📋 Roadmap

### Version 1.1 (En cours)
- [ ] Composant de graphiques intégré
- [ ] Drag & Drop pour les listes
- [ ] Export Excel/CSV natif
- [ ] Templates de pages pré-construits

### Version 1.2 (À venir)
- [ ] Mode offline avec synchronisation
- [ ] Composants de calendrier/planning
- [ ] Système de permissions granulaire
- [ ] Widget dashboard configurables

### Version 2.0 (Future)
- [ ] Support Angular 21+
- [ ] SSR/SSG optimizations
- [ ] Micro-frontends support
- [ ] Advanced analytics dashboard

## 🤝 Contribution

Nous accueillons toutes les contributions ! Consultez notre [Guide de Contribution](../../CONTRIBUTING.md) pour plus de détails.

### Contributors

<a href="https://github.com/tky0065/ng-panel/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=tky0065/ng-panel" />
</a>

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](../../LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Angular Team](https://angular.io) pour le framework extraordinaire
- [DaisyUI](https://daisyui.com) pour les composants UI magnifiques  
- [TailwindCSS](https://tailwindcss.com) pour le système de design flexible
- [Material Icons](https://fonts.google.com/icons) pour les icônes

## 📞 Support et Communauté

- 📖 **Documentation** : [Documentation complète](../../README.md)
- 🐛 **Issues** : [GitHub Issues](https://github.com/tky0065/ng-panel/issues)
- 💬 **Discussions** : [GitHub Discussions](https://github.com/tky0065/ng-panel/discussions)
- 📧 **Email** : support@enokdev.com
- 🌐 **Site Web** : [enokdev.com](https://enokdev.com)

---

<div align="center">

**Fait avec ❤️ par [EnokDev](https://enokdev.com)**

Si ce projet vous aide, n'hésitez pas à lui donner une ⭐ !

</div>