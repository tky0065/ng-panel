# Guide de Contribution - ng-panel

Merci de votre intérêt pour contribuer à ng-panel ! Ce guide vous accompagne pour contribuer efficacement au projet.

## 🎯 Comment Contribuer

### Types de Contributions Bienvenues

- 🐛 **Corrections de bugs** - Signalement et correction d'erreurs
- ✨ **Nouvelles fonctionnalités** - Ajout de composants ou d'améliorations
- 📚 **Documentation** - Amélioration des guides et exemples
- 🎨 **Design** - Amélioration de l'UI/UX
- 🔧 **Outils** - Amélioration du build, tests, CI/CD
- 🌍 **Traductions** - Support de nouvelles langues

### Avant de Commencer

1. **Vérifiez les issues existantes** pour éviter les doublons
2. **Discutez des grandes fonctionnalités** via une issue avant de commencer
3. **Lisez le code existant** pour comprendre les conventions
4. **Testez vos changements** sur différents navigateurs

## 🚀 Configuration de l'Environnement

### Prérequis

- **Node.js** 18+ 
- **npm** 8+
- **Git** 2.20+
- **Angular CLI** 17+

### Installation

```bash
# 1. Fork le repository sur GitHub
# 2. Clone votre fork
git clone https://github.com/VOTRE_USERNAME/ng-panel.git
cd ng-panel

# 3. Ajouter le repository principal comme remote
git remote add upstream https://github.com/tky0065/ng-panel.git

# 4. Installer les dépendances
npm install

# 5. Créer une branche pour votre fonctionnalité
git checkout -b feature/ma-nouvelle-fonctionnalite
```

### Scripts de Développement

```bash
# Build de la bibliothèque en mode watch
npm run build:lib:watch

# Servir l'application de test  
npm run serve:test-app

# Tests unitaires
npm run test

# Tests e2e
npm run e2e

# Linting
npm run lint

# Formatage du code
npm run format
```

## 📝 Conventions de Code

### Style de Code

Nous utilisons **Prettier** et **ESLint** pour maintenir la cohérence :

```bash
# Formatter automatiquement
npm run format

# Vérifier le linting
npm run lint

# Corriger automatiquement les problèmes de linting
npm run lint:fix
```

### Convention de Nommage

#### Fichiers et Dossiers
- **Composants** : `kebab-case` (`user-form.component.ts`)
- **Services** : `kebab-case` (`user-data.service.ts`) 
- **Modèles** : `kebab-case` (`user-config.model.ts`)
- **Dossiers** : `kebab-case` (`dynamic-table/`)

#### Code TypeScript
- **Classes** : `PascalCase` (`UserFormComponent`)
- **Interfaces** : `PascalCase` avec préfixe `I` optionnel (`PanelConfig`)
- **Variables/Fonctions** : `camelCase` (`userName`, `handleSubmit`)
- **Constantes** : `SCREAMING_SNAKE_CASE` (`DEFAULT_PAGE_SIZE`)

#### CSS/SCSS
- **Classes** : `kebab-case` ou classes TailwindCSS
- **Variables SCSS** : `kebab-case` (`$primary-color`)

### Structure des Composants

```typescript
// Ordre recommandé dans les composants
@Component({
  selector: 'lib-component-name',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Template inline pour les petits composants -->
  `,
  templateUrl: './component-name.component.html', // Ou fichier séparé
  styleUrls: ['./component-name.component.scss']
})
export class ComponentNameComponent implements OnInit, OnDestroy {
  // 1. Signaux et propriétés publiques
  data = signal<any[]>([]);
  loading = signal(false);

  // 2. Propriétés privées
  private service = inject(SomeService);

  // 3. Lifecycle hooks
  ngOnInit() {
    // Initialisation
  }

  ngOnDestroy() {
    // Nettoyage
  }

  // 4. Méthodes publiques
  handleAction() {
    // Logique métier
  }

  // 5. Méthodes privées
  private helperMethod() {
    // Méthodes utilitaires
  }
}
```

## 🧪 Tests

### Tests Unitaires

Chaque composant et service doit avoir des tests unitaires :

```typescript
// component-name.component.spec.ts
describe('ComponentNameComponent', () => {
  let component: ComponentNameComponent;
  let fixture: ComponentFixture<ComponentNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentNameComponent] // Pour les composants standalone
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentNameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display data correctly', () => {
    // Test du comportement
    component.data.set([{ id: 1, name: 'Test' }]);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test');
  });
});
```

### Tests E2E

Pour les nouveaux composants importants, ajoutez des tests e2e :

```typescript
// e2e/component-name.e2e-spec.ts
import { test, expect } from '@playwright/test';

test('component should work correctly', async ({ page }) => {
  await page.goto('/test-component');
  
  // Vérifier que le composant se charge
  await expect(page.locator('[data-testid="component"]')).toBeVisible();
  
  // Tester les interactions
  await page.click('[data-testid="submit-button"]');
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
});
```

### Couverture de Tests

Maintenez une couverture de tests élevée :

```bash
# Générer un rapport de couverture
npm run test:coverage

