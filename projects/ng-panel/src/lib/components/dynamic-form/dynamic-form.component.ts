import {Component, Input, inject, computed, input, output} from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ModelConfig } from '../../models/panel-config.model';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'lib-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="dynamic-form" [class.hidden]="!model()">
      <form [formGroup]="form" (ngSubmit)="submitForm()" class="space-y-4">
        @if (model()) {
          @for (field of model()?.fields; track field) {
            <div class="form-control">
              <label class="label">
                <span class="label-text">{{ field.label }}</span>
              </label>
              @switch (field.type) {
                @case ('select') {
                  <select
                    [formControlName]="field.name"
                    class="select select-bordered">
                    @for (option of field.options; track option) {
                      <option
                        [value]="option.value">
                        {{ option.label }}
                      </option>
                    }
                  </select>
                }
                @case ('boolean') {
                  <input
                    type="checkbox"
                    [formControlName]="field.name"
                    class="toggle"/>
                }
                @default {
                  <input
                    [type]="field.type"
                    [formControlName]="field.name"
                    class="input input-bordered"/>
                }
              }
            </div>
          }
          <div class="flex justify-end space-x-2">
            <button type="button" class="btn" (click)="onCancel.emit()">
              {{ model()?.form?.cancelLabel || 'Cancel' }}
            </button>
            <button type="submit" class="btn btn-primary">
              {{ model()?.form?.submitLabel || 'Submit' }}
            </button>
          </div>
        }
      </form>
    </div>
    `
})
export class DynamicFormComponent {
  readonly modelName = input.required<string>();

  @Input() set initialData(value: any) {
    if (value) {
      this.form.patchValue(value);
    }
  }

  readonly onSubmit = output<any>();
  readonly onCancel = output<void>();

  private panelService = inject(PanelService);
  private fb = inject(FormBuilder);

  form!: FormGroup;
  model = computed(() => this.panelService.getModel(this.modelName()));

  ngOnInit() {
    const modelConfig = this.model();
    if (modelConfig) {
      this.form = this.createForm(modelConfig);
    }
  }

  private createForm(modelConfig: ModelConfig): FormGroup {
    const group: any = {};
    for (const field of modelConfig.fields) {
      group[field.name] = ['', field.validators || []];
    }
    return this.fb.group(group);
  }

  submitForm() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }
}
