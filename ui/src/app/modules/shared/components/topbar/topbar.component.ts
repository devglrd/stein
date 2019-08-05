import {Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

interface IShowDropdown {
  notifications: boolean;
  account: boolean;
}


@Component({
  selector: 'app-website-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Input() auth;
  @HostBinding('class.page__topbar') _ = true;

  @ViewChild('Account') iconAccount: ElementRef;
  @ViewChild('Notifications') iconNotifications: ElementRef;
  public user: any;
  public loading = true;
  public showDropdown: IShowDropdown = {
    notifications: false,
    account: false,
  };

  constructor(private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    if (this.auth) {
      this.user = AuthService.getUser();
      this.loading = false;
    }

  }

  public showAccountDropdown() {
    this.showDropdown.account = !this.showDropdown.account;
    this.showDropdown.notifications = false;
  }

  public showNotificationsDropdown() {

  }

  @HostListener('document:click', ['$event']) onClickOutside(e) {
    if (this.showDropdown.notifications && !this.iconNotifications.nativeElement.contains(e.target)) {
      this.showDropdown.notifications = false;
    }
    if (this.showDropdown.account && !this.iconAccount.nativeElement.contains(e.target)) {
      this.showDropdown.account = false;
    }
    e.stopPropagation();
  }


  logout() {
    AuthService.logout();
    this.router.navigateByUrl('/');
    this.toastr.success('Déconnexion !');
  }
}
