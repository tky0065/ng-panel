import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgPanelErrorHandler implements ErrorHandler {
  
  handleError(error: any): void {
    console.error('NgPanel Error:', error);
    
    // You can implement custom error reporting here
    // For example, send to analytics or error reporting service
    
    // Show user-friendly error message
    this.showErrorMessage(this.getErrorMessage(error));
  }

  private getErrorMessage(error: any): string {
    if (error?.message) {
      return error.message;
    }
    
    if (typeof error === 'string') {
      return error;
    }
    
    return 'An unexpected error occurred';
  }

  private showErrorMessage(message: string): void {
    // Simple toast notification - in a real app you might use a toast service
    if (typeof window !== 'undefined') {
      console.warn('NgPanel:', message);
    }
  }
}