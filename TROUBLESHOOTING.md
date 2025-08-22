# Guide de Dépannage - ng-panel

Ce guide vous aide à résoudre les problèmes courants rencontrés lors de l'utilisation de ng-panel.

## Table des Matières

1. [Problèmes d'Installation](#problèmes-dinstallation)
2. [Problèmes de Configuration](#problèmes-de-configuration)
3. [Problèmes de Styles](#problèmes-de-styles)
4. [Problèmes de Composants](#problèmes-de-composants)
5. [Problèmes de Performance](#problèmes-de-performance)
6. [Problèmes de Build](#problèmes-de-build)
7. [FAQ](#faq)

## Problèmes d'Installation

### Erreur : Dépendances manquantes

**Symptôme :** 
```
Cannot find module '@angular/core' or its corresponding type declarations
```

**Solution :**
```bash
# Installer les peer dependencies requises
npm install @angular/common @angular/core @angular/forms @angular/router

# Si vous utilisez Angular 17+
npm install @angular/common@^17.0.0 @angular/core@^17.0.0
```

### Erreur : Versions incompatibles

**Symptôme :**
```
Package "@enokdev/ng-panel" has an incompatible peer dependency
```

**Solution :**
Vérifiez les versions compatibles :

```bash
# Vérifier la version d'Angular
ng version

# Installer la version compatible de ng-panel
npm install @enokdev/ng-panel@latest
```

**Tableau de compatibilité :**

| ng-panel | Angular | Node.js |
|----------|---------|---------|
| 0.1.x    | 19.x, 20.x | 18.x, 20.x |
| 1.x.x    | 19.x, 20.x | 18.x, 20.x |
| 2.x.x    | 20.x, 21.x | 20.x, 22.x |

### Erreur : TailwindCSS non trouvé

**Symptôme :**
```
Module not found: Error: Can't resolve 'tailwindcss'
```

**Solution :**
```bash
# Installer TailwindCSS 4.1+ et DaisyUI
npm install tailwindcss@^4.1.0 @tailwindcss/postcss daisyui autoprefixer postcss

# Initialiser TailwindCSS
npx tailwindcss init -p

# Pour TailwindCSS 3.x (legacy)
npm install tailwindcss@^3.0.0 daisyui autoprefixer postcss
```

## Problèmes de Configuration

### Le panel ne s'affiche pas

**Symptôme :** Page blanche ou composant non rendu

**Diagnostic :**
```typescript
// Vérifiez que le composant est correctement importé
import { PanelLayoutComponent } from '@enokdev/ng-panel';

@Component({
  imports: [PanelLayoutComponent], // ✅ Correct
  template: `<lib-panel-layout/>` // ✅ Correct
})
```

**Solutions courantes :**

1. **Vérifier l'import du composant :**
```typescript
// ❌ Incorrect
import { PanelLayoutComponent } from 'ng-panel';

// ✅ Correct
import { PanelLayoutComponent } from '@enokdev/ng-panel';
```

2. **Vérifier la configuration du service :**
```typescript
export class AppComponent implements OnInit {
  private panelService = inject(PanelService);

  ngOnInit() {
    // Configuration minimale requise
    this.panelService.setConfig({
      title: 'Mon Panel',
      menu: [
        {
          label: 'Accueil',
          route: '/home'
        }
      ]
    });
  }
}
```

### Erreur : Menu non affiché

**Symptôme :** Le sidebar est vide ou ne montre pas les éléments de menu

**Diagnostic :**
```typescript
// Vérifiez la structure du menu
this.panelService.setConfig({
  menu: [
    {
      label: 'Dashboard',    // ✅ Requis
      icon: 'dashboard',     // ✅ Optionnel
      route: '/dashboard'    // ✅ Requis (ou children)
    }
  ]
});
```

**Solutions :**

1. **Structure de menu correcte :**
```typescript
// ✅ Menu simple
menu: [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard'
  }
]

// ✅ Menu avec sous-éléments
menu: [
  {
    label: 'Gestion',
    icon: 'settings',
    children: [
      {
        label: 'Utilisateurs',
        icon: 'people',
        route: '/users'
      }
    ]
  }
]
```

2. **Vérifier les routes :**
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  }
];
```

### Erreur : Icônes manquantes

**Symptôme :** Les icônes n'apparaissent pas ou montrent des carrés vides

**Solution :**
```css
/* styles.css - Ajouter Google Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
```

Ou utiliser le CDN dans `index.html` :
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

## Problèmes de Styles

### TailwindCSS 4.1+ et Angular 20.x

**Note importante :** TailwindCSS 4.1+ avec Angular 20.x peut avoir des limitations avec la détection automatique d'Angular. La bibliothèque ng-panel fonctionne parfaitement, mais les applications de test peuvent rencontrer des problèmes de build.

**Symptôme :**
```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. 
The PostCSS plugin has moved to a separate package...
```

**Solution de contournement :**
1. Utiliser TailwindCSS 3.x pour les applications complètes
2. Ou attendre une mise à jour d'Angular pour le support complet de TailwindCSS 4.x
3. La bibliothèque ng-panel elle-même fonctionne parfaitement avec TailwindCSS 4.1+

### TailwindCSS ne fonctionne pas

**Symptôme :** Les classes Tailwind ne s'appliquent pas

**Diagnostic :**
```css
/* styles.css - Vérifiez ces imports (TailwindCSS 4.1+) */
@import "tailwindcss";  /* ✅ Requis pour TailwindCSS 4.1+ */
```

**Pour TailwindCSS 3.x (legacy):**
```css
@tailwind base;     /* ✅ Requis */
@tailwind components; /* ✅ Requis */
@tailwind utilities;  /* ✅ Requis */
```

**Solution :**

1. **Configuration tailwind.config.js :**
```javascript
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@enokdev/ng-panel/**/*.{html,ts,js,mjs}" // ✅ Important
  ],
  plugins: [require("daisyui")], // ✅ DaisyUI requis
  daisyui: {
    themes: true
  }
}
```

2. **Vérifier postcss.config.js (TailwindCSS 4.1+) :**
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  }
}
```

3. **Pour TailwindCSS 3.x (legacy):**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
}
```

### DaisyUI ne fonctionne pas

**Symptôme :** Les composants DaisyUI n'ont pas de styles

**Solution :**
```bash
# Réinstaller DaisyUI
npm uninstall daisyui
npm install daisyui@latest
```

Vérifiez la configuration :
```javascript
// tailwind.config.js
module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake"
    ]
  }
}
```

### Styles de ng-panel écrasés

**Symptôme :** Les styles personnalisés interfèrent avec ng-panel

**Solution :**

1. **Utiliser des classes spécifiques :**
```css
/* Évitez les sélecteurs trop génériques */
/* ❌ Problématique */
.btn {
  background: red !important;
}

