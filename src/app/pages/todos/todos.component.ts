import { Component, OnInit } from '@angular/core';
import { id } from 'date-fns/locale'
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  today: string = '';
  locale: Locale = id;

  ngOnInit(): void { }
}
