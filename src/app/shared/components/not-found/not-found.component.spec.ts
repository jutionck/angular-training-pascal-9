import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { BsButtonDirective } from "../../directives/bs-button/bs-button.directive";
import { SharedModule } from "../../shared.module";
import { NotFoundComponent } from "./not-found.component";

describe('5. Angular Share Module test scenario', () => {
  let fixture: ComponentFixture<NotFoundComponent>;
  let debugElement: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BsButtonDirective],
      imports: [RouterTestingModule],
    })
    fixture = TestBed.createComponent(NotFoundComponent);
    debugElement = fixture.debugElement;
  });
  describe('5.1 BsButton directive should be applied', () => {
    it('should have applied to 1 element', () => {
      const buttons = debugElement.queryAll(By.directive(BsButtonDirective));
      buttons.forEach((element: DebugElement) => {
        console.log('element:', element);
      })
      expect(buttons.length).toBe(1);
    })
  })

})
