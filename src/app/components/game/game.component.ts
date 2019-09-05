import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile, Challenge } from 'src/app/models/game';

@Component({
  selector: 'tt-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  
  private total: number = 3;
  base: number;
  value: number;
  baseList: Array<number>;
  valueList: Array<number>;
  answerList: Array<number>;
  selectionList: Array<number>
  index: number = 0;
  answer: number;
  theAnswer: string = '?';
  options: Array<number> = new Array<number>();
  countDown: number = this.total;
  interval;
  result = "gray";
  totalAnswer: number;
  profile: Profile;
  profileKey: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.profileKey = localStorage.getItem("profile");
    if (!this.profileKey) {
      this.profileKey = "default";
      localStorage.setItem("profile", this.profileKey);
    }
    this.profile = JSON.parse(localStorage.getItem(this.profileKey));
    
    const selections: Array<string> = this.route.snapshot.params["selections"].split(',');
    this.selectionList = new Array<number>();
    for (let i=0; i<selections.length; i++) {
      if ('true' === selections[i]) {
        this.selectionList.push(i + 1);
      }
    }
    this.base = 4;
    this.total = this.route.snapshot.params["level"];
    this.totalAnswer = 0;
    this.index = 0;
    this.initValue(this.selectionList);
    this.startCountDown();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.totalAnswer > 0) {
      const date: Date = new Date();
      if (!this.profile) {
        this.profile = {
          challenges: [
            {
              timestamp: date,
              base: this.selectionList,
              correct: this.totalAnswer,
              level: this.total
            }
          ]
        } as Profile;
      } else if (!this.profile.challenges) {
        this.profile.challenges = [
          {
            timestamp: date,
            base: this.selectionList,
            correct: this.totalAnswer,
            level: this.total
          }
        ];
      } else {
        this.profile.challenges.push(
          {
            timestamp: date,
            base: this.selectionList,
            correct: this.totalAnswer,
            level: this.total
          }
        );
      }
      localStorage.setItem(this.profileKey, JSON.stringify(this.profile));
    }
  }

  onGoBack() {
    this.router.navigate(['game']);
  }

  onAnswer(index: number) {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.theAnswer = ''+this.options[index];
      if (this.answer === this.options[index]) {
        this.result = "green";
        this.answerList[this.index - 1] = 1;
        this.totalAnswer++;
        setTimeout(() => {
          this.startCountDown();
        }, 1000);
      } else {
        this.result = "red";
        this.answerList[this.index - 1] = -1;
        setTimeout(() => {
          this.startCountDown();
        }, 5000);
      }
    }
  }

  getIcon(index: number): string {
    if (this.answerList[index] > 0) {
      return 'fa-check';
    } else if (this.answerList[index] < 0) {
      return 'fa-times';
    }
    return 'fa-question';
  }

  getColor(index: number): string {
    if (this.answerList[index] > 0) {
      return 'green';
    } else if (this.answerList[index] < 0) {
      return 'red';
    }
    return 'gray';
  }

  private initValue(selection: Array<number>) {
    this.baseList = new Array<number>();
    this.valueList = new Array<number>();
    this.answerList = new Array<number>();
    while(this.valueList.length < 12) {
      let b = Math.floor(Math.random() * selection.length);
      let v = Math.floor(Math.random() * 13);
      while (0 === v || this.valueList.includes(v)) {
        v = Math.floor(Math.random() * 13);
      }
      this.baseList.push(selection[b]);
      this.valueList.push(v);
      this.answerList.push(0);
    }
  }

  private startCountDown() {
    this.nextQuestion();
    this.result = "gray";
    this.theAnswer = '?';
    this.interval = setInterval(() => {
      this.countDown--;
      if (0 === this.countDown) {
        this.nextQuestion();
      }
    }, 1000);
  }

  private nextQuestion() {
    if (this.index < this.valueList.length) {
      this.setValue();
      this.countDown = this.total;
    } else {
      clearInterval(this.interval);
      this.interval = null;
      this.router.navigate(['result']);
    }
  }

  private setValue() {
    this.base = this.baseList[this.index];
    this.value = this.valueList[this.index++];
    this.answer = this.base * this.value;
    let random = Math.floor(Math.random() * 3);
    if (random !== 2 && this.value === 1) {
      random = 2;
    }
    if (0 === random) {
      this.options[0] = this.answer - +(this.base * 2);
      this.options[1] = this.answer - +this.base;
      this.options[2] = this.answer;
    } else if (1 === random) {
      this.options[0] = this.answer - +this.base;
      this.options[1] = this.answer;
      this.options[2] = this.answer + +this.base;
    } else if (2 === random) {
      this.options[0] = this.answer;
      this.options[1] = this.answer + +this.base;
      this.options[2] = +(this.base * 2) + +this.answer;
    }
  }

}
