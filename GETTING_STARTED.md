# Guide de Démarrage - ng-panel

Ce guide vous accompagne pas à pas pour créer votre première application avec ng-panel.

## Table des Matières

1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Configuration du Projet](#configuration-du-projet)
4. [Première Application](#première-application)
5. [Configuration du Panel](#configuration-du-panel)
6. [Création des Composants](#création-des-composants)
7. [Configuration des Modèles](#configuration-des-modèles)
8. [Routing et Navigation](#routing-et-navigation)
9. [Prochaines Étapes](#prochaines-étapes)

## Prérequis

- Node.js 18+ 
- Angular CLI 17+
- Connaissances de base d'Angular

## Installation

### 1. Créer un nouveau projet Angular

```bash
# Créer un nouveau projet Angular
ng new mon-admin-panel
cd mon-admin-panel

# Installer Angular CLI si nécessaire
npm install -g @angular/cli
```

### 2. Installer ng-panel et ses dépendances

```bash
# Installer le package principal
npm install @enokdev/ng-panel

# Installer les dépendances peer
npm install @angular/common @angular/core @angular/forms @angular/router

# Installer TailwindCSS et DaisyUI
npm install tailwindcss daisyui
npm install @tailwindcss/forms @tailwindcss/typography
npm install autoprefixer postcss
```

## Configuration du Projet

### 1. Initialiser TailwindCSS

```bash
npx tailwindcss init -p
```

### 2. Configurer tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@enokdev/ng-panel/**/*.{html,ts,js,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography")
  ],
  daisyui: {
    themes: [
      "light",
      "dark", 
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter"
    ]
  }
}
```

### 3. Configurer les styles globaux (src/styles.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import Google Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* Import ng-panel styles (optionnel) */
/* @import '@enokdev/ng-panel/styles/styles.css'; */

/* Styles personnalisés pour votre application */
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}

html, body {
  height: 100%;
  margin: 0;
}
```

### 4. Configurer postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

## Première Application

### 1. Modifier app.component.ts

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
    this.configurerPanel();
    this.enregistrerModeles();
  }

  private configurerPanel() {
    this.panelService.setConfig({
      title: 'Mon Admin Panel',
      logo: 'https://via.placeholder.com/60x60/4F46E5/FFFFFF?text=MA',
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
            label: 'Paramètres',
            icon: 'settings',
            route: '/settings'
          },
          {
            label: 'Déconnexion',
            icon: 'logout',
            action: () => {
              console.log('Déconnexion...');
              // Ajoutez ici votre logique de déconnexion
            }
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
            },
            {
              label: 'Commandes',
              icon: 'shopping_cart',
              route: '/orders'
            }
          ]
        },
        {
          label: 'Rapports',
          icon: 'analytics',
          children: [
            {
              label: 'Ventes',
              icon: 'trending_up',
              route: '/reports/sales'
            },
            {
              label: 'Utilisateurs',
              icon: 'people_outline',
              route: '/reports/users'
            }
          ]
        }
      ]
    });
  }

  private enregistrerModeles() {
    // Configuration du modèle utilisateur
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
          required: true,
          options: [
            { label: 'Administrateur', value: 'admin' },
            { label: 'Utilisateur', value: 'user' },
            { label: 'Modérateur', value: 'moderator' }
          ]
        },
        {
          name: 'active',
          type: 'boolean',
          label: 'Actif',
          required: false
        }
      ],
      actions: [
        {
          name: 'edit',
          label: 'Modifier',
          type: 'primary',
          icon: 'edit',
          handler: (item) => console.log('Modifier:', item)
        },
        {
          name: 'delete',
          label: 'Supprimer',
          type: 'danger',
          icon: 'delete',
          handler: (item) => console.log('Supprimer:', item)
        }
      ],
      list: {
        pageSize: 10,
        sortable: true
      },
      form: {
        submitLabel: 'Enregistrer',
        cancelLabel: 'Annuler'
      }
    });

    // Configuration du modèle produit
    this.panelService.registerModel('product', {
      name: 'product',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nom du produit',
          required: true
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          required: false
        },
        {
          name: 'price',
          type: 'number',
          label: 'Prix',
          required: true
        },
        {
          name: 'category',
          type: 'select',
          label: 'Catégorie',
          required: true,
          options: [
            { label: 'Électronique', value: 'electronics' },
            { label: 'Vêtements', value: 'clothing' },
            { label: 'Livres', value: 'books' },
            { label: 'Maison', value: 'home' }
          ]
        },
        {
          name: 'inStock',
          type: 'boolean',
          label: 'En stock',
          required: false
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
          name: 'duplicate',
          label: 'Dupliquer',
          type: 'secondary',
          icon: 'content_copy'
        },
        {
          name: 'delete',
          label: 'Supprimer',
          type: 'danger',
          icon: 'delete'
        }
      ],
      list: {
        pageSize: 15,
        sortable: true
      }
    });
  }
}
```

### 2. Créer les routes (src/app/app.routes.ts)

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
    path: 'orders',
    loadComponent: () => import('./features/orders/orders.component')
      .then(m => m.OrdersComponent)
  },
  {
    path: 'reports/sales',
    loadComponent: () => import('./features/reports/sales/sales.component')
      .then(m => m.SalesComponent)
  },
  {
    path: 'reports/users',
    loadComponent: () => import('./features/reports/users/users-report.component')
      .then(m => m.UsersReportComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component')
      .then(m => m.ProfileComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings.component')
      .then(m => m.SettingsComponent)
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
```

