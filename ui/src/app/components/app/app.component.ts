import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Event, NavigationEnd, Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {SteinService} from '../../modules/stein/services';
import {AuthService} from '../../modules/shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'stein';
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private steinService: SteinService) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntil(this.destroy$), filter((event: Event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scroll(0, 0);
      });

    this.steinService.getUser().subscribe((data) => {
      if (data.id) {
        this.router.navigateByUrl('/app');
      } else {
        this.router.navigate(['/'], {fragment: AuthService.fragmentKeyLoginModal});
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
