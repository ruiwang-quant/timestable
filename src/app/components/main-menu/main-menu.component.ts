import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tt-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoMenu(index: number) {
    if (0 === index) {
      this.router.navigate(['table']);
    } else if (1 === index) {
      this.router.navigate(['test']);
    } else if (2 === index) {
      this.router.navigate(['game']);
    } else if (3 === index) {
      this.router.navigate(['result']);
    }
  }

}