## Configuration du Panel

### Structure des dossiers recommandée

```
src/
├── app/
│   ├── features/           # Composants de fonctionnalités
│   │   ├── dashboard/
│   │   ├── users/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── reports/
│   │   ├── profile/
│   │   └── settings/
│   ├── shared/            # Composants partagés
│   │   ├── components/
│   │   ├── services/
│   │   └── models/
│   ├── core/             # Services core et configuration
│   │   ├── auth/
│   │   └── config/
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
└── assets/               # Ressources statiques
    ├── images/
    └── icons/
```

## Création des Composants

### 1. Créer le composant Dashboard

```bash
mkdir -p src/app/features/dashboard
```

**src/app/features/dashboard/dashboard.component.ts**

```typescript
import { Component, inject } from '@angular/core';
import { DynamicStatsComponent, StatItem, ToastService } from '@enokdev/ng-panel';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DynamicStatsComponent],
  template: `
    <div class="p-6 space-y-6">
      <!-- En-tête -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-base-content">Tableau de Bord</h1>
          <p class="text-base-content/70 mt-1">Aperçu de votre activité</p>
        </div>
        <button 
          class="btn btn-primary"
          (click)="rafraichirDonnees()">
          <i class="material-icons text-sm">refresh</i>
          Actualiser
        </button>
      </div>

      <!-- Statistiques -->
      <lib-dynamic-stats [data]="statistiques"/>

      <!-- Graphiques et données additionnelles -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Activité récente -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Activité Récente</h2>
            <div class="space-y-3">
              @for (activite of activitesRecentes; track activite.id) {
                <div class="flex items-center space-x-3 p-3 bg-base-200 rounded-lg">
                  <div class="avatar placeholder">
                    <div class="bg-primary text-primary-content rounded-full w-8">
                      <i class="material-icons text-sm">{{ activite.icon }}</i>
                    </div>
                  </div>
                  <div class="flex-1">
                    <p class="font-medium">{{ activite.titre }}</p>
                    <p class="text-sm text-base-content/70">{{ activite.description }}</p>
                  </div>
                  <span class="text-xs text-base-content/50">{{ activite.temps }}</span>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Tâches à faire -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Tâches à Faire</h2>
            <div class="space-y-2">
              @for (tache of taches; track tache.id) {
                <div class="form-control">
                  <label class="label cursor-pointer justify-start space-x-3">
                    <input 
                      type="checkbox" 
                      [checked]="tache.termine"
                      (change)="basculerTache(tache)"
                      class="checkbox checkbox-primary" />
                    <span class="label-text" [class.line-through]="tache.termine">
                      {{ tache.texte }}
                    </span>
                  </label>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  private toastService = inject(ToastService);

  statistiques: StatItem[] = [
    {
      title: 'Utilisateurs Totaux',
      value: 1247,
      color: 'bg-blue-500',
      icon: 'people'
    },
    {
      title: 'Revenus du Mois',
      value: 48250,
      color: 'bg-green-500',
      icon: 'attach_money'
    },
    {
      title: 'Commandes Aujourd\'hui',
      value: 156,
      color: 'bg-purple-500',
      icon: 'shopping_cart'
    },
    {
      title: 'Taux de Conversion',
      value: '3.2%',
      color: 'bg-orange-500',
      icon: 'trending_up'
    }
  ];

  activitesRecentes = [
    {
      id: 1,
      titre: 'Nouvelle commande',
      description: 'Commande #12345 par Jean Dupont',
      temps: 'Il y a 5 min',
      icon: 'shopping_bag'
    },
    {
      id: 2,
      titre: 'Utilisateur inscrit',
      description: 'Marie Martin a créé un compte',
      temps: 'Il y a 15 min',
      icon: 'person_add'
    },
    {
      id: 3,
      titre: 'Produit en rupture',
      description: 'iPhone 15 Pro n\'est plus en stock',
      temps: 'Il y a 1h',
      icon: 'warning'
    }
  ];

  taches = [
    { id: 1, texte: 'Examiner les commandes en attente', termine: false },
    { id: 2, texte: 'Mettre à jour les prix des produits', termine: false },
    { id: 3, texte: 'Répondre aux messages clients', termine: true },
    { id: 4, texte: 'Préparer le rapport mensuel', termine: false }
  ];

  rafraichirDonnees() {
    this.toastService.success('Succès', 'Données actualisées avec succès');
    // Simulation de rechargement des données
    this.statistiques = [...this.statistiques.map(stat => ({
      ...stat,
      value: typeof stat.value === 'number' ? 
        stat.value + Math.floor(Math.random() * 10) : stat.value
    }))];
  }

  basculerTache(tache: any) {
    tache.termine = !tache.termine;
    const message = tache.termine ? 'Tâche marquée comme terminée' : 'Tâche marquée comme à faire';
    this.toastService.info('Info', message);
  }
}
```

### 2. Créer le composant Users

```bash
mkdir -p src/app/features/users
```

**src/app/features/users/users.component.ts**

```typescript
import { Component, inject, signal } from '@angular/core';
import { DynamicTableComponent, DynamicFormComponent, ToastService } from '@enokdev/ng-panel';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DynamicTableComponent, DynamicFormComponent],
  template: `
    <div class="p-6 space-y-6">
      <!-- En-tête -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold">Gestion des Utilisateurs</h1>
          <p class="text-base-content/70 mt-1">Gérez les comptes utilisateurs de votre plateforme</p>
        </div>
        <div class="flex space-x-3">
          @if (!afficherFormulaire()) {
            <button class="btn btn-outline" (click)="exporterUtilisateurs()">
              <i class="material-icons text-sm">download</i>
              Exporter
            </button>
            <button class="btn btn-primary" (click)="basculerFormulaire()">
              <i class="material-icons text-sm">add</i>
              Nouvel Utilisateur
            </button>
          }
        </div>
      </div>

      <!-- Statistiques rapides -->
      @if (!afficherFormulaire()) {
        <div class="stats stats-horizontal shadow w-full">
          <div class="stat">
            <div class="stat-figure text-primary">
              <i class="material-icons text-2xl">people</i>
            </div>
            <div class="stat-title">Total Utilisateurs</div>
            <div class="stat-value text-primary">{{ utilisateurs().length }}</div>
          </div>
          
          <div class="stat">
            <div class="stat-figure text-secondary">
              <i class="material-icons text-2xl">admin_panel_settings</i>
            </div>
            <div class="stat-title">Administrateurs</div>
            <div class="stat-value text-secondary">{{ compterParRole('admin') }}</div>
          </div>
          
          <div class="stat">
            <div class="stat-figure text-success">
              <i class="material-icons text-2xl">verified</i>
            </div>
            <div class="stat-title">Utilisateurs Actifs</div>
            <div class="stat-value text-success">{{ compterActifs() }}</div>
          </div>
        </div>
      }

      <!-- Formulaire d'ajout/modification -->
      @if (afficherFormulaire()) {
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">
              {{ utilisateurSelectionne() ? 'Modifier' : 'Créer' }} un Utilisateur
            </h2>
            <lib-dynamic-form
              modelName="user"
              [initialData]="utilisateurSelectionne()"
              (onSubmit)="gererSoumission($event)"
              (onCancel)="basculerFormulaire()"
            />
          </div>
        </div>
      } @else {
        <!-- Filtres et recherche -->
        <div class="card bg-base-100 shadow">
          <div class="card-body py-4">
            <div class="flex flex-wrap gap-4 items-center">
              <div class="form-control">
                <input 
                  type="text" 
                  placeholder="Rechercher un utilisateur..." 
                  class="input input-bordered w-64"
                  [(ngModel)]="filtreRecherche"
                  (input)="filtrerUtilisateurs()" />
              </div>
              <div class="form-control">
                <select 
                  class="select select-bordered"
                  [(ngModel)]="filtreRole"
                  (change)="filtrerUtilisateurs()">
                  <option value="">Tous les rôles</option>
                  <option value="admin">Administrateur</option>
                  <option value="user">Utilisateur</option>
                  <option value="moderator">Modérateur</option>
                </select>
              </div>
              <div class="form-control">
                <select 
                  class="select select-bordered"
                  [(ngModel)]="filtreStatut"
                  (change)="filtrerUtilisateurs()">
                  <option value="">Tous les statuts</option>
                  <option value="true">Actif</option>
                  <option value="false">Inactif</option>
                </select>
              </div>
              @if (aDesFiltres()) {
                <button class="btn btn-ghost btn-sm" (click)="effacerFiltres()">
                  <i class="material-icons text-sm">clear</i>
                  Effacer filtres
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Tableau des utilisateurs -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <lib-dynamic-table
              modelName="user"
              [data]="utilisateursFiltres()"
            />
          </div>
        </div>
      }
    </div>
  `
})
export class UsersComponent {
  private toastService = inject(ToastService);

