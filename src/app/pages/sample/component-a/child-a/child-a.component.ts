import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from '../image.model';

@Component({
  selector: 'app-child-a',
  templateUrl: './child-a.component.html',
  styleUrls: ['./child-a.component.scss']
})
export class ChildAComponent implements OnInit, OnChanges, OnDestroy, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  @Input() image!: Image;
  @Output() result = new EventEmitter<number>()
  counter: number = 0;
  increment(): void {
    this.counter++;
    this.result.emit(this.counter)
  }

  name: string = '';
  constructor(
    private readonly route: ActivatedRoute
  ) {
    console.log('constructor.childAComponent.called');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngDoCheck.childAComponent:', changes);
    console.log('ngDoCheck.childAComponent.called');
  }
  ngDoCheck(): void {
    console.log('ngDoCheck.childAComponent.called');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit.childAComponent.called');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked.childAComponent.called');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit.childAComponent.called');
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked.childAComponent.called');
  }
  // Salah satu component lifecycle
  // ini akan di panggil/load saat 'ChildAComponent' di panggil
  ngOnInit(): void {
    console.log('ngOnInit.childAComponent.called');
    this.route.queryParams.subscribe((param) => {
      const { name } = param;
      this.name = name;
    })
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy.childAComponent.called');
  }
}
