import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSignal = signal<ToastMessage[]>([]);
  
  readonly toasts = this.toastsSignal.asReadonly();

  show(toast: Omit<ToastMessage, 'id'>): void {
    const id = this.generateId();
    const newToast: ToastMessage = {
      ...toast,
      id,
      duration: toast.duration || 5000
    };
    
    this.toastsSignal.update(toasts => [...toasts, newToast]);
    
    // Auto remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, newToast.duration);
    }
  }

  remove(id: string): void {
    this.toastsSignal.update(toasts => toasts.filter(toast => toast.id !== id));
  }

  clear(): void {
    this.toastsSignal.set([]);
  }

  success(title: string, message?: string): void {
    this.show({ type: 'success', title, message });
  }

  error(title: string, message?: string): void {
    this.show({ type: 'error', title, message });
  }

  warning(title: string, message?: string): void {
    this.show({ type: 'warning', title, message });
  }

  info(title: string, message?: string): void {
    this.show({ type: 'info', title, message });
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}