  afficherFormulaire = signal(false);
  utilisateurSelectionne = signal<any>(null);
  
  // Données simulées
  utilisateurs = signal([
    { 
      id: 1, 
      firstName: 'Jean', 
      lastName: 'Dupont', 
      email: 'jean.dupont@example.com', 
      role: 'admin', 
      active: true,
      dateCreation: '2024-01-15'
    },
    { 
      id: 2, 
      firstName: 'Marie', 
      lastName: 'Martin', 
      email: 'marie.martin@example.com', 
      role: 'user', 
      active: true,
      dateCreation: '2024-02-20'
    },
    { 
      id: 3, 
      firstName: 'Pierre', 
      lastName: 'Durand', 
      email: 'pierre.durand@example.com', 
      role: 'moderator', 
      active: false,
      dateCreation: '2024-03-10'
    },
    { 
      id: 4, 
      firstName: 'Sophie', 
      lastName: 'Leroy', 
      email: 'sophie.leroy@example.com', 
      role: 'user', 
      active: true,
      dateCreation: '2024-03-25'
    }
  ]);

  // Filtres
  filtreRecherche = '';
  filtreRole = '';
  filtreStatut = '';
  utilisateursFiltres = signal(this.utilisateurs());

  basculerFormulaire() {
    this.afficherFormulaire.update(v => !v);
    if (!this.afficherFormulaire()) {
      this.utilisateurSelectionne.set(null);
    }
  }

