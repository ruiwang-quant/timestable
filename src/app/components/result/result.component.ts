import { Component, OnInit } from '@angular/core';
import { Profile, Challenge } from 'src/app/models/game';
import { Router } from '@angular/router';

@Component({
  selector: 'tt-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  profile: Profile;
  profileKey: string;
  height: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.profileKey = localStorage.getItem("profile");
    if (!this.profileKey) {
      this.profileKey = "default";
      localStorage.setItem("profile", this.profileKey);
    }
    this.profile = JSON.parse(localStorage.getItem(this.profileKey));
    if (this.profile && this.profile.challenges && this.profile.challenges.length > 0) {
      this.height = 64 * this.profile.challenges.length + 160 + 'px';
    } else {
      this.height = '0px';
    }
  }

  onGoBack() {
    this.router.navigate(['']);
  }

  getLevel(level: number): string {
    if (3 === +level) {
      return 'Difficult';
    } else if (5 === +level) {
      return 'Medium';
    } else {
      return 'Easy';
    }
  }

  getChallenges(): Array<Challenge> {
    if (this.profile && this.profile.challenges) {
      this.profile.challenges.sort((a: Challenge, b: Challenge) => {
        if(a.timestamp < b.timestamp) {
          return 1
        } else if(a.timestamp > b.timestamp) {
          return -1
        } else {
          return 0;
        }
      });
      return this.profile.challenges;
    } else {
      return [];
    }
  }

}
