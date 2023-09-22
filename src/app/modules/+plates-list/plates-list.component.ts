import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRegion, IRegionShort } from 'src/app/interfaces/region.interface';
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

  regionCode: string;
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
      if (params['region_code']) {
        this.regionCode = params['region_code'];
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
        queryParams: { 'region_code': this.regions[value].code },
      }
    );
  }

  private handleBuild = (isNodeJsBuild: boolean): void => {
    this.isNodeJsBuild = isNodeJsBuild;
  }

  private loadRegionsMocked(): void {
    this.regionsService.getRegionsMocked().subscribe((regions: IRegion[]) => {
      this.regions = regions;
      this.selectedTabIndex = this.regionCode
        ? regions.findIndex(item => item.code === this.regionCode)
        : 0;
      if (!this.regionsAsTabs) {
        this.regionsAsTabs = regions.reduce((acc, curr) => [...acc, {label: `${curr.code} — ${curr.title}`}], []);
      }
    })
  }
}
