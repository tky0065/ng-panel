import { Injectable, signal } from '@angular/core';
import { PanelConfig, ModelConfig } from '../models/panel-config.model';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  private configSignal = signal<PanelConfig | null>(null);
  private modelsSignal = signal<Map<string, ModelConfig>>(new Map());

  config = this.configSignal.asReadonly();
  models = this.modelsSignal.asReadonly();

  setConfig(config: PanelConfig) {
    this.configSignal.set(config);
  }

  registerModel(name: string, config: ModelConfig) {
    const currentModels = new Map(this.modelsSignal());
    currentModels.set(name, config);
    this.modelsSignal.set(currentModels);
  }

  getModel(name: string): ModelConfig | undefined {
    return this.modelsSignal().get(name);
  }
}
