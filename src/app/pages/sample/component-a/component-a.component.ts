import { Component, OnInit } from '@angular/core';
import { Image } from './image.model';

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.scss']
})
export class ComponentAComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  counter: number = 0;
  setCounter(val: number): void {
    this.counter = val;
  }

  image: Image = {
    src: 'assets/images/hero-bg.jpeg',
    alt: 'Hero Background'
  }

}