  gererSoumission(donnees: any) {
    if (this.utilisateurSelectionne()) {
      // Modification
      const index = this.utilisateurs().findIndex(u => u.id === this.utilisateurSelectionne().id);
      if (index !== -1) {
        const utilisateursMisAJour = [...this.utilisateurs()];
        utilisateursMisAJour[index] = { ...this.utilisateurSelectionne(), ...donnees };
        this.utilisateurs.set(utilisateursMisAJour);
        this.toastService.success('Succès', 'Utilisateur modifié avec succès');
      }
    } else {
      // Création
      const nouvelUtilisateur = {
        id: Math.max(...this.utilisateurs().map(u => u.id)) + 1,
        ...donnees,
        dateCreation: new Date().toISOString().split('T')[0]
      };
      this.utilisateurs.update(users => [...users, nouvelUtilisateur]);
      this.toastService.success('Succès', 'Utilisateur créé avec succès');
    }
    this.basculerFormulaire();
    this.filtrerUtilisateurs();
  }

  filtrerUtilisateurs() {
    let resultats = this.utilisateurs();

    if (this.filtreRecherche) {
      const terme = this.filtreRecherche.toLowerCase();
      resultats = resultats.filter(user => 
        user.firstName.toLowerCase().includes(terme) ||
        user.lastName.toLowerCase().includes(terme) ||
        user.email.toLowerCase().includes(terme)
      );
    }

    if (this.filtreRole) {
      resultats = resultats.filter(user => user.role === this.filtreRole);
    }

    if (this.filtreStatut) {
      const estActif = this.filtreStatut === 'true';
      resultats = resultats.filter(user => user.active === estActif);
    }

    this.utilisateursFiltres.set(resultats);
  }

