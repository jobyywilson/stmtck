import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  private routeLoadingSubject = new BehaviorSubject<boolean>(true);
  readonly loading$ = combineLatest([
    this.routeLoadingSubject,
    this.commonService.loading$
  ]).pipe(map(([routeLoading, contentLoading]) => routeLoading || contentLoading));

  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) this.routeLoadingSubject.next(true);
      if (event instanceof NavigationEnd) {
        // Keep navigation deterministic even on browsers that restore the
        // previous document position before Angular's scroll feature runs.
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        this.routeLoadingSubject.next(false);
      }
      if (event instanceof NavigationCancel || event instanceof NavigationError) {
        this.routeLoadingSubject.next(false);
      }
    });
  }


}
