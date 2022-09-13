// beforeEach
// -> Dipanggil setiap test case berjalan

import { ComponentFixture, TestBed } from "@angular/core/testing"
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module"

// beforeAll
// -> Dipanggil untuk semua case berjalan

// afterEach

// afterAll
describe('4. Angular App Module test scenario', () => {
  let module: AppModule;
  let fixture: ComponentFixture<AppComponent>;
  let element: HTMLElement;
  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    })
    module = TestBed.inject(AppModule);
    fixture = TestBed.createComponent(AppComponent);
    element = fixture.nativeElement;
  });
  describe('4.1 AppModule', () => {
    it('should be initialize', () => {
      expect(module).toBeTruthy();
      expect(module).toBeInstanceOf(AppModule);
    })
  })

  describe('4.2 AppComponent', () => {
    it('should be initialize', () => {
      const component: AppComponent = fixture.componentInstance;
      expect(component).toBeTruthy();
      expect(component).toBeInstanceOf(AppComponent);
    })
  })

  describe('4.3 AppComponent should have a selector', () => {
    it('should have router outlet', () => {
      expect(element.querySelector('router-outlet')).toBeTruthy();
    })

    it('should have app header', () => {
      expect(element.querySelector('app-header')).toBeTruthy();
    })
  })

  describe('4.4 AppComponent properti & method', () => {
    it('should have function getMessage', () => {
      const component: AppComponent = fixture.componentInstance;
      expect(component.getMessage()).toBe('Hai');
    })

    it('should have function ngOnInit', () => {
      const component: AppComponent = fixture.componentInstance;
      expect(component.ngOnInit).toBeDefined();
    })

    it('should have function getPeople', () => {
      const component: AppComponent = fixture.componentInstance;
      expect(component.getPeople()).toContain('John');
    })
  })

  // Keterangan:
  // TestBed : sebagai wadah dimana aplikasi berjalan untuk diuji
  // TestBed.configureTestingModule : konfigurasi dependencies yang dibutuhkan
  // TestBed.inject() : untuk meng-inject suatu class yang akan di uji



})