# Le rapport sera dans coverage/
open coverage/index.html
```

## 🎯 Convention des Commits

Nous utilisons [Conventional Commits](https://www.conventionalcommits.org/) pour automatiser les versions :

### Format

```
<type>[scope optionnel]: <description>

[body optionnel]

[footer optionnel]
```

### Types

- **feat** : Nouvelle fonctionnalité (⚡ version mineure)
- **fix** : Correction de bug (🐛 version patch)
- **docs** : Documentation seulement (📚 version patch)
- **style** : Changements de formatage (💄 version patch)
- **refactor** : Refactoring sans changement de fonctionnalité (♻️ version patch)
- **perf** : Amélioration de performance (🚀 version patch)
- **test** : Ajout ou modification de tests (🧪 version patch)
- **build** : Changements du système de build (🔧 version patch)
- **ci** : Changements du CI/CD (👷 version patch)
- **chore** : Autres changements (🔨 version patch)
- **revert** : Annulation d'un commit précédent (⏪)

### Scopes Recommandés

- **core** : Fonctionnalités principales
- **components** : Composants UI
- **services** : Services et logique métier
- **models** : Interfaces et types
- **styles** : Styles et thèmes
- **docs** : Documentation
- **build** : Configuration de build
- **tests** : Tests

### Exemples

```bash
# Nouvelle fonctionnalité
feat(components): add dark mode toggle component

# Correction de bug
fix(core): resolve memory leak in table component

# Documentation
docs(readme): update installation instructions

# Changement cassant (version majeure)
feat(core)!: redesign API for better performance

BREAKING CHANGE: The old API methods have been removed.
Please use the new PanelService.setConfig() method.
```

## 📋 Processus de Contribution

### 1. Planification

1. **Recherchez** dans les issues existantes
2. **Créez une issue** pour discuter de votre idée
3. **Attendez feedback** avant de commencer le développement
4. **Assignez-vous** l'issue une fois approuvée

### 2. Développement

```bash
# 1. Synchroniser avec le repository principal
git fetch upstream
git checkout master
git merge upstream/master

# 2. Créer une branche de fonctionnalité
git checkout -b feat/awesome-feature

# 3. Développer avec commits atomiques
git add .
git commit -m "feat(components): add basic structure"

# 4. Continuer le développement
git commit -m "feat(components): implement core functionality"
git commit -m "docs(components): add usage examples"

# 5. Tester avant de push
npm run test
npm run lint
npm run build:lib
```

### 3. Pull Request

1. **Push** votre branche vers votre fork
```bash
git push origin feat/awesome-feature
```

2. **Créez une PR** sur GitHub avec :
   - **Titre** clair suivant les conventions
   - **Description** détaillée du changement
   - **Références** aux issues liées
   - **Screenshots** si changements visuels
   - **Tests** ajoutés/modifiés

3. **Template de PR** :
```markdown
## Description
Brève description du changement.

## Type de changement
- [ ] Bug fix (patch)
- [ ] Nouvelle fonctionnalité (minor)
- [ ] Changement cassant (major)
- [ ] Documentation

## Tests
- [ ] Tests unitaires ajoutés/modifiés
- [ ] Tests e2e ajoutés/modifiés
- [ ] Tests manuels effectués

## Screenshots (si applicable)
<!-- Ajoutez des captures d'écran -->

## Checklist
- [ ] Code suit les conventions du projet
- [ ] Auto-review effectuée
- [ ] Tests passent localement
- [ ] Documentation mise à jour si nécessaire
```

### 4. Review et Merge

1. **Attendez la review** d'un mainteneur
2. **Répondez aux commentaires** et ajustez si nécessaire
3. **Maintenez à jour** avec master si nécessaire
4. **Merge** une fois approuvée (fait par les mainteneurs)

## 🏗️ Architecture du Projet

### Structure des Dossiers

```
ng-panel/
├── projects/
│   ├── ng-panel/                    # 📦 Bibliothèque principale
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/      # 🧩 Composants UI
│   │   │   │   │   ├── dynamic-table/
│   │   │   │   │   ├── dynamic-form/
│   │   │   │   │   └── panel-layout/
│   │   │   │   ├── services/        # ⚙️ Services
│   │   │   │   │   ├── panel.service.ts
│   │   │   │   │   └── toast.service.ts
│   │   │   │   ├── models/          # 📋 Types et interfaces
│   │   │   │   │   └── panel-config.model.ts
│   │   │   │   └── styles/          # 🎨 Styles globaux
│   │   │   └── public-api.ts        # 📤 API publique
│   │   ├── README.md                # 📖 Documentation
│   │   └── package.json
│   └── test-app/                    # 🧪 Application de test
│       ├── src/app/
│       │   ├── features/            # Fonctionnalités de test
│       │   └── app.component.ts
└── docs/                            # 📚 Documentation complète
```

### Ajout d'un Nouveau Composant

1. **Créer la structure** :
```bash
cd projects/ng-panel/src/lib/components
mkdir my-component
cd my-component
```

2. **Fichiers requis** :
```
my-component/
├── my-component.component.ts      # Composant principal
├── my-component.component.html    # Template (si externe)
├── my-component.component.scss    # Styles (si externe)  
├── my-component.component.spec.ts # Tests unitaires
└── index.ts                       # Export du composant
```

3. **Template de composant** :
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-my-component',
  standalone: true,
  template: `
    <div class="my-component">
      <!-- Template ici -->
    </div>
  `,
  styles: [`
    .my-component {
      /* Styles ici ou utiliser TailwindCSS */
    }
  `]
})
export class MyComponentComponent {
  @Input() data: any[] = [];
  @Output() actionEvent = new EventEmitter<any>();

  handleAction(item: any) {
    this.actionEvent.emit(item);
  }
}
```

