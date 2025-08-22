import {Component, inject, computed, input, output, OnInit, ChangeDetectionStrategy, effect} from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';

import { ModelConfig } from '../../models/panel-config.model';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'lib-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dynamic-form" [class.hidden]="!model()">
      <form [formGroup]="form" (ngSubmit)="submitForm()" class="space-y-4">
        @if (model()) {
          @for (field of model()?.fields; track field) {
            <div class="form-control">
              <label class="label">
                <span class="label-text">
                  {{ field.label }}
                  @if (field.required) {
                    <span class="text-red-500">*</span>
                  }
                </span>
              </label>
              @switch (field.type) {
                @case ('select') {
                  <select
                    [formControlName]="field.name"
                    [class]="getFieldClasses(field.name)"
                    class="select select-bordered">
                    <option value="">{{ field.placeholder || 'Select an option' }}</option>
                    @for (option of field.options; track option) {
                      <option
                        [value]="option.value">
                        {{ option.label }}
                      </option>
                    }
                  </select>
                }
                @case ('multiselect') {
                  <select
                    [formControlName]="field.name"
                    [class]="getFieldClasses(field.name)"
                    class="select select-bordered"
                    multiple>
                    @for (option of field.options; track option) {
                      <option
                        [value]="option.value">
                        {{ option.label }}
                      </option>
                    }
                  </select>
                }
                @case ('textarea') {
                  <textarea
                    [formControlName]="field.name"
                    [class]="getFieldClasses(field.name)"
                    [placeholder]="field.placeholder || ''"
                    [rows]="field.rows || 3"
                    class="textarea textarea-bordered">
                  </textarea>
                }
                @case ('file') {
                  <input
                    type="file"
                    [formControlName]="field.name"
                    [class]="getFieldClasses(field.name)"
                    [accept]="field.accept || ''"
                    [multiple]="field.multiple || false"
                    class="file-input file-input-bordered"/>
                }
                @case ('boolean') {
                  <input
                    type="checkbox"
                    [formControlName]="field.name"
                    class="toggle"/>
                }
                @case ('group') {
                  <div class="border rounded-lg p-4 space-y-4">
                    @if (field.fields) {
                      @for (subField of field.fields; track subField) {
                        <div class="form-control">
                          <label class="label">
                            <span class="label-text">
                              {{ subField.label }}
                              @if (subField.required) {
                                <span class="text-red-500">*</span>
                              }
                            </span>
                          </label>
                          <!-- Recursive field rendering would go here -->
                          <input
                            [type]="subField.type"
                            [formControlName]="subField.name"
                            [placeholder]="subField.placeholder || ''"
                            class="input input-bordered"/>
                        </div>
                      }
                    }
                  </div>
                }
                @default {
                  <input
                    [type]="field.type"
                    [formControlName]="field.name"
                    [class]="getFieldClasses(field.name)"
                    [placeholder]="field.placeholder || ''"
                    [min]="field.min"
                    [max]="field.max"
                    [step]="field.step"
                    class="input input-bordered"/>
                }
              }
              @if (getFieldError(field.name)) {
                <label class="label">
                  <span class="label-text-alt text-red-500">{{ getFieldError(field.name) }}</span>
                </label>
              }
            </div>
          }
          <div class="flex justify-end space-x-2">
            <button type="button" class="btn" (click)="onCancel.emit()">
              {{ model()?.form?.cancelLabel || 'Cancel' }}
            </button>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
              {{ model()?.form?.submitLabel || 'Submit' }}
            </button>
          </div>
        }
      </form>
    </div>
    `
})
export class DynamicFormComponent implements OnInit {
  readonly modelName = input.required<string>();
  readonly initialData = input<any>();
  readonly customValidators = input<{ [key: string]: (control: AbstractControl) => any }>();

  readonly onSubmit = output<any>();
  readonly onCancel = output<void>();

  private panelService = inject(PanelService);
  private fb = inject(FormBuilder);

  form!: FormGroup;
  model = computed(() => this.panelService.getModel(this.modelName()));

  constructor() {
    // Use effect to patch form when initialData changes
    effect(() => {
      const data = this.initialData();
      if (data && this.form) {
        this.form.patchValue(data);
      }
    });
  }

  ngOnInit() {
    const modelConfig = this.model();
    if (modelConfig) {
      this.form = this.createForm(modelConfig);
    }
  }

  private createForm(modelConfig: ModelConfig): FormGroup {
    const group: any = {};
    const customValidators = this.customValidators();
    
    for (const field of modelConfig.fields) {
      const validators = [];
      
      if (field.required) {
        validators.push(Validators.required);
      }
      
      if (field.type === 'email') {
        validators.push(Validators.email);
      }
      
      if (field.type === 'number' && field.min !== undefined) {
        validators.push(Validators.min(field.min));
      }
      
      if (field.type === 'number' && field.max !== undefined) {
        validators.push(Validators.max(field.max));
      }
      
      if (field.validators) {
        validators.push(...field.validators);
      }
      
      // Add custom validators
      if (customValidators && customValidators[field.name]) {
        validators.push(customValidators[field.name]);
      }
      
      group[field.name] = ['', validators];
    }
    return this.fb.group(group);
  }

  submitForm() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }

  getFieldClasses(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (control?.invalid && control?.touched) {
      return 'border-red-500';
    }
    return '';
  }

  getFieldError(fieldName: string): string | null {
    const control = this.form.get(fieldName);
    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) {
        return 'This field is required';
      }
      if (control.errors?.['email']) {
        return 'Please enter a valid email address';
      }
      // Add more error types as needed
      return 'This field is invalid';
    }
    return null;
  }
}
