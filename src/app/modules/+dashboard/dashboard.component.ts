import { Component, OnInit } from '@angular/core';
import { PlateForm } from '../plate-form/forms/plate.form';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  plateForm: PlateForm;

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.plateForm = PlateForm.createForm();
  }
}
