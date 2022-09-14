import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { BsButtonDirective } from "./directives/bs-button/bs-button.directive";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { TitleCasePipe } from "@angular/common";
import { DateCustomPipe } from "./pipes/date-custom/date-custom.pipe";
import { SessionService } from "./services/session.service";

describe('5. Angular Share Module test scenario', () => {
  let fixtureNotFound: ComponentFixture<NotFoundComponent>;
  // let fixtureHeader: ComponentFixture<HeaderComponent>;
  let debugElement: DebugElement[];
  let sessionService: SessionService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BsButtonDirective],
      imports: [RouterTestingModule],
      providers: [SessionService]
    })
    fixtureNotFound = TestBed.createComponent(NotFoundComponent);
    // fixtureHeader = TestBed.createComponent(HeaderComponent);
    debugElement = [fixtureNotFound.debugElement];
    sessionService = TestBed.inject(SessionService);
    sessionService.set('token', '123');
  });

  describe('5.1 BsButton directive should be applied', () => {
    it('should have applied to 1 element', () => {
      const buttons = debugElement[0].queryAll(By.directive(BsButtonDirective));
      expect(buttons.length).toBe(1);
    })
  })

  describe('5.2 TitleCasePipe should work', () => {
    it('"bootcamp enigma" should have change to "Bootcamp Enigma"', () => {
      const bootcamp = 'bootcamp enigma';
      const titleCase: TitleCasePipe = new TitleCasePipe();
      expect(titleCase.transform(bootcamp)).toEqual('Bootcamp Enigma');
    })
  })

  describe('5.3 DateCustomePipe should work', () => {
    it('should have change date format local "id"', () => {
      const dateCustomPipe: DateCustomPipe = new DateCustomPipe();
      expect(dateCustomPipe.transform('', 'dd MMMM yyyy')).toEqual('14 September 2022');
    })
  })

  describe('5.4 SessionService scenario test', () => {
    it('should have initialize', () => {
      expect(sessionService).toBeTruthy();
    })

    it('should have set, get, and remove method', () => {
      expect(sessionService.get).toBeTruthy();
      expect(sessionService.set).toBeTruthy();
      expect(sessionService.remove).toBeTruthy();
    })

    it('should have value as "123" from sessionStorage with key "token"', () => {
      const token = sessionService.get('token');
      expect(token).toEqual('123');
    })

    it('should have value as "null" from sessionStorage with key "token"', () => {
      sessionService.remove('token');
      const token = sessionService.get('token');
      console.log(token);
      expect(token).toBeNull();
    })
  })

})
