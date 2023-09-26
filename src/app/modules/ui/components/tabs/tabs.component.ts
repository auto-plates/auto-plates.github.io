import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ITab } from '../../types/tab.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() tabs: ITab[];
  @Input() selectedTabValue = null;
  @Output() tabChanged = new EventEmitter<string>();

  selectedTabIndex: number;

  ngOnInit(): void {
    this.selectedTabIndex = this.tabs.findIndex(
      (item) => item.value === this.selectedTabValue
    );
  }

  selectTab(value: number): void {
    this.selectedTabIndex = value;
    this.tabChanged.emit(this.tabs[value].value);
  }
}