/* ✅ Mieux */
.my-custom-btn {
  background: red;
}
```

2. **Utiliser les variables CSS de DaisyUI :**
```css
:root {
  --p: 259 94% 51%;  /* primary */
  --s: 314 100% 47%; /* secondary */
}
```

## Problèmes de Composants

### Dynamic Form ne valide pas

**Symptôme :** Les validations ne fonctionnent pas

**Diagnostic :**
```typescript
// Vérifiez la configuration des champs
this.panelService.registerModel('user', {
  fields: [
    {
      name: 'email',
      type: 'email',      // ✅ Type correct
      required: true,     // ✅ Validation basique
      validators: [       // ✅ Validations personnalisées
        Validators.email
      ]
    }
  ]
});
```

**Solutions :**

1. **Importer Validators :**
```typescript
import { Validators } from '@angular/forms';
```

2. **Validation conditionnelle :**
```typescript
// Validateur personnalisé
private customValidator(control: AbstractControl) {
  if (control.value && control.value.length < 3) {
    return { minLength: true };
  }
  return null;
}

// Usage
validators: [this.customValidator]
```

### Dynamic Table ne charge pas les données

**Symptôme :** Le tableau est vide même avec des données

**Diagnostic :**
```typescript
// Vérifiez le binding des données
<lib-dynamic-table
  modelName="user"     // ✅ Modèle enregistré
  [data]="users()"     // ✅ Signal ou propriété
/>
```

**Solutions :**

1. **Vérifier le modèle enregistré :**
```typescript
// Le nom doit correspondre
this.panelService.registerModel('user', { ... });

// Dans le template
modelName="user" // ✅ Même nom
```

2. **Vérifier le format des données :**
```typescript
// ✅ Les données doivent être un tableau
users = signal([
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
]);
```

### Toast notifications ne s'affichent pas

**Symptôme :** Les notifications ne sont pas visibles

**Solution :**

1. **Vérifier le composant toast :**
```typescript
// app.component.ts template
template: `
  <lib-panel-layout/>
  <!-- Le toast container est déjà inclus dans panel-layout -->
`
```

2. **Utiliser le service correctement :**
```typescript
import { ToastService } from '@enokdev/ng-panel';

constructor(private toastService: ToastService) {}

showNotification() {
  this.toastService.success('Titre', 'Message de succès');
}
```

## Problèmes de Performance

### Panel lent au chargement

**Symptôme :** L'interface met du temps à s'afficher

**Solutions :**

1. **Lazy loading des composants :**
```typescript
// app.routes.ts
{
  path: 'users',
  loadComponent: () => import('./users/users.component')
    .then(m => m.UsersComponent)
}
```

2. **OnPush change detection :**
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent { }
```

