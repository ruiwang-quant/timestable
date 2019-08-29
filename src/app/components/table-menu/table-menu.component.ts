import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tt-table-menu',
  templateUrl: './table-menu.component.html',
  styleUrls: ['./table-menu.component.scss']
})
export class TableMenuComponent {

  factors: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(private router: Router) { }

  onGoBack() {
    this.router.navigate(['']);
  }
  
}
