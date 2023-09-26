import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRegion } from 'src/app/interfaces/region.interface';
import { BuildService } from 'src/app/services/build.service';
import { RegionsService } from 'src/app/services/regions.service';
import { ITab } from '../ui/types/tab.interface';
import { RouteHelper } from 'src/app/helpers/route.helper';

@Component({
  selector: 'app-plates-list',
  templateUrl: './plates-list.component.html',
  styleUrls: ['./plates-list.component.scss'],
  providers: [RegionsService],
})
export class PlatesListComponent implements OnInit, OnDestroy {
  regionCode: string;
  selectedTabValue: string | null;
  regionsAsTabs: ITab[];
  isTableRenderingTimeoutPassed = false;

  private isNodeJsBuild: boolean;
  private nodeJsSubscription: Subscription;
  private activatedRouteSubscription: Subscription;

  constructor(
    private buildService: BuildService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private regionsService: RegionsService,
    private routeHelper: RouteHelper
  ) {}

  ngOnInit(): void {
    this.nodeJsSubscription = this.buildService.isNodeJsBuild$.subscribe(
      this.handleBuild
    );
    this.activatedRouteSubscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        if (params['region_code']) {
          this.regionCode = params['region_code'];
        } else {
          this.regionCode = null;
        }
        if (!this.isNodeJsBuild) {
          this.loadRegionsMocked();
        } else {
          // TODO add here service for node JS
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.nodeJsSubscription?.unsubscribe();
    this.activatedRouteSubscription?.unsubscribe();
  }

  updateList(value: string): void {
    this.selectedTabValue = value;
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: { region_code: value },
    };
    if (value) {
      this.router.navigate([], navigationExtras);
    } else {
      this.router.navigate(this.routeHelper.ListUrl);
    }
  }

  private handleBuild = (isNodeJsBuild: boolean): void => {
    this.isNodeJsBuild = isNodeJsBuild;
  };

  private loadRegionsMocked(): void {
    this.selectedTabValue = this.regionCode;
    if (!this.regionsAsTabs) {
      this.regionsService.getRegionsMocked().subscribe((regions: IRegion[]) => {
        this.regionsAsTabs = regions.reduce(
          (acc, curr) => [
            ...acc,
            { value: curr.code, label: `${curr.code} — ${curr.title}` },
          ],
          []
        );
        this.regionsAsTabs.unshift({ value: null, label: 'Сała Polska' });
      });
    }
  }
}
