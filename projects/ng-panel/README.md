# @enokdev/ng-panel

A modern, dynamic admin panel library for Angular applications with DaisyUI and TailwindCSS.

## Installation

```bash
# Install the main package
npm install @enokdev/ng-panel

# Install peer dependencies
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
    "./node_modules/@enokdev/ng-panel/**/*.{html,ts}"  // Add this line to include ng-panel components
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
import { Component } from '@angular/core';
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
import { DynamicStatsComponent } from '@enokdev/ng-panel';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DynamicStatsComponent],
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
      <lib-dynamic-stats [data]="statsData"/>
    </div>
  `
})
export class DashboardComponent {
  statsData = [
    {
      title: 'Users',
      value: 150,
      color: 'bg-violet-600',
      icon: 'people'
    },
    {
      title: 'Products',
      value: 1234,
      color: 'bg-pink-500',
      icon: 'inventory_2'
    },
    {
      title: 'Sales',
      value: 45678,
      color: 'bg-teal-500',
      icon: 'shopping_cart'
    }
  ];
}
```

3. Configure your routes (app.routes.ts):
```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  }
  // Add more routes as needed
];
```

## Available Components

1. Dynamic Table:
```typescript
<lib-dynamic-table
  modelName="user"
  [data]="users"
/>
```

2. Dynamic Form:
```typescript
<lib-dynamic-form
  modelName="user"
  [initialData]="userData"
  (onSubmit)="handleSubmit($event)"
/>
```

3. Dynamic Stats:
```typescript
<lib-dynamic-stats
  [data]="statsData"
/>
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
}

interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
}
```

## Customization

You can customize the theme using DaisyUI themes. Add the theme selector in your header component:

```typescript
<select data-choose-theme class="select select-bordered select-sm">
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="cupcake">Cupcake</option>
</select>
```

## Contributing

Feel free to submit issues and pull requests on our GitHub repository.

## License

MIT
