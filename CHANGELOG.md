# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **BREAKING**: Upgraded Angular from 19.x to 20.x
- Migrated all components to use modern Angular 20 patterns:
  - Replaced `@Input()` decorators with `input()` signal functions
  - Added `ChangeDetectionStrategy.OnPush` to all components
  - Updated TypeScript to version 5.8.x for Angular 20 compatibility
- Deprecated `NgPanelModule` in favor of standalone components (will be removed in v2.0)

### Deprecated
- `NgPanelModule` is now deprecated and will be removed in v2.0. Use standalone components instead.

### Migration Guide
To migrate from the old pattern to Angular 20 compatible code:

#### Before (Angular 19)
```typescript
import { NgPanelModule } from '@enokdev/ng-panel';

@NgModule({
  imports: [NgPanelModule],
  // ...
})
```

#### After (Angular 20)
```typescript
import { PanelLayoutComponent, PanelService } from '@enokdev/ng-panel';

@Component({
  standalone: true,
  imports: [PanelLayoutComponent],
  // ...
})
```

### Technical Details
- All components now use `input()` signals instead of `@Input()` decorators
- All components use `OnPush` change detection strategy for better performance
- Modern control flow (`@if`, `@for`) is used throughout
- TypeScript 5.8.x compatibility ensures future-proofing

## Previous Versions

See GitHub releases for previous version history.