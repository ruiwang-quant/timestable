import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'tt-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  
  constructor() { }

  private readonly total: number = 3;
  base: number;
  value: number;
  answer: number;
  theAnswer: string = '?';
  options: any = new Array<number>();
  countDown: number = this.total;
  interval;
  result = "gray";

  ngOnInit(): void {
    this.base = 4;
    this.setValue();
    this.startCountDown();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  onAnswer(index: number) {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.theAnswer = this.options[index];
      if (this.answer === this.options[index]) {
        this.result = "green";
        setTimeout(() => {
          this.startCountDown();
        }, 2000);
      } else {
        this.result = "red";
        setTimeout(() => {
          this.startCountDown();
        }, 5000);
      }
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
    this.setValue();
    this.countDown = this.total;
  }

  private setValue() {
    let v = Math.floor(Math.random() * 13);
    while (0 === v || v === this.value) {
      v = Math.floor(Math.random() * 13);
    }
    this.value = v;
    this.answer = this.base * this.value;
    let random = Math.floor(Math.random() * 3);
    if (random !== 2 && this.value === 1) {
      random = 2;
    }
    if (0 === random) {
      this.options[0] = this.answer - this.base * 2;
      this.options[1] = this.answer - this.base;
      this.options[2] = this.answer;
    } else if (1 === random) {
      this.options[0] = this.answer - this.base;
      this.options[1] = this.answer;
      this.options[2] = this.answer + this.base;
    } else if (2 === random) {
      this.options[0] = this.answer;
      this.options[1] = this.answer + this.base;
      this.options[2] = this.answer + this.base * 2;
    }
  }

}
