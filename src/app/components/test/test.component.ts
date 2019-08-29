import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tt-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy {
  
  private total: number = 3;
  base: number;
  value: number;
  valueList: Array<number>;
  index: number = 0;
  answer: number;
  theAnswer: string = '?';
  options: Array<number> = new Array<number>();
  countDown: number = this.total;
  interval;
  result = "gray";
  totalAnswer: number;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.base = this.route.snapshot.params["factor"];
    this.total = this.route.snapshot.params["level"];
    this.totalAnswer = 0;
    this.initValue();
    this.startCountDown();
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onGoBack() {
    this.router.navigate(['test']);
  }

  onAnswer(index: number) {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.theAnswer = ''+this.options[index];
      if (this.answer === this.options[index]) {
        this.result = "green";
        this.totalAnswer++;
        setTimeout(() => {
          this.startCountDown();
        }, 1000);
      } else {
        this.result = "red";
        setTimeout(() => {
          this.startCountDown();
        }, 5000);
      }
    }
  }

  private initValue() {
    this.valueList = new Array<number>();
    while(this.valueList.length < 12) {
      let v = Math.floor(Math.random() * 13);
      while (0 === v || this.valueList.includes(v)) {
        v = Math.floor(Math.random() * 13);
      }
      this.valueList.push(v);
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
      this.router.navigate(['test', { factor: this.base, level: this.total, score: this.totalAnswer }]);
    }
  }

  private setValue() {
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
