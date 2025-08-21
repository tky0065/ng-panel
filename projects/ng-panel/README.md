# @enokdev/ng-panel

A modern, dynamic admin panel library for Angular applications with DaisyUI and TailwindCSS.

## Installation

```bash
# Install the main package
npm install @enokdev/ng-panel

# Install peer dependencies
npm install @angular/common @angular/core @angular/forms @angular/router
npm install tailwindcss daisyui
```

## Configuration

1. Initialize Tailwind CSS if not already done:
```bash
npx tailwindcss init
```

2. Configure your tailwind.config.js:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@enokdev/ng-panel/**/*.{html,ts,js,mjs}"  // Add this line to include ng-panel components
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: true
  }
}
```

3. Set up your styles.css:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Optional: Import ng-panel styles */
@import '@enokdev/ng-panel/styles/styles.css';
```

4. Add PostCSS configuration (postcss.config.js):
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

## Basic Usage

1. In your app.component.ts:
```typescript
import { Component, OnInit } from '@angular/core';
import { PanelLayoutComponent, PanelService } from '@enokdev/ng-panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PanelLayoutComponent],
  template: `<lib-panel-layout/>`
})
export class AppComponent implements OnInit {
  constructor(private panelService: PanelService) {}

  ngOnInit() {
    this.panelService.setConfig({
      title: 'Admin Panel',
      logo: 'assets/logo.png',
      profileConfig: {
        avatar: 'assets/avatar.png',
        username: 'Admin User',
        actions: [
          {
            label: 'Profile',
            icon: 'person',
            route: '/profile'
          },
          {
            label: 'Logout',
            icon: 'logout',
            action: () => console.log('Logout')
          }
        ]
      },
      menu: [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          route: '/dashboard'
        },
        {
          label: 'Users',
          icon: 'people',
          route: '/users'
        }
      ]
    });
  }
}
```

2. Create a dashboard component (dashboard.component.ts):
```typescript
import { Component } from '@angular/core';
import { DynamicStatsComponent, StatItem } from '@enokdev/ng-panel';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DynamicStatsComponent],
  template: `
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
      <lib-dynamic-stats [data]="stats"/>
    </div>
  `
})
export class DashboardComponent {
  stats: StatItem[] = [
    {
      title: 'Total Users',
      value: 1250,
      color: 'bg-blue-500',
      icon: 'people'
    },
    {
      title: 'Revenue',
      value: 45000,
      color: 'bg-green-500',
      icon: 'attach_money'
    },
    {
      title: 'Orders',
      value: 892,
      color: 'bg-purple-500',
      icon: 'shopping_cart'
    }
  ];
}
```

3. Set up routing in your app.routes.ts:
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
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
  // Add more routes as needed
];
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

## API Reference

### PanelConfig Interface
```typescript
interface PanelConfig {
  title: string;
  logo?: string;
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  menu: MenuItem[];
  profileConfig?: ProfileConfig;
}

interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
}

interface ProfileConfig {
  avatar?: string;
  username?: string;
  actions: ProfileAction[];
}
```

### ModelConfig Interface
```typescript
interface ModelConfig {
  name: string;
  fields: FieldConfig[];
  actions?: ActionConfig[];
  list?: ListConfig;
  form?: FormConfig;
}

interface FieldConfig {
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'email' | 'password';
  label: string;
  required?: boolean;
  options?: { label: string; value: any }[];
  validators?: any[];
}
```

## Services

### PanelService
Manages global configuration and model definitions.

### ToastService
Provides notification functionality with different types (success, error, warning, info).

### NgPanelErrorHandler
Handles errors gracefully with user-friendly messages.

## Customization

You can customize the theme using DaisyUI themes. The header component includes a theme selector:

```typescript
// Themes are automatically available in the header dropdown
// You can also set themes programmatically:
document.documentElement.setAttribute('data-theme', 'dark');
```

## Features

- ✅ Responsive design with TailwindCSS
- ✅ Multiple DaisyUI theme support
- ✅ Dynamic form generation with validation
- ✅ Dynamic table with actions
- ✅ Toast notifications
- ✅ Profile management
- ✅ Hierarchical menu support
- ✅ Error handling
- ✅ TypeScript support
- ✅ Standalone components (Angular 17+)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues and pull requests on our GitHub repository.

## License

MIT