// projects/ng-panel/src/public-api.ts
/*
 * Public API Surface of ng-panel
 */

// Components
export * from './lib/components/panel-layout/panel-layout.component';
export * from './lib/components/panel-header/panel-header.component';
export * from './lib/components/panel-sidebar/panel-sidebar.component';
export * from './lib/components/panel-footer/panel-footer.component';
export * from './lib/components/dynamic-table/dynamic-table.component';
export * from './lib/components/dynamic-form/dynamic-form.component';
export * from './lib/components/stat-card/stat-card.component';
export * from './lib/components/toast-container/toast-container.component';

// Services
export * from './lib/services/panel.service';
export * from './lib/services/toast.service';
export * from './lib/services/error-handler.service';

// Models
export * from './lib/models/panel-config.model';

// Legacy NgModule (deprecated)
/** @deprecated Use standalone components instead. This will be removed in v2.0 */
export * from './lib/ng-panel.module';
