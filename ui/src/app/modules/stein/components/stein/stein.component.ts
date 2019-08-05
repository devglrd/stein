import {Component, OnInit} from '@angular/core';
import {SteinService} from '../../services';
import {AuthService} from '../../../shared/services';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-stein',
  templateUrl: './stein.component.html',
  styleUrls: ['./stein.component.scss']
})
export class SteinComponent implements OnInit {

  constructor(private steinService: SteinService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    const user = this.steinService.getUser().toPromise();
  }

}
