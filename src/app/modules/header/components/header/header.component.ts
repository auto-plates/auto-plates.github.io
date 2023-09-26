import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { RouteHelper } from 'src/app/helpers/route.helper';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoadInProgress: boolean;
  isInnerPage: boolean;

  private progressBarSubscription: Subscription;
  private routerSubscription: Subscription;

  constructor(
    private pb: ProgressBarService,
    private routeHelper: RouteHelper,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.progressBarSubscription = this.pb.isLoadInProgress$.subscribe(
      this.handleProgressBar
    );
    this.routerSubscription = this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(this.handleRoute);
  }

  ngOnDestroy(): void {
    this.progressBarSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
  }

  navigateToDashboard(): void {
    this.router.navigate(this.routeHelper.dashboardUrl);
  }

  private handleProgressBar = (isLoadInProgress: boolean): void => {
    this.isLoadInProgress = isLoadInProgress;
  };

  private handleRoute = (event: any): void => {
    this.isInnerPage = event.url !== this.routeHelper.dashboardUrl.join('');
  };
}
