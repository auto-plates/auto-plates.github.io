import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRegion, IRegionBase } from 'src/app/interfaces/region.interface';
import { BuildService } from 'src/app/services/build.service';
import { RegionsService } from 'src/app/services/regions.service';
import { ITab } from '../ui/types/tab.interface';

@Component({
  selector: 'app-plates-list',
  templateUrl: './plates-list.component.html',
  styleUrls: ['./plates-list.component.scss'],
  providers: [ RegionsService ]
})
export class PlatesListComponent implements OnInit, OnDestroy {

  region: IRegionBase;
  regions: IRegion[];
  selectedTabIndex: number;
  regionsAsTabs: ITab[];
  
  private isNodeJsBuild: boolean;
  private nodeJsSubscription: Subscription;
  private activatedRouteSubscription: Subscription;

  constructor(
    private buildService: BuildService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private regionsService: RegionsService
  ) {}
  
  ngOnInit(): void {
    this.nodeJsSubscription = this.buildService.isNodeJsBuild$.subscribe(this.handleBuild);
    this.activatedRouteSubscription = this.activatedRoute.queryParams.subscribe(params => {
      if (params['region']) {
        this.region = {title: params['region']};
      }
      if (!this.isNodeJsBuild) {
        this.loadRegionsMocked();
      } else {
        // TODO add here service for node JS
      }
    });
  }

  ngOnDestroy(): void {
    this.nodeJsSubscription?.unsubscribe();
    this.activatedRouteSubscription?.unsubscribe();
  }

  updateList(value: number): void {
    this.selectedTabIndex = value;
    this.router.navigate([], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { region: this.regions[value].title.toLowerCase() },
      }
    );
  }

  private handleBuild = (isNodeJsBuild: boolean): void => {
    this.isNodeJsBuild = isNodeJsBuild;
  }

  private loadRegionsMocked(): void {
    this.regionsService.getRegionsMocked().subscribe((regions: IRegion[]) => {
      this.regions = regions;
      this.selectedTabIndex = this.region
        ? regions.findIndex(item => item.title.toLowerCase() === this.region.title.toLowerCase())
        : 0;
      this.regionsAsTabs = regions.reduce((acc, curr) => [...acc, {label: `${curr.code} — ${curr.title}`}], []);
    })
  }
}