4. **Exporter dans public-api.ts** :
```typescript
// projects/ng-panel/src/public-api.ts
export * from './lib/components/my-component';
```

5. **Ajouter à l'app de test** :
```typescript
// projects/test-app/src/app/features/my-component-test/
```

## 🎨 Guidelines de Design

### Principes de Design

1. **Cohérence** - Utiliser les composants DaisyUI existants
2. **Accessibilité** - Support ARIA et navigation clavier
3. **Responsive** - Mobile-first design avec TailwindCSS
4. **Performance** - Optimiser pour les grandes quantités de données
5. **Simplicité** - API simple et intuitive

### Utilisation de TailwindCSS

```html
<!-- ✅ Bon : Utiliser les classes DaisyUI -->
<button class="btn btn-primary">Action</button>
<div class="card bg-base-100 shadow-xl">Content</div>

<!-- ❌ Éviter : Styles inline -->
<button style="background: blue;">Action</button>

<!-- ✅ Bon : Classes responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

<!-- ✅ Bon : Classes conditionnelles -->
<div [class]="isActive ? 'btn-primary' : 'btn-ghost'">
```

### Thèmes et Couleurs

```typescript
// Utiliser les variables CSS de DaisyUI
:root {
  --p: primary-color;
  --s: secondary-color; 
  --a: accent-color;
}

// Dans les composants
.my-element {
  @apply bg-primary text-primary-content;
}
```

## 🌍 Internationalisation

### Ajout de Nouvelles Traductions

1. **Créer les fichiers de traduction** :
```
src/lib/i18n/
├── en.json
├── fr.json
└── es.json
```

2. **Structure des traductions** :
```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete"
  },
  "table": {
    "noData": "No data available",
    "loading": "Loading..."
  },
  "form": {
    "required": "This field is required",
    "invalid": "Invalid value"
  }
}
```

3. **Service de traduction** :
```typescript
@Injectable()
export class I18nService {
  private currentLang = signal('en');
  
  translate(key: string): string {
    // Logique de traduction
  }
}
```

## 🚀 Release et Publication

### Processus de Release

1. **Développement** se fait sur `master`
2. **Pull Request** vers `prod` pour release
3. **CI/CD automatique** bumpe la version et publie
4. **Tags Git** créés automatiquement

### Versioning

Nous suivons [Semantic Versioning](https://semver.org/) :

- **MAJOR** (X.0.0) : Changements cassants
- **MINOR** (0.X.0) : Nouvelles fonctionnalités compatibles
- **PATCH** (0.0.X) : Corrections de bugs

### Changelog

Le changelog est généré automatiquement à partir des commits.

## 📞 Support

### Obtenir de l'Aide

- 💬 **Discussions** : [GitHub Discussions](https://github.com/tky0065/ng-panel/discussions)
- 🐛 **Issues** : [GitHub Issues](https://github.com/tky0065/ng-panel/issues)
- 📧 **Email** : support@enokdev.com

### Signaler un Bug

Template d'issue pour les bugs :

```markdown
**Description du Bug**
Description claire et concise du problème.

**Reproduction**
Étapes pour reproduire :
1. Aller à '...'
2. Cliquer sur '...'
3. Voir l'erreur

**Comportement Attendu**
Ce qui devrait se passer.

**Screenshots**
Si applicable, ajoutez des captures d'écran.

**Environnement**
- OS: [e.g. macOS]
- Navigateur: [e.g. Chrome 91]
- Version ng-panel: [e.g. 1.0.0]
- Version Angular: [e.g. 17.0.0]
```

## 🏆 Reconnaissance

Tous les contributeurs sont reconnus dans :

- **README.md** principal
- **Contributors section** sur GitHub
- **Changelog** des releases

### Hall of Fame

Les contributeurs exceptionnels peuvent recevoir :

- **Commit access** au repository
- **Maintainer status** pour certaines sections
- **Crédit** sur le site web du projet

## 📜 Code de Conduite

Nous suivons le [Contributor Covenant](https://www.contributor-covenant.org/).

### Résumé

- **Respectueux** envers tous les participants
- **Inclusif** et accueillant pour tous
- **Constructif** dans les retours et critiques
- **Professionnel** dans toutes les interactions

## 🎉 Merci !

Merci de contribuer à ng-panel ! Votre aide fait de ce projet un succès.

---

**Questions ?** N'hésitez pas à ouvrir une [Discussion](https://github.com/tky0065/ng-panel/discussions) pour toute clarification.