import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-ng-panel',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>
      ng-panel works fine!
    </p>
  `,
  styles: ""
})
export class NgPanelComponent {

}