  effacerFiltres() {
    this.filtreRecherche = '';
    this.filtreRole = '';
    this.filtreStatut = '';
    this.filtrerUtilisateurs();
  }

  aDesFiltres(): boolean {
    return !!(this.filtreRecherche || this.filtreRole || this.filtreStatut);
  }

  compterParRole(role: string): number {
    return this.utilisateurs().filter(user => user.role === role).length;
  }

  compterActifs(): number {
    return this.utilisateurs().filter(user => user.active).length;
  }

  exporterUtilisateurs() {
    // Simulation d'export
    this.toastService.info('Export', 'Export des utilisateurs en cours...');
    // Ici vous pourriez implémenter l'export réel vers CSV, Excel, etc.
  }
}
```

### 3. Configurer le FormsModule pour ngModel

**src/app/app.config.ts**

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FormsModule)
  ]
};
```

## Prochaines Étapes

Maintenant que vous avez une base fonctionnelle, vous pouvez :

1. **Ajouter plus de composants** : Créez les composants pour produits, commandes, etc.
2. **Implémenter l'authentification** : Ajoutez un système de connexion/déconnexion
3. **Connecter à une API** : Remplacez les données simulées par de vraies données
4. **Personnaliser les thèmes** : Adaptez l'apparence à votre marque
5. **Ajouter des validations** : Implémentez des validations métier personnalisées
6. **Optimiser les performances** : Ajoutez la pagination, le lazy loading, etc.

Pour lancer votre application :

```bash
ng serve
```

Votre admin panel sera accessible à l'adresse `http://localhost:4200`.

## Ressources Supplémentaires

- [Documentation Angular](https://angular.dev)
- [Documentation TailwindCSS](https://tailwindcss.com)
- [Documentation DaisyUI](https://daisyui.com)
- [Exemples complets](./EXAMPLES.md)
- [Guide de dépannage](./TROUBLESHOOTING.md)