import { Component, OnInit } from '@angular/core';
import { Image } from './image.model';

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.scss']
})
export class ComponentAComponent implements OnInit {
  toggle: boolean = false;
  constructor() {
    console.log('constructor.ComponentAComponent.called');
  }
  ngOnInit(): void {
    console.log('ngOnInit.ComponentAComponent.called');
  }

  isToggleButton(): void {
    console.log('toggle before:', this.toggle);
    this.toggle = !this.toggle;
    console.log('toggle after:', this.toggle);
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
