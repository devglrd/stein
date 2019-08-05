import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsiteService} from '../../services';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AuthService} from '../../../shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public message: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public show = {
    login: false
  };

  constructor(private WebSiteService: WebsiteService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.WebSiteService.hello().subscribe((data: { status: number, message: string }) => {
      console.log(data);
      this.message = data.message;
    });

    this.route.fragment
      .pipe(takeUntil(this.destroy$))
      .subscribe((fragment) => this.show.login = fragment === AuthService.fragmentKeyLoginModal);
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