3. **Pagination des données :**
```typescript
// Limiter les données affichées
list: {
  pageSize: 25, // Au lieu de charger toutes les données
  sortable: true
}
```

### Mémoire qui augmente

**Symptôme :** L'application consomme de plus en plus de mémoire

**Solutions :**

1. **Unsubscribe des observables :**
```typescript
export class MyComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.dataService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => { });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

2. **Utiliser les signals au lieu d'observables :**
```typescript
// ✅ Mieux pour la performance
users = signal<User[]>([]);

// Au lieu de
users$ = this.dataService.getUsers();
```

## Problèmes de Build

### Erreur de build en production

**Symptôme :**
```
Error: Cannot resolve module '@enokdev/ng-panel'
```

**Solution :**

1. **Vérifier angular.json :**
```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "preserveSymlinks": true
          }
        }
      }
    }
  }
}
```

2. **Ajouter au tsconfig.json :**
```json
{
  "compilerOptions": {
    "paths": {
      "@enokdev/ng-panel": ["node_modules/@enokdev/ng-panel"]
    }
  }
}
```

### Bundle trop volumineux

**Symptôme :** Le build final est très lourd

**Solutions :**

1. **Analyse du bundle :**
```bash
npm install -g webpack-bundle-analyzer
ng build --stats-json
npx webpack-bundle-analyzer dist/your-app/stats.json
```

2. **Import sélectif :**
```typescript
// ❌ Import global
import * from '@enokdev/ng-panel';

// ✅ Import spécifique
import { PanelLayoutComponent, ToastService } from '@enokdev/ng-panel';
```

## FAQ

### Q: Comment personnaliser les couleurs du panel ?

**R:** Utilisez les variables CSS de DaisyUI dans votre `styles.css` :

```css
:root {
  --p: 259 94% 51%;    /* Couleur primaire */
  --s: 314 100% 47%;   /* Couleur secondaire */
  --a: 174 60% 51%;    /* Couleur accent */
}
```

### Q: Comment ajouter une langue personnalisée ?

**R:** Créez un service de traduction :

```typescript
@Injectable()
export class TranslationService {
  private translations = {
    fr: {
      'save': 'Enregistrer',
      'cancel': 'Annuler'
    },
    en: {
      'save': 'Save',
      'cancel': 'Cancel'
    }
  };

  translate(key: string, lang: string = 'fr'): string {
    return this.translations[lang]?.[key] || key;
  }
}
```

### Q: Comment intégrer avec une API REST ?

**R:** Utilisez un service dédié :

```typescript
@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('/api/users', user);
  }
}
```

### Q: Comment gérer l'authentification ?

**R:** Implémentez un guard et un intercepteur :

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
```

### Q: Comment déboguer les problèmes de routing ?

**R:** Activez le tracing des routes :

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withDebugTracing()) // Développement uniquement
  ]
};
```

### Q: Comment optimiser pour mobile ?

**R:** Utilisez les classes responsive de Tailwind :

```html
<!-- Responsive design -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Contenu -->
</div>

<!-- Menu mobile -->
<div class="drawer lg:drawer-open">
  <!-- Configuration responsive -->
</div>
```

## Support

Si vous rencontrez un problème non couvert par ce guide :

1. **Vérifiez les issues GitHub** : [ng-panel issues](https://github.com/tky0065/ng-panel/issues)
2. **Créez une issue** avec :
   - Version de ng-panel utilisée
   - Version d'Angular
   - Code reproduisant le problème
   - Message d'erreur complet
3. **Consultez la documentation** : [README.md](./README.md) et [EXAMPLES.md](./EXAMPLES.md)

## Outils de Diagnostic

### Script de diagnostic automatique

```bash
# Créer un script de diagnostic
cat > diagnostic.sh << 'EOF'
#!/bin/bash
echo "=== Diagnostic ng-panel ==="
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo "Angular CLI version:"
ng version 2>/dev/null || echo "Angular CLI non installé"
echo ""
echo "Packages installés:"
npm list @enokdev/ng-panel @angular/core tailwindcss daisyui 2>/dev/null
echo ""
echo "Configuration TailwindCSS:"
[ -f "tailwind.config.js" ] && echo "✅ tailwind.config.js trouvé" || echo "❌ tailwind.config.js manquant"
[ -f "postcss.config.js" ] && echo "✅ postcss.config.js trouvé" || echo "❌ postcss.config.js manquant"
EOF

chmod +x diagnostic.sh
./diagnostic.sh
```

Ce guide devrait vous aider à résoudre la plupart des problèmes courants. N'hésitez pas à contribuer en signalant de nouveaux problèmes ou solutions.