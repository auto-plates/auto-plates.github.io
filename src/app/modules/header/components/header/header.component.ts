import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoadInProgress: boolean;

  private progressBarSubscription: Subscription;

  constructor(private pb: ProgressBarService) {}

  ngOnInit(): void {
    this.progressBarSubscription = this.pb.isLoadInProgress$.subscribe(this.handleProgressBar)
  }

  ngOnDestroy(): void {
    this.progressBarSubscription?.unsubscribe();
  }


  private handleProgressBar = (isLoadInProgress: boolean): void => {
    this.isLoadInProgress = isLoadInProgress;
  }
}
