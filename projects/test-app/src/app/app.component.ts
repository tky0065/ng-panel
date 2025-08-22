// app.component.ts
import { Component, inject, OnInit } from '@angular/core';
import {PanelLayoutComponent} from '../../../ng-panel/src/lib/components/panel-layout/panel-layout.component';
import {PanelService} from '../../../ng-panel/src/lib/services/panel.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PanelLayoutComponent],
  template: `<lib-panel-layout/>`
})
export class AppComponent implements OnInit {
  private panelService = inject(PanelService);

  ngOnInit() {
    // Configuration globale du panel
    this.panelService.setConfig({
      title: 'Ng-Panel',
      logo: 'https://placehold.co/60x60/png',
      profileConfig: {
        avatar: 'https://placehold.co/60x60/png',
        username: 'Enokdev',
        actions: [
          {
            label: 'Profile',
            icon: 'person',
            route: '/profile'
          },
          {
            label: 'Settings',
            icon: 'settings',
            route: '/settings'
          },
          {
            label: 'Logout',
            icon: 'logout',
            action: () => {
              console.log('Logout clicked');
              // Implémentez votre logique de déconnexion ici
            }
          }
        ]
      },
      menu: [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          route: '/dashboard',
          badge: '2' // ✅ Now supported - shows notification count
        },
        {
          label: 'Gestion',
          icon: 'settings',
          children: [
            {
              label: 'Utilisateurs',
              icon: 'people',
              route: '/users',
              badge: 'NEW' // ✅ Now supported - shows "NEW" badge
            },
            {
              label: 'Produits',
              icon: 'inventory',
              route: '/products'
            }
          ]
        },
        {
          type: 'divider', // ✅ Now supported - creates a menu separator
          label: 'Administration'
        },
        {
          label: 'Paramètres',
          icon: 'settings',
          route: '/settings'
        }
      ]
    });

    // Enregistrer les modèles
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
          placeholder: 'Entrez le prénom', // ✅ Now supported
          required: true
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Nom',
          placeholder: 'Entrez le nom', // ✅ Now supported
          required: true
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'exemple@email.com', // ✅ Now supported
          required: true
        },
        {
          name: 'bio',
          type: 'textarea', // ✅ Now supported
          label: 'Bio',
          placeholder: 'Décrivez-vous...', // ✅ Now supported
          rows: 3 // ✅ Now supported
        },
        {
          name: 'age',
          type: 'number',
          label: 'Âge',
          min: 18, // ✅ Now supported
          max: 100, // ✅ Now supported
          step: 1 // ✅ Now supported
        },
        {
          name: 'role',
          type: 'select',
          label: 'Rôle',
          placeholder: 'Sélectionnez un rôle', // ✅ Now supported
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
          icon: 'edit',
          condition: (item) => item.status !== 'archived' // ✅ Now supported
        },
        {
          name: 'delete',
          label: 'Supprimer',
          type: 'danger',
          icon: 'delete',
          confirmMessage: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?' // ✅ Now supported
        }
      ],
      list: {
        pageSize: 10,
        sortable: true
      }
    });
  }
}
