
import { Injectable, signal, computed } from '@angular/core';
import { PanelConfig, ModelConfig } from '../models/panel-config.model';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  // Initialiser avec une valeur par défaut
  private configSignal = signal<PanelConfig>({
    title: '',
    logo: '',
    menu: [],
    profileConfig: {
      actions: []
    }
  });
  private modelsSignal = signal<Map<string, ModelConfig>>(new Map());

  // Expose les signaux en lecture seule
  readonly config = this.configSignal.asReadonly();
  readonly models = this.modelsSignal.asReadonly();

  setConfig(config: PanelConfig) {
    this.configSignal.set({
      ...this.configSignal(),
      ...config
    });
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
