import { Component, inject } from '@angular/core';
import { ToastService, ToastMessage } from '../../services/toast.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-toast-container',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="toast toast-top toast-end z-50">
      @for (toast of toastService.toasts(); track toast.id) {
        <div [ngClass]="getToastClasses(toast.type)" class="alert">
          <div>
            <div class="font-bold">{{ toast.title }}</div>
            @if (toast.message) {
              <div class="text-sm">{{ toast.message }}</div>
            }
          </div>
          <button class="btn btn-sm btn-circle" (click)="toastService.remove(toast.id)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      }
    </div>
  `
})
export class ToastContainerComponent {
  toastService = inject(ToastService);

  getToastClasses(type: ToastMessage['type']): string {
    const baseClasses = 'alert';
    
    switch (type) {
      case 'success':
        return `${baseClasses} alert-success`;
      case 'error':
        return `${baseClasses} alert-error`;
      case 'warning':
        return `${baseClasses} alert-warning`;
      case 'info':
        return `${baseClasses} alert-info`;
      default:
        return baseClasses;
    }
  }
}