import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tt-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  @ViewChild('input', {static: false})
  private inputDiv: ElementRef;
  popup: boolean = true;
  profile: string;

  constructor(private router: Router) { }

  ngOnInit() {
    let profileKey = localStorage.getItem("profile");
    if (!profileKey) {
      profileKey = "default";
      localStorage.setItem("profile", profileKey);
    }
    this.profile = profileKey;
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

  onSelect() {
    const profile = this.inputDiv.nativeElement.textContent;
    if (profile) {
      localStorage.setItem("profile", profile);
      this.profile = profile;
    }
    this.popup = true;
  }

}
