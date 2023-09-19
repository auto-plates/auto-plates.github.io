import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ITab } from '../../types/tab.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

  @Input() tabs: ITab[];
  @Input() selectedTabIndex = 0;
  @Output() tabChanged = new EventEmitter<number>();

  
  selectTab(value: number): void {
    this.selectedTabIndex = value;
    this.tabChanged.emit(value);
  }
}
