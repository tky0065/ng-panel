# ng-panel

A modern, dynamic admin panel library for Angular applications with DaisyUI and TailwindCSS.

## Installation

```bash
npm install ng-panel tailwindcss daisyui
```

## Configuration

1. Add TailwindCSS configuration:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/ng-panel/**/*.{html,ts}"
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: true
  }
}
```

2. Import styles in your styles.css:

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

## Usage

```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { PanelService, PanelLayoutComponent } from 'ng-panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PanelLayoutComponent],
  template: '<lib-panel-layout/>'
})
export class AppComponent implements OnInit {
  constructor(private panelService: PanelService) {}

  ngOnInit() {
    this.panelService.setConfig({
      title: 'Admin Panel',
      menu: [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          route: '/dashboard'
        }
        // ... more menu items
      ]
    });
  }
}
```

## Features

- Fully responsive layout
- Dynamic forms
- Dynamic tables
- Statistics cards
- Theme switching
- Configurable menu
- Material Icons support
- DaisyUI components

## Components

### DynamicTableComponent

```typescript
<lib-dynamic-table
  modelName="user"
  [data]="users"
/>
```

### DynamicFormComponent

```typescript
<lib-dynamic-form
  modelName="user"
  [initialData]="userData"
  (onSubmit)="handleSubmit($event)"
/>
```

### DynamicStatsComponent

```typescript
<lib-dynamic-stats
  [data]="statsData"
/>
```

## License

MIT
