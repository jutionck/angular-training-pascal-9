import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Pascal App';
  // Data Binding - String Interpolation
  message: string = 'Hola';
  getMessage(): string {
    return 'Hai'
  }
  people: string[] = ['John', 'Sisca', 'Budi', 'Suci'];
  getPeople(): string {
    let result: string = ''
    for (const person of this.people) {
      result += person;
    }
    return result;
  }
  employees = [
    {
      name: 'Fadli',
      address: 'Jakarta Selatan'
    },
    {
      name: 'John',
      address: 'Jakarta Timur'
    },
    {
      name: 'Gerrard',
      address: 'Jakarta Utara'
    },
    {
      name: 'Lampard',
      address: 'Jakarta Timur'
    },
  ]
  increment: number = 0;

  // Properti Binding
  image = {
    src: 'assets/images/hero-bg.jpeg',
    alt: 'Gambar Hero Background'
  }

  fullName: string = 'My name is <strong>John</strong>';
  color: string = 'blue';
  fontSize: string = '5rem';
  fontWeight: string = '600'

  styles = {
    color: 'blue',
    fontSize: '5rem',
    fontWeight: '600'
  }

  isDisabled: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isDisabled = true
    }, 2000);
  }

  // Event Binding
  // click, onLoad, change, keyPress, etc..
  onClickButton(): void {
    this.message = 'Hello'
  }

  // input event
  onKeyPress(event: any): void {
    const { value } = event.target
    this.message = value;

  }
}
