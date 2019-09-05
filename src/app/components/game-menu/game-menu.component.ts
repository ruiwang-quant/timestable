import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/game';

@Component({
  selector: 'tt-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss']
})
export class GameMenuComponent implements OnInit {

  factors: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  selections: Array<boolean>;
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.selections = [false, false, false, false, false, false, false, false, false, false, false, false];
  }

  onGoBack() {
    this.router.navigate(['']);
  }

  onGoto(level: number) {
    this.router.navigate(['game-detail', { selections: this.selections, level: level }]);
  }

  getBgColor(index: number): string {
    if (this.selections[index]) {
      return '#2ecc71';
    } else {
      return '#e74c3c';
    }
  }

}
