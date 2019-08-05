import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-website-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() auth;

  constructor() {
  }

  ngOnInit() {
  }

}
