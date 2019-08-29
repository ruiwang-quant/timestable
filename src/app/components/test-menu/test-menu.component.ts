import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/models/game';

@Component({
  selector: 'tt-test-menu',
  templateUrl: './test-menu.component.html',
  styleUrls: ['./test-menu.component.scss']
})
export class TestMenuComponent implements OnInit {

  factors: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  factor: number;
  hide: boolean = true;
  profile: Profile;
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let profileKey = localStorage.getItem("profile");
    if (!profileKey) {
      profileKey = "default";
      localStorage.setItem("profile", profileKey);
    }
    this.profile = JSON.parse(localStorage.getItem(profileKey));
    if (!this.profile) {
      this.profile = {
        tests: [
          {factor: 1, level1: false, level2: false, level3: false},
          {factor: 2, level1: false, level2: false, level3: false},
          {factor: 3, level1: false, level2: false, level3: false},
          {factor: 4, level1: false, level2: false, level3: false},
          {factor: 5, level1: false, level2: false, level3: false},
          {factor: 6, level1: false, level2: false, level3: false},
          {factor: 7, level1: false, level2: false, level3: false},
          {factor: 8, level1: false, level2: false, level3: false},
          {factor: 9, level1: false, level2: false, level3: false},
          {factor: 10, level1: false, level2: false, level3: false},
          {factor: 11, level1: false, level2: false, level3: false},
          {factor: 12, level1: false, level2: false, level3: false},
        ]
      } as Profile;
      localStorage.setItem(profileKey, JSON.stringify(this.profile));
    }
    const factor:number = +this.route.snapshot.params["factor"];
    const level:number = +this.route.snapshot.params["level"];
    const score:number = +this.route.snapshot.params["score"];
    if (factor && level && score) {
      if (12 === score) {
        if (8 === level) {
          this.profile.tests[factor - 1].level1 = true;
        } else if (5 === level) {
          this.profile.tests[factor - 1].level2 = true;
        } else if (3 === level) {
          this.profile.tests[factor - 1].level3 = true;
        }
        localStorage.setItem(profileKey, JSON.stringify(this.profile));
      }
    }
  }

  getIcon(factor: number, level: number): string {
    if (this.profile) {
      if (1 === level) {
        return this.profile.tests[factor - 1].level1?'fas':'far';
      } else if (2 === level) {
        return this.profile.tests[factor - 1].level2?'fas':'far';
      } else if (3 === level) {
        return this.profile.tests[factor - 1].level3?'fas':'far';
      } else {
        return 'far';
      }
    } else {
      return 'far';
    }
  }

  getColor(factor: number, level: number): string {
    if (this.profile) {
      if (1 === level) {
        return this.profile.tests[factor - 1].level1?'#f1c40f':'#ecf0f1';
      } else if (2 === level) {
        return this.profile.tests[factor - 1].level2?'#f1c40f':'#ecf0f1';
      } else if (3 === level) {
        return this.profile.tests[factor - 1].level3?'#f1c40f':'#ecf0f1';
      } else {
        return '#ecf0f1';
      }
    } else {
      return '#ecf0f1';
    }
  }

  onGoBack() {
    this.router.navigate(['']);
  }

  onSelect(factor: number) {
    this.factor = factor;
    this.hide = false;
    //this.router.navigate(['test-detail', { factor: factor }]);
  }

  onGoto(level: number) {
    this.hide = true;
    this.router.navigate(['test-detail', { factor: this.factor, level: level }]);
  }

}
