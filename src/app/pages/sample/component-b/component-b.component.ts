import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-b',
  templateUrl: './component-b.component.html',
  styleUrls: ['./component-b.component.scss']
})
export class ComponentBComponent implements OnInit {
  constructor() {
    console.log('constructor.ComponentBComponent.called');
  }

  ngOnInit(): void {
    console.log('ngOnInit.ComponentBComponent.called');
  }
}
