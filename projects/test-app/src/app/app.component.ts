import {PanelService} from '../../../ng-panel/src/lib/services/panel.service';
import {Component, inject, OnInit} from '@angular/core';
import {PanelLayoutComponent} from '../../../ng-panel/src/lib/components/panel-layout/panel-layout.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ PanelLayoutComponent],
  template: `<lib-panel-layout />`
})
export class AppComponent implements OnInit {
  private panelService = inject(PanelService);

  ngOnInit() {
    // Configuration globale du panel
    this.panelService.setConfig({
      title: 'Mon Administration',
      logo: 'assets/logo.png',
      theme: {
        primary: '#4F46E5',
        secondary: '#7C3AED',
        accent: '#F59E0B'
      },
      menu: [
        {
          label: 'Dashboard',
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
    // Enregistrement des modèles
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
          type: 'text',
          label: 'Email',
          required: true
        },
        {
          name: 'role',
          type: 'select',
          label: 'Rôle',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' }
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
          icon: 'trash'
        }
      ],
      list: {
        pageSize: 10,
        sortable: true
      }
    });
  }
}
