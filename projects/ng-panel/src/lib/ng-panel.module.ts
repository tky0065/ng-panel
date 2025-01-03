import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PanelLayoutComponent } from './components/panel-layout/panel-layout.component';
import { PanelHeaderComponent } from './components/panel-header/panel-header.component';
import { PanelSidebarComponent } from './components/panel-sidebar/panel-sidebar.component';
import { PanelFooterComponent } from './components/panel-footer/panel-footer.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PanelLayoutComponent,
    PanelHeaderComponent,
    PanelSidebarComponent,
    PanelFooterComponent,
    DynamicTableComponent,
    DynamicFormComponent
  ],
  exports: [
    PanelLayoutComponent,
    PanelHeaderComponent,
    PanelSidebarComponent,
    PanelFooterComponent,
    DynamicTableComponent,
    DynamicFormComponent
  ]
})
export class NgPanelModule { }
